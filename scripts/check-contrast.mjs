// 对比度自检：两套配色的正文、弱化文字、强调色都要过 WCAG AA。
// 用法：node scripts/check-contrast.mjs
import fs from 'node:fs';
import path from 'node:path';

const css = fs.readFileSync(path.join(process.cwd(), 'app', 'globals.css'), 'utf8');

const palettes = {
  浅色: {
    paper: '#ffffff',
    surface: '#f5f5f7',
    ink: '#000000',
    muted: '#6e6e73',
    accent: '#0071e3',
  },
  深色: {
    paper: '#000000',
    surface: '#111111',
    ink: '#ffffff',
    muted: '#a1a1a6',
    accent: '#2997ff',
  },
};

function channel(value) {
  const c = value / 255;
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}

function luminance(hex) {
  const clean = hex.replace('#', '');
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(clean.slice(i, i + 2), 16));
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

function contrast(a, b) {
  const la = luminance(a);
  const lb = luminance(b);
  const [light, dark] = la > lb ? [la, lb] : [lb, la];
  return (light + 0.05) / (dark + 0.05);
}

const pairs = [
  ['正文 ink / paper', 'ink', 'paper', 4.5],
  ['正文 ink / surface', 'ink', 'surface', 4.5],
  ['弱化 muted / paper', 'muted', 'paper', 4.5],
  ['弱化 muted / surface', 'muted', 'surface', 4.5],
  ['链接 accent / paper', 'accent', 'paper', 4.5],
];

let failed = 0;

for (const [name, palette] of Object.entries(palettes)) {
  console.log(`\n${name}`);
  for (const [label, fg, bg, min] of pairs) {
    if (palette[fg] === undefined || palette[bg] === undefined) continue;
    const ratio = contrast(palette[fg], palette[bg]);
    const ok = ratio >= min;
    if (!ok) failed += 1;
    console.log(
      `${ok ? 'PASS' : 'FAIL'}  ${label.padEnd(22)} ${ratio.toFixed(2)}:1  (需要 ${min}:1)`,
    );
  }

  // 强调色按钮上的文字
  const onAccent = name === '浅色' ? '#ffffff' : '#000000';
  const ratio = contrast(onAccent, palette.accent);
  const ok = ratio >= 4.5;
  if (!ok) failed += 1;
  console.log(
    `${ok ? 'PASS' : 'FAIL'}  ${'按钮文字 / accent'.padEnd(22)} ${ratio.toFixed(2)}:1  (需要 4.5:1)`,
  );
}

// 顺手确认 CSS 里的 token 和上面写的值没跑偏
const mustHave = ['#ffffff', '#f5f5f7', '#6e6e73', '#0071e3', '#a1a1a6', '#2997ff'];
const missing = mustHave.filter((hex) => !css.toLowerCase().includes(hex));
if (missing.length) {
  failed += 1;
  console.log(`\nFAIL  globals.css 里找不到这些 token：${missing.join(', ')}`);
}

console.log(failed ? `\n${failed} 项不达标` : '\n全部通过 WCAG AA（正文 4.5:1）');
process.exitCode = failed ? 1 : 0;
