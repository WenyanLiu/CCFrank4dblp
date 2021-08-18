/**
 * MIT License
 *
 * Copyright (c) 2019-2021 WenyanLiu (https://github.com/WenyanLiu/CCFrank4dblp)
 */

const connectedpapers = {};

connectedpapers.rankSpanList = [];

connectedpapers.run = function () {
    let url = window.location.pathname;
    window.alert(url);
    // let elements = $("#desktop-app > div.list-group-item-mod.minilist-list-entry");
    // let elements = $("div.minilist-column.flexcolumn");
    let elements = $(".minilist-column.flexcolumn")
    // let elements = $(this).find("div.main-view-window");

    // elements.each(function () {
    //     console.log($(this));
    //     console.log("trigger");
    // });
    console.log("trigger");
    console.log(elements);
};

// var importJs=document.createElement('script');importJs.setAttribute("type","text/javascript");importJs.setAttribute("src", 'https://ajax.microsoft.com/ajax/jquery/jquery-1.4.min.js');document.getElementsByTagName("head")[0].appendChild(importJs);