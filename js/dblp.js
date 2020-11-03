const dblp = {};

dblp.rankSpanList = [];

dblp.start = function () {
  let url = window.location.href;
  if (url.includes("/pid/")) {
    dblp.appendRanks();
  } else if (url.includes("/db/conf/") || url.includes("/db/journals/")) {
    if (url.includes("/index.html")) {
      dblp.appendRank("h1");
    } else {
      dblp.appendRank("#breadcrumbs > ul > li > span:nth-child(3) > a > span");
    }
  } else {
    setInterval(function () {
      let message = $("#completesearch-publs > div > p.waiting");
      if (message.css("display") == "none") {
        $(window).bind("popstate", function () {
          dblp.appendRanks();
        });
        dblp.appendRanks();
      }
    }, 700);
  }
};

dblp.appendRanks = function () {
  let elements = $("cite > a > span:nth-child(1) > span:nth-child(1)");
  dblp.elementsCount = elements.length;
  elements.each(function () {
    let element = $(this);
    let source = element.text().trim();
    if (source.length != 0 && !element.next().hasClass("ccf-rank")) {
      for (let getRankSpan of dblp.rankSpanList) {
        let names = dblp.parseNames(source);
        element.after(getRankSpan(names));
      }
    }
  });
};

dblp.appendRank = function (selector) {
  let element = $(selector);
  let headline = element.text().trim();
  if (headline.length != 0) {
    for (let getRankSpan of dblp.rankSpanList) {
      let names = dblp.parseNames(headline);
      element.after(getRankSpan(names));
    }
  }
};

dblp.parseNames = function (source) {
  let names = [];
  let abbr;
  let full;
  let index = source.lastIndexOf("(");
  if (index != -1) {
    abbr = source.substr(index + 1, source.length - index - 2);
    full = source.substr(0, index).trim();
  } else {
    if (source.length <= 14) {
      abbr = source;
      full = "";
    } else {
      abbr = "";
      full = source;
    }
  }
  full = full.split("/");
  abbr = abbr.split("/");
  for (let i = 0; i < Math.max(abbr.length, full.length); ++i) {
    let name = {};
    name.full = (full[i] || "").trim();
    name.abbr = (abbr[i] || "").trim();
    names.push(name);
  }
  return names;
};
