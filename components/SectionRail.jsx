'use client';

import { useEffect, useState } from 'react';
import { sections } from '@/lib/content';

/**
 * 首页右侧的刻度导航：锚点跳转 + 当前区块高亮。
 * 用 IntersectionObserver 观察区块本身，命中视口中线那条带子的就是「当前」。
 */
export default function SectionRail() {
  const [active, setActive] = useState(sections[0].id);

  useEffect(() => {
    const els = sections
      .map((section) => document.getElementById(section.id))
      .filter(Boolean);
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <nav className="rail" aria-label="页内导航">
      {sections.map((section) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          className="rail__item"
          data-active={active === section.id}
          aria-current={active === section.id ? 'true' : undefined}
        >
          <span className="rail__tick" aria-hidden="true" />
          <span>{section.label}</span>
        </a>
      ))}
    </nav>
  );
}
