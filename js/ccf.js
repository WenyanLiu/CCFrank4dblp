const ccf = {};

ccf.getRankInfo = function (names) {
  let rankInfo = {};
  rankInfo.ranks = [];
  rankInfo.info = "";
  for (let name of names) {
    if (isNaN(name.abbr) && name.abbr != "") {
      dblpFullName = ccf.rankDblpName[name.abbr];
    } else if (isNaN(name.full) && name.full != "") {
      dblpFullName = ccf.rankDblpName[name.full];
    }
    if (dblpFullName != undefined) {
      name.full = dblpFullName;
    }
    let rank = ccf.rankFullName[name.full];
    if (rank == undefined) {
      let poss = ccf.rankAbbrName[name.abbr];
      if (poss == undefined) {
        rank = "none";
        rankInfo.info += name.full + " (" + name.abbr + "): Not Found\n";
      } else {
        for (let fullname in poss) {
          rankInfo.info +=
            fullname + " (" + name.abbr + "): CCF " + poss[fullname] + "\n";
          rank = poss[fullname] + "?";
        }
      }
    } else {
      rankInfo.info += name.full + " (" + name.abbr + "): CCF " + rank + "\n";
    }
    rankInfo.ranks.push(rank);
  }
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

ccf.getRankSpan = function (names) {
  let rankInfo = ccf.getRankInfo(names);
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
