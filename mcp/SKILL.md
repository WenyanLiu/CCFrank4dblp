---
name: ccfrank
description: 查询会议/期刊的 CCF 等级。当用户提到 CCF 等级、论文评级、会议排名、期刊等级，或需要查询某个会议/期刊是 CCF-A/B/C 时使用此技能。支持通过会议简称（如 PLDI、ICSE）、全称、或 DBLP URL 查询。
version: 1.0.4
homepage: https://github.com/m2kar/CCFrank4dblp
dependencies:
  npm:
    - name: ccfrank
      version: 4.5.5
      integrity: sha512-prt+kEYsjfJdS7znEaubzjBw6TSTgK0+fHCGG2E16D9Gk8kzwDOhrIVPf+wACFpoNUzNH6con9vNjemMc6YnzA==
      tarball: https://registry.npmjs.org/ccfrank/-/ccfrank-4.5.5.tgz
      sourceRepo: https://github.com/m2kar/CCFrank4dblp
install:
  method: global-npm
  lockVersion: false
  allowGlobalInstall: true
  execution:
    command: npx
    args:
      - --no-install
      - ccfrank
---

# CCFrank

查询会议/期刊的 CCF 等级（A/B/C/E/P/none）。

## 安装配置（MCP）

全局安装 CLI（安装命令不限制版本）：

```bash
npm install -g ccfrank
```

```json
{
  "mcpServers": {
    "ccfrank": {
      "command": "npx",
      "args": ["--no-install", "ccfrank"]
    }
  }
}
```

## 使用

调用工具：`ccfrank.ccf_rank`

- 参数：`query: string`
- 支持输入：简称（如 `PLDI`）、全称、DBLP 路径（如 `/conf/pldi/2024`）

示例：`PLDI`、`ICSE`、`IEEE Transactions on Software Engineering`

## 返回字段（核心）

- `matched`：是否匹配
- `rank`：`A | B | C | E | P | none`
- `canonicalName`：标准名称
- `venueType`：`conference | journal`
- `matchedBy`：匹配方式（简称/全称/URL）
- `sourceKey`：归一化来源键

## 说明

- 数据基于 CCF 2026 年 3 月版目录
- 未收录返回 `none`
- 元数据依赖固定为 `ccfrank@4.5.5`（含 `integrity` / `tarball`）

## 资源

- GitHub: https://github.com/m2kar/CCFrank4dblp
- CCF 官方目录: https://www.ccf.org.cn/Academic_Evaluation/By_category/
