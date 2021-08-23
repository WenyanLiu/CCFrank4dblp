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
    window.onload = function(){
        setTimeout(function() {
            if (url.indexOf('/main') != -1) {
                connectedpapers.appendRank();
                connectedpapers.appendRanks();
            }
            
        }, 3000);
    };
};


connectedpapers.appendRank = function() {
    let element = $("div.list-group-item-mod.minilist-main-paper.main");
    let nodes = element.find("div.horizontal-flexbox");
    let paramnode = element.find("div.horizontal-flexbox > h5 ");
    let node = nodes[1];
    let title = node.innerText;

    let data = nodes[2];
    let xdata = (data.innerText).split('\n');
    let authors = xdata[0].split(" ");
    console.log(authors);
    let author = authors[0];
    let year = xdata[1];
    fetchRank(paramnode, title, author, year);
};

connectedpapers.appendRanks = function() {
    let elements = $("div.list-group-item-mod.minilist-list-entry");
    elements.each(function() {
        let node = $(this).find("div.horizontal-flexbox");
        let paramnode = $(this).find("div.horizontal-flexbox > h5 ");
        let title = (node[0]).innerText;
        let xdata = ((node[1]).innerText).split('\n');
        let authors = xdata[0].split(" ");
        let author = authors[0];
        let year = xdata[1];
        fetchRank(paramnode, title, author, year);
    });
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
