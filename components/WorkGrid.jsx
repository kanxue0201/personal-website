import Link from 'next/link';
import SharedPreview from './SharedPreview';

function WorkCard({ project }) {
  return (
    <Link className="card-project" href={`/work/${project.slug}`}>
      <div className="card-project__body">
        <p className="eyebrow">
          {project.order} · {project.kicker}
        </p>
        <h2 className="card-project__title t-title">{project.title}</h2>
        <p className="t-body">{project.summary}</p>
        <p className="t-small">{project.role}</p>
        <span className="card-project__more">
          完整复盘
          <span className="btn__arrow" aria-hidden="true">
            →
          </span>
        </span>
      </div>

      <SharedPreview slug={project.slug} variant={project.preview} beat={project.cardBeat || 0} />
    </Link>
  );
}

/** 项目索引：三张卡片，点开走拦截路由，卡片本身就是转场起点。 */
export default function WorkGrid({ projects }) {
  return (
    <div className="cards">
      {projects.map((project) => (
        <WorkCard key={project.slug} project={project} />
      ))}
    </div>
  );
}
