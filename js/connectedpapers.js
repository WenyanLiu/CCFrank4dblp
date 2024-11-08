/**
 * MIT License
 *
 * Copyright (c) 2019-2023 WenyanLiu (https://github.com/WenyanLiu/CCFrank4dblp), purplewall1206 (https://github.com/purplewall1206), mra42 (https://github.com/mra42)
 */

const connectedpapers = {};

connectedpapers.rankSpanList = [];

connectedpapers.run = function () {
  let url = window.location.pathname;
  window.onload = function () {
    setTimeout(function () {
      if (url.indexOf("/main") != -1) {
        connectedpapers.appendRank();
        connectedpapers.appendRanks();
      }
    }, 3000);
  };
};

connectedpapers.appendRank = function () {
  let element = $(".list-group-item-mod.minilist-main-paper.main");
  let nodes = element.find(".horizontal-flexbox");
  let titlenode = nodes[1];
  let datanode = $(nodes[2]).find("div");

  let title = titlenode.innerText;
  let author = datanode[0].innerText.split(/[\s.,]+/)[1];
  let year = datanode[1].innerText;
  fetchRank($(titlenode).find("h5"), title, author, year, connectedpapers);
};

connectedpapers.appendRanks = function () {
  let elements = $(".list-group-item-mod.minilist-list-entry");
  elements.each(function (index) {
    let nodes = $(this).find(".horizontal-flexbox");
    let titlenode = nodes[0];
    let datanode = $(nodes[1]).find("div");

    let title = titlenode.innerText;
    let author = datanode[0].innerText.split(/[\s.,]+/)[1];
    let year = datanode[1].innerText;
    setTimeout(function () {
      fetchRank($(titlenode).find("h5"), title, author, year, connectedpapers);
    }, 100 * index);
  });
};
