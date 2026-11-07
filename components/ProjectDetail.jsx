import Link from 'next/link';
import { beatLabels, projects } from '@/lib/content';
import Reveal from './Reveal';
import SharedPreview from './SharedPreview';

/** 详情页正文：同一份四拍内容，从这里完整展开，不再随滚动切换。 */
export default function ProjectDetail({ project, inModal = false }) {
  const index = projects.findIndex((item) => item.slug === project.slug);
  const prev = index > 0 ? projects[index - 1] : null;
  const next = index < projects.length - 1 ? projects[index + 1] : null;

  return (
    <article className="detail">
      <div className="shell">
        <Reveal>
          <header className="detail__head">
            {inModal ? null : (
              <p className="t-small">
                <Link className="link-underline" href="/work">
                  ← 全部项目
                </Link>
              </p>
            )}
            <p className="eyebrow">
              {project.kicker} · 第 {project.order} 个
            </p>
            <h1 className="t-display">{project.title}</h1>
            <p className="t-lead">{project.subtitle}</p>
            <p className="t-body" style={{ maxWidth: '56ch' }}>
              {project.summary}
            </p>

            <dl className="detail__facts">
              <div className="detail__fact">
                <dt>角色</dt>
                <dd>{project.role}</dd>
              </div>
              <div className="detail__fact">
                <dt>技术</dt>
                <dd>{project.stack.join(' / ')}</dd>
              </div>
            </dl>
          </header>
        </Reveal>

        <Reveal delay={0.06}>
          <div className="detail__hero">
            <SharedPreview slug={project.slug} variant={project.preview} beat={project.cardBeat || 0} />
          </div>
        </Reveal>

        <div className="detail__beats">
          {project.beats.map((text, i) => (
            <Reveal key={i} delay={0.04 * i}>
              <section className="detail__beat" aria-labelledby={`beat-${project.slug}-${i}`}>
                <h2 className="detail__beat-label" id={`beat-${project.slug}-${i}`}>
                  <b aria-hidden="true">{String(i + 1).padStart(2, '0')}</b>
                  {beatLabels[i]}
                </h2>
                <p className="t-body">{text}</p>
              </section>
            </Reveal>
          ))}
        </div>

        <nav className="detail__pager" aria-label="项目切换">
          {prev ? (
            <Link href={`/work/${prev.slug}`}>
              <span className="t-small">上一个</span>
              <span className="t-title">{prev.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link href={`/work/${next.slug}`} style={{ textAlign: 'right' }}>
              <span className="t-small">下一个</span>
              <span className="t-title">{next.title}</span>
            </Link>
          ) : (
            <span />
          )}
        </nav>

        <p style={{ marginTop: 40 }}>
          <Link className="link-underline t-small" href="/work">
            返回全部项目
          </Link>
        </p>
      </div>
    </article>
  );
}
