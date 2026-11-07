'use client';

import { useEffect, useRef, useState } from 'react';
import { stats } from '@/lib/content';
import { useMotionPref } from '@/lib/useMotionPref';

/** 数字从 0 滚到目标值：进视口触发一次，rAF 跑 900ms，缓出。 */
function Stat({ item }) {
  const reduced = useMotionPref();
  const ref = useRef(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (reduced) {
      setValue(item.value);
      return;
    }

    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let startedAt = 0;
    const duration = 900;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();

        const tick = (now) => {
          if (!startedAt) startedAt = now;
          const p = Math.min(1, (now - startedAt) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          setValue(Math.round(item.value * eased));
          if (p < 1) raf = requestAnimationFrame(tick);
        };

        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );

    io.observe(el);
    return () => {
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [item.value, reduced]);

  return (
    <div className="stat" ref={ref}>
      <span className="stat__num" aria-hidden="true">
        {String(value).padStart(item.pad ?? 2, '0')}
      </span>
      <span className="sr-only">
        {item.value} {item.label}
      </span>
      <span className="stat__label" aria-hidden="true">
        {item.label}
      </span>
      <span className="stat__note">{item.note}</span>
    </div>
  );
}

export default function Stats() {
  return (
    <div className="stats">
      {stats.map((item) => (
        <Stat key={item.label} item={item} />
      ))}
    </div>
  );
}
