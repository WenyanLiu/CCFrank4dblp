/**
 * MIT License
 *
 * Copyright (c) 2019-2023 WenyanLiu (https://github.com/WenyanLiu/CCFrank4dblp), FlyingFog (https://github.com/FlyingFog), mra42 (https://github.com/mra42), dozed (https://github.com/dozed)
 */

// PACM PL conference mapping - centralized configuration
const PACM_PL_CONFERENCE_MAP = {
  "oopsla": "/conf/oopsla/oopsla",
  "oopsla1": "/conf/oopsla/oopsla",
  "oopsla2": "/conf/oopsla/oopsla",
  "popl": "/conf/popl/popl",
  "pldi": "/conf/pldi/pldi",
  "icfp": "/conf/icfp/icfp"
};

// Helper function to process PACM PL journals
function processPacmPlJournal(resp, getRankSpan) {
  let number_raw = resp.hit[0]?.info?.number;
  let number = number_raw ? number_raw.toString().toLowerCase() : "";

  // Handle missing number - traverse resp.hit array
  if (number === "") {
    for (let i = 0; i < resp["@sent"]; i++) {
      let hit_number = resp.hit[i]?.info?.number;
      if (hit_number) {
        number = hit_number.toString().toLowerCase();
        break;
      }
    }
  }

  // Map to conference URL using centralized config
  return PACM_PL_CONFERENCE_MAP[number] || "/journals/pacmpl/pacmpl";
}

function fetchRank(node, title, authorA, year, site) {
  const manifest = chrome.runtime.getManifest();
  const version = manifest.version;

  let query_url =
    "https://dblp.org/search/publ/api?q=" +
    encodeURIComponent(title + "  author:" + authorA) +
    "&format=json&app=CCFrank4dblp_" +
    version;

  let cached = apiCache.getItem(query_url);
  // console.log("cached: ", cached);
  if (cached) fetchFromCache(cached, node, title, authorA, year, site);
  else fetchFromDblpApi(query_url, node, title, authorA, year, site);
}

function fetchFromCache(cached, node, title, authorA, year, site) {
  console.debug('fetch from cache: %s (%s) "%s"', authorA, year, title);

  let dblp_url = cached.dblp_url;
  let resp = cached.resp;
  let resp_flag = cached.flag;
  // console.log("dblp_url: ", dblp_url);

  //Find a new vul: rankDB lacks of `tacas` etc., but it does occur in file `dataGen`.
  if (typeof dblp_url == "undefined" && resp_flag != false) {
    let dblp_abbr = resp.hit[0].info.number;
    if (typeof dblp_abbr != "undefined" && isNaN(dblp_abbr)) {
      // console.log("dblp_abbr: ", dblp_abbr);
    } else {
      dblp_abbr = resp.hit[0].info.venue;
    }

    for (let getRankSpan of site.rankSpanList) {
      // console.log("with abbr");
      $(node).after(getRankSpan(dblp_abbr, "abbr"));
    }
  } else if (dblp_url == "/journals/pacmpl/pacmpl") {
    // Process PACM PL conferences using helper function
    dblp_url = processPacmPlJournal(resp);

    for (let getRankSpan of site.rankSpanList) {
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
        dblp_url = "";
        resp_flag = false;
      } else if (resp["@total"] == 1) {
        let url = resp.hit[0].info.url;
        dblp_url = url.substring(
          url.indexOf("/rec/") + 4,
          url.lastIndexOf("/"),
        );
      } else {
        var year_last_check = 0;
        for (var h = 0; h < resp["@sent"]; h++) {
          let info = resp.hit[h].info;

          var cur_venue = info.type;
          if (cur_venue == "Informal Publications") continue;

          let author_1st;
          if (Array.isArray(info.authors.author)) {
            author_1st = info.authors.author[0].text;
          } else {
            author_1st = info.authors.author.text;
          }
          let year_fuzzy = info.year;
          // Note: Author matching is temporarily disabled due to inconsistent
          // author name formats from different platforms. We rely on title and
          // year matching instead, which provides good enough accuracy for most cases.
          if (
            Math.abs(Number(year) - year_fuzzy) <= 1 &&
            author_1st.toLowerCase().split(" ") &&
            year_fuzzy != year_last_check
          ) {
            year_last_check = year_fuzzy;
            let url = resp.hit[h].info.url;
            let dblp_url_last_check = url.substring(
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
      if (typeof dblp_url == "undefined" && resp_flag != false) {
        let dblp_abbr = resp.hit[0].info.number;
        if (typeof dblp_abbr != "undefined" && isNaN(dblp_abbr)) {
        } else {
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
      // Process PACM PL conferences using centralized logic
      else if (dblp_url == "/journals/pacmpl/pacmpl") {
        dblp_url = processPacmPlJournal(resp);

        for (let getRankSpan of site.rankSpanList) {
          $(node).after(getRankSpan(dblp_url, "url"));
        }
      } else {
        for (let getRankSpan of site.rankSpanList) {
          // console.log("with url");
          $(node).after(getRankSpan(dblp_url, "url"));
        }
      }
    }
  };
  xhr.send();
}
