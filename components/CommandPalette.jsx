'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { navLinks, projects, profile } from '@/lib/content';
import { PALETTE_OPEN, jump } from '@/lib/nav';
import { useMotionPref } from '@/lib/useMotionPref';

/**
 * ⌘K 命令面板：路由跳转 + 两个小操作。
 * 键盘：↑↓ 选、Enter 执行、Esc 关闭、Tab 圈在面板里。
 */
export default function CommandPalette({ posts = [] }) {
  const router = useRouter();
  const reduced = useMotionPref();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [cursor, setCursor] = useState(0);
  const [notice, setNotice] = useState('');

  const inputRef = useRef(null);
  const panelRef = useRef(null);
  const restoreRef = useRef(null);

  const close = useCallback(() => {
    setOpen(false);
    setQuery('');
    setCursor(0);
    setNotice('');
    const prev = restoreRef.current;
    if (prev && typeof prev.focus === 'function') prev.focus();
  }, []);

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setNotice('已复制邮箱');
    } catch {
      setNotice(`复制失败，请手动选中：${profile.email}`);
    }
  }, []);

  const cycleTheme = useCallback(() => {
    const root = document.documentElement;
    const now = root.dataset.theme === 'light' ? 'light' : root.dataset.theme === 'dark' ? 'dark' : 'auto';
    const next = now === 'auto' ? 'light' : now === 'light' ? 'dark' : 'auto';
    if (next === 'auto') {
      delete root.dataset.theme;
      localStorage.removeItem('theme');
    } else {
      root.dataset.theme = next;
      localStorage.setItem('theme', next);
    }
    setNotice(`配色：${next === 'auto' ? '跟随系统' : next === 'light' ? '浅色' : '深色'}`);
  }, []);

  const items = useMemo(() => {
    const list = [];

    navLinks.forEach((link) => {
      list.push({
        group: '页面',
        label: link.label,
        hint: link.href,
        run: () => jump(router, link.href),
      });
    });

    projects.forEach((project) => {
      list.push({
        group: '项目',
        label: project.title,
        hint: project.order,
        run: () => jump(router, `/work/${project.slug}`),
      });
    });

    posts.forEach((post) => {
      list.push({
        group: '笔记',
        label: post.title,
        hint: post.status === 'draft' ? '草稿' : 'NOTE',
        run: () => jump(router, `/notes/${post.slug}`),
      });
    });

    list.push({
      group: '操作',
      label: '切换配色',
      hint: 'THEME',
      keepOpen: true,
      run: cycleTheme,
    });

    list.push({
      group: '操作',
      label: '复制邮箱',
      hint: '⌘C',
      keepOpen: true,
      run: copyEmail,
    });

    return list;
  }, [posts, router, cycleTheme, copyEmail]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((item) =>
      `${item.group} ${item.label} ${item.hint}`.toLowerCase().includes(q),
    );
  }, [items, query]);

  useEffect(() => {
    setCursor(0);
  }, [query]);

  // 全局快捷键：⌘K / Ctrl+K 开关，/ 也能唤起（正在输入时不抢）
  useEffect(() => {
    const onKey = (e) => {
      const typing =
        e.target instanceof HTMLElement &&
        ['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName);

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((v) => {
          if (!v) restoreRef.current = document.activeElement;
          return !v;
        });
        return;
      }

      if (e.key === '/' && !typing && !open) {
        e.preventDefault();
        restoreRef.current = document.activeElement;
        setOpen(true);
      }
    };

    const onRequest = () => {
      restoreRef.current = document.activeElement;
      setOpen(true);
    };

    window.addEventListener('keydown', onKey);
    window.addEventListener(PALETTE_OPEN, onRequest);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener(PALETTE_OPEN, onRequest);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => inputRef.current?.focus(), 40);
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    return () => {
      clearTimeout(t);
      document.documentElement.style.overflow = prevOverflow;
    };
  }, [open]);

  const runItem = (item) => {
    if (!item) return;
    item.run?.();
    if (item.keepOpen) return;
    close();
  };

  const onKeyDown = (e) => {
    if (e.key === 'Escape') {
      e.stopPropagation();
      close();
      return;
    }

    if (e.key === 'ArrowDown' || (e.key === 'Tab' && !e.shiftKey)) {
      e.preventDefault();
      setCursor((c) => (filtered.length ? (c + 1) % filtered.length : 0));
      return;
    }

    if (e.key === 'ArrowUp' || (e.key === 'Tab' && e.shiftKey)) {
      e.preventDefault();
      setCursor((c) => (filtered.length ? (c - 1 + filtered.length) % filtered.length : 0));
      return;
    }

    if (e.key === 'Enter') {
      e.preventDefault();
      runItem(filtered[cursor]);
    }
  };

  if (!open) return null;

  let lastGroup = '';

  return (
    <div
      className="palette-root"
      onMouseDown={(e) => {
        if (!panelRef.current?.contains(e.target)) close();
      }}
    >
      <motion.div
        ref={panelRef}
        className="palette"
        role="dialog"
        aria-modal="true"
        aria-label="命令面板"
        initial={reduced ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.99 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: reduced ? 0.15 : 0.42, ease: [0.16, 1, 0.3, 1] }}
        onKeyDown={onKeyDown}
      >
        <input
          ref={inputRef}
          className="palette__input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="跳到哪里？试试「分镜」「笔记」「配色」"
          role="combobox"
          aria-label="搜索命令"
          aria-expanded="true"
          aria-controls="palette-list"
          aria-autocomplete="list"
          aria-activedescendant={
            filtered.length ? `palette-opt-${cursor}` : undefined
          }
          autoComplete="off"
          spellCheck={false}
        />

        <div className="palette__list" role="listbox" aria-label="命令列表" id="palette-list">
          {filtered.length === 0 && <p className="palette__empty">没有匹配的命令。</p>}

          {filtered.map((item, i) => {
            const showGroup = item.group !== lastGroup;
            lastGroup = item.group;
            return (
              <div key={`${item.group}-${item.label}`} role="group" aria-label={item.group}>
                {showGroup && <p className="palette__group">{item.group}</p>}
                <button
                  type="button"
                  role="option"
                  id={`palette-opt-${i}`}
                  aria-selected={i === cursor}
                  className="palette__item"
                  data-active={i === cursor}
                  onMouseEnter={() => setCursor(i)}
                  onClick={() => runItem(item)}
                >
                  <span>{item.label}</span>
                  <small>{item.hint}</small>
                </button>
              </div>
            );
          })}
        </div>

        <div className="palette__foot">
          <span>↑↓ 选择</span>
          <span>↵ 打开</span>
          <span>esc 关闭</span>
          {notice && (
            <span style={{ marginLeft: 'auto', color: 'var(--accent)' }} role="status">
              {notice}
            </span>
          )}
        </div>
      </motion.div>
    </div>
  );
}
