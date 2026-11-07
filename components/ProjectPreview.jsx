// 项目预览全部用 SVG 画，不引位图：深浅色自动跟随变量，缩放不糊，也不用额外请求。
// 每一拍对应一张不同的卡片内容，滚动切换时跟着 beat 变。
const SANS =
  "system-ui, -apple-system, 'SF Pro Display', 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif";
const MONO = 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';

const ink = 'var(--ink)';
const muted = 'var(--muted)';
const line = 'var(--line)';
const lineStrong = 'var(--line-strong)';
const paper = 'var(--paper)';
const surface = 'var(--surface)';
const accent = 'var(--accent)';
const accentInk = 'var(--accent-ink)';

// 统一卡片外框：三个项目共用同一张壳，只换内部内容
function CardFrame({ children, label }) {
  return (
    <svg
      viewBox="0 0 640 420"
      role="img"
      aria-label={label}
      style={{ transition: 'opacity 320ms ease' }}
    >
      <rect x="16" y="16" width="608" height="388" rx="20" fill={paper} stroke={line} />
      {children}
    </svg>
  );
}

/* ==================== 短剧分镜生成器 ==================== */

function StoryboardBeat0() {
  // 问题：手动抄写分镜，格式混乱
  return (
    <g>
      <text x="36" y="58" fontFamily={MONO} fontSize="9" fill={muted}>
        手抄分镜 · 格式乱
      </text>

      <rect x="36" y="76" width="180" height="7" rx="3" fill={lineStrong} />
      <rect x="60" y="94" width="240" height="6" rx="3" fill={line} />
      <rect x="36" y="110" width="150" height="6" rx="3" fill={line} />
      <rect x="80" y="126" width="200" height="6" rx="3" fill={line} />

      <line x1="36" y1="150" x2="604" y2="150" stroke={line} strokeDasharray="4 4" />

      <rect x="36" y="168" width="220" height="6" rx="3" fill={lineStrong} />
      <rect x="36" y="184" width="180" height="6" rx="3" fill={line} />
      <rect x="70" y="200" width="260" height="6" rx="3" fill={line} />
      <rect x="36" y="216" width="140" height="6" rx="3" fill={line} />

      <line x1="36" y1="240" x2="604" y2="240" stroke={line} strokeDasharray="4 4" />

      <rect x="36" y="258" width="200" height="6" rx="3" fill={lineStrong} />
      <rect x="56" y="274" width="230" height="6" rx="3" fill={line} />
      <rect x="36" y="290" width="160" height="6" rx="3" fill={line} />

      <text x="420" y="90" fontFamily={MONO} fontSize="10" fill={muted}>01</text>
      <rect x="446" y="82" width="100" height="5" rx="2" fill={line} />

      <text x="420" y="170" fontFamily={MONO} fontSize="10" fill={muted}>02</text>
      <rect x="446" y="162" width="120" height="5" rx="2" fill={line} />

      <text x="420" y="260" fontFamily={MONO} fontSize="10" fill={muted}>03</text>
      <rect x="446" y="252" width="90" height="5" rx="2" fill={line} />

      <text x="36" y="366" fontFamily={MONO} fontSize="9" fill={muted}>
        半小时 · 格式每次都不一样
      </text>
    </g>
  );
}

function StoryboardBeat1() {
  // 方案：工具界面——左栏输入，右栏生成
  return (
    <g>
      <text x="36" y="58" fontFamily={MONO} fontSize="9" fill={muted}>
        本地工具 · 填三个空就出结果
      </text>

      {/* 左栏：输入区 */}
      <rect x="36" y="80" width="220" height="280" rx="12" fill={surface} stroke={line} />

      <text x="56" y="108" fontFamily={SANS} fontSize="11" fill={muted}>主题</text>
      <rect x="56" y="116" width="180" height="28" rx="8" fill={paper} stroke={line} />
      <text x="68" y="134" fontFamily={SANS} fontSize="11" fill={ink}>都市 · 反转</text>

      <text x="56" y="164" fontFamily={SANS} fontSize="11" fill={muted}>剧本原文</text>
      <rect x="56" y="172" width="180" height="60" rx="8" fill={paper} stroke={line} />
      <rect x="68" y="186" width="150" height="5" rx="2" fill={line} />
      <rect x="68" y="198" width="130" height="5" rx="2" fill={line} />
      <rect x="68" y="210" width="140" height="5" rx="2" fill={line} />

      <text x="56" y="256" fontFamily={SANS} fontSize="11" fill={muted}>风格</text>
      <rect x="56" y="264" width="180" height="28" rx="8" fill={paper} stroke={line} />
      <text x="68" y="282" fontFamily={SANS} fontSize="11" fill={ink}>电影感 · 冷调</text>

      <rect x="56" y="312" width="180" height="32" rx="16" fill={accent} />
      <text x="146" y="333" fontFamily={SANS} fontSize="11" fontWeight="500" fill={accentInk} textAnchor="middle">
        生成 5 条分镜
      </text>

      {/* 右栏：结果占位 */}
      <rect x="280" y="80" width="324" height="280" rx="12" fill={surface} stroke={line} />
      <text x="300" y="108" fontFamily={MONO} fontSize="9" fill={muted}>输出 · 五条分镜</text>

      {[0, 1, 2].map((i) => (
        <g key={i}>
          <text x="300" y={138 + i * 44} fontFamily={MONO} fontSize="10" fill={accent}>
            {String(i + 1).padStart(2, '0')}
          </text>
          <rect x="326" y={130 + i * 44} width="200" height="6" rx="3" fill={lineStrong} />
          <rect x="326" y={144 + i * 44} width="140" height="4" rx="2" fill={line} />
        </g>
      ))}

      <rect x="300" y="276" width="80" height="22" rx="11" stroke={line} fill="none" />
      <text x="340" y="291" fontFamily={MONO} fontSize="8" fill={muted} textAnchor="middle">
        导出 md
      </text>
      <rect x="392" y="276" width="80" height="22" rx="11" stroke={line} fill="none" />
      <text x="432" y="291" fontFamily={MONO} fontSize="8" fill={muted} textAnchor="middle">
        导出 json
      </text>
    </g>
  );
}

function StoryboardBeat2() {
  // 技术决策：安全架构
  return (
    <g>
      <text x="36" y="58" fontFamily={MONO} fontSize="9" fill={muted}>
        安全架构 · 密钥不进浏览器
      </text>

      <rect x="36" y="80" width="160" height="80" rx="12" fill={surface} stroke={line} />
      <text x="116" y="106" fontFamily={SANS} fontSize="11" fontWeight="500" fill={ink} textAnchor="middle">
        浏览器页面
      </text>
      <rect x="56" y="120" width="120" height="5" rx="2" fill={line} />
      <rect x="56" y="134" width="90" height="5" rx="2" fill={line} />
      <text x="116" y="152" fontFamily={MONO} fontSize="8" fill={muted} textAnchor="middle">
        textContent 渲染
      </text>

      <rect x="240" y="80" width="160" height="80" rx="12" fill={surface} stroke={accent} />
      <text x="320" y="106" fontFamily={SANS} fontSize="11" fontWeight="500" fill={ink} textAnchor="middle">
        127.0.0.1 本地服务
      </text>
      <rect x="260" y="120" width="120" height="5" rx="2" fill={line} />
      <rect x="260" y="134" width="100" height="5" rx="2" fill={line} />
      <text x="320" y="152" fontFamily={MONO} fontSize="8" fill={accent} textAnchor="middle">
        密钥只在内存里
      </text>

      <rect x="444" y="80" width="160" height="80" rx="12" fill={surface} stroke={line} />
      <text x="524" y="106" fontFamily={SANS} fontSize="11" fontWeight="500" fill={ink} textAnchor="middle">
        qwen3.6-plus
      </text>
      <rect x="464" y="120" width="120" height="5" rx="2" fill={line} />
      <rect x="464" y="134" width="80" height="5" rx="2" fill={line} />
      <text x="524" y="152" fontFamily={MONO} fontSize="8" fill={muted} textAnchor="middle">
        结构化输出约束
      </text>

      <line x1="196" y1="120" x2="240" y2="120" stroke={lineStrong} strokeWidth="1.5" />
      <line x1="400" y1="120" x2="444" y2="120" stroke={lineStrong} strokeWidth="1.5" />

      <rect x="36" y="200" width="568" height="120" rx="12" fill={surface} stroke={line} />
      <text x="56" y="228" fontFamily={SANS} fontSize="11" fontWeight="500" fill={ink}>
        三道防线
      </text>

      <circle cx="60" cy="252" r="3" fill={accent} />
      <text x="74" y="256" fontFamily={SANS} fontSize="10" fill={muted}>
        只监听本机，拒绝一切以点开头的路径
      </text>

      <circle cx="60" cy="276" r="3" fill={accent} />
      <text x="74" y="280" fontFamily={SANS} fontSize="10" fill={muted}>
        /api/health 只回掩码，不泄露 Key
      </text>

      <circle cx="60" cy="300" r="3" fill={accent} />
      <text x="74" y="304" fontFamily={SANS} fontSize="10" fill={muted}>
        模型输出一律 textContent，防提示注入 XSS
      </text>

      <text x="36" y="366" fontFamily={MONO} fontSize="9" fill={muted}>
        踩坑：结构化输出与深度思考互斥，改用提示词约束 JSON
      </text>
    </g>
  );
}

function StoryboardBeat3() {
  // 结果：五条整齐分镜 + 导出
  const rows = [0, 1, 2, 3, 4];

  return (
    <g>
      <text x="36" y="58" fontFamily={MONO} fontSize="9" fill={muted}>
        10–30 秒 · 五条分镜整齐输出
      </text>

      {rows.map((i) => {
        const y = 76 + i * 52;
        return (
          <g key={i}>
            <text x="36" y={y + 16} fontFamily={MONO} fontSize="11" fill={accent}>
              {String(i + 1).padStart(2, '0')}
            </text>
            <rect x="64" y={y + 6} width="280" height="7" rx="3" fill={lineStrong} />
            <rect x="64" y={y + 20} width="200" height="5" rx="2" fill={line} />

            <rect x="460" y={y + 4} width="60" height="14" rx="7" stroke={line} fill="none" />
            <text x="490" y={y + 14} fontFamily={MONO} fontSize="8" fill={muted} textAnchor="middle">
              {['全景', '近景', '特写', '跟拍', '空镜'][i]}
            </text>

            <rect x="532" y={y + 4} width="60" height="14" rx="7" fill={surface} stroke={line} />
            <text x="562" y={y + 14} fontFamily={MONO} fontSize="8" fill={muted} textAnchor="middle">
              复制
            </text>

            {i < 4 && <line x1="36" y1={y + 40} x2="604" y2={y + 40} stroke={line} />}
          </g>
        );
      })}

      <rect x="36" y="344" width="120" height="28" rx="14" fill={accent} />
      <text x="96" y="363" fontFamily={SANS} fontSize="10" fontWeight="500" fill={accentInk} textAnchor="middle">
        导出 Markdown
      </text>
      <rect x="168" y="344" width="120" height="28" rx="14" stroke={lineStrong} fill="none" />
      <text x="228" y="363" fontFamily={SANS} fontSize="10" fill={ink} textAnchor="middle">
        导出 JSON
      </text>
    </g>
  );
}

/* ==================== 测试类小程序 ==================== */

function MiniappBeat0() {
  // 问题：只有题目，没有结果
  return (
    <g>
      <text x="36" y="58" fontFamily={MONO} fontSize="9" fill={muted}>
        光有题目 · 测完不知道发什么
      </text>

      <rect x="200" y="80" width="240" height="280" rx="28" fill={surface} stroke={line} />
      <rect x="296" y="92" width="48" height="6" rx="3" fill={lineStrong} />

      <text x="220" y="124" fontFamily={MONO} fontSize="9" fill={muted}>
        TEST · 01
      </text>
      <rect x="220" y="134" width="160" height="10" rx="5" fill={lineStrong} />
      <rect x="220" y="152" width="120" height="6" rx="3" fill={line} />

      {[0, 1, 2].map((i) => {
        const y = 178 + i * 40;
        return (
          <g key={i}>
            <rect x="220" y={y} width="200" height="30" rx="10" fill={paper} stroke={line} />
            <rect x="234" y={y + 12} width="100" height="6" rx="3" fill={line} />
          </g>
        );
      })}

      <rect x="220" y="300" width="200" height="32" rx="16" stroke={line} fill="none" strokeDasharray="4 4" />
      <text x="320" y="320" fontFamily={MONO} fontSize="9" fill={muted} textAnchor="middle">
        没有结果页 · 没法分享
      </text>

      <text x="500" y="180" fontFamily={SANS} fontSize="48" fontWeight="700" fill={line}>
        ?
      </text>
      <rect x="490" y="200" width="80" height="5" rx="2" fill={line} />
      <rect x="490" y="214" width="60" height="5" rx="2" fill={line} />
    </g>
  );
}

function MiniappBeat1() {
  // 方案：三条链路打通
  return (
    <g>
      <text x="36" y="58" fontFamily={MONO} fontSize="9" fill={muted}>
        三条链路 · 答题 → 结果 → 分享
      </text>

      {/* 第一步：答题 */}
      <rect x="36" y="100" width="160" height="140" rx="14" fill={surface} stroke={line} />
      <text x="116" y="128" fontFamily={SANS} fontSize="12" fontWeight="600" fill={ink} textAnchor="middle">
        1 · 答题
      </text>
      <rect x="56" y="144" width="120" height="6" rx="3" fill={lineStrong} />
      <rect x="56" y="160" width="100" height="5" rx="2" fill={line} />
      <rect x="56" y="174" width="110" height="5" rx="2" fill={line} />
      <rect x="56" y="196" width="120" height="20" rx="10" stroke={line} fill="none" />
      <text x="116" y="210" fontFamily={MONO} fontSize="8" fill={muted} textAnchor="middle">
        下一题
      </text>

      {/* 箭头 */}
      <text x="210" y="175" fontFamily={SANS} fontSize="16" fill={lineStrong} textAnchor="middle">
        →
      </text>

      {/* 第二步：结果 */}
      <rect x="230" y="100" width="160" height="140" rx="14" fill={surface} stroke={line} />
      <text x="310" y="128" fontFamily={SANS} fontSize="12" fontWeight="600" fill={ink} textAnchor="middle">
        2 · 结果
      </text>
      <rect x="250" y="144" width="120" height="6" rx="3" fill={lineStrong} />
      <rect x="250" y="160" width="90" height="5" rx="2" fill={line} />
      <rect x="250" y="174" width="100" height="5" rx="2" fill={line} />
      <rect x="250" y="196" width="120" height="20" rx="10" fill={accent} />
      <text x="310" y="210" fontFamily={MONO} fontSize="8" fill={accentInk} textAnchor="middle">
        查看结果
      </text>

      {/* 箭头 */}
      <text x="404" y="175" fontFamily={SANS} fontSize="16" fill={lineStrong} textAnchor="middle">
        →
      </text>

      {/* 第三步：分享 */}
      <rect x="424" y="100" width="180" height="140" rx="14" fill={surface} stroke={accent} />
      <text x="514" y="128" fontFamily={SANS} fontSize="12" fontWeight="600" fill={ink} textAnchor="middle">
        3 · 分享
      </text>
      <rect x="444" y="144" width="140" height="6" rx="3" fill={lineStrong} />
      <rect x="444" y="160" width="110" height="5" rx="2" fill={line} />
      <rect x="444" y="174" width="120" height="5" rx="2" fill={line} />
      <rect x="444" y="196" width="140" height="20" rx="10" stroke={accent} fill="none" />
      <text x="514" y="210" fontFamily={MONO} fontSize="8" fill={accent} textAnchor="middle">
        分享给朋友
      </text>

      {/* 底部说明 */}
      <rect x="36" y="270" width="568" height="70" rx="12" fill={surface} stroke={line} />
      <text x="56" y="298" fontFamily={SANS} fontSize="11" fill={muted}>
        测完立刻出结果，结果页自带分享入口
      </text>
      <text x="56" y="320" fontFamily={SANS} fontSize="11" fill={muted}>
        把「测完想问别人」这件事接住
      </text>
    </g>
  );
}

function MiniappBeat2() {
  // 技术决策：四份结构独立
  return (
    <g>
      <text x="36" y="58" fontFamily={MONO} fontSize="9" fill={muted}>
        先定结构 · 四份独立建模
      </text>

      <rect x="36" y="84" width="130" height="100" rx="14" fill={surface} stroke={line} />
      <text x="101" y="112" fontFamily={SANS} fontSize="12" fontWeight="600" fill={ink} textAnchor="middle">
        题目
      </text>
      <rect x="56" y="126" width="90" height="5" rx="2" fill={line} />
      <rect x="56" y="140" width="70" height="5" rx="2" fill={line} />
      <rect x="56" y="154" width="80" height="5" rx="2" fill={line} />

      <rect x="180" y="84" width="130" height="100" rx="14" fill={surface} stroke={line} />
      <text x="245" y="112" fontFamily={SANS} fontSize="12" fontWeight="600" fill={ink} textAnchor="middle">
        选项
      </text>
      <rect x="200" y="126" width="90" height="5" rx="2" fill={line} />
      <rect x="200" y="140" width="80" height="5" rx="2" fill={line} />
      <rect x="200" y="154" width="60" height="5" rx="2" fill={line} />

      <rect x="324" y="84" width="130" height="100" rx="14" fill={surface} stroke={line} />
      <text x="389" y="112" fontFamily={SANS} fontSize="12" fontWeight="600" fill={ink} textAnchor="middle">
        计分规则
      </text>
      <rect x="344" y="126" width="90" height="5" rx="2" fill={line} />
      <rect x="344" y="140" width="70" height="5" rx="2" fill={line} />

      <rect x="468" y="84" width="130" height="100" rx="14" fill={surface} stroke={accent} />
      <text x="533" y="112" fontFamily={SANS} fontSize="12" fontWeight="600" fill={ink} textAnchor="middle">
        结果区间
      </text>
      <rect x="488" y="126" width="90" height="5" rx="2" fill={line} />
      <rect x="488" y="140" width="80" height="5" rx="2" fill={line} />
      <rect x="488" y="154" width="70" height="5" rx="2" fill={line} />

      <line x1="166" y1="134" x2="180" y2="134" stroke={lineStrong} strokeWidth="1.5" />
      <line x1="310" y1="134" x2="324" y2="134" stroke={lineStrong} strokeWidth="1.5" />
      <line x1="454" y1="134" x2="468" y2="134" stroke={lineStrong} strokeWidth="1.5" />

      <rect x="36" y="216" width="568" height="100" rx="12" fill={surface} stroke={line} />
      <text x="56" y="244" fontFamily={SANS} fontSize="11" fontWeight="500" fill={ink}>
        换一整套题都不用动界面
      </text>
      <text x="56" y="270" fontFamily={SANS} fontSize="10" fill={muted}>
        接口联调跑通之后才提审，避免返工重排队
      </text>

      <text x="36" y="356" fontFamily={MONO} fontSize="9" fill={muted}>
        需求 → 设计 → 实现 → 联调 → 提审 → 发布
      </text>
    </g>
  );
}

function MiniappBeat3() {
  // 结果：结果页 + 分享
  return (
    <g>
      <text x="36" y="58" fontFamily={MONO} fontSize="9" fill={muted}>
        已过审上线 · 结果可分享
      </text>

      <rect x="180" y="76" width="200" height="300" rx="26" fill={paper} stroke={line} />
      <rect x="256" y="88" width="48" height="6" rx="3" fill={lineStrong} />

      <rect x="200" y="110" width="160" height="140" rx="16" fill={surface} stroke={line} />
      <text x="280" y="138" fontFamily={MONO} fontSize="9" fill={muted} textAnchor="middle">
        你的结果是
      </text>
      <rect x="224" y="152" width="112" height="14" rx="7" fill={lineStrong} />
      <rect x="240" y="176" width="80" height="6" rx="3" fill={line} />
      <rect x="232" y="190" width="96" height="6" rx="3" fill={line} />
      <rect x="248" y="204" width="64" height="6" rx="3" fill={line} />

      <rect x="200" y="270" width="160" height="36" rx="18" fill={accent} />
      <text x="280" y="293" fontFamily={SANS} fontSize="11" fontWeight="500" fill={accentInk} textAnchor="middle">
        分享给朋友
      </text>

      <text x="280" y="330" fontFamily={MONO} fontSize="9" fill={muted} textAnchor="middle">
        已通过平台审核
      </text>

      <circle cx="460" cy="140" r="24" fill={accent} opacity="0.1" />
      <circle cx="460" cy="140" r="14" fill={accent} />
      <text x="460" y="145" fontFamily={SANS} fontSize="12" fontWeight="700" fill={accentInk} textAnchor="middle">
        ✓
      </text>
      <text x="460" y="186" fontFamily={SANS} fontSize="11" fontWeight="600" fill={ink} textAnchor="middle">
        正式上线
      </text>
      <text x="460" y="206" fontFamily={MONO} fontSize="9" fill={muted} textAnchor="middle">
        微信小程序
      </text>
    </g>
  );
}

/* ==================== 这个网站本身 ==================== */

function ThisSiteBeat0() {
  // 问题：传统简历密密麻麻
  return (
    <g>
      <text x="36" y="58" fontFamily={MONO} fontSize="9" fill={muted}>
        简历只讲「做过什么」 · 讲不清怎么想的
      </text>

      <rect x="36" y="80" width="300" height="280" rx="12" fill={paper} stroke={line} />

      <rect x="56" y="100" width="120" height="12" rx="6" fill={lineStrong} />
      <rect x="56" y="122" width="80" height="5" rx="2" fill={line} />

      <line x1="56" y1="140" x2="316" y2="140" stroke={line} />

      <rect x="56" y="156" width="60" height="7" rx="3" fill={lineStrong} />
      <rect x="56" y="172" width="240" height="5" rx="2" fill={line} />
      <rect x="56" y="184" width="220" height="5" rx="2" fill={line} />
      <rect x="56" y="196" width="200" height="5" rx="2" fill={line} />

      <rect x="56" y="220" width="60" height="7" rx="3" fill={lineStrong} />
      <rect x="56" y="236" width="240" height="5" rx="2" fill={line} />
      <rect x="56" y="248" width="180" height="5" rx="2" fill={line} />

      <rect x="56" y="272" width="60" height="7" rx="3" fill={lineStrong} />
      <rect x="56" y="288" width="240" height="5" rx="2" fill={line} />
      <rect x="56" y="300" width="210" height="5" rx="2" fill={line} />
      <rect x="56" y="312" width="190" height="5" rx="2" fill={line} />
      <rect x="56" y="324" width="150" height="5" rx="2" fill={line} />

      <text x="420" y="160" fontFamily={SANS} fontSize="40" fontWeight="700" fill={line}>
        为什么？
      </text>
      <rect x="410" y="176" width="140" height="6" rx="3" fill={line} />
      <rect x="410" y="192" width="100" height="6" rx="3" fill={line} />

      <text x="36" y="378" fontFamily={MONO} fontSize="9" fill={muted}>
        价值藏在判断里，不在罗列里
      </text>
    </g>
  );
}

function ThisSiteBeat1() {
  // 方案：滚动叙事结构
  return (
    <g>
      <text x="36" y="58" fontFamily={MONO} fontSize="9" fill={muted}>
        滚动叙事 · 一屏钉住，四拍切换
      </text>

      {/* 左边：文字区 */}
      <rect x="36" y="80" width="280" height="280" rx="12" fill={surface} stroke={line} />
      <text x="56" y="108" fontFamily={MONO} fontSize="9" fill={muted}>左栏 · 文字</text>

      <rect x="56" y="126" width="60" height="8" rx="4" fill={accent} />
      <text x="126" y="134" fontFamily={SANS} fontSize="10" fill={muted}>问题</text>

      <rect x="56" y="150" width="220" height="5" rx="2" fill={line} />
      <rect x="56" y="164" width="200" height="5" rx="2" fill={line} />
      <rect x="56" y="178" width="180" height="5" rx="2" fill={line} />

      <rect x="56" y="206" width="60" height="8" rx="4" fill={lineStrong} />
      <text x="126" y="214" fontFamily={SANS} fontSize="10" fill={muted}>方案</text>

      <rect x="56" y="232" width="220" height="5" rx="2" fill={line} />
      <rect x="56" y="246" width="190" height="5" rx="2" fill={line} />

      <rect x="56" y="274" width="60" height="8" rx="4" fill={lineStrong} />
      <text x="126" y="282" fontFamily={SANS} fontSize="10" fill={muted}>技术决策</text>

      <rect x="56" y="300" width="220" height="5" rx="2" fill={line} />
      <rect x="56" y="314" width="170" height="5" rx="2" fill={line} />

      {/* 右边：预览区 */}
      <rect x="340" y="80" width="260" height="280" rx="12" fill={surface} stroke={line} />
      <text x="360" y="108" fontFamily={MONO} fontSize="9" fill={muted}>右栏 · 预览</text>

      <rect x="360" y="126" width="220" height="120" rx="10" fill={paper} stroke={line} />
      <rect x="380" y="146" width="100" height="8" rx="4" fill={lineStrong} />
      <rect x="380" y="164" width="160" height="5" rx="2" fill={line} />
      <rect x="380" y="178" width="140" height="5" rx="2" fill={line} />
      <rect x="380" y="200" width="60" height="20" rx="10" fill={accent} />

      {/* 滚动指示 */}
      <line x1="470" y1="260" x2="470" y2="340" stroke={line} strokeWidth="2" />
      <circle cx="470" cy="280" r="5" fill={accent} />
      <circle cx="470" cy="305" r="3" fill={lineStrong} />
      <circle cx="470" cy="330" r="3" fill={line} />

      <text x="36" y="378" fontFamily={MONO} fontSize="9" fill={muted}>
        滚动钉住 · 左边换文字，右边跟着轻轻动
      </text>
    </g>
  );
}

function ThisSiteBeat2() {
  // 技术决策：架构标注
  return (
    <g>
      <text x="36" y="58" fontFamily={MONO} fontSize="9" fill={muted}>
        技术决策 · 每一个选择都有理由
      </text>

      <rect x="36" y="84" width="270" height="80" rx="12" fill={surface} stroke={line} />
      <text x="56" y="110" fontFamily={SANS} fontSize="12" fontWeight="600" fill={ink}>
        默认全部 SSR
      </text>
      <text x="56" y="130" fontFamily={SANS} fontSize="10" fill={muted}>
        只有真的需要交互才进 use client
      </text>
      <text x="56" y="148" fontFamily={MONO} fontSize="9" fill={accent}>
        首屏快 · SEO 好
      </text>

      <rect x="334" y="84" width="270" height="80" rx="12" fill={surface} stroke={line} />
      <text x="354" y="110" fontFamily={SANS} fontSize="12" fontWeight="600" fill={ink}>
        零外部资源
      </text>
      <text x="354" y="130" fontFamily={SANS} fontSize="10" fill={muted}>
        0 字库 · 0 位图 · 预览全用 SVG 画
      </text>
      <text x="354" y="148" fontFamily={MONO} fontSize="9" fill={accent}>
        加载快 · 不糊
      </text>

      <rect x="36" y="184" width="270" height="80" rx="12" fill={surface} stroke={line} />
      <text x="56" y="210" fontFamily={SANS} fontSize="12" fontWeight="600" fill={ink}>
        动画只动 transform / opacity
      </text>
      <text x="56" y="230" fontFamily={SANS} fontSize="10" fill={muted}>
        不触发 layout · 不卡
      </text>
      <text x="56" y="248" fontFamily={MONO} fontSize="9" fill={accent}>
        60fps 顺滑
      </text>

      <rect x="334" y="184" width="270" height="80" rx="12" fill={surface} stroke={accent} />
      <text x="354" y="210" fontFamily={SANS} fontSize="12" fontWeight="600" fill={ink}>
        拦截路由 layoutId
      </text>
      <text x="354" y="230" fontFamily={SANS} fontSize="10" fill={muted}>
        卡片与详情挂同一棵树 · 放大过渡
      </text>
      <text x="354" y="248" fontFamily={MONO} fontSize="9" fill={accent}>
        那一下放大的秘密
      </text>

      <text x="36" y="304" fontFamily={SANS} fontSize="11" fill={muted}>
        深浅色都过 WCAG AA · 一套设计 token
      </text>
      <rect x="36" y="320" width="568" height="1" fill={line} />
      <text x="36" y="350" fontFamily={MONO} fontSize="9" fill={muted}>
        Next.js 14 · Tailwind · Framer Motion
      </text>
    </g>
  );
}

function ThisSiteBeat3() {
  // 结果：Hero 区
  return (
    <g>
      <text x="36" y="58" fontFamily={MONO} fontSize="9" fill={muted}>
        你现在看的这一页就是产物
      </text>

      {/* 导航栏 */}
      <rect x="36" y="76" width="568" height="36" rx="18" fill={surface} stroke={line} />
      <text x="56" y="99" fontFamily={SANS} fontSize="11" fontWeight="600" fill={ink}>
        Elia
      </text>
      <rect x="540" y="88" width="48" height="12" rx="6" fill={line} />

      {/* 左栏：标题 + 简介 + 按钮 */}
      <text x="56" y="156" fontFamily={SANS} fontSize="24" fontWeight="700" fill={ink}>
        把想法做成
      </text>
      <text x="56" y="186" fontFamily={SANS} fontSize="24" fontWeight="700" fill={ink}>
        能上线的东西。
      </text>

      <rect x="56" y="206" width="220" height="6" rx="3" fill={line} />
      <rect x="56" y="222" width="180" height="6" rx="3" fill={line} />

      <rect x="56" y="250" width="90" height="32" rx="16" fill={accent} />
      <text x="101" y="271" fontFamily={SANS} fontSize="10" fontWeight="500" fill={accentInk} textAnchor="middle">
        看项目 →
      </text>
      <rect x="156" y="250" width="90" height="32" rx="16" stroke={lineStrong} fill="none" />
      <text x="201" y="271" fontFamily={SANS} fontSize="10" fill={ink} textAnchor="middle">
        读笔记
      </text>

      {/* 右栏：数据面板 */}
      <rect x="340" y="140" width="240" height="150" rx="16" fill={surface} stroke={line} />
      <text x="360" y="166" fontFamily={MONO} fontSize="9" fill={muted}>
        3 个项目
      </text>
      <text x="360" y="196" fontFamily={MONO} fontSize="28" fontWeight="700" fill={ink}>
        1
      </text>
      <text x="360" y="214" fontFamily={MONO} fontSize="9" fill={muted}>
        个已上线
      </text>
      <rect x="360" y="232" width="200" height="1" fill={line} />
      <text x="360" y="256" fontFamily={MONO} fontSize="9" fill={muted}>
        6 条路由 · 6 段叙事
      </text>
      <text x="360" y="274" fontFamily={MONO} fontSize="9" fill={muted}>
        0 字库 · 0 张位图
      </text>

      {/* 底部标签 */}
      {['SSR', 'SVG', 'Motion', 'A11y'].map((label, i) => (
        <g key={label}>
          <rect x={56 + i * 72} y="310" width="64" height="22" rx="11" stroke={line} fill="none" />
          <text x={88 + i * 72} y="325" fontFamily={MONO} fontSize="9" fill={muted} textAnchor="middle">
            {label}
          </text>
        </g>
      ))}

      <text x="36" y="366" fontFamily={MONO} fontSize="9" fill={muted}>
        单页六段叙事 · 深浅色都过 WCAG AA
      </text>
    </g>
  );
}

/* ==================== 组件出口 ==================== */

const VARIANTS = {
  storyboard: [StoryboardBeat0, StoryboardBeat1, StoryboardBeat2, StoryboardBeat3],
  miniapp: [MiniappBeat0, MiniappBeat1, MiniappBeat2, MiniappBeat3],
  thisSite: [ThisSiteBeat0, ThisSiteBeat1, ThisSiteBeat2, ThisSiteBeat3],
};

export default function ProjectPreview({ variant = 'storyboard', beat = 0 }) {
  const beats = VARIANTS[variant] || VARIANTS.storyboard;
  const BeatComp = beats[Math.min(beat, beats.length - 1)];
  const labels = {
    storyboard: '短剧分镜生成器预览',
    miniapp: '测试类小程序预览',
    thisSite: '本站预览',
  };

  return (
    <CardFrame label={labels[variant]}>
      <BeatComp />
    </CardFrame>
  );
}
