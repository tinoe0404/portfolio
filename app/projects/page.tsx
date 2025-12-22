// FILE: app/projects/page.tsx (Fixed Image Display)
import Link from 'next/link';
import { getProjects } from '@/lib/actions';
import { Briefcase, ExternalLink, Github } from 'lucide-react';
import PublicNav from '@/components/PublicNav';
import { Footer } from '@/components/Footer';

export const metadata = {
  title: 'Projects | Portfolio',
  description: 'View my latest projects and work',
};

export default async function ProjectsPage() {
  const projects = await getProjects(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <PublicNav />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-white">Projects</h1>
        
        {projects.length === 0 ? (
          <p className="text-gray-400 text-base sm:text-lg">No projects available yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {projects.map((project) => (
              <div 
                key={project.id} 
                className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden hover:border-blue-500 transition-colors flex flex-col"
              >
                {/* Fixed Image Container */}
                {project.coverImage ? (
                  <div className="relative w-full h-48 sm:h-56 bg-gray-900 overflow-hidden">
                    <img
                      src={project.coverImage}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback if image fails to load
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                ) : (
                  // Placeholder if no image
                  <div className="w-full h-48 sm:h-56 bg-gray-900 flex items-center justify-center">
                    <div className="text-gray-600 text-center">
                      <Briefcase className="w-12 h-12 mx-auto mb-2" />
                      <p className="text-sm">No preview</p>
                    </div>
                  </div>
                )}

                {/* Card Content */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col">
                  {project.isFeatured && (
                    <span className="inline-block px-3 py-1 bg-blue-600 text-xs font-semibold rounded-full mb-3 w-fit">
                      Featured
                    </span>
                  )}
                  <h3 className="text-lg sm:text-xl font-bold mb-2 text-white">
                    {project.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-400 mb-3 sm:mb-4 flex-1">
                    {project.shortDesc}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
                    {project.techStack.map((tech, i) => (
                      <span 
                        key={i} 
                        className="px-2 py-1 bg-gray-900 text-xs text-gray-300 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3 flex-wrap pt-3 border-t border-gray-700">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs sm:text-sm text-gray-400 hover:text-white transition-colors"
                      >
                        <Github className="w-4 h-4" />
                        Code
                      </a>
                    )}
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs sm:text-sm text-gray-400 hover:text-white transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Demo
                      </a>
                    )}
                    {project.caseStudy && (
                      <Link
                        href={`/case-studies/${project.slug}`}
                        className="text-xs sm:text-sm text-blue-400 hover:text-blue-300 transition-colors ml-auto"
                      >
                        Case Study →
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

// ============================================================
// IMAGE FIXES APPLIED:
// ============================================================
/*
✅ Fixed aspect ratio container with relative positioning
✅ Image uses object-cover to fill container properly
✅ Consistent height: h-48 on mobile, h-56 on larger screens
✅ Added fallback placeholder if image fails to load
✅ Added placeholder for projects without images
✅ Card uses flex-col to ensure proper layout
✅ Image container has bg-gray-900 as fallback color
✅ Added border-t separator before links for better visual hierarchy

IMAGE BEST PRACTICES:
- Recommended image size: 800x600px or 16:9 ratio
- Format: JPG or PNG
- Max file size: < 500KB for best performance
- Use image optimization services like:
  - Cloudinary
  - imgix  
  - Next.js Image Optimization (if self-hosted)

TO USE NEXT.JS IMAGE COMPONENT (Better):
Replace <img> with:
import Image from 'next/image';

<Image
  src={project.coverImage}
  alt={project.title}
  fill
  className="object-cover"
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>
*/