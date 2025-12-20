// ============================================================
// COMPONENT: components/ProjectActions.tsx
// ============================================================
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { deleteProject } from '@/lib/actions';
import { Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';

export default function ProjectActions({ projectId }: { projectId: string }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      return;
    }

    setDeleting(true);
    try {
      await deleteProject(projectId);
      router.refresh();
    } catch (error) {
      alert('Failed to delete project');
      setDeleting(false);
    }
  };

  return (
    <div className="flex items-center gap-2 ml-4">
      <Link
        href={`/admin/projects/${projectId}/edit`}
        className="p-2 bg-gray-700 hover:bg-gray-600 rounded transition-colors"
      >
        <Edit className="w-5 h-5" />
      </Link>
      <button
        onClick={handleDelete}
        disabled={deleting}
        className="p-2 bg-red-900/20 hover:bg-red-900/30 border border-red-700 rounded transition-colors disabled:opacity-50"
      >
        <Trash2 className="w-5 h-5 text-red-400" />
      </button>
    </div>
  );
}