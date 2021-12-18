/**
 * MIT License
 *
 * Copyright (c) 2019-2021 WenyanLiu (https://github.com/WenyanLiu/CCFrank4dblp)
 */

const semanticscholar = {};

semanticscholar.rankSpanList = [];

semanticscholar.run = function () {
    let url = window.location.pathname;
    setInterval(function () {
        $(window).bind("popstate", function () {
            semanticscholar.appendRanks();
        });
        semanticscholar.appendRanks();
    }, 700);
};

semanticscholar.appendRanks = function () {
    let elements = $(".cl-paper-venue");
    elements.each(function () {
        let element = $(this);
        let source = element[0].innerText;
        if (source.length != 0 && !element.next().hasClass("ccf-rank")) {
            for (let getRankSpan of semanticscholar.rankSpanList) {
                if (source.includes('(')) {
                    source = source.substring(source.indexOf('(') + 1, source.indexOf(')'));
                }
                if (source.includes('\'')) {
                    source = source.substring(0, source.indexOf('\'')).trim();
                }
                element.after(getRankSpan(source, 'abbr'));
            }
        }
    });
};

semanticscholar.appendRank = function (selector) {
    let element = $(selector);
    let headline = window.location.pathname;
    if (headline.length != 0) {
        for (let getRankSpan of dblp.rankSpanList) {
            let urls = headline.substring(
                headline.indexOf("/db/") + 3,
                headline.lastIndexOf("/")
            );
            url = ccf.rankDb[urls];
            element.after(getRankSpan(url, "url"));
        }
    }
};
 