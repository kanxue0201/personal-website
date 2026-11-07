import { notFound } from 'next/navigation';
import { getProject, projects } from '@/lib/content';
import ProjectDetail from '@/components/ProjectDetail';
import RouteTransition from '@/components/RouteTransition';

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export function generateMetadata({ params }) {
  const project = getProject(params.slug);
  if (!project) return { title: '项目不存在' };

  return {
    title: project.title,
    description: project.summary,
  };
}

export default function ProjectPage({ params }) {
  const project = getProject(params.slug);
  if (!project) notFound();

  return (
    <RouteTransition>
      <ProjectDetail project={project} />
    </RouteTransition>
  );
}
