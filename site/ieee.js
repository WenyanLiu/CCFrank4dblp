const ieee = {};

ieee.resultsCount = 0;
ieee.rankingSpanProvider = [];

ieee.start = function () {
    let interval = setInterval(function () {
        let message = $('.List-results-message').text().trim();
        if (message != "Getting results...") {
            clearInterval(interval);
            $(".loadMore-btn").click(ieee.addRankings);
            ieee.addRankings();
        }
    }, 1000);
}

ieee.addRankings = function () {
    let results = $(".description > a");
    if (results.length == ieee.resultsCount) {
        setTimeout(ieee.addRankings, 1000);
        return;
    }
    let from = ieee.resultsCount;
    ieee.resultsCount = results.length;

    results.each(function (index) {
        if (index >= from) {
            let result = $(this);
            let source = result.text().trim();
            if (source.length != 0) {
                let names = ieee.parseNames(source);
                for (let getRankingSpan of ieee.rankingSpanProvider) {
                    result.before(getRankingSpan(names));
                }
            }
        }
    });
}

ieee.parseNames = function (source) {
    let names = [];
    let index = source.lastIndexOf('(');
    let full;
    let abbr;
    if (index != -1) {
        full = source.substring(0, index);
        abbr = source.substring(index + 1, source.length - 1);
    } else {
        full = source;
        abbr = "";
    }
    full = siteUtil.removeNumbers(full).split(";");
    abbr = abbr.split("/");
    for (let i = 0; i < Math.max(full.length, abbr.length); ++i) {
        let name = {};
        name.full = (full[i] || "").trim();
        name.abbr = (abbr[i] || "").trim();
        names.push(name);
    }
    return names;
}
