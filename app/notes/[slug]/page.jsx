import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPost, getPostsMeta } from '@/lib/notes';
import { Markdown } from '@/lib/markdown';
import RouteTransition from '@/components/RouteTransition';

export function generateStaticParams() {
  return getPostsMeta().map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }) {
  const post = getPost(params.slug);
  if (!post) return { title: '笔记不存在' };
  return { title: post.title, description: post.summary };
}

export default function NotePage({ params }) {
  const post = getPost(params.slug);
  if (!post) notFound();

  return (
    <RouteTransition>
      <article className="shell page-head">
        <p className="eyebrow">
          <Link className="link-underline" href="/notes">
            笔记
          </Link>{' '}
          ·{' '}
          <time dateTime={post.date}>{String(post.date).replaceAll('-', '.')}</time> ·{' '}
          {post.minutes} 分钟
          {post.status === 'draft' ? ' · 筹备中' : ''}
        </p>

        <h1 className="t-display" style={{ maxWidth: '24ch' }}>
          {post.title}
        </h1>

        <p className="t-lead" style={{ maxWidth: '52ch' }}>
          {post.summary}
        </p>

        {post.status === 'draft' ? (
          <p className="placeholder">这篇还在改：结论已经定了，例子还在补。</p>
        ) : null}

        <div className="rule" style={{ margin: '48px 0' }} />

        <Markdown source={post.body} />

        <p style={{ marginTop: 56 }}>
          <Link className="link-underline t-small" href="/notes">
            ← 返回全部笔记
          </Link>
        </p>
      </article>
    </RouteTransition>
  );
}
