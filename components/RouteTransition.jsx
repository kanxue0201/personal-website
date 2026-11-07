'use client';

import { motion } from 'framer-motion';
import { useMotionPref } from '@/lib/useMotionPref';

/**
 * 普通跳转的入场：淡入 + 上移 24px。
 * 放在每个 page 里而不是 layout —— 拦截路由打开项目详情时，底层的列表页要保持挂载，
 * 才能让共享元素（layoutId）从卡片长成详情面板。用 key 重挂载会把这个前提打破。
 */
export default function RouteTransition({ children }) {
  const reduced = useMotionPref();

  return (
    <motion.div
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: reduced ? 0.24 : 0.72,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
