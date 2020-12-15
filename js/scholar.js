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
    let title = node.text().replace(/[\‐\…]/g, " ");
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
    let node = $(this).find("td.gsc_a_t > a");
    if (!node.next().hasClass("ccf-rank")) {
      let title = node.text().replace(/[\‐\…]/g, " ");
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
  api_format =
    "https://dblp.org/search/publ/api?q=" +
    encodeURIComponent(title + " " + author + " year:" + year + ":") +
    "&format=json";
  xhr.open("GET", api_format, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      var dblp_url = "";
      var resp = JSON.parse(xhr.responseText).result.hits;
      if (resp["@total"] != 0) {
        url = resp.hit[0].info.url;
        dblp_url = url.substring(
          url.indexOf("/rec/") + 4,
          url.lastIndexOf("/")
        );
      } else {
        dblp_url == "";
      }
      for (let getRankSpan of scholar.rankSpanList) {
        $(node).after(getRankSpan(dblp_url));
      }
    }
  };
  xhr.send();
}
