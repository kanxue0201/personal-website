'use client';

import { motion } from 'framer-motion';
import { useMotionPref } from '@/lib/useMotionPref';

/**
 * 进入视口的统一入场：opacity 0→1，translateY 24px→0。
 * 错峰用 delay 传进来（子元素按 80ms 递增），比 variants 好读也好调。
 * IntersectionObserver 由 framer 的 whileInView 负责，不额外挂 scroll 监听。
 */
export default function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
  as = 'div',
  style,
}) {
  const reduced = useMotionPref();
  const Tag = motion[as] || motion.div;

  if (reduced) {
    return (
      <Tag className={className} style={style}>
        {children}
      </Tag>
    );
  }

  return (
    <Tag
      className={className}
      style={style}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.72, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Tag>
  );
}
