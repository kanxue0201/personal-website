import { getPostsMeta } from '@/lib/notes';
import { projects } from '@/lib/content';
import Hero from '@/components/Hero';
import ProjectScene from '@/components/ProjectScene';
import StackDiagram from '@/components/StackDiagram';
import Changelog from '@/components/Changelog';
import Stats from '@/components/Stats';
import Writing from '@/components/Writing';
import Contact from '@/components/Contact';
import SectionRail from '@/components/SectionRail';
import RouteTransition from '@/components/RouteTransition';

export default function HomePage() {
  const posts = getPostsMeta();

  return (
    <RouteTransition>
      <Hero />

      <section id="work" aria-labelledby="work-title">
        <div className="band">
          <div className="shell">
            <header className="section-head">
              <div className="section-head__row">
                <p className="eyebrow">01 — 工作</p>
                <h2 className="t-display" id="work-title">
                  三件东西，三个判断
                </h2>
              </div>
              <p className="t-lead">
                每个项目占一整屏：问题、方案、技术决策、结果。往下滚，四拍会依次出现。
              </p>
            </header>
          </div>
        </div>

        {projects.map((project) => (
          <ProjectScene key={project.slug} project={project} />
        ))}
      </section>

      <section id="stack" className="band" aria-labelledby="stack-title">
        <div className="shell">
          <header className="section-head">
            <div className="section-head__row">
              <p className="eyebrow">02 — 技术栈</p>
              <h2 className="t-display" id="stack-title">
                一块芯片，三层展开
              </h2>
            </div>
            <p className="t-lead">
              中心是方法，外面是语言、数据、工具。不做标签云——每一项都写清拿它做了什么。
            </p>
          </header>

          <StackDiagram />
        </div>
      </section>

      <section id="path" className="band" aria-labelledby="path-title">
        <div className="shell">
          <header className="section-head">
            <div className="section-head__row">
              <p className="eyebrow">03 — 经历</p>
              <h2 className="t-display" id="path-title">
                像版本一样迭代
              </h2>
            </div>
            <p className="t-lead">从专科到本科，中间那两年，在自学和做项目。</p>
          </header>

          <Changelog />
        </div>
      </section>

      <section id="numbers" className="band-tight" aria-labelledby="numbers-title">
        <div className="shell">
          <h2 className="eyebrow" id="numbers-title" style={{ marginBottom: 24 }}>
            04 — 数据
          </h2>
          <Stats />
        </div>
      </section>

      <section id="notes" className="band" aria-labelledby="notes-title">
        <div className="shell">
          <header className="section-head">
            <div className="section-head__row">
              <p className="eyebrow">05 — 笔记</p>
              <h2 className="t-display" id="notes-title">
                踩过的坑要写下来
              </h2>
            </div>
            <p className="t-lead">
              这些都是做项目时真的发生的，写清楚比写漂亮重要。标着「筹备中」的还在改。
            </p>
          </header>

          <Writing posts={posts} />
        </div>
      </section>

      <Contact />

      <SectionRail />
    </RouteTransition>
  );
}
