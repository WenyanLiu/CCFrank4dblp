const ccf = {};

ccf.getRankingInfo = function (names) {
    let rankingInfo = {};
    rankingInfo.rankings = [];
    rankingInfo.info = '';
    for (let name of names) {
        let ranking = ccf.rankingFullName[name.full];
        if (ranking == undefined) {
            let possible = ccf.rankingAbbrName[name.abbr];
            if (possible == undefined) {
                ranking = 'none';
                rankingInfo.info += "[" + name.abbr + "] " + name.full + ": not found\n"
            } else {
                rankingInfo.info += name.abbr + ":" + "\n";
                for (let fullname in possible) {
                    rankingInfo.info += fullname + ": CCF " + possible[fullname] + "\n";
                    ranking = possible[fullname] + '?';
                }
            }
        } else {
            rankingInfo.info += name.full + ": CCF " + ranking + "\n"
        }
        rankingInfo.rankings.push(ranking);
    }
    return rankingInfo;
}

ccf.getRankingClass = function (rankings) {
    for (let ranking of 'ABC') {
        for (let result of rankings) {
            if (result[0] == ranking) {
                return 'ccf-' + ranking.toLowerCase();
            }
        }
    }
    return 'ccf-none';
}

ccf.getRankingSpan = function (names) {
    let rankingInfo = ccf.getRankingInfo(names);
    let span = $('<span>').addClass('ccf-ranking').addClass(ccf.getRankingClass(rankingInfo.rankings)).text('CCF ' + rankingInfo.rankings.join('/'));
    if (rankingInfo.info.length != 0) {
        span.addClass('ccf-tooltip').append($('<pre>').addClass('ccf-tooltiptext').text(rankingInfo.info));
    }
    return span;
}