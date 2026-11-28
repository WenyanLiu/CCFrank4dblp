"use strict";

const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const DATA_FILES = [
  "js/ccf.js",
  "data/ccfRankUrl.js",
  "data/ccfRankFull.js",
  "data/ccfRankAbbr.js",
  "data/ccfRankDb.js",
  "data/ccfFullUrl.js",
  "data/ccfAbbrFull.js",
];

let cachedData = null;

function loadCcfData() {
  if (cachedData) {
    return cachedData;
  }

  const context = vm.createContext({});

  for (const relativePath of DATA_FILES) {
    const absolutePath = path.resolve(__dirname, "..", relativePath);
    const source = fs.readFileSync(absolutePath, "utf8");
    vm.runInContext(source, context, { filename: absolutePath });
  }

  cachedData = vm.runInContext("ccf", context);

  return cachedData;
}

module.exports = {
  loadCcfData,
};
