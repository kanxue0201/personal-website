import { notFound } from 'next/navigation';
import { getProject, projects } from '@/lib/content';
import ModalShell from '@/components/ModalShell';
import ProjectDetail from '@/components/ProjectDetail';

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

/**
 * 站内点开 /work/[slug] 时命中这里：列表页留在原地不卸载，
 * 详情以弹层形式盖上来 —— 卡片和头图才能共用 layoutId 完成那一次放大。
 */
export default function InterceptedProjectModal({ params }) {
  const project = getProject(params.slug);
  if (!project) notFound();

  return (
    <ModalShell label={`${project.title} — 项目复盘`}>
      <ProjectDetail project={project} inModal />
    </ModalShell>
  );
}
