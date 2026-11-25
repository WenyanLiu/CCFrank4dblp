/**
 * MIT License
 *
 * Copyright (c) 2019-2023 WenyanLiu (https://github.com/WenyanLiu/CCFrank4dblp), Kai Chen (https://github.com/FunClip), dozed (https://github.com/dozed)
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
  } else if (type == "abbr") {
    if (refine === undefined) {
      rank = "none";
      rankInfo.info += "Not Found\n";
    } else {
      let full = ccf.abbrFull[refine];
      url = ccf.fullUrl[full];
      if (full === undefined) {
        refine = refine.substring(0, refine.length - 1);
        let res = Object.keys(ccf.fullUrl).filter(function (k) {
          return k.indexOf(refine.toUpperCase()) == 0;
        });
        // res is an array of matching full names; use the first match.
        url = res.length ? ccf.fullUrl[res[0]] : false;
      }
      rank = ccf.rankUrl[url];
    }
  } else if (type == "meeting") {
    let full = ccf.abbrFull[refine];
    url = ccf.fullUrl[full];
    rank = ccf.rankUrl[url];
  } else {
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
    if (rank == "E") {
      rankInfo.info += ": Expanded\n";
    } else if (rank == "P") {
      rankInfo.info += ": Preprint\n";
    } else {
      rankInfo.info += ": CCF " + rank + "\n";
    }
  }
  rankInfo.ranks.push(rank);
  return rankInfo;
};

ccf.getRankClass = function (ranks) {
  for (let rank of "ABCEP") {
    for (let r of ranks) {
      if (r[0] == rank) {
        return "ccf-" + rank.toLowerCase();
      }
    }
  }
  return "ccf-none";
};

/**
 * Some conference proceedings are published as journal volumes in dblp, and a
 * single dblp journal URL covers several CCF-ranked conferences. PACMMOD
 * publishes both SIGMOD (A) and PODS (B) tracks; issues 2 and 5 are PODS.
 */
ccf.proceedingsJournalRules = {
  "/journals/pacmmod/pacmmod": {
    podsIssues: [2, 5],
    podsUrl: "/conf/pods/pods",
    defaultUrl: "/conf/sigmod/sigmod",
  },
};

ccf.resolveVenueUrl = function (url, issue) {
  if (!url) return url;
  // rankDb has no entry for PACMMOD; browse pages can still hand us the
  // journal-level dblp key, so normalize it before applying the rules.
  if (url === "/journals/pacmmod") url = "/journals/pacmmod/pacmmod";
  let rule = ccf.proceedingsJournalRules[url];
  if (!rule) return url;
  let issueNumber = Number(String(issue || "").trim());
  return rule.podsIssues.includes(issueNumber) ? rule.podsUrl : rule.defaultUrl;
};

/**
 * Human-readable texts for rank lookup failures.
 * Shown as a clickable badge so users can tell a lookup failure apart from
 * a venue that genuinely has no CCF rank.
 */
ccf.failInfo = {
  "rate-limit": {
    label: "请求过多",
    detail: "HTTP 429: dblp API 请求过于频繁，请稍后重试。",
  },
  network: {
    label: "网络异常",
    detail: "无法连接 dblp API，请检查网络后重试。",
  },
  timeout: {
    label: "请求超时",
    detail: "dblp API 请求超时，请稍后重试。",
  },
  server: {
    label: "服务异常",
    detail: "dblp API 返回了错误状态码，请稍后重试。",
  },
  parse: {
    label: "解析失败",
    detail: "dblp API 返回的数据无法解析，请稍后重试。",
  },
  busy: {
    label: "请求过多",
    detail: "同一条目的查询正在进行中，请稍后刷新页面。",
  },
  "no-results": {
    label: "暂未收录",
    detail: "dblp 暂未返回该论文的出版信息（可能是收录延迟），点击标记可重试。",
  },
  unknown: {
    label: "查询失败",
    detail: "查询排名时发生未知错误，请稍后重试。",
  },
};

ccf.getFailSpan = function (kind, status) {
  let info = ccf.failInfo[kind] || ccf.failInfo.unknown;
  let detail = info.detail;
  if (kind === "server" && status) {
    detail = "dblp API 返回 HTTP " + status + "，请稍后重试。";
  }
  return $("<span>")
    .addClass("ccf-rank")
    .addClass("ccf-fail")
    .text(info.label)
    .addClass("ccf-tooltip")
    .append($("<pre>").addClass("ccf-tooltiptext").text(detail));
};

ccf.getRankSpan = function (refine, type) {
  let rankInfo = ccf.getRankInfo(refine, type);
  let span = $("<span>")
    .addClass("ccf-rank")
    .addClass(ccf.getRankClass(rankInfo.ranks));
  let firstRank = rankInfo.ranks[0];
  if (firstRank == "E") {
    span.text("Expanded");
  } else if (firstRank == "P") {
    span.text("Preprint");
  } else if (firstRank == "none") {
    span.text("CCF None");
  } else {
    span.text("CCF " + rankInfo.ranks.join("/"));
  }
  if (rankInfo.info.length != 0) {
    span
      .addClass("ccf-tooltip")
      .append($("<pre>").addClass("ccf-tooltiptext").text(rankInfo.info));
  }
  return span;
};
