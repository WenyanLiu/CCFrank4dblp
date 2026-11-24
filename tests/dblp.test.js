/**
 * Tests for dblp page annotation, especially journal-published proceedings.
 * Run with: npm test
 */
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const test = require("node:test");
const assert = require("node:assert");

const root = path.join(__dirname, "..");
const source = ["js/ccf.js", "js/dblp.js"]
  .map((file) => fs.readFileSync(path.join(root, file), "utf8"))
  .join("\n;\n");

const dataSetup = `
ccf.rankDb = {
  "/journals/tkde": "/journals/tkde/tkde",
  "/conf/sigmod/sigmod": "/conf/sigmod/sigmod",
  "/conf/pods/pods": "/conf/pods/pods"
};
ccf.rankUrl = {
  "/journals/tkde/tkde": "A",
  "/conf/sigmod/sigmod": "A",
  "/conf/pods/pods": "B",
  "/conf/oopsla/oopsla": "A"
};
ccf.rankFullName = {
  "/journals/tkde/tkde": "IEEE TKDE",
  "/conf/sigmod/sigmod": "ACM SIGMOD Conference",
  "/conf/pods/pods": "ACM PODS",
  "/conf/oopsla/oopsla": "ACM OOPSLA"
};
ccf.rankAbbrName = {
  "/journals/tkde/tkde": "TKDE",
  "/conf/sigmod/sigmod": "SIGMOD",
  "/conf/pods/pods": "PODS",
  "/conf/oopsla/oopsla": "OOPSLA"
};
ccf.abbrFull = {
  "OOPSLA": "CONFERENCE ON OBJECT-ORIENTED PROGRAMMING SYSTEMS, LANGUAGES,AND APPLICATIONS",
  "OOPSLA1": "CONFERENCE ON OBJECT-ORIENTED PROGRAMMING SYSTEMS, LANGUAGES,AND APPLICATIONS",
  "OOPSLA2": "CONFERENCE ON OBJECT-ORIENTED PROGRAMMING SYSTEMS, LANGUAGES,AND APPLICATIONS"
};
ccf.fullUrl = {
  "CONFERENCE ON OBJECT-ORIENTED PROGRAMMING SYSTEMS, LANGUAGES,AND APPLICATIONS": "/conf/oopsla/oopsla"
};
`;

function makeAnchor(href, issueName = "") {
  return { href, issueName, after: null };
}

function setup(anchors, pathname = "") {
  function collection(items) {
    return {
      each(callback) {
        items.forEach((item) => callback.call(api(item)));
      },
      next() {
        return collection(items[0] && items[0].after ? [items[0].after] : []);
      },
      hasClass(cls) {
        return Boolean(items[0] && items[0].classes && items[0].classes.has(cls));
      },
      find() {
        return collection([]);
      },
      text() {
        return (items[0] && items[0].text) || "";
      },
    };
  }

  function api(item) {
    return {
      __item: item,
      attr() {
        return item.href;
      },
      find(selector) {
        if (selector && selector.includes("issueNumber") && item.issueName) {
          return collection([{ text: item.issueName }]);
        }
        return collection([]);
      },
      next() {
        return collection(item.after ? [item.after] : []);
      },
      after(child) {
        item.after = child.__element || child;
      },
    };
  }

  function spanWrapper() {
    const el = { classes: new Set(), text: "", children: [], after: null };
    return {
      __element: el,
      addClass(cls) {
        el.classes.add(cls);
        return this;
      },
      text(value) {
        if (value === undefined) return el.text;
        el.text = value;
        return this;
      },
      append(child) {
        el.children.push(child.__element || child);
        return this;
      },
      after(child) {
        el.after = child.__element || child;
        return this;
      },
      on() {
        return this;
      },
    };
  }

  const breadcrumb = spanWrapper();
  function $(arg) {
    if (arg && arg.__item) return api(arg.__item);
    if (arg === "cite > a") return collection(anchors);
    if (typeof arg === "string" && arg.startsWith("#breadcrumbs")) return breadcrumb;
    if (typeof arg === "string") return spanWrapper();
    return collection([]);
  }

  const context = vm.createContext({
    $,
    window: { location: { pathname } },
    console: { debug() {} },
  });
  vm.runInContext(source + dataSetup, context);
  const ccf = vm.runInContext("ccf", context);
  const dblp = vm.runInContext("dblp", context);
  dblp.rankSpanList.push(ccf.getRankSpan);
  dblp.__breadcrumb = breadcrumb;
  return dblp;
}

test("PACMMOD issue 3 on a dblp person page is marked CCF A", () => {
  const anchor = makeAnchor(
    "https://dblp.org/db/journals/pacmmod/pacmmod3.html#HeWZLZN25",
  );
  setup([anchor]).appendRanks();
  assert.ok(anchor.after, "a rank badge should be inserted");
  assert.equal(anchor.after.text, "CCF A");
});

test("PACMMOD PODS issues are marked CCF B", () => {
  for (const issue of [2, 5]) {
    const anchor = makeAnchor(
      `https://dblp.org/db/journals/pacmmod/pacmmod${issue}.html#SomePaper`,
    );
    setup([anchor]).appendRanks();
    assert.equal(anchor.after.text, "CCF B");
  }
});

test("PACMMOD browse page breadcrumb falls back to SIGMOD A", () => {
  const dblp = setup([], "/db/journals/pacmmod/pacmmod3.html");
  dblp.appendRank("#breadcrumbs > ul > li > span:nth-child(3) > a > span");
  assert.ok(dblp.__breadcrumb.__element.after, "a rank badge should be inserted");
  assert.equal(dblp.__breadcrumb.__element.after.text, "CCF A");
});

test("ordinary dblp journal URLs keep their rank", () => {
  const anchor = makeAnchor("https://dblp.org/db/journals/tkde/tkde37.html");
  setup([anchor]).appendRanks();
  assert.equal(anchor.after.text, "CCF A");
});

test("PACM PL OOPSLA1/OOPSLA2 issues on a dblp person page are CCF A", () => {
  for (const issue of ["OOPSLA1", "OOPSLA2"]) {
    const anchor = makeAnchor(
      "https://dblp.org/db/journals/pacmpl/pacmpl9.html#Paper",
      issue,
    );
    setup([anchor]).appendRanks();
    assert.ok(anchor.after, `a rank badge should be inserted for ${issue}`);
    assert.equal(anchor.after.text, "CCF A");
  }
});

test("generated abbreviation data includes dblp PACM PL OOPSLA issue aliases", () => {
  const context = vm.createContext({ ccf: {} });
  vm.runInContext(
    fs.readFileSync(path.join(root, "data", "ccfAbbrFull.js"), "utf8"),
    context,
  );
  const abbrFull = vm.runInContext("ccf.abbrFull", context);
  assert.equal(abbrFull.OOPSLA1, abbrFull.OOPSLA);
  assert.equal(abbrFull.OOPSLA2, abbrFull.OOPSLA);
});
