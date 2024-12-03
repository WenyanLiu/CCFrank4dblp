/**
 * MIT License
 *
 * Copyright (c) 2019-2023 WenyanLiu (https://github.com/WenyanLiu/CCFrank4dblp), FlyingFog (https://github.com/FlyingFog), mra42 (https://github.com/mra42), dozed (https://github.com/dozed)
 */

function fetchRank(node, title, authorA, year, site) {
  const manifest = chrome.runtime.getManifest();
  const version = manifest.version;

  let query_url =
    "https://dblp.org/search/publ/api?q=" +
    encodeURIComponent(title + "  author:" + authorA) +
    "&format=json&app=CCFrank4dblp_" +
    version;

  let cached = apiCache.getItem(query_url);
  if (cached) fetchFromCache(cached, node, title, authorA, year, site);
  else fetchFromDblpApi(query_url, node, title, authorA, year, site);
}

function fetchFromCache(cached, node, title, authorA, year, site) {
  console.debug('fetch from cache: %s (%s) "%s"', authorA, year, title);

  let dblp_url = cached.dblp_url;
  let resp = cached.resp;
  let resp_flag = cached.flag;

  //Find a new vul: rankDB lacks of `tacas` etc., but it does occur in file `dataGen`.
  if (typeof dblp_url == "undefined" && resp_flag != false) {
    dblp_abbr = resp.hit[0].info.number;
    if (typeof dblp_abbr != "undefined" && isNaN(dblp_abbr)) {
    } else {
      dblp_abbr = resp.hit[0].info.venue;
    }
  } else if (dblp_url == "/journals/pacmpl/pacmpl") {
    // @kaixuan: Here, we need to process the four PL confs (oopsla, popl, pldi, and icfp) in two branches.
    // Details can be accessed at the same location in the `fetchFromDblpApi` function.
    let number_raw = resp.hit[0]?.info?.number; // may miss the number info in some cases, e.g., recently publised papers
    let number = number_raw ? number_raw.toString().toLowerCase() : "";

    // a hacky way to handle the missing number issue
    // travese the resp.hit array to find a element with number info
    if (number == "") {
      for (let i = 0; i < resp["@sent"]; i++) {
        let number_raw = resp.hit[i]?.info?.number;
        if (number_raw) {
          number = number_raw.toString().toLowerCase();
          break;
        }
      }
    } else {
      // console.log("number is not empty");
    }

    if (number == "oopsla1" || number == "oopsla2") {
      dblp_url = "/conf/oopsla/oopsla";
    } else if (number == "popl") {
      dblp_url = "/conf/popl/popl";
    } else if (number == "pldi") {
      dblp_url = "/conf/pldi/pldi";
    } else if (number == "icfp") {
      dblp_url = "/conf/icfp/icfp";
      // console.log("already enter this branch");
    } else {
      // console.log("number is not in the list");
    }

    for (let getRankSpan of site.rankSpanList) {
      // console.log("with url");
      $(node).after(getRankSpan(dblp_url, "url"));
    }

  } else {
    // console.log("dblp_url is not empty");
    for (let getRankSpan of site.rankSpanList) {
      // console.log("with url");
      $(node).after(getRankSpan(dblp_url, "url"));
    }
  }
}

function fetchFromDblpApi(query_url, node, title, authorA, year, site) {
  console.debug('fetch from API: %s (%s) "%s"', authorA, year, title);
  console.debug("query url: %s", query_url);

  var xhr = new XMLHttpRequest();
  xhr.open("GET", query_url, true);
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
          url.lastIndexOf("/"),
        );
      } else {
        for (var h = 0; h < resp["@sent"]; h++) {
          info = resp.hit[h].info;

          var cur_venue = info.type;
          if (cur_venue == "Informal Publications") continue;

          if (Array.isArray(info.authors.author)) {
            author_1st = info.authors.author[0].text;
          } else {
            author_1st = info.authors.author.text;
          }
          year_fuzzy = info.year;
          year_last_check = 0;
          if (
            Math.abs(Number(year) - year_fuzzy) <= 1 &&
            // && author_1st.toLowerCase().split(" ").indexOf(authorA.toLowerCase()) != -1
            author_1st.toLowerCase().split(" ") &&
            year_fuzzy != year_last_check
          ) {
            year_last_check = year_fuzzy;
            url = resp.hit[h].info.url;
            dblp_url_last_check = url.substring(
              url.indexOf("/rec/") + 4,
              url.lastIndexOf("/"),
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
            }
          }
        }
      }
      dblp_url = ccf.rankDb[dblp_url];
      apiCache.setItem(query_url, {
        dblp_url: dblp_url,
        resp: resp,
        flag: resp_flag,
      });

      //Find a new vul: rankDB lacks of `tacas` etc., but it does occur in file `dataGen`.
      if (typeof (dblp_url) == "undefined" && resp_flag != false) {
        dblp_abbr = resp.hit[0].info.number;
        if (typeof (dblp_abbr) != "undefined" && isNaN(dblp_abbr)) {
        }
        else {
          dblp_abbr = resp.hit[0].info.venue;
        }
        for (let getRankSpan of site.rankSpanList) {
          // console.log("with abbr");
          $(node).after(getRankSpan(dblp_abbr, "abbr"));
        }
      }
      // @kaixuan: Here, we need to process the four PL confs (oopsla, popl, pldi, and icfp) in two branches.
      // They are wrongly recognized as journals in the dblp api since they are published in PACMPL.
      // So, we need to parse the number info from the response and determine the dblp_url accordingly.
      // The same logic is applied to func `fetchFromCache`.
      else if (dblp_url == "/journals/pacmpl/pacmpl") {
        // we need to process the confs including oopsla, popl, and pldi in the same way
        let number_raw = resp.hit[0]?.info?.number; // may miss the number info in some cases, e.g., recently publised papers
        let number = number_raw ? number_raw.toString().toLowerCase() : "";

        // a hacky way to handle the missing number issue
        // travese the resp.hit array to find a element with number info
        if (number == "") {
          for (let i = 0; i < resp["@sent"]; i++) {
            let number_raw = resp.hit[i]?.info?.number;
            if (number_raw) {
              number = number_raw.toString().toLowerCase();
              break;
            }
          }
        }

        if (number == "oopsla1" || number == "oopsla2") {
          dblp_url = "/conf/oopsla/oopsla";
        } else if (number == "popl") {
          dblp_url = "/conf/popl/popl";
        } else if (number == "pldi") {
          dblp_url = "/conf/pldi/pldi";
        } else if (number == "icfp") {
          dblp_url = "/conf/icfp/icfp";
        } else {
          // console.log("number is not in the list");
        }

        for (let getRankSpan of site.rankSpanList) {
          // console.log("with url");
          $(node).after(getRankSpan(dblp_url, "url"));
        }

      } else {
        for (let getRankSpan of site.rankSpanList) {
          // console.log("with url");
          $(node).after(getRankSpan(dblp_url, "url"));
        }
      }
    }
    // for (let getRankSpan of site.rankSpanList) {
    //   // console.log("with abbr");
    //   $(node).after(getRankSpan(dblp_abbr, "abbr"));
    // }
    
  // } else {
  //   for (let getRankSpan of site.rankSpanList) {
  //     // console.log("with url");
  //     $(node).after(getRankSpan(dblp_url, "url"));
  //   }
  
  };
  xhr.send();
}
