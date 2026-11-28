"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const path = require("node:path");
const { spawn } = require("node:child_process");

function encodeMessage(message) {
  return Buffer.from(`${JSON.stringify(message)}\n`, "utf8");
}

function createMessageReader(child) {
  let buffer = "";
  const waiters = [];

  child.stdout.on("data", (chunk) => {
    buffer += chunk.toString("utf8");

    while (true) {
      const newlineIndex = buffer.indexOf("\n");
      if (newlineIndex === -1) {
        break;
      }

      const payload = buffer.slice(0, newlineIndex).trim();
      buffer = buffer.slice(newlineIndex + 1);
      if (!payload) {
        continue;
      }

      const waiter = waiters.shift();
      if (waiter) {
        waiter.resolve(JSON.parse(payload));
      }
    }
  });

  child.on("error", (error) => {
    while (waiters.length > 0) {
      waiters.shift().reject(error);
    }
  });

  child.on("exit", (code, signal) => {
    if (code === 0 || signal === "SIGTERM") {
      return;
    }

    const error = new Error(
      `MCP server exited unexpectedly: code=${code} signal=${signal}`,
    );
    while (waiters.length > 0) {
      waiters.shift().reject(error);
    }
  });

  return function readNext() {
    return new Promise((resolve, reject) => {
      waiters.push({ resolve, reject });
    });
  };
}

test("stdio MCP server initializes and handles lookups", async () => {
  const serverPath = path.resolve(__dirname, "..", "mcp", "server.js");
  const child = spawn(process.execPath, [serverPath], {
    stdio: ["pipe", "pipe", "pipe"],
  });
  const readNext = createMessageReader(child);

  child.stdin.write(
    encodeMessage({
      jsonrpc: "2.0",
      id: 1,
      method: "initialize",
      params: {
        protocolVersion: "2025-06-18",
        capabilities: {},
        clientInfo: {
          name: "test-client",
          version: "0.0.0",
        },
      },
    }),
  );

  const initializeResponse = await readNext();
  assert.equal(initializeResponse.id, 1);
  assert.equal(initializeResponse.result.protocolVersion, "2025-06-18");
  assert.equal(typeof initializeResponse.result.capabilities, "object");
  assert.equal(typeof initializeResponse.result.serverInfo, "object");

  child.stdin.write(
    encodeMessage({
      jsonrpc: "2.0",
      method: "notifications/initialized",
    }),
  );

  child.stdin.write(
    encodeMessage({
      jsonrpc: "2.0",
      id: 2,
      method: "tools/list",
      params: {},
    }),
  );

  const toolsResponse = await readNext();
  assert.equal(toolsResponse.id, 2);
  assert.equal(toolsResponse.result.tools.length, 1);
  assert.equal(toolsResponse.result.tools[0].name, "ccf_rank");

  child.stdin.write(
    encodeMessage({
      jsonrpc: "2.0",
      id: 3,
      method: "tools/call",
      params: {
        name: "ccf_rank",
        arguments: {
          query: "SIGCOMM",
        },
      },
    }),
  );

  const callResponse = await readNext();
  assert.equal(callResponse.id, 3);
  assert.equal(callResponse.result.isError, undefined);
  assert.equal(callResponse.result.structuredContent.rank, "A");
  assert.equal(callResponse.result.structuredContent.matchedBy, "abbr");
  assert.match(callResponse.result.content[0].text, /CCF A/);

  child.stdin.end();
});

test("stdio MCP server returns tool-level errors for invalid queries", async () => {
  const serverPath = path.resolve(__dirname, "..", "mcp", "server.js");
  const child = spawn(process.execPath, [serverPath], {
    stdio: ["pipe", "pipe", "pipe"],
  });
  const readNext = createMessageReader(child);

  child.stdin.write(
    encodeMessage({
      jsonrpc: "2.0",
      id: 1,
      method: "initialize",
      params: {
        protocolVersion: "2025-03-26",
        capabilities: {},
        clientInfo: {
          name: "test-client",
          version: "0.0.0",
        },
      },
    }),
  );
  await readNext();

  child.stdin.write(
    encodeMessage({
      jsonrpc: "2.0",
      method: "notifications/initialized",
    }),
  );

  child.stdin.write(
    encodeMessage({
      jsonrpc: "2.0",
      id: 2,
      method: "tools/call",
      params: {
        name: "ccf_rank",
        arguments: {
          query: "   ",
        },
      },
    }),
  );

  const errorResponse = await readNext();
  assert.equal(errorResponse.id, 2);
  assert.equal(errorResponse.result.isError, true);
  assert.equal(errorResponse.result.structuredContent.rank, "none");
  assert.match(errorResponse.result.content[0].text, /Lookup failed/);

  child.stdin.end();
});
