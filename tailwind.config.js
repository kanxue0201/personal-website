/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  theme: {
    extend: {
      // 颜色全部走 CSS 变量，深浅色只换变量，不换类名
      colors: {
        paper: 'var(--paper)',
        surface: 'var(--surface)',
        ink: 'var(--ink)',
        muted: 'var(--muted)',
        line: 'var(--line)',
        accent: 'var(--accent)',
      },
      fontFamily: {
        sans: [
          'system-ui',
          '-apple-system',
          'SF Pro Display',
          'Inter',
          'Segoe UI',
          'PingFang SC',
          'Microsoft YaHei',
          'sans-serif',
        ],
        mono: ['ui-monospace', 'SFMono-Regular', 'SF Mono', 'Menlo', 'Consolas', 'monospace'],
      },
      maxWidth: { container: '1080px' },
      borderRadius: { card: '20px', panel: '24px', scene: '28px' },
      transitionTimingFunction: { eased: 'cubic-bezier(0.16, 1, 0.3, 1)' },
      transitionDuration: { scene: '720ms' },
    },
  },
  plugins: [],
};
