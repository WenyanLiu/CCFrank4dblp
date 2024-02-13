/**
 * MIT License
 *
 * Copyright (c) 2019-2023 WenyanLiu (https://github.com/WenyanLiu/CCFrank4dblp)
 */

const semanticscholar = {};

semanticscholar.rankSpanList = [];

let count = 0;
let maxCount = 5;

semanticscholar.run = function () {
    $(window).on('load', function() {
        let url = window.location.pathname;
        let intervalId = setInterval(function () {
            count++;
            if (count === maxCount) {
                clearInterval(intervalId);
            }
            semanticscholar.appendRanks();
        }, 700);
    });
};

semanticscholar.appendRanks = function () {
    let elements = $(".cl-paper-venue");
    elements.each(function () {
        let element = $(this);
        let source = element[0].innerText;
        if (source.length != 0 && !element.next().hasClass("ccf-rank")) {
            let paperNode = element.parents('.cl-paper-row').first();
            // <sha> - a Semantic Scholar ID
            let paperId = paperNode.attr('data-paper-id');
            if (paperId == undefined) {
                // In paper detail page, i.e. https://www.semanticscholar.org/paper/...
                paperNode = element.parents("[data-test-id='paper-detail-page-header']").first();
                paperNode = paperNode.find("[data-test-id='corpus-id']").first();
                // CorpusId:<id> - a Semantic Scholar numerical ID
                paperId = "CorpusId:" + paperNode.text().match(/\d+/)[0];
            }
            let appendRankBar = semanticscholar.appendRankBar;
            semanticscholar.fetchData(paperId, element, appendRankBar);
        }
    });
};

let semanticAPI = `https://api.semanticscholar.org/graph/v1/paper/{paper_id}?fields=venue`;

semanticscholar.fetchData = function (paperId, element, callback) {
    let query_url = semanticAPI.replace('{paper_id}', paperId);
    let cached = apiCache.getItem(query_url);
    if(cached) {
        venue = cached.venue;
        callback(element, venue);
        return;
    }
    // none cached
    $.get(query_url)
        .done(function (data) {
            apiCache.setItem(query_url, data);
            venue = data.venue;
            callback(element, venue);
        })
        .fail(function () {
            console.log("Request failed.");
        });
}

semanticscholar.appendRankBar = function (selector, source) {
    if (selector.next().hasClass("ccf-rank")) return;

    for (let getRankSpan of semanticscholar.rankSpanList) {
        if (source.includes('(')) {
            source = source.substring(source.indexOf('(') + 1, source.indexOf(')'));
        }
        if (source.includes('\'')) {
            source = source.substring(0, source.indexOf('\'')).trim();
        }
        selector.after(getRankSpan(source, 'abbr'));
    }
};
