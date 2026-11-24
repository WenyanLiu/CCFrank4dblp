/**
 * Real-browser end-to-end check via Chrome DevTools Protocol.
 *
 * Launches a temporary Chrome with this directory loaded as an unpacked
 * extension, visits real dblp pages, and asserts on the CCF labels that the
 * content script actually rendered. No DOM/API mocks are involved.
 *
 * Browser cases come from tests/regression-cases.json so the regression
 * corpus grows with every fixed bug.
 *
 * Usage:
 *   npm run test:cdp
 *   CDP_URL=https://dblp.org/... npm run test:cdp   (run one custom page)
 *   CDP_CORPUS=/path/to/cases.json npm run test:cdp (use an alternate corpus)
 *   CHROME_PATH=/path/to/chrome npm run test:cdp    (override Chrome binary)
 *
 * Headful mode is the default: this Chrome build crashes its renderer on
 * dblp's anti-bot challenge page in --headless=new. Set CDP_HEADLESS=1 to try
 * headless anyway (useful for other sites).
 */
const { spawn } = require("node:child_process");
const fs = require("node:fs");
const net = require("node:net");
const os = require("node:os");
const path = require("node:path");

const EXTENSION_DIR = path.resolve(__dirname, "..");
const RESULTS_FILE = path.join(__dirname, "cdp-results.json");
const CORPUS_FILE =
  process.env.CDP_CORPUS || path.join(__dirname, "regression-cases.json");
const CHROME_PATH =
  process.env.CHROME_PATH ||
  [
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
    "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
    path.join(
      os.homedir(),
      "AppData/Local/Google/Chrome/Application/chrome.exe",
    ),
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/usr/bin/google-chrome",
  ].find((p) => fs.existsSync(p));
const HEADLESS = process.env.CDP_HEADLESS === "1";
const WAIT_PAGE_MS = Number(process.env.CDP_WAIT_PAGE_MS || 90000);

function loadTargets() {
  if (process.env.CDP_URL) {
    return [
      {
        caseId: "manual",
        name: "custom URL",
        url: process.env.CDP_URL,
        checks: [],
      },
    ];
  }
  const corpus = JSON.parse(fs.readFileSync(CORPUS_FILE, "utf8"));
  const targets = [];
  for (const testCase of corpus.cases || []) {
    for (const browserCase of testCase.browserCases || []) {
      targets.push({ ...browserCase, caseId: testCase.id });
    }
  }
  if (targets.length === 0) {
    throw new Error(`No browserCases found in ${CORPUS_FILE}`);
  }
  return targets;
}

const TARGETS = loadTargets();

const PAGE_PROBE = `(() => ({
  title: document.title,
  url: location.href,
  ready: document.readyState,
  challenge: /making sure you'?re not a bot/i.test(document.title),
  injected: !!document.querySelector(".ccf-filter"),
  linkCount: document.querySelectorAll("cite > a").length,
  rankCount: document.querySelectorAll(".ccf-rank").length,
  bodySnippet: document.body
    ? document.body.innerText.replace(/\\s+/g, " ").slice(0, 350)
    : "",
  resultText: (document.querySelector("#completesearch-publs")?.innerText || "")
    .replace(/\\s+/g, " ")
    .slice(0, 600)
}))()`;

const RANK_PROBE = `[...document.querySelectorAll(".ccf-rank")].slice(0, 200).map((n) => {
  const prev = n.previousElementSibling;
  const link =
    prev && prev.tagName === "A"
      ? prev
      : n.parentElement?.querySelector("cite > a");
  return {
    text: (n.textContent || "").trim().replace(/\\s+/g, " "),
    cls: n.className,
    title: (link?.textContent || "").trim().replace(/\\s+/g, " ").slice(0, 100),
    href: link?.getAttribute("href") || "",
  };
})`;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getFreePort() {
  return new Promise((resolve, reject) => {
    const server = net.createServer();
    server.once("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const { port } = server.address();
      server.close(() => resolve(port));
    });
  });
}

async function waitForEndpoint(port) {
  const deadline = Date.now() + 20000;
  while (Date.now() < deadline) {
    try {
      const res = await fetch(`http://127.0.0.1:${port}/json/version`);
      if (res.ok) return await res.json();
    } catch {
      // Chrome is still starting.
    }
    await sleep(200);
  }
  throw new Error("Chrome DevTools endpoint did not become ready");
}

async function connect(wsUrl) {
  const ws = new WebSocket(wsUrl);
  await new Promise((resolve, reject) => {
    ws.onopen = resolve;
    ws.onerror = reject;
  });
  let nextId = 1;
  const pending = new Map();
  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.id && pending.has(msg.id)) {
      const { resolve, reject } = pending.get(msg.id);
      pending.delete(msg.id);
      if (msg.error) reject(new Error(JSON.stringify(msg.error)));
      else resolve(msg.result);
    }
  };
  return {
    send(method, params = {}, sessionId) {
      const id = nextId++;
      return new Promise((resolve, reject) => {
        pending.set(id, { resolve, reject });
        ws.send(
          JSON.stringify({
            id,
            method,
            params,
            ...(sessionId ? { sessionId } : {}),
          }),
        );
      });
    },
    close: () => ws.close(),
  };
}

async function evaluate(cdp, sessionId, expression) {
  const result = await cdp.send(
    "Runtime.evaluate",
    { expression, returnByValue: true, awaitPromise: true },
    sessionId,
  );
  if (result.exceptionDetails) {
    throw new Error(
      `Runtime.evaluate failed: ${JSON.stringify(result.exceptionDetails)}`,
    );
  }
  return result.result.value;
}

function assertChecks(target, state, labels) {
  const failures = [];
  if (state.challenge) {
    failures.push("anti-bot challenge was not solved");
    return failures;
  }
  if (!state.injected) failures.push("content script was not injected");

  for (const check of target.checks || []) {
    if (check.anyLabel) {
      if (labels.length === 0) {
        failures.push("no CCF label rendered");
      } else if (check.text && !labels[0].text.includes(check.text)) {
        failures.push(`label was "${labels[0].text}", expected to include ${check.text}`);
      }
      continue;
    }
    const hit = labels.find((l) => l.href.includes(check.key));
    if (!hit) {
      failures.push(`no CCF label next to record ${check.key}`);
    } else if (!hit.cls.includes(`ccf-${check.rank.toLowerCase()}`)) {
      failures.push(
        `record ${check.key} was labeled "${hit.text}" (${hit.cls}), expected CCF ${check.rank}`,
      );
    }
  }
  return failures;
}

async function run() {
  if (!CHROME_PATH) throw new Error("Chrome executable not found");
  const port = await getFreePort();
  const profileDir = fs.mkdtempSync(path.join(os.tmpdir(), "ccfrank-cdp-"));
  const args = [
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${profileDir}`,
    `--load-extension=${EXTENSION_DIR}`,
    "--no-first-run",
    "--no-default-browser-check",
    "--disable-popup-blocking",
    "--no-sandbox",
    "--disable-dev-shm-usage",
    "--disable-gpu",
  ];
  args.push(HEADLESS ? "--headless=new" : "about:blank");
  if (HEADLESS) args.push("about:blank");

  console.log(`Chrome: ${CHROME_PATH}`);
  console.log(`Extension: ${EXTENSION_DIR}`);
  console.log(`Mode: ${HEADLESS ? "headless=new" : "headful"}, port ${port}`);
  console.log(`Loaded ${TARGETS.length} browser case(s) from ${path.basename(CORPUS_FILE)}`);

  const chrome = spawn(CHROME_PATH, args, {
    stdio: ["ignore", "ignore", "pipe"],
    windowsHide: true,
  });
  let cdp;
  const report = [];
  const allFailures = [];
  try {
    const version = await waitForEndpoint(port);
    console.log(`Browser: ${version.Browser}`);
    cdp = await connect(version.webSocketDebuggerUrl);

    // Chrome 133+ can load an unpacked extension through CDP directly.
    // The --load-extension flag is kept as a fallback for older browsers.
    try {
      const loaded = await cdp.send("Extensions.loadUnpacked", {
        path: EXTENSION_DIR.replace(/\\/g, "/"),
      });
      console.log(`Extension loaded: ${loaded.id}`);
    } catch {
      // Older Chrome: --load-extension already did the job.
    }
    await sleep(1500);

    const { targetId } = await cdp.send("Target.createTarget", {
      url: "about:blank",
    });
    const { sessionId } = await cdp.send("Target.attachToTarget", {
      targetId,
      flatten: true,
    });
    await cdp.send("Page.enable", {}, sessionId);
    await cdp.send("Runtime.enable", {}, sessionId);

    for (const target of TARGETS) {
      console.log(`\n=== [${target.caseId}] ${target.name} ===`);
      console.log(target.url);
      await cdp.send("Page.navigate", { url: target.url }, sessionId);

      const deadline = Date.now() + WAIT_PAGE_MS;
      let state;
      let labels = [];
      while (Date.now() < deadline) {
        await sleep(1000);
        state = await evaluate(cdp, sessionId, PAGE_PROBE);
        if (state.challenge) continue; // Anubis proof-of-work page.
        if (/service temporarily not available/i.test(state.resultText)) break;
        labels = await evaluate(cdp, sessionId, RANK_PROBE);
        if (state.injected && labels.length > 0) break;
        if (state.ready === "complete" && !state.injected) break;
      }
      if (!state) throw new Error("No page state collected");

      const serviceUnavailable = /service temporarily not available/i.test(
        state.resultText,
      );
      const failures = serviceUnavailable
        ? []
        : assertChecks(target, state, labels);
      console.log(
        `title=${state.title} links=${state.linkCount} labels=${state.rankCount} injected=${state.injected}`,
      );
      for (const label of labels.slice(0, 8)) {
        console.log(`  - ${label.text}  <- ${label.href || "(breadcrumb)"}`);
      }
      if (serviceUnavailable) {
        console.log("  SKIP: dblp search backend is rate-limiting this run");
      } else if (failures.length) {
        console.log(`  FAIL: ${failures.join("; ")}`);
        allFailures.push(`[${target.caseId}] ${target.name}: ${failures.join("; ")}`);
      } else {
        console.log("  PASS");
      }
      report.push({
        caseId: target.caseId,
        target: target.name,
        ...state,
        labels,
        failures,
        skipped: serviceUnavailable,
      });
    }

    fs.writeFileSync(RESULTS_FILE, JSON.stringify(report, null, 2));
    console.log(`\nResults written to ${RESULTS_FILE}`);
    if (allFailures.length) {
      throw new Error(`${allFailures.length} check(s) failed:\n${allFailures.join("\n")}`);
    }
    console.log("All CDP checks passed.");
  } finally {
    if (cdp) cdp.close();
    chrome.kill("SIGKILL");
    await sleep(300);
    try {
      fs.rmSync(profileDir, { recursive: true, force: true });
    } catch {
      // Best effort cleanup.
    }
  }
}

run().catch((err) => {
  console.error("CDP E2E failed:", err.message);
  process.exitCode = 1;
});
