# 储贻磊 · 个人作品集

单页叙事 + 路由化详情。首页像一场发布会（滚动钉住的项目四拍），详情走真路由，
从卡片点开时用 `layoutId` 把它放大成整页——按 Esc 或点背景回来，列表的滚动位置还在。

除 Next.js / React / Framer Motion / Tailwind 之外没有别的依赖，
没有 UI 组件库，没有外部字体，没有位图（项目预览是用 SVG 画的）。

## 路由

| 路径 | 说明 |
| --- | --- |
| `/` | 首页叙事：Hero → 工作（三段滚动钉住）→ 技术栈 → 经历 → 数据 → 笔记 → 联系 |
| `/work` | 项目索引，三张卡片 |
| `/work/[slug]` | 项目复盘整页（直接访问或刷新时走这里） |
| `/notes` | 笔记列表 |
| `/notes/[slug]` | 单篇笔记，构建时从 `content/notes/*.md` 读 |
| `/about` | 关于 |

`app/@modal/(.)work/[slug]/page.jsx` 是拦截路由：站内点卡片时命中它，弹出详情层，
底下那页不卸载。这是布局动画能共享同一个元素的前提；直接访问就是普通整页。

## 改内容

- 文案、项目、技术栈、经历、数据：`lib/content.js`（全站唯一来源）
- 笔记：`content/notes/*.md`，frontmatter 手写 `title / date / minutes / status / summary`
- 简历：`public/resume.pdf`
- 设计 token（颜色、字号、间距、圆角、缓动）：`app/globals.css` 顶部的 `:root`

## 自检

```bash
node scripts/check-contrast.mjs   # 两套配色的 WCAG AA 对比度
node scripts/verify-ui.mjs        # 起 Edge 无头浏览器截图 + 断言（需先 pnpm start）
```

`scripts/verify-ui.mjs` 会把 1440 / 768 / 390 三个视口、明暗两套配色、正常与降级动效
的截图写进 `screenshots/`，同时验证：拦截路由能开、Esc 能关、拦截后用后退回到列表、
深色与降级参数生效、移动端四拍顺排、Tab 第一下落在跳转链接上。

调试参数：`?theme=dark` 强制配色，`?motion=reduce` 强制降级动效（两者都只影响当次访问）。

## 设计约束

- 只有黑、白、灰三阶 + 一个强调色（`#0071E3` / 深色 `#2997FF`），强调色只出现在 CTA、链接、进度条
- 缓动统一 `cubic-bezier(0.16, 1, 0.3, 1)`，动画只动 `transform` 与 `opacity`
- 滚动全部走 IntersectionObserver；唯一的连续滚动监听（Hero 背景 + 预览视差）由 Framer Motion 内部的 rAF 合并
- `prefers-reduced-motion` 与 `?motion=reduce` 都退化为淡入：关掉打字机、视差、鼠标光晕
- 深浅色都过 WCAG AA（正文 4.5:1，见 `scripts/check-contrast.mjs`）
