// 全站唯一的文案来源。所有对外的说法都取自简历与真实项目，不编造。
// 这个文件被客户端组件引用，所以不要在这里引入 node:fs 之类的服务端能力。

export const profile = {
  name: '储贻磊',
  latin: 'CHU YILEI',
  tagline: '把想法做成能上线的东西。',
  intro:
    '软件工程本科在读。做过一个已经跑在本地的小工具，和一款已经过审上线的小程序。',
  email: '1542120178@qq.com',
  location: '南京 · 中国',
  links: [
    { label: '邮箱', href: 'mailto:1542120178@qq.com', note: '1542120178@qq.com' },
    { label: '简历', href: '/resume.pdf', note: '一页 PDF' },
    { label: 'GitHub', href: null, note: '账号筹备中' },
  ],
};

// 首页锚点 + 右侧刻度导航共用这一份
export const sections = [
  { id: 'work', label: '工作', index: '01' },
  { id: 'stack', label: '技术栈', index: '02' },
  { id: 'path', label: '经历', index: '03' },
  { id: 'numbers', label: '数据', index: '04' },
  { id: 'notes', label: '笔记', index: '05' },
  { id: 'contact', label: '联系', index: '06' },
];

export const navLinks = [
  { href: '/', label: '首页' },
  { href: '/work', label: '工作' },
  { href: '/notes', label: '笔记' },
  { href: '/about', label: '关于' },
];

export const beatLabels = ['问题', '方案', '技术决策', '结果'];

export const projects = [
  {
    slug: 'storyboard',
    order: '01',
    preview: 'storyboard',
    cardBeat: 1,  // 列表卡片显示方案拍
    kicker: '本地工具 · 2026',
    title: '短剧分镜生成器',
    subtitle: '把「填三个空、等十几秒」换成五条能直接拍的分镜',
    summary:
      '给短剧写手用的本地工具：十到三十秒把剧本拆成 5 条结构化分镜，每条六栏信息，可单条复制、可整份导出 Markdown 与 JSON。',
    role: '独立开发 · 全流程',
    stack: ['Node.js', 'SSE', 'qwen3.6-plus'],
    beats: [
      '写完一集短剧，分镜还得手抄一遍：镜号、画面、动作、台词、镜别、画面提示词。五条下来大半个小时，格式还每次都不一样。',
      '做一个本地小工具：填短剧主题、剧本原文、风格偏好，十到三十秒产出 5 条分镜；每条自带六栏信息，可以单条复制，也可以整份导出 Markdown 和 JSON。',
      '密钥不进浏览器：页面只打同源的 127.0.0.1 接口，Key 只留在服务端内存里，/api/health 只回掩码；服务只监听本机，且拒绝一切以点开头的路径，.env.local 走不出 HTTP；模型输出一律用 textContent 渲染，免得提示注入变成 XSS。还踩到一个坑——百炼的结构化输出与深度思考模式互斥，开思考时只能改用提示词去约束 JSON。',
      '十到三十秒出 5 条分镜，格式稳定；单文件页面配零依赖 Node 服务，双击「启动.bat」就能跑起来。',
    ],
    facts: [
      { k: '形态', v: '单文件页面 + 零依赖本地服务' },
      { k: '模型', v: 'qwen3.6-plus（可替换）' },
      { k: '产出', v: '5 条分镜 / 次' },
      { k: '单次耗时', v: '10 – 30 秒' },
    ],
  },
  {
    slug: 'miniapp',
    order: '02',
    preview: 'miniapp',
    cardBeat: 3,  // 列表卡片显示结果拍
    kicker: '微信小程序 · 已上线',
    title: '测试类小程序',
    subtitle: '从划需求到过审上线，一个人走完全程',
    summary:
      '题目逻辑与结果计算独立建模的测试类小程序：答题即出结果，结果页可分享，已通过平台审核正式上线。',
    role: '独立开发 · 已上线',
    stack: ['微信开发者工具', '前后端联调', '审核发布'],
    beats: [
      '测试类内容天生适合转发，但光有题目没法承载：得有人能答题、能马上看到结果，还愿意把结果页发给朋友。',
      '做成微信小程序：答题、结果计算、分享三条链路打通，测完立刻出结果，结果页自带分享入口，把「测完想问别人」这件事接住。',
      '先把模型定下来再画页面：题目、选项、计分规则、结果区间四份结构分开，换一整套题都不用动界面；接口联调跑通之后才提审，避免返工重排队。',
      '通过平台审核正式上线，完整走了一遍需求 → 设计 → 实现 → 联调 → 提审 → 发布。',
    ],
    facts: [
      { k: '平台', v: '微信小程序' },
      { k: '状态', v: '已通过审核上线' },
      { k: '链路', v: '答题 / 计分 / 分享' },
      { k: '协作', v: '独立完成' },
    ],
  },
  {
    slug: 'this-site',
    order: '03',
    preview: 'thisSite',
    cardBeat: 3,  // 列表卡片显示结果拍
    kicker: '本站 · 2026',
    title: '这个网站本身',
    subtitle: '把一页简历，改成一场发布会',
    summary:
      '就是你现在看的这一页：单页叙事加六条路由，项目用滚动钉住的四拍讲清楚判断，而不是罗列技术名词。',
    role: '独立开发 · 设计 + 实现',
    stack: ['Next.js 14', 'Tailwind', 'Framer Motion'],
    beats: [
      '简历只能讲清「做过什么」，讲不清「怎么想的」。而这两个项目的价值，恰恰藏在那些判断里。',
      '借 Apple 产品页的结构：一个项目一整屏，滚动钉住；左边随滚动切换四拍——问题、方案、技术决策、结果；右边静帧跟着轻轻移动。',
      '默认全部服务端渲染，只有真的需要交互的组件才进 use client；零外部字体、零位图，产品预览是用 SVG 画的；动画只动 transform 和 opacity；项目卡片与详情共用 layoutId，靠拦截路由让两边同时挂在同一棵树里，才有那一下放大。',
      '你现在正在看的这一页就是产物：单页六段叙事、六条路由、一套设计 token，深浅色都过 WCAG AA。',
    ],
    facts: [
      { k: '栈', v: 'Next.js 14 · Tailwind · Framer Motion' },
      { k: '路由', v: '6 条（含拦截路由）' },
      { k: '外部资源', v: '0 个字库 / 0 张位图' },
      { k: '动效', v: '只用 transform 与 opacity' },
    ],
  },
];

export function getProject(slug) {
  return projects.find((p) => p.slug === slug) || null;
}

// 芯片爆炸图：核心 + 三层
export const stack = {
  core: { name: 'Vibe Coding', note: '用 AI 协作，把想法推到能用的那一步' },
  layers: [
    {
      id: 'lang',
      label: '语言',
      items: [
        { name: 'Python', note: '数据处理与脚本' },
        { name: 'Java', note: '课程与程序设计' },
        { name: 'C', note: '基础语法' },
      ],
    },
    {
      id: 'data',
      label: '数据',
      items: [
        { name: 'Jupyter', note: '边写边看' },
        { name: 'Pandas', note: '清洗与统计' },
        { name: 'Matplotlib', note: '画出来验证' },
      ],
    },
    {
      id: 'tool',
      label: '工具与交付',
      items: [
        { name: 'Git', note: '版本管理' },
        { name: 'VS Code', note: '主力编辑器' },
        { name: '微信开发者工具', note: '小程序调试' },
        { name: 'Node.js', note: '本地服务' },
      ],
    },
  ],
};

export const stackCount = stack.layers.reduce((n, l) => n + l.items.length, 0);

export const changelog = [
  {
    version: 'v3.0',
    period: '2026.09 — 至今',
    title: '软件工程 · 本科在读',
    org: '南京理工大学泰州科技学院',
    tag: '专升本 / 软件开发方向',
    points: [
      '课程：数据结构、算法设计、Java 程序设计、软件工程导论',
      '把课堂上的结构训练，直接搬回自己的项目里用',
    ],
  },
  {
    version: 'v2.0',
    period: '2023 — 2026',
    title: '自学与项目实践',
    org: '独立',
    tag: '两个项目，两种能力',
    points: [
      '短剧分镜生成器：把模型能力包成一个能用的本地工具',
      '测试类小程序：从提审到上线，完整走一遍',
      '养成一个习惯：先定结构，再动手写界面',
    ],
  },
  {
    version: 'v1.0',
    period: '2020.09 — 2023.06',
    title: '云计算技术与应用 · 专科',
    org: '南京信息职业技术学院',
    tag: '打底的部分',
    points: [
      '课程：云计算基础、Linux 系统管理、计算机网络、数据库原理',
      '服务器、网络、环境配置——后来做项目时全靠这些底子',
    ],
  },
];

export const stats = [
  { value: 3, label: '独立项目', note: '都从需求走到能用', pad: 2 },
  { value: 1, label: '已上线的产品', note: '微信小程序，已过审', pad: 2 },
  { value: 5, label: '条分镜 / 次', note: '10–30 秒生成', pad: 2 },
  { value: stackCount, label: '项技术栈', note: '语言 / 数据 / 工具三层', pad: 2 },
];
