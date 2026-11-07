import Link from 'next/link';

export const metadata = { title: '页面不存在' };

export default function NotFound() {
  return (
    <div className="shell page-head">
      <p className="eyebrow">404</p>
      <h1 className="t-epic">这页还没做。</h1>
      <p className="t-lead" style={{ maxWidth: '44ch' }}>
        你要找的东西不在这个地址上。要么是我还没写，要么是链接过期了。
      </p>
      <p style={{ marginTop: 40, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <Link className="btn btn--accent" href="/">
          回首页
        </Link>
        <Link className="btn btn--ghost" href="/work">
          看项目
        </Link>
      </p>
    </div>
  );
}
