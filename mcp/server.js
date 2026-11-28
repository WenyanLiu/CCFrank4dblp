#!/usr/bin/env node
"use strict";

const { McpServer } = require("@modelcontextprotocol/sdk/server/mcp.js");
const {
  StdioServerTransport,
} = require("@modelcontextprotocol/sdk/server/stdio.js");
const z = require("zod/v4");
const { version } = require("../manifest.json");

const { lookupVenue } = require("./lookup");

const server = new McpServer({
  name: "ccfrank-mcp",
  version,
});

server.registerTool(
  "ccf_rank",
  {
    title: "Lookup CCF Rank",
    description:
      "Look up the CCF rank for a conference or journal by exact/normalized name, abbreviation, or DBLP-style URL/path.",
    inputSchema: {
      query: z
        .string()
        .min(1)
        .describe(
          "Conference or journal name, abbreviation, or DBLP-style URL/path.",
        ),
    },
    outputSchema: {
      matched: z.boolean(),
      rank: z.enum(["A", "B", "C", "E", "P", "none"]),
      canonicalName: z.string().nullable(),
      venueType: z.enum(["conference", "journal", "unknown"]),
      matchedBy: z.enum(["full_name", "abbr", "url", "none"]),
      normalizedQuery: z.string(),
      sourceKey: z.string().nullable(),
    },
    annotations: {
      title: "Lookup CCF Rank",
      readOnlyHint: true,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: false,
    },
  },
  async ({ query }) => {
    try {
      const result = lookupVenue(query);

      return {
        content: [
          {
            type: "text",
            text: formatLookupText(query, result),
          },
        ],
        structuredContent: result,
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Lookup failed: ${error.message}`,
          },
        ],
        structuredContent: {
          matched: false,
          rank: "none",
          canonicalName: null,
          venueType: "unknown",
          matchedBy: "none",
          normalizedQuery: typeof query === "string" ? query.trim() : "",
          sourceKey: null,
        },
        isError: true,
      };
    }
  },
);

function formatLookupText(query, result) {
  if (!result.matched) {
    return `No CCF rank found for "${query}".`;
  }

  return [
    `CCF ${result.rank}`,
    `Name: ${result.canonicalName}`,
    `Type: ${result.venueType}`,
    `Matched by: ${result.matchedBy}`,
    `Source key: ${result.sourceKey}`,
  ].join("\n");
}

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((error) => {
  console.error("CCFrank MCP server failed:", error);
  process.exit(1);
});
