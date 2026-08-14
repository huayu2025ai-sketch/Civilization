# 文明6 · 终极拓荒指南

一个面向《文明 VI》玩家的中文静态攻略站，采用"首页总览 + 专题页面"的结构，方便按主题浏览基础玩法、胜利路线、领袖资料和实战攻略。

## 页面导航

| 页面 | 文件 | 内容 |
| --- | --- | --- |
| 首页总览 | `index.html` | 网站入口、4X核心循环、内容概览与精选攻略 |
| 基础玩法 | `basics.html` | 探索、扩张、开发、威慑，城市、区域、资源与时代 |
| 胜利路线 | `victories.html` | 科技、文化、统治、宗教、外交、分数六种胜利 |
| 征服之路 | `domination.html` | 征服胜利专题、战斗机制、军事战略与实战指南 |
| 领袖百科 | `leaders.html` | 领袖筛选、文明特色、胜利方向与本地头像 |
| 资料库 | `database.html` | 科技树、市政树、建筑、区域、兵种与单位 |
| 实战手册 | `playbook.html` | 前50回合开局、路线执行、战争、政策与决策速查 |
| 技巧库 | `tips.html` | 区域规划、尤里卡/鼓舞、城市管理、战争与回合清单 |

## 项目结构

```text
.
├── index.html              # 首页总览
├── basics.html             # 基础玩法
├── victories.html          # 胜利路线
├── domination.html         # 征服之路
├── leaders.html            # 领袖百科
├── database.html           # 科技/市政/建筑/兵种资料库
├── playbook.html           # 实战手册
├── styles.css              # 全站样式、响应式布局与主题变量
├── script.js               # 胜利弹窗、筛选、搜索、资料库标签切换
├── site-nav.js             # 多页面共用导航与移动端菜单
└── assets/leaders/         # 领袖头像资源
```

## 使用方式

本项目不依赖构建工具、服务器或第三方 JavaScript 库，直接用浏览器打开 `index.html` 即可：

```text
双击 index.html
```

也可以在项目目录启动一个本地静态服务器：

```bash
python3 -m http.server 8000
```

然后访问：<http://localhost:8000>

### Docker 部署

使用 Docker Compose 启动静态站点：

```bash
docker compose up -d --build
```

查看运行状态：

```bash
docker compose ps
```

站点只在 Docker 网络中暴露容器 `80` 端口。使用 Nginx Proxy Manager 时，将上游设置为
`civilization:80`（或容器名 `civilization-guide:80`），并确保代理容器与本站点位于同一
Docker 网络。

停止服务：

```bash
docker compose down
```

## 主要功能

- 多页面专题导航，当前页面会自动高亮。
- 响应式布局，支持桌面端和移动端菜单。
- 胜利条件卡片可打开详细路线弹窗。
- 领袖按科技、文化、侵略扩张方向筛选。
- 领袖头像使用本地资源，避免外部图片加载失败。
- 资料库支持科技树、市政树、建筑区域、兵种单位四类标签切换。
- 页面内搜索可高亮包含关键词的内容卡片。
- 征服之路专题提供战斗机制与军事战略指南。
- 使用语义化 HTML、CSS 变量、Grid/Flexbox 和原生 ES6 JavaScript。

## 技术栈

- HTML5
- CSS3：CSS Variables、Grid、Flexbox、媒体查询、动画与过渡
- Vanilla JavaScript：无依赖、无框架
- Google Fonts：Cinzel、Noto Sans SC
- Docker：容器化部署

## 内容说明

本站为玩家制作的非商业性攻略项目，内容用于学习、查阅和玩法参考。不同版本、资料片、游戏模式和规则设置可能影响具体数值与解锁条件，实战时请以游戏内界面为准。

《文明 VI》及相关文明、领袖、图像和商标归 2K Games、Firaxis Games 及其权利方所有。本项目不代表官方立场，也不用于商业用途。

官方站点：<https://civilization.2k.com/>

## 后续扩展建议

- 将科技、市政、建筑和兵种资料拆成可搜索的结构化数据。
- 增加资料片、游戏模式和文明特色的筛选器。
- 为区域邻接、城市规划和开局流程增加交互式地图示例。
- 增加深色/浅色主题切换与打印版攻略布局。
