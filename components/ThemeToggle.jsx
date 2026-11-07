'use client';

import { useEffect, useRef, useState } from 'react';

const ORDER = ['auto', 'light', 'dark'];
const LABEL = { auto: '自动', light: '浅色', dark: '深色' };

/**
 * 三态配色：auto 跟随系统，light / dark 强制。
 * 首帧由 <head> 里的内联脚本决定，这里只负责读回来和写回去，避免闪白。
 * 只有用户真的点过才写 localStorage —— 否则 ?theme=dark 这种调试参数会粘在后续访问上。
 */
export default function ThemeToggle() {
  const [mode, setMode] = useState('auto');
  const touched = useRef(false);

  useEffect(() => {
    const saved = document.documentElement.dataset.theme;
    setMode(saved === 'light' || saved === 'dark' ? saved : 'auto');
  }, []);

  useEffect(() => {
    if (!touched.current) return;
    const root = document.documentElement;
    if (mode === 'auto') {
      delete root.dataset.theme;
      localStorage.removeItem('theme');
    } else {
      root.dataset.theme = mode;
      localStorage.setItem('theme', mode);
    }
  }, [mode]);

  const cycle = () => {
    touched.current = true;
    setMode((prev) => ORDER[(ORDER.indexOf(prev) + 1) % ORDER.length]);
  };

  return (
    <button
      type="button"
      onClick={cycle}
      className="icon-btn"
      aria-label={`配色：${LABEL[mode]}，点击切换`}
      title={`配色：${LABEL[mode]}`}
    >
      <span aria-hidden="true" style={{ color: 'var(--ink)' }}>
        ◐
      </span>
      <span style={{ marginLeft: 6 }} aria-hidden="true">
        {LABEL[mode]}
      </span>
    </button>
  );
}
