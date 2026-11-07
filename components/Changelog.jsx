import { changelog } from '@/lib/content';
import Reveal from './Reveal';

/**
 * 经历写成产品迭代日志：左边等宽版本号，右边是这一版做了什么。
 */
export default function Changelog() {
  return (
    <ol className="log">
      {changelog.map((item, i) => (
        <li key={item.version}>
          <Reveal delay={0.05 * i}>
            <div className="log__item">
              <div className="log__meta">
                <span className="log__version">{item.version}</span>
                <span className="log__period">{item.period}</span>
              </div>

              <div className="log__body">
                <div className="log__title">
                  <h3 className="t-title">{item.title}</h3>
                  <span className="log__tag">{item.tag}</span>
                </div>
                <p className="t-small" style={{ letterSpacing: '0.01em' }}>
                  {item.org}
                </p>
                <ul className="log__points">
                  {item.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
