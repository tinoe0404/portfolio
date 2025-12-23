// components/ProjectImage.tsx
'use client';

import { Briefcase } from 'lucide-react';
import { useState } from 'react';

interface ProjectImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function ProjectImage({ src, alt, className = '' }: ProjectImageProps) {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Show placeholder if no src or error
  if (imageError || !src) {
    return (
      <div className={`w-full h-48 sm:h-56 bg-gray-900 flex items-center justify-center ${className}`}>
        <div className="text-gray-600 text-center">
          <Briefcase className="w-12 h-12 mx-auto mb-2 opacity-50" />
          <p className="text-sm">No preview</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative w-full h-48 sm:h-56 bg-gray-900 overflow-hidden ${className}`}>
      {/* Loading skeleton */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
          <div className="animate-pulse">
            <Briefcase className="w-12 h-12 text-gray-700" />
          </div>
        </div>
      )}
      
      {/* Actual image */}
      <img
        src={src}
        alt={alt}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        onLoad={() => setIsLoading(false)}
        onError={(e) => {
          console.error(`Failed to load image: ${src}`, e);
          setImageError(true);
          setIsLoading(false);
        }}
        loading="lazy"
      />
    </div>
  );
}