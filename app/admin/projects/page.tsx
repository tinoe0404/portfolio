// ============================================================
// FILE: app/admin/projects/page.tsx
// ============================================================
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getProjects } from '@/lib/actions';
import AdminNav from '@/components/AdminNav';
import ProjectActions from '@/components/ProjectActions';
import { Plus } from 'lucide-react';

export default async function AdminProjectsPage() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect('/admin/login');
  }

  const projects = await getProjects(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <AdminNav />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-white">Projects</h1>
          <Link
            href="/admin/projects/new"
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors font-semibold"
          >
            <Plus className="w-5 h-5" />
            New Project
          </Link>
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg mb-4">No projects yet</p>
            <Link
              href="/admin/projects/new"
              className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors font-semibold"
            >
              Create Your First Project
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {projects.map((project: any) => (
              <div
                key={project.id}
                className="bg-gray-800 border border-gray-700 rounded-lg p-6 flex items-center justify-between"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-white">{project.title}</h3>
                    {project.isFeatured && (
                      <span className="px-2 py-1 bg-blue-600 text-xs font-semibold rounded">
                        Featured
                      </span>
                    )}
                    {!project.isPublished && (
                      <span className="px-2 py-1 bg-gray-700 text-xs font-semibold rounded">
                        Draft
                      </span>
                    )}
                    {project.caseStudy && (
                      <span className="px-2 py-1 bg-purple-600 text-xs font-semibold rounded">
                        Has Case Study
                      </span>
                    )}
                  </div>
                  <p className="text-gray-400 mb-3">{project.shortDesc}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech: string, i: number) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-gray-900 text-xs text-gray-300 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <ProjectActions projectId={project.id} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}