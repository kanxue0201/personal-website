'use client';

import { useEffect, useState } from 'react';
import { profile } from '@/lib/content';

const formatter = new Intl.DateTimeFormat('zh-CN', {
  timeZone: 'Asia/Shanghai',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
});

/**
 * 页脚只放三件小事：版权、源码、此刻的时间。
 * 时钟先渲染占位再更新，避免服务端与客户端时间不一致造成 hydration 报错。
 */
export default function Footer() {
  const [time, setTime] = useState(null);

  useEffect(() => {
    const tick = () => setTime(formatter.format(new Date()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <footer className="footer">
      <div className="shell footer__inner">
        <p className="t-small">
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p className="t-small">本站无 Cookie、无跟踪、无外部字体</p>
        <p className="t-small">
          南京时间{' '}
          <span className="footer__clock">{time ?? '--:--:--'}</span>
        </p>
      </div>
    </footer>
  );
}
