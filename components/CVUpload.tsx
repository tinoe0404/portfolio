'use client';

import { useState } from 'react';
import { Upload, FileText, Trash2, Loader2, CheckCircle } from 'lucide-react';
import { updateCV, deleteCV } from '@/lib/actions';
import { supabase } from '@/lib/supabase'; // Import the client we made in Step 2
import { useRouter } from 'next/navigation';

interface CVUploadProps {
  currentCV?: {
    cvUrl: string;
    cvFileName: string;
  } | null;
}

export default function CVUpload({ currentCV }: CVUploadProps) {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      // Simple validation: Ensure it is a PDF and less than 5MB
      if (selectedFile.type !== 'application/pdf') {
        setError('Only PDF files are allowed.');
        return;
      }
      if (selectedFile.size > 5 * 1024 * 1024) {
        setError('File size must be less than 5MB.');
        return;
      }
      setFile(selectedFile);
      setError('');
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    setError('');

    try {
      const fileName = `cv-${Date.now()}.pdf`; // Unique name to prevent caching issues

      // 1. Upload to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('portfolio-assets') // The bucket name you created in Step 1
        .upload(`cv/${fileName}`, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (uploadError) throw uploadError;

      // 2. Get the Public URL
      const { data: publicUrlData } = supabase.storage
        .from('portfolio-assets')
        .getPublicUrl(`cv/${fileName}`);

      // 3. Save URL to Database (Server Action)
      await updateCV(publicUrlData.publicUrl, file.name);

      setFile(null);
      router.refresh();
      alert('CV uploaded successfully!');

    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to upload CV');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete the current CV?')) return;
    
    try {
      await deleteCV();
      router.refresh();
    } catch (err) {
      alert('Failed to delete');
    }
  };

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 max-w-xl">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <FileText className="w-6 h-6 text-blue-400" />
        Manage CV
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-red-900/20 border border-red-700 rounded text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* --- Current File Display --- */}
      {currentCV?.cvUrl ? (
        <div className="mb-6 p-4 bg-gray-900 border border-gray-700 rounded-lg flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-900/30 rounded">
              <FileText className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <p className="text-white font-medium truncate max-w-[200px]">
                {currentCV.cvFileName}
              </p>
              <a 
                href={currentCV.cvUrl} 
                target="_blank" 
                className="text-xs text-blue-400 hover:underline"
              >
                View current file
              </a>
            </div>
          </div>
          <button
            onClick={handleDelete}
            className="p-2 hover:bg-red-900/30 text-gray-400 hover:text-red-400 rounded transition-colors"
            title="Remove CV"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      ) : (
        <div className="mb-6 p-8 border-2 border-dashed border-gray-700 rounded-lg flex flex-col items-center justify-center text-gray-500">
          <FileText className="w-10 h-10 mb-2 opacity-50" />
          <p>No CV currently uploaded</p>
        </div>
      )}

      {/* --- Upload Form --- */}
      <form onSubmit={handleUpload} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Upload New CV (PDF)
          </label>
          <div className="relative">
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="w-full text-sm text-gray-400
                file:mr-4 file:py-2.5 file:px-4
                file:rounded-lg file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-600 file:text-white
                hover:file:bg-blue-700
                bg-gray-900 rounded-lg border border-gray-700 cursor-pointer"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={!file || uploading}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:text-gray-400 rounded-lg transition-all font-semibold"
        >
          {uploading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Upload className="w-5 h-5" />
              Upload File
            </>
          )}
        </button>
      </form>
    </div>
  );
}