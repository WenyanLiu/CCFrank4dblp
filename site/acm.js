const acm = {};

acm.rankingSpanProvider = [];

acm.start = function () {
    acm.addRankings();
}

acm.addRankings = function () {
    let results = $(".source > span:nth-child(2)");
    results.each(function (index) {
        let result = $(this);
        let source = result.text().trim();
        if (source.length != 0) {
            let names = acm.parseNames(source);
            for (let getRankingSpan of acm.rankingSpanProvider) {
                result.before(getRankingSpan(names));
            }
        }
    });
}

acm.parseNames = function (source) {
    let names = [];
    let abbr = '';
    let full;
    let index = source.indexOf(': ');
    if (index != -1) {
        abbr = source.substring(0, index).trim();
        if (!abbr.endsWith('11.9')) {
            abbr = abbr.replace(/'*\d+$/, "").trim();
        }
    }
    if (source.substring(index + ': '.length).startsWith('Volume ')) {
        full = abbr;
        abbr = '';
    } else {
        let index2 = source.indexOf('of the ');
        full = source.substring(index2 == -1 ? index + ': '.length : (index2 + 'of the '.length), source.length);
    }
    full = siteUtil.removeNumbers(full).trim();
    names.push({ 'full': full, 'abbr': abbr });
    return names;
}

