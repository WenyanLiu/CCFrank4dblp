/**
 * MIT License
 *
 * Copyright (c) 2019-2021 WenyanLiu (https://github.com/WenyanLiu/CCFrank4dblp)
 */

const connectedpapers = {};

connectedpapers.rankSpanList = [];

connectedpapers.run = function () {
    let url = window.location.pathname;
    // window.onload=function(){
    //     // window.alert(url);
    //     // let elements = $("#desktop-app > div.flexcolumn.main-router > div.main-view-window");
    //     // let elements = $("div.minilist-column.flexcolumn");
    // //     console.log("trigger");
    //     // console.log(elements);
        
    //     // let connects = $("div.list-group-item-mod.minilist-list-entry");
    //     // console.log(connects);

    //     connectedpapers.appendRank();
    // };
    
    window.setInterval(function() {
        connectedpapers.appendRank();
    }, 3000);

    console.log("trigger1");

};

// var importJs=document.createElement('script');importJs.setAttribute("type","text/javascript");importJs.setAttribute("src", 'https://ajax.microsoft.com/ajax/jquery/jquery-1.4.min.js');document.getElementsByTagName("head")[0].appendChild(importJs);

connectedpapers.appendRank = function() {
    let element = $("div.list-group-item-mod.minilist-main-paper.main");
    // console.log(element);
    let nodes = element.find("div.horizontal-flexbox");
    // console.log(nodes);
    let node = nodes[1];
    // console.log(node);
    let title = node.innerText;
    // console.log("title:")
    console.log(title);

    let data = nodes[2];
    console.log(data);
    let xdata = (data.innerText).split('\n');
    let author = xdata[0];
    let year = xdata[1];
    console.log(author);
    console.log(year);
}