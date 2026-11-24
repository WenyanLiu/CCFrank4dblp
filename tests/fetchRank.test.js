/**
 * Lightweight tests for the dblp rank lookup robustness logic.
 * Run with: npm test
 */
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const test = require("node:test");
const assert = require("node:assert");

const root = path.join(__dirname, "..");
const source = [
  "js/ccf.js",
  "js/fetchRank.js",
]
  .map((file) => fs.readFileSync(path.join(root, file), "utf8"))
  .join("\n;\n");

const dataSetup = `
ccf.rankDb = {
  "/conf/ppopp": "/conf/ppopp",
  "/conf/sigmod": "/conf/sigmod/sigmod",
  "/conf/pods": "/conf/pods/pods",
};
ccf.rankUrl = {
  "/conf/ppopp": "A",
  "/conf/sigmod/sigmod": "A",
  "/conf/pods/pods": "B",
};
ccf.rankFullName = {
  "/conf/ppopp": "PPoPP",
  "/conf/sigmod/sigmod": "ACM SIGMOD Conference",
  "/conf/pods/pods": "ACM PODS",
};
ccf.rankAbbrName = {
  "/conf/ppopp": "PPoPP",
  "/conf/sigmod/sigmod": "SIGMOD",
  "/conf/pods/pods": "PODS",
};
ccf.abbrFull = {};
ccf.fullUrl = {};
`;

function setup() {
  const state = { xhrs: [] };

  function makeElement() {
    return {
      classes: new Set(),
      text: "",
      children: [],
      after: null,
      handlers: {},
      removed: false,
    };
  }

  function wrap(element) {
    return {
      __wrapper: true,
      __element: element,
      hasClass(cls) {
        return element.classes.has(cls);
      },
      addClass(cls) {
        element.classes.add(cls);
        return this;
      },
      text(value) {
        if (value === undefined) return element.text;
        element.text = value;
        return this;
      },
      append(child) {
        element.children.push(child.__element || child);
        return this;
      },
      after(child) {
        element.after = child.__element || child;
        if (element.after) element.after.parent = element;
        return this;
      },
      next() {
        return wrap(element.after || makeElement());
      },
      on(event, handler) {
        element.handlers[event] = handler;
        return this;
      },
      remove() {
        element.removed = true;
        if (element.parent && element.parent.after === element) {
          element.parent.after = null;
        }
        return this;
      },
    };
  }

  function $(arg) {
    if (typeof arg === "string") return wrap(makeElement());
    if (arg && arg.__wrapper) return arg;
    return wrap(arg);
  }

  class MockXHR {
    constructor() {
      this.status = 200;
      this.responseText = "";
      state.xhrs.push(this);
    }
    open(method, url) {
      this.url = url;
    }
    send() {}
    respond(status, body) {
      this.status = status;
      this.responseText = body;
      if (this.onload) this.onload();
      else if (this.onreadystatechange) {
        this.readyState = 4;
        this.onreadystatechange();
      }
    }
    networkError() {
      this.onerror();
    }
    triggerTimeout() {
      this.ontimeout();
    }
  }

  const apiCache = {
    store: new Map(),
    getItem(key) {
      return this.store.get(key) || null;
    },
    setItem(key, value) {
      this.store.set(key, value);
    },
  };

  const chrome = {
    runtime: { getManifest: () => ({ version: "test" }) },
  };

  const context = vm.createContext({
    $,
    XMLHttpRequest: MockXHR,
    apiCache,
    chrome,
    console: { debug() {}, log() {} },
    setTimeout,
    clearTimeout,
  });

  vm.runInContext(source + dataSetup, context);

  const getRankSpan = vm.runInContext("ccf.getRankSpan", context);
  const site = { rankSpanList: [getRankSpan] };
  const fetchRank = vm.runInContext("fetchRank", context);
  const node = makeElement();

  return { state, node, site, fetchRank, apiCache, context };
}

// Drive every mirror to a failure so the visible failure badge appears.
function exhaustMirrors(xhrs, status, body) {
  let index = 0;
  while (index < xhrs.length && index < 10) {
    xhrs[index].respond(status === undefined ? 503 : status, body || "");
    index++;
  }
}

const successBody = JSON.stringify({
  result: {
    hits: {
      "@total": 1,
      "@sent": 1,
      hit: [
        {
          info: {
            type: "Conference and Workshop Papers",
            url: "https://dblp.org/rec/conf/ppopp/SomePaper24.html",
            year: 2024,
            number: "PPoPP",
            venue: "PPoPP",
          },
        },
      ],
    },
  },
});

test("HTTP 429 on all mirrors shows a clickable rate-limit badge", () => {
  const { state, node, site, fetchRank } = setup();
  fetchRank(node, "Some Paper", "A Author", "2024", site);
  assert.equal(state.xhrs.length, 1);
  exhaustMirrors(state.xhrs, 429, "");

  assert.equal(state.xhrs.length, 3, "all three dblp hosts should be tried");
  assert.ok(node.after.classes.has("ccf-fail"));
  assert.equal(node.after.text, "请求过多");
  assert.equal(typeof node.after.handlers.click, "function");
});

test("failed query is short-circuited for one minute", () => {
  const { state, node, site, fetchRank } = setup();
  fetchRank(node, "Some Paper", "A Author", "2024", site);
  exhaustMirrors(state.xhrs, 429, "");

  const secondNode = { classes: new Set(), text: "", children: [], after: null, handlers: {} };
  fetchRank(secondNode, "Some Paper", "A Author", "2024", site);
  assert.equal(state.xhrs.length, 3, "no new API requests should be sent");
  assert.equal(secondNode.after.text, "请求过多");
});

test("network error and timeout on all mirrors show readable badges", () => {
  for (const [trigger, label] of [
    ["networkError", "网络异常"],
    ["triggerTimeout", "请求超时"],
  ]) {
    const { state, node, site, fetchRank } = setup();
    fetchRank(node, "Some Paper", "A Author", "2024", site);
    let index = 0;
    while (index < state.xhrs.length && index < 10) {
      state.xhrs[index][trigger]();
      index++;
    }
    assert.equal(node.after.text, label);
  }
});

test("malformed JSON on all mirrors shows a parse-failure badge", () => {
  const { state, node, site, fetchRank } = setup();
  fetchRank(node, "Some Paper", "A Author", "2024", site);
  exhaustMirrors(state.xhrs, 200, "<html>rate limited</html>");
  assert.equal(node.after.text, "解析失败");
});

test("a healthy mirror renders the rank after the main host fails", () => {
  const { state, node, site, fetchRank } = setup();
  fetchRank(node, "Some Paper", "A Author", "2024", site);
  state.xhrs[0].respond(503, "unavailable");
  assert.equal(state.xhrs.length, 2, "should retry on the first mirror");
  assert.ok(state.xhrs[1].url.includes("dblp.uni-trier.de"), "first mirror is uni-trier.de");

  state.xhrs[1].respond(200, successBody);
  assert.ok(node.after.classes.has("ccf-rank"), "rank badge from mirror");
  assert.equal(node.after.text, "CCF A");
});

test("successful response still renders the CCF rank span", () => {
  const { state, node, site, fetchRank } = setup();
  fetchRank(node, "Some Paper", "A Author", "2024", site);
  state.xhrs[0].respond(200, successBody);
  assert.ok(node.after.classes.has("ccf-rank"));
  assert.equal(node.after.text, "CCF A");
});

test("clicking a failure badge retries the lookup", () => {
  const { state, node, site, fetchRank } = setup();
  fetchRank(node, "Some Paper", "A Author", "2024", site);
  exhaustMirrors(state.xhrs, 429, "");
  const countBeforeRetry = state.xhrs.length;

  node.after.handlers.click({ stopPropagation() {} });
  assert.ok(state.xhrs.length > countBeforeRetry, "retry should issue a new request");
  state.xhrs[state.xhrs.length - 1].respond(200, successBody);
  assert.equal(node.after.text, "CCF A");
});

test("PACMMOD issue 3 resolves to SIGMOD (CCF A)", () => {
  const { state, node, site, fetchRank } = setup();
  const body = JSON.stringify({
    result: {
      hits: {
        "@total": 1,
        "@sent": 1,
        hit: [
          {
            info: {
              type: "Journal Articles",
              url: "https://dblp.org/rec/journals/pacmmod/HeWZLZN25.html",
              venue: "Proc. ACM Manag. Data",
              number: 3,
              year: 2025,
            },
          },
        ],
      },
    },
  });
  fetchRank(node, "Robust Privacy-Preserving Triangle Counting", "Yizhang He", "2025", site);
  state.xhrs[0].respond(200, body);
  assert.equal(node.after.text, "CCF A");
});

test("PACMMOD PODS issues resolve to PODS (CCF B)", () => {
  const { context } = setup();
  const resolveVenueUrl = vm.runInContext("ccf.resolveVenueUrl", context);
  assert.equal(
    resolveVenueUrl("/journals/pacmmod/pacmmod", "2"),
    "/conf/pods/pods",
  );
  assert.equal(
    resolveVenueUrl("/journals/pacmmod/pacmmod", 5),
    "/conf/pods/pods",
  );
  assert.equal(
    resolveVenueUrl("/journals/pacmmod/pacmmod", "3"),
    "/conf/sigmod/sigmod",
  );
  assert.equal(resolveVenueUrl("/conf/ppopp/ppopp", "3"), "/conf/ppopp/ppopp");
});

test("duplicate concurrent queries are deduplicated", async () => {
  const { state, node, site, fetchRank } = setup();
  fetchRank(node, "Some Paper", "A Author", "2024", site);
  const otherNode = { classes: new Set(), text: "", children: [], after: null, handlers: {} };
  fetchRank(otherNode, "Some Paper", "A Author", "2024", site);

  assert.equal(state.xhrs.length, 1, "only one XHR should be sent");
  state.xhrs[0].respond(200, successBody);

  await new Promise((resolve) => setTimeout(resolve, 500));
  assert.equal(otherNode.after.text, "CCF A");
});
