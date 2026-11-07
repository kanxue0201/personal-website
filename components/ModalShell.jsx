'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useMotionPref } from '@/lib/useMotionPref';

const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

/**
 * 拦截路由的容器：底下那一页不卸载，详情从卡片的位置长出来。
 * 关闭 = 浏览器后退（列表页的滚动位置原样保留），焦点回到原来那张卡片。
 * 遮罩点击、Esc、关闭按钮三条路都走这里。
 */
export default function ModalShell({ children, label }) {
  const router = useRouter();
  const reduced = useMotionPref();
  const panelRef = useRef(null);
  const restoreRef = useRef(null);
  const [closing, setClosing] = useState(false);

  const close = useCallback(() => {
    if (closing) return;
    setClosing(true);
    window.setTimeout(() => {
      if (window.history.length > 1) router.back();
      else router.push('/work');
    }, reduced ? 0 : 450);
  }, [closing, reduced, router]);

  useEffect(() => {
    restoreRef.current = document.activeElement;

    const { overflow, paddingRight } = document.body.style;
    const gap = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    if (gap > 0) document.body.style.paddingRight = `${gap}px`;

    panelRef.current?.focus({ preventScroll: true });

    function onKeyDown(event) {
      if (event.key === 'Escape') {
        event.preventDefault();
        close();
        return;
      }
      if (event.key !== 'Tab') return;

      const nodes = panelRef.current?.querySelectorAll(FOCUSABLE);
      if (!nodes || !nodes.length) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;

      const previous = restoreRef.current;
      if (previous && previous.isConnected && typeof previous.focus === 'function') {
        previous.focus({ preventScroll: true });
      }
    };
  }, [close]);

  return (
    <div className="modal-root">
      <motion.div
        className="modal__backdrop"
        onClick={close}
        aria-hidden="true"
        initial={false}
        animate={{ opacity: closing ? 0 : 1 }}
        transition={{ duration: reduced ? 0 : 0.32, ease: [0.16, 1, 0.3, 1] }}
      />

      <motion.div
        className="modal__panel"
        role="dialog"
        aria-modal="true"
        aria-label={label}
        tabIndex={-1}
        ref={panelRef}
        initial={reduced ? false : { opacity: 0 }}
        animate={closing ? { opacity: 0 } : { opacity: 1 }}
        transition={{
          duration: reduced ? 0 : closing ? 0.3 : 0.35,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        <button type="button" className="modal__close" onClick={close} aria-label="关闭详情">
          <span aria-hidden="true">✕</span>
        </button>
        {children}
      </motion.div>
    </div>
  );
}
