// ============================================================
// FILE: app/admin/projects/new/page.tsx
// ============================================================
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import AdminNav from '@/components/AdminNav';
import ProjectForm from '@/components/ProjectForm';

export default async function NewProjectPage() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect('/admin/login');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <AdminNav />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-white mb-8">Create New Project</h1>
        <ProjectForm />
      </div>
    </div>
  );
}