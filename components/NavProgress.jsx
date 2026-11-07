'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { NAV_START } from '@/lib/nav';

/**
 * 顶部 2px 进度条：跳转开始冲到 78%，路由落地补到 100% 再淡出。
 * 全站强调色只出现在这里、CTA 与链接上。
 */
export default function NavProgress() {
  const pathname = usePathname();
  const [width, setWidth] = useState(0);
  const [state, setState] = useState('idle');

  useEffect(() => {
    const onStart = () => {
      setState('active');
      setWidth(0.08);
      requestAnimationFrame(() => setWidth(0.78));
    };
    window.addEventListener(NAV_START, onStart);
    return () => window.removeEventListener(NAV_START, onStart);
  }, []);

  useEffect(() => {
    if (state !== 'active') return;
    setState('done');
    setWidth(1);
    const t = setTimeout(() => {
      setState('reset');
      setWidth(0);
    }, 520);
    return () => clearTimeout(t);
  }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (state !== 'reset') return;
    const t = setTimeout(() => setState('idle'), 240);
    return () => clearTimeout(t);
  }, [state]);

  return (
    <div
      className="nav-progress"
      data-active={state === 'active' || state === 'done'}
      data-done={state === 'done'}
      style={{ transform: `scaleX(${width})` }}
      aria-hidden="true"
    />
  );
}
