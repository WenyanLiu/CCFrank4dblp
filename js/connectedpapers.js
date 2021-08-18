/**
 * MIT License
 *
 * Copyright (c) 2019-2021 WenyanLiu (https://github.com/WenyanLiu/CCFrank4dblp)
 */

const connectedpapers = {};

connectedpapers.rankSpanList = [];

connectedpapers.run = function () {
    let url = window.location.pathname;
    window.onload=function(){
        // window.alert(url);
        // let elements = $("#desktop-app > div.flexcolumn.main-router > div.main-view-window");
        let elements = $("div.minilist-column.flexcolumn");
    //     console.log("trigger");
        console.log(elements);
        let origin = $("div.list-group-item-mod.minilist-main-paper.main");
        console.log(origin);
        let connects = $("div.list-group-item-mod.minilist-list-entry");
        console.log(connects);
    };
    
    

    console.log("trigger1");

};

// var importJs=document.createElement('script');importJs.setAttribute("type","text/javascript");importJs.setAttribute("src", 'https://ajax.microsoft.com/ajax/jquery/jquery-1.4.min.js');document.getElementsByTagName("head")[0].appendChild(importJs);