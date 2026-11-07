'use client';

import { useEffect, useState } from 'react';

/**
 * reduced-motion 的统一判断。
 * 除了系统设置，还支持 ?motion=reduce 这个调试开关（写在 <html data-motion>）,
 * 这样截图验证时不用改系统设置。
 */
export function useMotionPref() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const read = () =>
      setReduced(mq.matches || document.documentElement.dataset.motion === 'reduce');

    read();
    mq.addEventListener('change', read);
    return () => mq.removeEventListener('change', read);
  }, []);

  return reduced;
}
