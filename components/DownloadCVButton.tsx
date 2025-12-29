'use client';

import { useState } from 'react';
import { Download, Loader2 } from 'lucide-react';

interface DownloadCVButtonProps {
  className?: string;
}

export default function DownloadCVButton({ className = '' }: DownloadCVButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/download-cv');

      if (!res.ok) {
        throw new Error('Download failed');
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      
      // Try to get filename from header, fallback to default
      const contentDisposition = res.headers.get('Content-Disposition');
      let fileName = 'CV.pdf';
      if (contentDisposition) {
        const fileNameMatch = contentDisposition.match(/filename="?([^"]+)"?/);
        if (fileNameMatch?.[1]) fileName = fileNameMatch[1];
      }
      
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      
      // Cleanup
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      alert('Could not download CV. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={isLoading}
      className={`inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-70 disabled:cursor-not-allowed rounded-lg transition-all font-semibold text-white shadow-lg hover:shadow-xl ${className}`}
    >
      {isLoading ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : (
        <Download className="w-5 h-5" />
      )}
      {isLoading ? 'Downloading...' : 'Download CV'}
    </button>
  );
}