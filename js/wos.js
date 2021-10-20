/**
 * MIT License
 *
 * Copyright (c) 2019-2021 WenyanLiu (https://github.com/WenyanLiu/CCFrank4dblp)
 */

const wos = {};

wos.rankSpanList = [];

wos.run = function () {
    setInterval(function () {
        $(window).bind("popstate", function () {
            wos.appendRanks();
        });
        wos.appendRanks();
    }, 700);
};

wos.appendRanks = function () {
    let elements = $("button[lang='en']");
    elements.each(function () {
        let node = $(this);
        if (!node.next().hasClass("ccf-rank")) {
            for (let getRankSpan of wos.rankSpanList) {
                let publication = node.text();
                console.log(publication);
                node.after(getRankSpan(publication, "publication"));
            }
        }
    });
};