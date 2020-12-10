const ccf = {};

ccf.getRankInfo = function (url) {
  let rankInfo = {};
  rankInfo.ranks = [];
  rankInfo.info = "";
  let rank = ccf.rankUrl[url];
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

ccf.getRankSpan = function (url) {
  let rankInfo = ccf.getRankInfo(url);
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
