import { getPostsMeta } from '@/lib/notes';
import Writing from '@/components/Writing';
import RouteTransition from '@/components/RouteTransition';

export const metadata = {
  title: '笔记',
  description: '做项目时踩过的坑，以及当时的判断。',
};

export default function NotesPage() {
  const posts = getPostsMeta();

  return (
    <RouteTransition>
      <div className="shell page-head">
        <p className="eyebrow">笔记 — {posts.length} 篇</p>
        <h1 className="t-epic">踩过的坑要写下来</h1>
        <p className="t-lead" style={{ maxWidth: '52ch' }}>
          都是真事：某个 Key 差点进了浏览器、结构化输出和深度思考为什么不能同时开、一条提示词怎么连翻两次车。
        </p>
      </div>

      <div className="shell">
        <Writing posts={posts} />
      </div>
    </RouteTransition>
  );
}
