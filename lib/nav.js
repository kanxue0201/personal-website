'use client';

// 自定义事件把「开始跳转」广播给顶部进度条，避免为这一个点引入状态库
export const NAV_START = 'site:nav-start';
export const PALETTE_OPEN = 'site:palette-open';

export function notifyNavStart() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event(NAV_START));
  }
}

export function requestPalette() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event(PALETTE_OPEN));
  }
}

export function jump(router, href) {
  notifyNavStart();
  router.push(href);
}
