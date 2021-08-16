const scholar = {};

scholar.rankSpanList = [];

scholar.run = function () {
  let url = window.location.pathname;
  if (url == "/scholar") {
    scholar.appendRank();
  } else if (url == "/citations") {
    setInterval(function () {
      $(window).bind("popstate", function () {
        scholar.appendRanks();
      });
      scholar.appendRanks();
    }, 2000);
  }
};

scholar.appendRank = function () {
  let elements = $("#gs_res_ccl_mid > div > div.gs_ri");
  elements.each(function () {
    let node = $(this).find("h3 > a");
    let title = node.text();
    let data = $(this)
      .find("div.gs_a")
      .text()
      .replace(/[\,\-\…]/g, "")
      .split(" ");
    let author = data[1];
    let year = data.slice(-3)[0];
    fetchRank(node, title, author, year);
  });
};

scholar.appendRanks = function () {
  let elements = $("tr.gsc_a_tr");
  elements.each(function () {
    let node = $(this).find("td.gsc_a_t > a").first();
    if (!node.next().hasClass("ccf-rank")) {
      let title = node.text();
      let author = $(this)
        .find("div.gs_gray")
        .text()
        .replace(/[\,\…]/g, "")
        .split(" ")[1];
      let year = $(this).find("td.gsc_a_y").text();
      fetchRank(node, title, author, year);
    }
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
      for (let getRankSpan of scholar.rankSpanList) {
        $(node).after(getRankSpan(dblp_url));
      }
    }
  };
  xhr.send();
};