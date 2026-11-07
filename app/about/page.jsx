import Link from 'next/link';
import { profile, projects } from '@/lib/content';
import RouteTransition from '@/components/RouteTransition';

export const metadata = {
  title: '关于',
  description: `${profile.name}：软件工程本科在读，做过一个本地工具和一款已上线的小程序。`,
};

export default function AboutPage() {
  return (
    <RouteTransition>
      <div className="shell page-head">
        <p className="eyebrow">关于 — {profile.location}</p>
        <h1 className="t-epic">{profile.name}，在南京。</h1>
        <p className="t-lead" style={{ maxWidth: '52ch' }}>
          {profile.tagline}这不是一句口号：{profile.intro}
        </p>
      </div>

      <div className="shell">
        <div className="rule" />

        <section className="about__block">
          <h2 className="eyebrow">现在</h2>
          <p className="t-body" style={{ maxWidth: '56ch' }}>
            软件工程本科在读（2026 年 9 月起），专升本，方向是软件开发。课程里在练数据结构和算法，
            课下把这些结构直接搬回自己的项目里用。
          </p>
        </section>

        <section className="about__block">
          <h2 className="eyebrow">之前</h2>
          <p className="t-body" style={{ maxWidth: '56ch' }}>
            2020 到 2023 年在南京信息职业技术学院读云计算技术与应用：Linux、网络、数据库原理。
            服务器怎么起、端口怎么通、环境怎么配，这些底子后来做项目全用上了。
          </p>
        </section>

        <section className="about__block">
          <h2 className="eyebrow">中间那两年</h2>
          <p className="t-body" style={{ maxWidth: '56ch' }}>
            2023 到 2026 年没有学校可写，但也不是空的：自学 + 做项目。一个本地跑的短剧分镜工具，
            一款已经过审上线的小程序。真正的收获不是这两个东西，是「先定结构，再动手写界面」这个习惯。
          </p>
        </section>

        <section className="about__block">
          <h2 className="eyebrow">做事的方式</h2>
          <ul className="log__points" style={{ maxWidth: '56ch' }}>
            <li>先定数据长什么样，再决定界面长什么样。</li>
            <li>密钥永远不出服务端；能不让浏览器知道的事，就不让它知道。</li>
            <li>能删的依赖就删：本站零外部字体、零位图，预览图是 SVG 画的。</li>
            <li>验收标准写成「别人能不能直接用」，不是「代码能不能跑」。</li>
          </ul>
        </section>

        <div className="rule" />

        <p className="t-body" style={{ marginTop: 32 }}>
          项目都在<Link className="link-underline" href="/work">工作</Link>里，
          写下来的判断在<Link className="link-underline" href="/notes">笔记</Link>里，
          有事可以直接发邮件：<a className="link-underline" href={`mailto:${profile.email}`}>{profile.email}</a>。
        </p>

        <p className="t-small" style={{ marginTop: 48 }}>
          全站 {projects.length} 个项目 · 一套设计 token · 深浅色都过 WCAG AA
        </p>
      </div>
    </RouteTransition>
  );
}
