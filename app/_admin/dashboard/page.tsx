// app/_admin/dashboard/page.tsx - Admin Dashboard
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getProjects } from '@/lib/actions';
import { LayoutDashboard, FolderOpen, FileText, LogOut } from 'lucide-react';
import AdminNav from '@/components/AdminNav';
import SignOutButton from '@/components/SignOutButton';

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect('/_admin/login');
  }

  const projects = await getProjects(false);
  const publishedCount = projects.filter(p => p.isPublished).length;
  const caseStudyCount = projects.filter(p => p.caseStudy).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <AdminNav />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
            <p className="text-gray-400">Welcome back, {session.user?.email}</p>
          </div>
          <SignOutButton />
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <FolderOpen className="w-8 h-8 text-blue-400" />
              <span className="text-3xl font-bold text-white">{projects.length}</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-1">Total Projects</h3>
            <p className="text-gray-400 text-sm">{publishedCount} published</p>
          </div>

          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <FileText className="w-8 h-8 text-purple-400" />
              <span className="text-3xl font-bold text-white">{caseStudyCount}</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-1">Case Studies</h3>
            <p className="text-gray-400 text-sm">Detailed write-ups</p>
          </div>

          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <LayoutDashboard className="w-8 h-8 text-pink-400" />
              <span className="text-3xl font-bold text-white">{projects.filter(p => p.isFeatured).length}</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-1">Featured</h3>
            <p className="text-gray-400 text-sm">Highlighted projects</p>
          </div>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-white mb-4">Quick Actions</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link
              href="/_admin/projects/new"
              className="p-4 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors text-center font-semibold"
            >
              Create New Project
            </Link>
            <Link
              href="/_admin/projects"
              className="p-4 bg-gray-900 hover:bg-gray-700 border border-gray-700 rounded-lg transition-colors text-center font-semibold"
            >
              Manage Projects
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}