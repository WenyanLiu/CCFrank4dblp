"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");

const { lookupVenue } = require("../mcp/lookup");

test("lookup by normalized full name", () => {
  const result = lookupVenue("  ACM Transactions on Computer Systems ");

  assert.equal(result.matched, true);
  assert.equal(result.rank, "A");
  assert.equal(result.canonicalName, "ACM Transactions on Computer Systems");
  assert.equal(result.venueType, "journal");
  assert.equal(result.matchedBy, "full_name");
});

test("lookup by abbreviation", () => {
  const result = lookupVenue("SIGCOMM");

  assert.equal(result.matched, true);
  assert.equal(result.rank, "A");
  assert.equal(result.venueType, "conference");
  assert.equal(result.matchedBy, "abbr");
  assert.equal(
    result.canonicalName,
    "ACM International Conference on Applications, Technologies, Architectures, and Protocols for Computer Communication",
  );
});

test("lookup by dblp venue url", () => {
  const result = lookupVenue("https://dblp.org/db/conf/sc/index.html");

  assert.equal(result.matched, true);
  assert.equal(result.rank, "A");
  assert.equal(result.venueType, "conference");
  assert.equal(result.matchedBy, "url");
  assert.equal(
    result.canonicalName,
    "International Conference for High Performance Computing, Networking, Storage, and Analysis",
  );
});

test("lookup by dblp record url", () => {
  const result = lookupVenue("https://dblp.org/rec/conf/sigcomm/Smith24");

  assert.equal(result.matched, true);
  assert.equal(result.rank, "A");
  assert.equal(result.venueType, "conference");
  assert.equal(result.matchedBy, "url");
});

test("lookup handles punctuation normalization", () => {
  const result = lookupVenue(
    "IEEE Transactions on Very Large Scale Integration VLSI Systems",
  );

  assert.equal(result.matched, true);
  assert.equal(result.rank, "B");
  assert.equal(result.venueType, "journal");
});

test("lookup handles ampersand and plus normalization", () => {
  const date = lookupVenue("Design Automation Test in Europe");
  const codes = lookupVenue("CODES ISSS");

  assert.equal(date.matched, true);
  assert.equal(date.rank, "B");
  assert.equal(codes.matched, true);
  assert.equal(codes.rank, "B");
});

test("lookup returns none for misses", () => {
  const result = lookupVenue("Totally Fake Conference on Fake Systems");

  assert.deepEqual(result, {
    matched: false,
    rank: "none",
    canonicalName: null,
    venueType: "unknown",
    matchedBy: "none",
    normalizedQuery: "TOTALLY FAKE CONFERENCE ON FAKE SYSTEMS",
    sourceKey: null,
  });
});

test("lookup preserves expanded and preprint ranks", () => {
  const expanded = lookupVenue("Cybersecurity");
  const preprint = lookupVenue("ARXIV");

  assert.equal(expanded.rank, "B");
  assert.equal(preprint.rank, "P");
});

test("lookup rejects empty queries", () => {
  assert.throws(() => lookupVenue("   "), /query must not be empty/);
});
