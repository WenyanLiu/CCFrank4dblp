/**
 * MIT License
 *
 * Copyright (c) 2019-2023 WenyanLiu (https://github.com/WenyanLiu/CCFrank4dblp)
 */

const semanticscholar = {};

semanticscholar.rankSpanList = [];

semanticscholar.run = function () {
  $(window).bind("popstate", function () {
    semanticscholar.appendRanks();
  });
  setInterval(function () {
    semanticscholar.appendRanks();
  }, 700);
};

semanticscholar.appendRanks = function () {
  let elements = $(".cl-paper-venue");
  elements.each(function () {
    let element = $(this);
    let source = element[0].innerText;
    if (source.length != 0 && !element.next().hasClass("ccf-rank")) {
      for (let getRankSpan of semanticscholar.rankSpanList) {
        if (source.includes("(")) {
          source = source.substring(
            source.indexOf("(") + 1,
            source.indexOf(")"),
          );
        }
        if (source.includes("'")) {
          source = source.substring(0, source.indexOf("'")).trim();
        }
        element.after(getRankSpan(source, "abbr"));
      }
    }
  });
};
