'use client';

import { useState } from 'react';
import { Upload, FileText, Trash2, ExternalLink } from 'lucide-react';
import { updateCV, deleteCV } from '@/lib/actions';
import { useRouter } from 'next/navigation';

interface CVUploadProps {
  currentCV?: {
    cvUrl: string;
    cvFileName: string;
  } | null;
}

export default function CVUpload({ currentCV }: CVUploadProps) {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [cvUrl, setCvUrl] = useState(currentCV?.cvUrl || '');
  const [fileName, setFileName] = useState(currentCV?.cvFileName || '');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setUploading(true);

    try {
      if (!cvUrl) {
        setError('Please enter a CV URL');
        return;
      }

      await updateCV(cvUrl, fileName || 'CV.pdf');
      router.refresh();
      alert('CV updated successfully!');
    } catch (err: any) {
      setError(err.message || 'Failed to update CV');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to remove the CV?')) return;

    try {
      await deleteCV();
      setCvUrl('');
      setFileName('');
      router.refresh();
    } catch (err) {
      alert('Failed to delete CV');
    }
  };

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <FileText className="w-6 h-6" />
        CV Management
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-red-900/20 border border-red-700 rounded text-red-400 text-sm">
          {error}
        </div>
      )}

      {currentCV?.cvUrl && (
        <div className="mb-6 p-4 bg-gray-900 border border-gray-700 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-blue-400" />
              <div>
                <p className="text-white font-medium">{currentCV.cvFileName}</p>
                <p className="text-xs text-gray-400">Currently active</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <a
                href={currentCV.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-blue-600 hover:bg-blue-700 rounded transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
              <button
                onClick={handleDelete}
                className="p-2 bg-red-900/20 hover:bg-red-900/30 border border-red-700 rounded transition-colors"
              >
                <Trash2 className="w-4 h-4 text-red-400" />
              </button>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            CV URL *
          </label>
          <input
            type="url"
            value={cvUrl}
            onChange={(e) => setCvUrl(e.target.value)}
            placeholder="https://drive.google.com/file/d/..."
            className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            Upload your CV to Google Drive, Dropbox, or any hosting service and paste the public link here
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            File Name (Optional)
          </label>
          <input
            type="text"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            placeholder="My_CV.pdf"
            className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={uploading}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 rounded-lg transition-colors font-semibold"
        >
          <Upload className="w-5 h-5" />
          {uploading ? 'Updating...' : currentCV ? 'Update CV' : 'Upload CV'}
        </button>
      </form>
    </div>
  );
}