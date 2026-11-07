'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { beatLabels } from '@/lib/content';
import { jump } from '@/lib/nav';
import { useRouter } from 'next/navigation';
import { useMotionPref } from '@/lib/useMotionPref';
import ProjectPreview from './ProjectPreview';

// 轨道高度是 3 × 80svh，标记点按「每一拍占据的滚动区间」摆在中线上。
// 数值来自 0.5/H + (i+0.5)·(1-1/H)/4，H = 2.4（轨道 / 视口）。
const MARKER_TOP = [28.1, 42.7, 57.3, 71.9];

/**
 * 一个项目 = 一整屏的滚动叙事。
 * 四个零高度标记点穿过视口中线时切换左栏的四拍；右侧静帧跟着滚动做很小的位移和缩放。
 * 除了这处视差（需要连续跟随），其余滚动逻辑全部走 IntersectionObserver。
 */
export default function ProjectScene({ project }) {
  const router = useRouter();
  const reduced = useMotionPref();
  const sectionRef = useRef(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const previewY = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const previewScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.035, 1]);

  useEffect(() => {
    const markers = Array.from(sectionRef.current?.querySelectorAll('[data-beat]') || []);
    if (!markers.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(Number(entry.target.dataset.beat));
        });
      },
      // 只在视口中线一条很窄的带子里触发，避免两拍来回抢
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    );

    markers.forEach((m) => io.observe(m));
    return () => io.disconnect();
  }, []);

  return (
    <section className="scene" ref={sectionRef} aria-labelledby={`scene-title-${project.slug}`}>
      <div className="scene__track">
        {MARKER_TOP.map((top, i) => (
          <span
            key={i}
            className="scene__marker"
            data-beat={i}
            style={{ top: `${top}%` }}
            aria-hidden="true"
          />
        ))}

        <div className="scene__sticky">
          <div className="scene__copy">
            <div className="scene__head">
              <p className="eyebrow">{project.kicker}</p>
              <div className="scene__title-row">
                <span className="scene__order" aria-hidden="true">
                  {project.order}
                </span>
                <h3 className="t-title" id={`scene-title-${project.slug}`}>
                  {project.title}
                </h3>
              </div>
              <p className="t-body" style={{ maxWidth: '34ch' }}>
                {project.subtitle}
              </p>
            </div>

            <div className="beats">
              {project.beats.map((text, i) => (
                <div key={i} className="beat" data-active={i === active}>
                  <p className="beat__label">
                    {beatLabels[i]}
                    <span className="sr-only">
                      ，第 {i + 1} 拍，共 {project.beats.length} 拍
                    </span>
                  </p>
                  <p className="beat__body">{text}</p>
                </div>
              ))}
            </div>

            <div className="beat-meter" aria-hidden="true">
              <span className="beat-meter__track">
                <span
                  className="beat-meter__fill"
                  style={{ transform: `scaleX(${(active + 1) / project.beats.length})` }}
                />
              </span>
              <span className="beat-meter__count">
                {String(active + 1).padStart(2, '0')} / {String(project.beats.length).padStart(2, '0')}
              </span>
            </div>
          </div>

          <div className="scene__preview">
            <motion.div
              className="preview-frame"
              style={reduced ? undefined : { y: previewY, scale: previewScale }}
            >
              <ProjectPreview variant={project.preview} beat={active} />
            </motion.div>

            <dl className="scene__facts">
              {project.facts.map((fact) => (
                <div className="scene__fact" key={fact.k}>
                  <dt>{fact.k}</dt>
                  <dd>{fact.v}</dd>
                </div>
              ))}
            </dl>

            <button
              type="button"
              className="card-project__more"
              style={{ marginTop: 16 }}
              onClick={() => jump(router, `/work/${project.slug}`)}
            >
              查看完整复盘
              <span className="btn__arrow" aria-hidden="true">
                →
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
