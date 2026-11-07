import Link from 'next/link';

function formatDate(value) {
  // '2026-10-08' → '2026.10.08'
  return String(value || '').replaceAll('-', '.');
}

/**
 * 文章列表只留三件事：标题、日期、读多久。
 * 悬停时标题右移 8px 并露出箭头 —— 位移在 CSS 里，且只在真正有指针的设备上生效。
 */
export default function Writing({ posts }) {
  return (
    <ul className="writing">
      {posts.map((post) => (
        <li key={post.slug}>
          <Link className="writing__row" href={`/notes/${post.slug}`}>
            <span className="writing__title">
              {post.title}
              {post.status === 'draft' ? (
                <span className="writing__status">筹备中</span>
              ) : null}
            </span>
            <span className="writing__meta">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span aria-hidden="true"> · </span>
              {post.minutes} 分钟
            </span>
            <span className="writing__arrow" aria-hidden="true">
              →
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
