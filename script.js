dblp.rankSpanList.push(ccf.getRankSpan);
scholar.rankSpanList.push(ccf.getRankSpan)

if (window.location.hostname.startsWith("dblp")) {
    dblp.run();
} else if (window.location.hostname.startsWith("scholar.google")) {
    scholar.run();
}
