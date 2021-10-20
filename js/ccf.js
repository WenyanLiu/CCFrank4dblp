/**
 * MIT License
 *
 * Copyright (c) 2019-2021 WenyanLiu (https://github.com/WenyanLiu/CCFrank4dblp)
 */

const ccf = {};

ccf.getRankInfo = function (refine, type) {
  let rankInfo = {};
  rankInfo.ranks = [];
  rankInfo.info = "";
  let rank;
  let url;
  if (type == "url") {
    rank = ccf.rankUrl[refine];
    url = refine;
  } else {
    console.log(refine);
    url = ccf.fullUrl[refine];
    rank = ccf.rankUrl[url];
  }
  if (rank == undefined) {
    rank = "none";
    rankInfo.info += "Not Found\n";
  } else {
    rankInfo.info += ccf.rankFullName[url];
    let abbrname = ccf.rankAbbrName[url];
    if (abbrname != "") {
      rankInfo.info += " (" + abbrname + ")";
    }
    rankInfo.info += ": CCF " + rank + "\n";
  }
  rankInfo.ranks.push(rank);
  return rankInfo;
};

ccf.getRankClass = function (ranks) {
  for (let rank of "ABC") {
    for (let r of ranks) {
      if (r[0] == rank) {
        return "ccf-" + rank.toLowerCase();
      }
    }
  }
  return "ccf-none";
};

ccf.getRankSpan = function (refine, type) {
  let rankInfo = ccf.getRankInfo(refine, type);
  let span = $("<span>")
    .addClass("ccf-rank")
    .addClass(ccf.getRankClass(rankInfo.ranks))
    .text("CCF " + rankInfo.ranks.join("/"));
  if (rankInfo.info.length != 0) {
    span
      .addClass("ccf-tooltip")
      .append($("<pre>").addClass("ccf-tooltiptext").text(rankInfo.info));
  }
  return span;
};
