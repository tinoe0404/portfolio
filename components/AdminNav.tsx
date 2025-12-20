// components/AdminNav.tsx
import Link from 'next/link';
import { LayoutDashboard, FolderOpen } from 'lucide-react';

export default function AdminNav() {
  return (
    <nav className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/admin/dashboard" className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Admin
          </Link>
          <div className="flex items-center gap-6">
            <Link
              href="/admin/dashboard"
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
            >
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </Link>
            <Link
              href="/admin/projects"
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
            >
              <FolderOpen className="w-4 h-4" />
              Projects
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}