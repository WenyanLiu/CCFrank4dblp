acm.rankingSpanProvider.push(ccf.getRankingSpan);
ieee.rankingSpanProvider.push(ccf.getRankingSpan);
dblp.rankingSpanProvider.push(ccf.getRankingSpan);

if (location.href.startsWith("https://ieeexplore.ieee.org/search/searchresult.jsp?")) {
    ieee.start();
} else if (location.href.startsWith("https://dl.acm.org/results.cfm?")) {
    acm.start();
} else if (location.href.startsWith("https://dblp.uni-trier.de")) {
    dblp.start();
} 
