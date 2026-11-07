import './globals.css';
import { getPostsMeta } from '@/lib/notes';
import { profile } from '@/lib/content';
import NavProgress from '@/components/NavProgress';
import SiteNav from '@/components/SiteNav';
import CursorGlow from '@/components/CursorGlow';
import CommandPalette from '@/components/CommandPalette';
import Footer from '@/components/Footer';

export const metadata = {
  title: {
    default: `${profile.name} — 个人作品集`,
    template: `%s — ${profile.name}`,
  },
  description: profile.intro,
  authors: [{ name: profile.name }],
  openGraph: {
    title: `${profile.name} — 个人作品集`,
    description: profile.tagline,
    locale: 'zh_CN',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
};

// 首帧之前就把主题和动效偏好写进 <html>，避免深色模式闪一下白屏。
const bootScript = `(function(){try{
var p=new URLSearchParams(location.search);
var theme=p.get('theme')||localStorage.getItem('theme')||'auto';
document.documentElement.setAttribute('data-theme',theme);
if(p.get('motion')==='reduce'||localStorage.getItem('motion')==='reduce'){
document.documentElement.setAttribute('data-motion','reduce');}
}catch(e){}})();`;

export default function RootLayout({ children, modal }) {
  const posts = getPostsMeta();

  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>
        <a className="skip-link" href="#main">
          跳到正文
        </a>

        <div id="page-top" />
        <NavProgress />
        <SiteNav />

        <main id="main">{children}</main>

        <CursorGlow />
        <Footer />
        {modal}
        <CommandPalette posts={posts} />
      </body>
    </html>
  );
}
