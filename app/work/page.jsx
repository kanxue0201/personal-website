import { projects } from '@/lib/content';
import RouteTransition from '@/components/RouteTransition';
import WorkGrid from '@/components/WorkGrid';

export const metadata = {
  title: '工作',
  description: '三个项目：短剧分镜生成器、测试类小程序、这个网站本身。',
};

export default function WorkPage() {
  return (
    <RouteTransition>
      <div className="shell page-head">
        <p className="eyebrow">工作 — 全部项目</p>
        <h1 className="t-epic">三个项目，三种判断</h1>
        <p className="t-lead" style={{ maxWidth: '52ch' }}>
          点开任意一张卡片，它会从当前位置展开成完整复盘。按 Esc 或点背景回来，位置还在。
        </p>
      </div>

      <div className="shell">
        <WorkGrid projects={projects} />
      </div>
    </RouteTransition>
  );
}
