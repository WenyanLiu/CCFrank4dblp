const dblp = {};

dblp.rankSpanList = [];

dblp.run = function () {
  let url = window.location.pathname;
  if (url.includes("/pid/")) {
    dblp.appendRanks();
  } else if (url.includes("/db/")) {
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
  let elements = $("cite > a");
  elements.each(function () {
    let element = $(this);
    let source = element.attr("href");
    if (source.length != 0 && !element.next().hasClass("ccf-rank")) {
      for (let getRankSpan of dblp.rankSpanList) {
        let urls = source.substring(
          source.indexOf("/db/") + 3,
          source.lastIndexOf("/")
        );
        element.after(getRankSpan(urls));
      }
    }
  });
};

dblp.appendRank = function (selector) {
  let element = $(selector);
  let headline = window.location.pathname;
  if (headline.length != 0) {
    for (let getRankSpan of dblp.rankSpanList) {
      let urls = headline.substring(
        headline.indexOf("/db/") + 3,
        headline.lastIndexOf("/")
      );
      element.after(getRankSpan(urls));
    }
  }
};
