// ============================================================
// FILE: app/admin/projects/[id]/edit/page.tsx
// ============================================================
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect, notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import AdminNav from '@/components/AdminNav';
import ProjectForm from '@/components/ProjectForm';

export default async function EditProjectPage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect('/admin/login');
  }

  const project = await prisma.project.findUnique({
    where: { id: params.id },
    include: { caseStudy: true },
  });

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <AdminNav />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-white mb-8">Edit Project</h1>
        <ProjectForm project={project} />
      </div>
    </div>
  );
}