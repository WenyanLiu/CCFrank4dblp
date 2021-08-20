/**
 * MIT License
 *
 * Copyright (c) 2019-2021 WenyanLiu (https://github.com/WenyanLiu/CCFrank4dblp)
 */

const connectedpapers = {};

connectedpapers.rankSpanList = [];

connectedpapers.run = function () {
    let url = window.location.pathname;
    console.log(url);
    // window.onload=function(){

    //     connectedpapers.appendRank();
    //     connectedpapers.appendRanks();
    // };
    // 这里还是不行，怎么在页面全部出现之后再确定
    setTimeout(function() {
        if (url.indexOf('/main') != -1) {
            connectedpapers.appendRank();
            connectedpapers.appendRanks();
        }
        
    }, 3000);

    console.log("trigger1");

};

// var importJs=document.createElement('script');importJs.setAttribute("type","text/javascript");importJs.setAttribute("src", 'https://ajax.microsoft.com/ajax/jquery/jquery-1.4.min.js');document.getElementsByTagName("head")[0].appendChild(importJs);

connectedpapers.appendRank = function() {
    let element = $("div.list-group-item-mod.minilist-main-paper.main");
    // console.log(element);
    let nodes = element.find("div.horizontal-flexbox");
    // console.log(nodes);
    let paramnode = element.find("div.horizontal-flexbox > h5 ");
    // console.log(paramnode);
    let node = nodes[1];
    let title = node.innerText;
    // console.log("title:")
    // console.log(title);

    let data = nodes[2];
    // console.log(data);
    let xdata = (data.innerText).split('\n');
    let author = xdata[0];
    let year = xdata[1];
    // console.log(author);
    // console.log(year);
    fetchRank(paramnode, title, author, year);
};

connectedpapers.appendRanks = function() {
    let elements = $("div.list-group-item-mod.minilist-list-entry");
    elements.each(function() {
        let node = $(this).find("div.horizontal-flexbox");
        // console.log(node);
        // console.log(nodeparam);
        let paramnode = $(this).find("div.horizontal-flexbox > h5 ");
        let title = (node[0]).innerText;
        // console.log(title);
        let xdata = ((node[1]).innerText).split('\n');
        let author = xdata[0];
        let year = xdata[1];
        // console.log(author);
        // console.log(year);
        fetchRank(paramnode, title, author, year);
    });
    // console.log(elements);
};

function fetchRank(node, title, author, year) {
        var xhr = new XMLHttpRequest();
        api_format = "https://dblp.org/search/publ/api?q=" + encodeURIComponent(title + " " + author) + "&format=json";
        xhr.open("GET", api_format, true);
        xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            var dblp_url = "";
            var resp = JSON.parse(xhr.responseText).result.hits;
            if (resp["@total"] == 0) {
            dblp_url == "";
            } else if (resp["@total"] == 1) {
            url = resp.hit[0].info.url;
            dblp_url = url.substring(
                url.indexOf("/rec/") + 4,
                url.lastIndexOf("/")
            );
            } else {
            for (var h = 0; h < resp["@total"]; h++) {
                info = resp.hit[h].info
                author_1st = info.authors.author[0].text;
                year_fuzzy = info.year;
                year_last_check = 0;
                if (Math.abs(Number(year) - year_fuzzy) <= 1
                && author_1st.toLowerCase().split(" ").indexOf(author.toLowerCase()) != -1
                && year_fuzzy != year_last_check) {
                year_last_check = year_fuzzy;
                url = resp.hit[h].info.url;
                dblp_url_last_check = url.substring(
                    url.indexOf("/rec/") + 4,
                    url.lastIndexOf("/")
                );
                if (year_fuzzy == year + 1) {
                    dblp_url = dblp_url_last_check;
                } else if (year_fuzzy == year) {
                    dblp_url = dblp_url_last_check;
                    break;
                } else {
                    if (dblp_url == "") {
                    dblp_url = dblp_url_last_check;
                    };
                }
                }
            }
            }
            dblp_url = ccf.rankDb[dblp_url];
            for (let getRankSpan of connectedpapers.rankSpanList) {
            $(node).after(getRankSpan(dblp_url));
            }
        }
        };
        xhr.send();
};

// connectedpapers.js:94 Uncaught TypeError: Cannot read property 'text' of undefined
//     at XMLHttpRequest.xhr.onreadystatechange (connectedpapers.js:94)
// xhr.onreadystatechange @ connectedpapers.js:94
// XMLHttpRequest.send (async)
// fetchRank @ connectedpapers.js:125
// (anonymous) @ connectedpapers.js:70
// each @ jquery-3.5.1.min.js:2
// each @ jquery-3.5.1.min.js:2
// connectedpapers.appendRanks @ connectedpapers.js:58
// (anonymous) @ connectedpapers.js:23
// setTimeout (async)
// connectedpapers.run @ connectedpapers.js:20
// (anonymous) @ script.js:10
// connectedpapers.js:125 GET https://dblp.org/search/publ/api?q=A%20policy%E2%80%90centric%20approach%20to%20protecting%20OS%20kernel%20from%20vulnerable%20LKMs%20D.%20Tian%2C%20Xi%20Xiong%2C%20Changzhen%20Hu%2C%20Peng%20Liu&format=json 422 (Unprocessable Entity)
// fetchRank @ connectedpapers.js:125
// (anonymous) @ connectedpapers.js:70
// each @ jquery-3.5.1.min.js:2
// each @ jquery-3.5.1.min.js:2
// connectedpapers.appendRanks @ connectedpapers.js:58
// (anonymous) @ connectedpapers.js:23
// setTimeout (async)
// connectedpapers.run @ connectedpapers.js:20
// (anonymous) @ script.js:10
// connectedpapers.js:83 Uncaught TypeError: Cannot read property '@total' of undefined
//     at XMLHttpRequest.xhr.onreadystatechange (connectedpapers.js:83)