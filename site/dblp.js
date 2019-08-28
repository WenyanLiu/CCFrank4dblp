const dblp = {};

dblp.rankingSpanProvider = [];

dblp.start = function () {
    let interval = setInterval(function () {
        let url = window.location.href;
        let title = $('head > title').text();
        if (url.startsWith("https://dblp.uni-trier.de/search?") || title.indexOf("Search for") != -1) {
            let message = $('#completesearch-publs > div > p.waiting');

            if (message.css('display') == "none") {
                $(window).bind('popstate', function () {
                    dblp.addRankings();
                });
                dblp.addRankings();
            }
        }
    }, 1000);
}

dblp.addRankings = function () {
    let results = $("article > a > span:nth-child(1) > span:nth-child(1)");
    dblp.resultsCount = results.length;

    results.each(function (index) {
        let result = $(this);
        let source = result.text().trim();
        if (source.length != 0) {
            let names = dblp.parseNames(source);
            for (let getRankingSpan of dblp.rankingSpanProvider) {
                if ($(this).next().hasClass('ccf-ranking')) {
                    result.after('');
                } else {
                    result.after(getRankingSpan(names));
                }
            }
        }

    });
}

dblp.parseNames = function (source) {
    let names = [];
    let index = source.lastIndexOf('(');
    let full;
    let abbr;
    if (index != -1) {
        source = source.substring(0, index).trim();
    }
    let possible = ccf.rankingDblpName[source];
    if (possible != undefined) {
        source = ccf.rankingDblpName[source];
    }
    if (source.length <= 12) {
        abbr = source;
        full = "";
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
