'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { profile } from '@/lib/content';
import { notifyNavStart } from '@/lib/nav';
import { useMotionPref } from '@/lib/useMotionPref';

const TAGLINE = profile.tagline;

/**
 * Hero：名字先出来，定位语在 2 秒内逐字打完。
 * 背景那道极淡的径向渐变只跟着滚动位移一点点，别喧宾夺主。
 */
export default function Hero() {
  const reduced = useMotionPref();
  const [typed, setTyped] = useState(TAGLINE);
  const ref = useRef(null);

  // 唯一的连续滚动监听：只驱动 Hero 背景的位移，且 rAF 由 framer 内部合并
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const glowY = useTransform(scrollYProgress, [0, 1], ['0%', '14%']);
  const glowOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.45]);

  useEffect(() => {
    if (reduced) {
      setTyped(TAGLINE);
      return;
    }

    setTyped('');
    const total = 2000;
    const step = total / Math.max(TAGLINE.length, 1);
    let i = 0;

    const timer = setInterval(() => {
      i += 1;
      setTyped(TAGLINE.slice(0, i));
      if (i >= TAGLINE.length) clearInterval(timer);
    }, step);

    return () => clearInterval(timer);
  }, [reduced]);

  return (
    <section className="hero" id="top" ref={ref} aria-labelledby="hero-name">
      <motion.div
        className="hero__glow"
        aria-hidden="true"
        style={reduced ? undefined : { y: glowY, opacity: glowOpacity }}
      />
      <div className="hero__grid" aria-hidden="true" />

      <div className="shell hero__inner">
        <p className="eyebrow rise" style={{ animationDelay: '40ms' }}>
          软件工程 · 本科在读 · {profile.location}
        </p>

        <div className="hero__name" style={{ marginTop: 'clamp(16px, 2.4vw, 28px)' }}>
          <h1 id="hero-name" className="t-epic rise" style={{ animationDelay: '120ms' }}>
            {profile.name}
          </h1>
          <span className="hero__latin rise" style={{ animationDelay: '220ms' }}>
            {profile.latin}
          </span>
        </div>

        <p className="hero__line rise" style={{ animationDelay: '300ms' }}>
          <span aria-hidden="true">{typed}</span>
          <span className="sr-only">{TAGLINE}</span>
          <span className="hero__caret" aria-hidden="true" />
        </p>

        <p
          className="t-body rise"
          style={{ animationDelay: '380ms', marginTop: 'clamp(18px, 2.6vw, 28px)', maxWidth: '44ch' }}
        >
          {profile.intro}
        </p>

        <div className="hero__meta rise" style={{ animationDelay: '460ms' }}>
          <Link href="/work" className="btn btn--accent" onClick={notifyNavStart}>
            看项目
            <span className="btn__arrow" aria-hidden="true">
              →
            </span>
          </Link>
          <Link href="/notes" className="btn btn--ghost" onClick={notifyNavStart}>
            读笔记
          </Link>
          <span className="hero__dot" aria-hidden="true" />
          <span className="t-mono" style={{ letterSpacing: '0.1em' }}>
            3 个项目 · 1 个已上线
          </span>
        </div>
      </div>

      <div className="hero__hint" aria-hidden="true">
        <span>scroll</span>
        <span className="hero__arrow" />
      </div>
    </section>
  );
}
