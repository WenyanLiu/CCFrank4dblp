<h1 align="center"><img src="./icon/32x32.png" height="21px" alt=""> CCFrank</h1>
<p align="center">
    <a href="https://github.com/WenyanLiu/CCFrank4dblp">
        <img alt="GitHub manifest version" src="https://img.shields.io/github/manifest-json/v/wenyanliu/CCFrank4dblp?color=%23EA4AAA&label=Github&logo=github&logoColor=%23EA4AAA">
    </a>
    <a href="https://chrome.google.com/webstore/detail/ccfrank/pfcajmbenomfbjnbjhgbnbdjmiklnkie">
        <img alt="Chrome Web Store" src="https://img.shields.io/chrome-web-store/v/pfcajmbenomfbjnbjhgbnbdjmiklnkie?color=%234285F4&label=Chrome%20Web%20Store&logo=google-chrome&logoColor=%234285F4">
    </a>
    <a href="https://chrome.google.com/webstore/detail/ccfrank/pfcajmbenomfbjnbjhgbnbdjmiklnkie">
        <img alt="Chrome Web Store" src="https://img.shields.io/chrome-web-store/users/pfcajmbenomfbjnbjhgbnbdjmiklnkie?color=%234285F4&label=Chrome%20Web%20Store&logo=google-chrome&logoColor=%234285F4">
    </a>
    <a href="https://addons.mozilla.org/zh-CN/firefox/addon/ccfrank/">
        <img alt="Mozilla Add-on" src="https://img.shields.io/amo/v/ccfrank?color=%23FF7139&label=Mozilla%20Add-on&logo=firefox-browser&logoColor=%23FF7139">
    </a>
    <a href="https://addons.mozilla.org/zh-CN/firefox/addon/ccfrank/">
        <img alt="Mozilla Add-on" src="https://img.shields.io/amo/users/ccfrank?color=%23FF7139&label=Mozilla%20Add-on&logo=firefox-browser&logoColor=%23FF7139">
    </a>
</p>

The Chrome Extension and Firefox Add-on display the China Computer Federation recommended rank of international conferences and journals in the dblp and Google Scholar search results.

Chrome 扩展程序 & Firefox 附加组件，在 dblp 和 Google 学术的搜索结果中显示中国计算机学会推荐的国际会议和期刊排名。

## Preview

![CCFrank on dblp](./img/dblp.png)

![CCFrank on Google Scholar](./img/scholar.png)

## Install

Directly install from the Chrome Web Store or Firefox Bowser Add-ons (Recommended) _or_ load from the source.

### Install from the Chrome Web Store / Firefox Bowser Add-ons

1. Find the CCFrank extension in [Chrome Web Store](https://chrome.google.com/webstore/detail/ccfrank/pfcajmbenomfbjnbjhgbnbdjmiklnkie) / [Firefox Bowser Add-ons](https://addons.mozilla.org/zh-CN/firefox/addon/ccfrank/).
2. Click the `Add to Chrome` / `+ Add to Firefox` button.
3. CCFrank needs to read and change dblp, Google Scholar and its mirror sites. To approve, click `Add extension`.

### Load Unpacked

Clone CCFrank to a directory.

1. Open the Extension Management page by navigating to `chrome://extensions`.

   - The Extension Management page can also be opened by clicking on the Chrome menu, hovering over **More Tools** then selecting **Extensions**.

2. Enable Developer Mode by clicking the toggle switch next to **Developer mode**.

3. Click the **LOAD UNPACKED** button and select the directory holding CCFrank.

<img src="./img/load_unpacked.png" height="300" alt="Load Extension">

## What's New

**Version 3.1.1**

> Dec 20, 2020

1. 感谢 @ifzh 和 @linwhitehat 的帮助，修复了由“会议/期刊的URL重复”引起的错误。

**Version 3.0.3**

> Dec 16, 2020

1. 放宽了 Google 学术的匹配条件，修复了由“发表年份”不匹配引起的错误。

**Version 3.0.2**

> Dec 16, 2020

1. 更正了 VLDB 会议的网址。

**Version 3.0.1**

> Dec 15, 2020

1. 修复了由标题中包含“特殊字符”引起的错误。

**Version 3.0.0**

> Dec 13, 2020

1. 增加了对 Google Scholar 的支持，建议更新到此版本。

**Version 2.0.0**

> Dec 10, 2020

1. 全新的匹配规则，即“全称/简称匹配”->“网址匹配”。
2. 感谢 @realstolz 指正，新版本已规避由“区分大小写”引起的错误。

**:tada: Published**

> Dec 9, 2020

CCFrank 在 [Firefox 附加组件工坊](https://addons.mozilla.org/zh-CN/firefox/addon/ccfrank/)上架~

> Nov 6, 2020

CCFrank 在 [Chrome 网上应用店](https://chrome.google.com/webstore/detail/ccfrank/pfcajmbenomfbjnbjhgbnbdjmiklnkie)发布~

**Version 1.3.2**

> Nov 3, 2020

1. 感谢 @kevyn-zhang 指正，修正了 Software: Practice and Experience (SPE) 等由“连字符”引起的错误。

**Version 1.3.1**

> Nov 3, 2020

1. 增加了 dblp 使用 AJAX 更新搜索结果（即 URL 无 "/search?q=" 关键词）时的支持。

**Version 1.3**

> Oct 29, 2020

1. 增加了 dblp person、DB/Conferences and Workshops 和 DB/Journals 网页的支持；
2. 重构了代码。

**Version 1.2**

> Oct 28, 2020

1. 适配 dblp 刊物名称；
2. 增加了 dblp computer science bibliography 的镜像站点支持；
3. 移除了 ACM Digital Library 和 IEEE Xplore 支持，专注优化 dblp 支持
   （如需使用 ACM Digital Library、IEEE Xplore 和 Springer，请移步至 [![show-rank](https://raw.githubusercontent.com/hnshhslsh/show-rank/master/logo/16x16.png) hnshhslsh/show-rank](https://github.com/hnshhslsh/show-rank)，谢谢！）。

**Version 1.1**

> Nov 15, 2019

1. 适配 dblp "2019-11-11: Open citation data and dblp" [Feature Spotlight]。

**Version 1.0**

> Aug 28, 2019

1. 优化了 dblp 上会议和刊物名称的匹配规则；
2. 修正了错误，更新到《[中国计算机学会推荐国际学术会议和期刊目录](https://www.ccf.org.cn/Academic_Evaluation/By_category/)》第五版（2019 年 4 月）。

## Acknowledgement

I would like to express my appreciation to [S.H. Lee](https://github.com/hnshhslsh) and [yishanchuan](https://github.com/yishanchuan) for their previous work and @ravenxrz , @kevyn-zhang, @junwei-wang, @ifzh and @linwhitehat for their advice!
