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

**Version 3.2.3**

> Jul 18, 2021

1. 感谢 @zshhans 的帮助，修复了 XHR not working on Firefox 的错误。

**:tada: Daily Users** 

> Jun 18, 2021

Total current users: 1,006

**Version 3.1.3**

> Apr 12, 2021

1. 修复 Google 学术首条搜索结果的 Tooltip 显示被覆盖的错误。

**Version 3.1.2**

> Mar 1, 2021

1. 感谢 @zhuye88 的帮助，修复了《目录》中“Pattern Recognition”地址的错误。

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
3. 专注优化 dblp 支持。

**Version 1.1**

> Nov 15, 2019

1. 适配 dblp "2019-11-11: Open citation data and dblp" [Feature Spotlight]。

**Version 1.0**

> Aug 28, 2019

1. 优化了 dblp 上会议和刊物名称的匹配规则；
2. 修正了错误，更新到《[中国计算机学会推荐国际学术会议和期刊目录](https://www.ccf.org.cn/Academic_Evaluation/By_category/)》第五版（2019 年 4 月）。

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://scholar.google.com/citations?user=a8sqKFkAAAAJ"><img src="https://avatars.githubusercontent.com/u/16554557?v=4?s=100" width="100px;" alt=""/><br /><sub><b>wyliu</b></sub></a><br /><a href="#ideas-WenyanLiu" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/WenyanLiu/CCFrank4dblp/commits?author=WenyanLiu" title="Code">💻</a> <a href="#data-WenyanLiu" title="Data">🔣</a> <a href="https://github.com/WenyanLiu/CCFrank4dblp/commits?author=WenyanLiu" title="Documentation">📖</a> <a href="#maintenance-WenyanLiu" title="Maintenance">🚧</a></td>
    <td align="center"><a href="https://github.com/kevyn-zhang"><img src="https://avatars1.githubusercontent.com/u/73885971?v=4?s=100" width="100px;" alt=""/><br /><sub><b>kevyn-zhang</b></sub></a><br /><a href="https://github.com/WenyanLiu/CCFrank4dblp/issues?q=author%3Akevyn-zhang" title="Bug reports">🐛</a></td>
    <td align="center"><a href="http://ipads.se.sjtu.edu.cn/rong_chen"><img src="https://avatars2.githubusercontent.com/u/1779861?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Rong Chen</b></sub></a><br /><a href="https://github.com/WenyanLiu/CCFrank4dblp/issues?q=author%3Arealstolz" title="Bug reports">🐛</a></td>
    <td align="center"><a href="http://jwa.ng"><img src="https://avatars1.githubusercontent.com/u/866329?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Junwei Wang</b></sub></a><br /><a href="#platform-junwei-wang" title="Packaging/porting to new platform">📦</a></td>
    <td align="center"><a href="https://github.com/ifzh"><img src="https://avatars0.githubusercontent.com/u/11475849?v=4?s=100" width="100px;" alt=""/><br /><sub><b>iFzh</b></sub></a><br /><a href="https://github.com/WenyanLiu/CCFrank4dblp/issues?q=author%3Aifzh" title="Bug reports">🐛</a> <a href="#ideas-ifzh" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://linwhitehat.github.io/"><img src="https://avatars3.githubusercontent.com/u/20349381?v=4?s=100" width="100px;" alt=""/><br /><sub><b>lin</b></sub></a><br /><a href="#ideas-linwhitehat" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="http://www.yezhu.com.au/"><img src="https://avatars.githubusercontent.com/u/19607512?v=4?s=100" width="100px;" alt=""/><br /><sub><b>YE ZHU</b></sub></a><br /><a href="https://github.com/WenyanLiu/CCFrank4dblp/issues?q=author%3Azhuye88" title="Bug reports">🐛</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/zshhans"><img src="https://avatars.githubusercontent.com/u/25279261?v=4?s=100" width="100px;" alt=""/><br /><sub><b>zshhans</b></sub></a><br /><a href="https://github.com/WenyanLiu/CCFrank4dblp/issues?q=author%3Azshhans" title="Bug reports">🐛</a> <a href="https://github.com/WenyanLiu/CCFrank4dblp/commits?author=zshhans" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

## Reports

- Nov 3, 2020. [m1llie](https://github.com/m1-llie): [高效搜集论文指北](https://m1llie.tech/archives/searchpaper.html).
- Dec 7, 2020. 安全学术圈: [CCFrank：DBLP论文等级助手插件](https://mp.weixin.qq.com/s/LXVp25dB-f41l2gnWx0Yog).
- Apr 23, 2021. [Buffer](https://www.zhihu.com/people/buffer-3): [科研论文检索方法入门（计算机领域）](https://zhuanlan.zhihu.com/p/367339390).
- Jul 19, 2021. [Lil Ning](https://www.zhihu.com/people/evanism101): [深度学习方向科研工作的神器](https://zhuanlan.zhihu.com/p/388558877).

## More Awesome Scripts

- [![show-rank](https://raw.githubusercontent.com/hnshhslsh/show-rank/master/logo/16x16.png) hnshhslsh/show-rank](https://github.com/hnshhslsh/show-rank) - 支持在 Chrome 中的 ACM Digital Library、dblp、IEEE Xplore 和 Springer 显示中国计算机学会推荐的国际会议和期刊排名；
- [![swufe_ccf_show_ranking](https://raw.githubusercontent.com/Nixiak-nan/swufe_ccf_show_ranking/master/logo/16.png) Nixiak-nan/swufe_ccf_show_ranking](https://github.com/Nixiak-nan/swufe_ccf_show_ranking) - 支持在 Chrome 和 Firefox 中的 百度学术、知网、Google Scholar、IEEExplore、Microsoft Academic、Springer、Web of Science 显示西南财经大学学术期刊目录。
