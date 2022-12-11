/**
 * MIT License
 *
 * Copyright (c) 2019-2021 WenyanLiu (https://github.com/WenyanLiu/CCFrank4dblp), FlyingFog (https://github.com/FlyingFog)
 */

function fetchRank(node, title, authorA, year, site) {
    var xhr = new XMLHttpRequest();
    api_format = "https://dblp.org/search/publ/api?q=" + encodeURIComponent(title + " " + authorA) + "&format=json";
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
                    info = resp.hit[h].info;
                    if (Array.isArray(info.authors.author)) {
                        author_1st = info.authors.author[0].text;
                    } else {
                        author_1st = info.authors.author.text;
                    }
                    year_fuzzy = info.year;
                    year_last_check = 0;
                    if (Math.abs(Number(year) - year_fuzzy) <= 1
                        // && author_1st.toLowerCase().split(" ").indexOf(authorA.toLowerCase()) != -1
                        && author_1st.toLowerCase().split(" ")
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
                            }
                            ;
                        }
                    }
                }
            }
            dblp_url = ccf.rankDb[dblp_url];
            for (let getRankSpan of site.rankSpanList) {
                $(node).after(getRankSpan(dblp_url, "url"));
            }
        }
    };
    xhr.send();
};