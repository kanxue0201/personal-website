'use client';

import ProjectPreview from './ProjectPreview';

/**
 * 项目卡片和详情头图用同一个预览组件，保证图案一致。
 */
export default function SharedPreview({ slug, variant, beat = 0, minHeight }) {
  return (
    <div
      className="preview-frame"
      style={minHeight ? { height: minHeight } : undefined}
    >
      <ProjectPreview variant={variant} beat={beat} />
    </div>
  );
}
