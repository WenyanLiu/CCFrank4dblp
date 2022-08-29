/**
 * MIT License
 *
 * Copyright (c) 2019-2021 WenyanLiu (https://github.com/WenyanLiu/CCFrank4dblp)
 */

function fetchRank(node, title, authorA, year, site) {
    var xhr = new XMLHttpRequest();
    api_format = "https://dblp.org/search/publ/api?q=" + encodeURIComponent(title + "  author:" + authorA) + "&format=json";
    xhr.open("GET", api_format, true);
    var resp_flag = true;
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            var dblp_url = "";
            var resp = JSON.parse(xhr.responseText).result.hits;
            if (resp["@total"] == 0) {
                dblp_url == "";
                resp_flag = false;   
            } else if (resp["@total"] == 1) {
                url = resp.hit[0].info.url;
                dblp_url = url.substring(
                    url.indexOf("/rec/") + 4,
                    url.lastIndexOf("/")
                );
            } else {
                for (var h = 0; h < resp["@total"]; h++) {
                    info = resp.hit[h].info;

                    var cur_venue = info.type
                    if(cur_venue == "Informal Publications") 
                        continue;

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
            //Find a new vul: rankDB lacks of `tacas` etc., but it does occur in file `dataGen`.
            if(typeof(dblp_url) == "undefined" && resp_flag != false){
                dblp_abbr = resp.hit[0].info.number;
                if(typeof(dblp_abbr) != "undefined" && isNaN(dblp_abbr)){
                }
                else{
                    dblp_abbr = resp.hit[0].info.venue;
                }
                for (let getRankSpan of site.rankSpanList) {
                    // console.log("with abbr");
                    $(node).after(getRankSpan(dblp_abbr, "abbr"));
                }
            }
            else{
                for (let getRankSpan of site.rankSpanList) {
                    // console.log("with url");
                    $(node).after(getRankSpan(dblp_url, "url"));
                }
            }
        }
    };
    xhr.send();
};