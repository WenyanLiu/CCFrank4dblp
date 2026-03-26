"use strict";

const { loadCcfData } = require("./load-ccf-data");

let cachedIndexes = null;

function normalizeText(value) {
  return String(value)
    .normalize("NFKC")
    .trim()
    .toUpperCase()
    .replace(/[^0-9A-Z]+/g, " ")
    .replace(/\s+/g, " ");
}

function normalizePath(value) {
  if (!value) {
    return null;
  }

  let pathValue = String(value).trim();
  const queryIndex = pathValue.indexOf("?");
  const hashIndex = pathValue.indexOf("#");
  const cutIndex =
    queryIndex === -1
      ? hashIndex
      : hashIndex === -1
        ? queryIndex
        : Math.min(queryIndex, hashIndex);

  if (cutIndex !== -1) {
    pathValue = pathValue.slice(0, cutIndex);
  }

  if (!pathValue.startsWith("/")) {
    pathValue = `/${pathValue}`;
  }

  pathValue = decodeURIComponent(pathValue);
  pathValue = pathValue.replace(/\/+$/g, "");

  return pathValue || "/";
}

function inferVenueType(sourceKey) {
  if (!sourceKey) {
    return "unknown";
  }

  if (sourceKey.startsWith("/conf/")) {
    return "conference";
  }

  if (sourceKey.startsWith("/journals/")) {
    return "journal";
  }

  return "unknown";
}

function createIndexes() {
  if (cachedIndexes) {
    return cachedIndexes;
  }

  const ccf = loadCcfData();
  const fullNameIndex = new Map();
  const abbrIndex = new Map();

  for (const fullName of Object.keys(ccf.fullUrl)) {
    const normalized = normalizeText(fullName);
    if (!fullNameIndex.has(normalized)) {
      fullNameIndex.set(normalized, fullName);
    }
  }

  for (const abbr of Object.keys(ccf.abbrFull)) {
    if (!abbr) {
      continue;
    }

    const normalized = normalizeText(abbr);
    if (!abbrIndex.has(normalized)) {
      abbrIndex.set(normalized, abbr);
    }
  }

  for (const abbr of Object.values(ccf.rankAbbrName)) {
    if (!abbr) {
      continue;
    }

    const normalized = normalizeText(abbr);
    if (!abbrIndex.has(normalized)) {
      abbrIndex.set(normalized, abbr);
    }
  }

  cachedIndexes = {
    ccf,
    fullNameIndex,
    abbrIndex,
  };

  return cachedIndexes;
}

function resolveCanonicalSourceKey(candidate, ccf) {
  if (!candidate) {
    return null;
  }

  if (Object.hasOwn(ccf.rankUrl, candidate)) {
    return candidate;
  }

  if (Object.hasOwn(ccf.rankDb, candidate)) {
    return ccf.rankDb[candidate];
  }

  return null;
}

function expandPathCandidates(pathValue) {
  const candidates = new Set();

  function addCandidate(value) {
    const normalized = normalizePath(value);
    if (normalized) {
      candidates.add(normalized);
    }
  }

  const basePath = normalizePath(pathValue);
  if (!basePath) {
    return [];
  }

  addCandidate(basePath);
  addCandidate(basePath.replace(/\/index\.html$/i, ""));
  addCandidate(basePath.replace(/\.html$/i, ""));
  addCandidate(basePath.replace(/([0-9]{1,4}(?:-[0-9]{1,4})?)$/i, ""));

  if (basePath.includes("/db/")) {
    const dbPath = basePath.slice(basePath.indexOf("/db/") + 3);
    addCandidate(dbPath);
    addCandidate(dbPath.replace(/\/index\.html$/i, ""));

    const dbNoHtml = dbPath.replace(/\.html$/i, "");
    addCandidate(dbNoHtml);
    addCandidate(dbNoHtml.replace(/([0-9]{1,4}(?:-[0-9]{1,4})?)$/i, ""));
  }

  if (basePath.includes("/rec/")) {
    const recStart = basePath.indexOf("/rec/") + 4;
    const lastSlash = basePath.lastIndexOf("/");
    if (lastSlash > recStart) {
      addCandidate(basePath.slice(recStart, lastSlash));
    }
  }

  return Array.from(candidates);
}

function looksLikeUrlOrPath(input) {
  return (
    /^https?:\/\//i.test(input) ||
    /^dblp\.org\//i.test(input) ||
    /^www\.dblp\.org\//i.test(input) ||
    input.startsWith("/")
  );
}

function tryLookupByUrl(input, ccf) {
  let pathname = null;

  if (/^https?:\/\//i.test(input)) {
    pathname = new URL(input).pathname;
  } else if (/^(dblp\.org|www\.dblp\.org)\//i.test(input)) {
    pathname = new URL(`https://${input}`).pathname;
  } else if (input.startsWith("/")) {
    pathname = input;
  }

  if (!pathname) {
    return null;
  }

  for (const candidate of expandPathCandidates(pathname)) {
    const sourceKey = resolveCanonicalSourceKey(candidate, ccf);
    if (sourceKey) {
      return {
        rankInfo: ccf.getRankInfo(sourceKey, "url"),
        normalizedQuery: candidate,
      };
    }
  }

  return null;
}

function buildResult({
  rankInfo = null,
  matchedBy = "none",
  normalizedQuery,
  matched = false,
}) {
  const sourceKey = rankInfo ? rankInfo.sourceKey : null;

  return {
    matched,
    rank: rankInfo ? rankInfo.ranks[0] || "none" : "none",
    canonicalName: rankInfo ? rankInfo.canonicalName : null,
    venueType: inferVenueType(sourceKey),
    matchedBy,
    normalizedQuery,
    sourceKey,
  };
}

function lookupVenue(query) {
  if (typeof query !== "string") {
    throw new TypeError("query must be a string");
  }

  const trimmed = query.trim();
  if (!trimmed) {
    throw new Error("query must not be empty");
  }

  const { ccf, fullNameIndex, abbrIndex } = createIndexes();

  if (looksLikeUrlOrPath(trimmed)) {
    const urlMatch = tryLookupByUrl(trimmed, ccf);
    if (urlMatch) {
      return buildResult({
        rankInfo: urlMatch.rankInfo,
        matchedBy: "url",
        normalizedQuery: urlMatch.normalizedQuery,
        matched: true,
      });
    }
  }

  const normalizedQuery = normalizeText(trimmed);
  const fullName = fullNameIndex.get(normalizedQuery);
  if (fullName) {
    return buildResult({
      rankInfo: ccf.getRankInfo(fullName),
      matchedBy: "full_name",
      normalizedQuery,
      matched: true,
    });
  }

  const abbr = abbrIndex.get(normalizedQuery);
  if (abbr) {
    return buildResult({
      rankInfo: ccf.getRankInfo(abbr, "abbr"),
      matchedBy: "abbr",
      normalizedQuery,
      matched: true,
    });
  }

  return buildResult({
    normalizedQuery: looksLikeUrlOrPath(trimmed) ? trimmed : normalizedQuery,
  });
}

module.exports = {
  lookupVenue,
  normalizeText,
};
