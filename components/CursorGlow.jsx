'use client';

import { useEffect, useRef } from 'react';
import { useMotionPref } from '@/lib/useMotionPref';

/**
 * 鼠标跟随的极淡光晕：只有桌面端出现，opacity 上限 0.06。
 * 用 rAF 合并 pointermove，只写 transform，不触发布局。
 */
export default function CursorGlow() {
  const ref = useRef(null);
  const reduced = useMotionPref();

  useEffect(() => {
    if (reduced) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;

    const paint = () => {
      raf = 0;
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };

    const onMove = (e) => {
      x = e.clientX;
      y = e.clientY;
      if (!raf) raf = requestAnimationFrame(paint);
    };

    const onEnter = () => {
      el.style.opacity = '0.06';
    };
    const onLeave = () => {
      el.style.opacity = '0';
    };

    paint();
    onEnter();

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    document.addEventListener('pointerenter', onEnter);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
      document.removeEventListener('pointerenter', onEnter);
    };
  }, [reduced]);

  if (reduced) return null;

  return (
    <div className="glow" aria-hidden="true">
      <div ref={ref} className="glow__dot" />
    </div>
  );
}
