// components/ScreenshotPreview.tsx
'use client';

import { X } from 'lucide-react';
import { useState } from 'react';

interface ScreenshotPreviewProps {
  url: string;
  onRemove: () => void;
}

export default function ScreenshotPreview({ url, onRemove }: ScreenshotPreviewProps) {
  const [imageError, setImageError] = useState(false);

  if (imageError) {
    return (
      <div className="relative group">
        <div className="w-full h-32 bg-gray-900 rounded border border-gray-700 flex items-center justify-center">
          <span className="text-xs text-gray-500">Failed to load</span>
        </div>
        <button
          type="button"
          onClick={onRemove}
          className="absolute top-2 right-2 p-1 bg-red-600 rounded opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="relative group">
      <img 
        src={url} 
        alt="Screenshot preview" 
        className="w-full h-32 object-cover rounded border border-gray-700"
        onError={() => setImageError(true)}
      />
      <button
        type="button"
        onClick={onRemove}
        className="absolute top-2 right-2 p-1 bg-red-600 rounded opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}