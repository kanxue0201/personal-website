'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navLinks, profile } from '@/lib/content';
import { notifyNavStart, requestPalette } from '@/lib/nav';
import ThemeToggle from './ThemeToggle';

function isActive(pathname, href) {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * 固定顶栏。毛玻璃常驻，滚动出首屏后补一条下边界线。
 * 「是否滚过顶部」用 IntersectionObserver 观察文档顶部的哨兵，不用 scroll 事件。
 */
export default function SiteNav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const sentinel = document.getElementById('page-top');
    if (!sentinel) return;

    const io = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { threshold: 0 },
    );
    io.observe(sentinel);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.documentElement.style.overflow = prev;
    };
  }, [open]);

  return (
    <header className="nav" data-scrolled={scrolled}>
      <div className="shell nav__inner">
        <Link href="/" className="nav__brand" onClick={notifyNavStart}>
          {profile.name}
          {profile.latin && profile.latin.toLowerCase() !== profile.name.toLowerCase() ? (
            <span className="mono" aria-hidden="true">
              {profile.latin}
            </span>
          ) : null}
        </Link>

        <nav className="nav__links" aria-label="主导航">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="nav__link"
              data-active={isActive(pathname, link.href)}
              onClick={notifyNavStart}
              aria-current={isActive(pathname, link.href) ? 'page' : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="nav__spacer" />

        <div className="nav__actions">
          <ThemeToggle />
          <button
            type="button"
            className="icon-btn"
            onClick={requestPalette}
            aria-label="打开命令面板（⌘K）"
          >
            ⌘K
          </button>
          <button
            type="button"
            className="nav__burger"
            aria-expanded={open}
            aria-controls="nav-sheet"
            aria-label={open ? '关闭菜单' : '打开菜单'}
            onClick={() => setOpen((v) => !v)}
          >
            <span aria-hidden="true" />
          </button>
        </div>
      </div>

      {open && (
        <div className="nav-sheet" id="nav-sheet">
          <nav aria-label="移动端导航">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => {
                  notifyNavStart();
                  setOpen(false);
                }}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/#contact"
              onClick={() => {
                notifyNavStart();
                setOpen(false);
              }}
            >
              联系
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
