/**
 * MIT License
 *
 * Copyright (c) 2019-2023 WenyanLiu (https://github.com/WenyanLiu/CCFrank4dblp), Kai Chen (https://github.com/FunClip)
 */

const wos = {};

wos.rankSpanList = [];

wos.run = function () {
  $(window).bind("popstate", function () {
    wos.appendRanks();
  });
  setInterval(function () {
    wos.appendRanks();
  }, 700);
};

wos.appendRanks = function () {
  $(".summary-source-title-link[lang='en']").each(function () {
    let node = $(this);
    if (!node.next().hasClass("ccf-rank")) {
      for (let getRankSpan of wos.rankSpanList) {
        let publication = node.text();
        node.after(getRankSpan(publication, "publication"));
      }
    }
  });
  $(".summary-source-title[lang='en']").each(function () {
    let node = $(this);
    if (!node.next().hasClass("ccf-rank")) {
      for (let getRankSpan of wos.rankSpanList) {
        let publication = node.text();
        node.after(getRankSpan(publication, "publication"));
      }
    }
  });
  $("[name='conf_title']").each(function () {
    let node = $(this);
    if (!node.next().hasClass("ccf-rank")) {
      for (let getRankSpan of wos.rankSpanList) {
        let meeting = "";
        let options = node.text().match(/\((.+?)\)/g);
        let items = [];
        if (options) {
          for (let m of options) {
            let short_name = m.substring(1, m.length - 1).split(/\s+/);
            let tmp_name = [];
            for (let name of short_name) {
              if (name.match(/^[0-9]*$/)) {
                continue;
              } else {
                tmp_name.push(name);
              }
            }
            meeting = tmp_name.join(" ");
            items.push(getRankSpan(meeting, "meeting"));
          }
        }

        if (meeting == "") {
          items.push(getRankSpan(meeting, "meeting"));
        }
        node.after(items);
      }
    }
  });
};
