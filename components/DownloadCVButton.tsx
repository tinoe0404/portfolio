import { Download } from 'lucide-react';

interface DownloadCVButtonProps {
  cvUrl?: string | null;
  fileName?: string | null;
  className?: string;
}

export default function DownloadCVButton({ 
  cvUrl, 
  fileName = 'CV.pdf',
  className = '' 
}: DownloadCVButtonProps) {
  if (!cvUrl) return null;

  return (
    <a
      href={cvUrl}
      download={fileName}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg transition-all font-semibold ${className}`}
    >
      <Download className="w-5 h-5" />
      Download CV
    </a>
  );
}
