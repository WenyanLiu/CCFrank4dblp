/**
 * MIT License
 *
 * Copyright (c) 2019-2026 WenyanLiu (https://github.com/WenyanLiu/CCFrank4dblp), FlyingFog (https://github.com/FlyingFog), mra42 (https://github.com/mra42), dozed (https://github.com/dozed), MarkLee131 (https://github.com/MarkLee131), lingMori (https://github.com/lingMori), sarendis56 (https://github.com/sarendis56)
 */

// PACM PL conference mapping - centralized configuration
const PACM_PL_CONFERENCE_MAP = {
  oopsla: "/conf/oopsla/oopsla",
  oopsla1: "/conf/oopsla/oopsla",
  oopsla2: "/conf/oopsla/oopsla",
  popl: "/conf/popl/popl",
  pldi: "/conf/pldi/pldi",
  icfp: "/conf/icfp/icfp",
};

// dblp mirrors tried in order when the main site's search backend is
// unavailable (dblp.org search occasionally returns HTTP 503 for weeks).
const DBLP_API_HOSTS = [
  "https://dblp.org",
  "https://dblp.uni-trier.de",
  "https://dblp.dagstuhl.de",
];

// Lookup robustness settings. Failures are remembered for a short time on the
// current page so a rate-limited API is not hammered by every poll interval.
const RANK_FETCH = {
  timeoutMs: 10000,
  retryDelays: [400, 900, 1800],
  failureTtlMs: 60 * 1000,
};

// dblp renamed the CoRR bucket; both spellings can appear in search hits.
const INFORMAL_PUBLICATION_TYPES = new Set([
  "Informal Publications",
  "Informal and Other Publications",
]);

const rankPendingQueries = new Set();
const rankFailedQueries = new Map();

/**
 * Process PACM PL journal entries to determine the actual conference URL.
 * PACM PL conferences (OOPSLA, POPL, PLDI, ICFP) are published in PACMPL journal
 * but should be recognized as conferences for CCF ranking purposes.
 * @param {Object} resp - DBLP API response hits object
 * @returns {string} DBLP URL for the conference or default PACMPL journal URL
 */
function processPacmPlJournal(resp) {
  let number_raw = resp.hit[0]?.info?.number;
  let number = number_raw ? number_raw.toString().toLowerCase() : "";

  // Handle missing number - traverse resp.hit array to find an element with number info
  if (number === "") {
    for (let i = 0; i < resp["@sent"]; i++) {
      let hit_number = resp.hit[i]?.info?.number;
      if (hit_number) {
        number = hit_number.toString().toLowerCase();
        break;
      }
    }
  }

  // Map to conference URL using centralized config, fallback to PACMPL journal
  return PACM_PL_CONFERENCE_MAP[number] || "/journals/pacmpl/pacmpl";
}

function getExtensionVersion() {
  try {
    return chrome.runtime.getManifest().version;
  } catch (err) {
    return "unknown";
  }
}

/**
 * Show a visible, clickable failure badge instead of silently dropping a
 * lookup. Clicking the badge retries the query.
 */
function insertFailSpan(node, kind, status, query_url, title, authorA, year, site) {
  let span = ccf.getFailSpan(kind, status);
  span.on("click", function (event) {
    event.stopPropagation();
    span.remove();
    rankFailedQueries.delete(query_url);
    fetchRank(node, title, authorA, year, site);
  });
  $(node).after(span);
}

/**
 * dblp uses /rec/journals/... record URLs, while rankDb keys use /db/ style
 * paths. Normalize the few journal-proceedings cases we need to identify.
 */
function extractDblpUrl(info) {
  let url = (info && info.url) || "";
  let key = url.substring(url.indexOf("/rec/") + 4, url.lastIndexOf("/"));
  if (key === "/journals/pacmmod") return "/journals/pacmmod/pacmmod";
  return key;
}

function rememberFailure(query_url, kind, status) {
  rankFailedQueries.set(query_url, { at: Date.now(), kind: kind, status: status });
}

function appendRankSpans(node, dblp_url, resp, site) {
  if (dblp_url === "/journals/pacmmod/pacmmod") {
    dblp_url = ccf.resolveVenueUrl(
      dblp_url,
      resp && resp.hit && resp.hit[0] ? resp.hit[0].info.number : "",
    );
  }
  // Find a new vul: rankDB lacks of `tacas` etc., but it does occur in file `dataGen`.
  if (typeof dblp_url == "undefined" && resp["@total"] != 0) {
    let dblp_abbr = resp.hit[0].info.number;
    if (typeof dblp_abbr == "undefined" || isNaN(dblp_abbr)) {
      dblp_abbr = resp.hit[0].info.venue;
    }
    for (let getRankSpan of site.rankSpanList) {
      $(node).after(getRankSpan(dblp_abbr, "abbr"));
    }
  } else if (dblp_url == "/journals/pacmpl/pacmpl") {
    // Process PACM PL conferences using centralized helper function
    dblp_url = processPacmPlJournal(resp);
    for (let getRankSpan of site.rankSpanList) {
      $(node).after(getRankSpan(dblp_url, "url"));
    }
  } else {
    for (let getRankSpan of site.rankSpanList) {
      $(node).after(getRankSpan(dblp_url, "url"));
    }
  }
}

function fetchRank(node, title, authorA, year, site, retryIndex = 0) {
  // Both rank and failure badges carry the ccf-rank class, so one check covers both.
  if ($(node).next().hasClass("ccf-rank")) return;

  // Do not add `author:<last name>` here: Scholar only provides a surname,
  // while dblp's author: filter matches from the beginning of the full name.
  // Title (plus year disambiguation below) is far more reliable.
  let query_url =
    "https://dblp.org/search/publ/api?q=" +
    encodeURIComponent(title) +
    "&format=json&app=CCFrank4dblp_" +
    getExtensionVersion();

  let failure = rankFailedQueries.get(query_url);
  if (failure && Date.now() - failure.at < RANK_FETCH.failureTtlMs) {
    insertFailSpan(
      node,
      failure.kind,
      failure.status,
      query_url,
      title,
      authorA,
      year,
      site,
    );
    return;
  }

  // Several sites poll the DOM and can enqueue the same query repeatedly.
  // Wait briefly instead of issuing duplicate concurrent requests.
  if (rankPendingQueries.has(query_url)) {
    if (retryIndex < RANK_FETCH.retryDelays.length) {
      setTimeout(function () {
        fetchRank(node, title, authorA, year, site, retryIndex + 1);
      }, RANK_FETCH.retryDelays[retryIndex]);
    } else {
      insertFailSpan(node, "busy", 0, query_url, title, authorA, year, site);
    }
    return;
  }

  let cached = apiCache.getItem(query_url);
  // Older versions stored zero-hit responses as CCF-None for 24 hours.
  // Drop those stale entries so the fix applies without clearing storage.
  if (cached && cached.resp && cached.resp["@total"] == 0) {
    apiCache.removeItem(query_url);
    cached = null;
  }
  if (cached) {
    try {
      appendRankSpans(node, cached.dblp_url, cached.resp, site);
    } catch (err) {
      insertFailSpan(node, "parse", 0, query_url, title, authorA, year, site);
    }
  } else {
    rankPendingQueries.add(query_url);
    fetchFromDblpApi(query_url, node, title, authorA, year, site, function () {
      rankPendingQueries.delete(query_url);
    });
  }
}

function fetchFromDblpApi(query_url, node, title, authorA, year, site, onSettled) {
  console.debug('fetch from API: %s (%s) "%s"', authorA, year, title);
  console.debug("query url: %s", query_url);

  var hostIndex = 0;
  var lastKind = "server";
  var lastStatus = 0;

  function fail(kind, status) {
    rememberFailure(query_url, kind, status);
    insertFailSpan(node, kind, status, query_url, title, authorA, year, site);
    onSettled();
  }

  function nextHost() {
    hostIndex++;
    requestNextHost();
  }

  function handleResponse(resp, status) {
    try {
      var dblp_url = "";
      if (resp["@total"] == 0) {
        // Zero hits are often transient (indexing delay or mirror hiccup).
        // Never cache this as a CCF-None verdict for 24 hours: show a
        // retryable badge instead and suppress duplicate polls briefly.
        fail("no-results", status);
        return;
      }
      if (resp["@total"] == 1) {
        dblp_url = extractDblpUrl(resp.hit[0].info);
      } else {
        var year_last_check = 0;
        var firstInformalUrl = "";
        for (var h = 0; h < resp["@sent"]; h++) {
          let info = resp.hit[h].info;
          if (INFORMAL_PUBLICATION_TYPES.has(info.type)) {
            if (firstInformalUrl === "") firstInformalUrl = extractDblpUrl(info);
            continue;
          }
          let year_fuzzy = info.year;
          // Note: Author matching is temporarily disabled due to inconsistent
          // author name formats from different platforms. We rely on title and
          // year matching instead, which provides good enough accuracy for most cases.
          if (
            Math.abs(Number(year) - year_fuzzy) <= 1 &&
            year_fuzzy != year_last_check
          ) {
            year_last_check = year_fuzzy;
            let dblp_url_last_check = extractDblpUrl(info);
            if (year_fuzzy == year + 1) {
              dblp_url = dblp_url_last_check;
            } else if (year_fuzzy == year) {
              dblp_url = dblp_url_last_check;
              break;
            } else if (dblp_url == "") {
              dblp_url = dblp_url_last_check;
            }
          }
        }
        // Preprints are only a fallback: use them when no formal record
        // matches, so arXiv-only papers keep their "Preprint" badge.
        if (dblp_url === "" && firstInformalUrl !== "") {
          dblp_url = firstInformalUrl;
        }
      }
      if (dblp_url === "/journals/pacmmod/pacmmod") {
        dblp_url = ccf.resolveVenueUrl(
          dblp_url,
          resp.hit[0] && resp.hit[0].info ? resp.hit[0].info.number : "",
        );
      } else {
        dblp_url = ccf.rankDb[dblp_url];
      }
      apiCache.setItem(query_url, {
        dblp_url: dblp_url,
        resp: resp,
      });
      rankFailedQueries.delete(query_url);
      appendRankSpans(node, dblp_url, resp, site);
    } catch (err) {
      lastKind = "parse";
      lastStatus = status;
      nextHost();
      return;
    }
    onSettled();
  }

  function requestNextHost() {
    if (hostIndex >= DBLP_API_HOSTS.length) {
      console.debug("all dblp API hosts failed for: %s", query_url);
      fail(lastKind, lastStatus);
      return;
    }
    var host = DBLP_API_HOSTS[hostIndex];
    var xhr = new XMLHttpRequest();
    xhr.open("GET", query_url.replace(DBLP_API_HOSTS[0], host), true);
    xhr.timeout = RANK_FETCH.timeoutMs;

    xhr.onload = function () {
      if (xhr.status !== 200) {
        lastKind =
          xhr.status === 429
            ? "rate-limit"
            : xhr.status === 0
              ? "network"
              : "server";
        lastStatus = xhr.status;
        console.debug(
          "%s returned HTTP %s, trying next dblp mirror",
          host,
          xhr.status,
        );
        nextHost();
        return;
      }
      var resp;
      try {
        resp = JSON.parse(xhr.responseText).result.hits;
      } catch (err) {
        lastKind = "parse";
        lastStatus = xhr.status;
        console.debug("bad response from %s: %s", host, err);
        nextHost();
        return;
      }
      handleResponse(resp, xhr.status);
    };

    xhr.onerror = function () {
      lastKind = "network";
      lastStatus = 0;
      nextHost();
    };
    xhr.ontimeout = function () {
      lastKind = "timeout";
      lastStatus = 0;
      nextHost();
    };
    xhr.send();
  }
  requestNextHost();
}
