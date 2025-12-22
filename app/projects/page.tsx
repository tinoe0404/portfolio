// FILE: app/projects/page.tsx (Mobile Responsive)
import Link from 'next/link';
import { getProjects } from '@/lib/actions';
import { ExternalLink, Github } from 'lucide-react';
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
                className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden hover:border-blue-500 transition-colors"
              >
                {project.coverImage && (
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    className="w-full h-40 sm:h-48 object-cover"
                  />
                )}
                <div className="p-5 sm:p-6">
                  {project.isFeatured && (
                    <span className="inline-block px-3 py-1 bg-blue-600 text-xs font-semibold rounded-full mb-3">
                      Featured
                    </span>
                  )}
                  <h3 className="text-lg sm:text-xl font-bold mb-2 text-white">
                    {project.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-400 mb-3 sm:mb-4">
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

                  <div className="flex items-center gap-3 flex-wrap">
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
// MOBILE RESPONSIVE FEATURES ADDED:
// ============================================================
/*
✅ Replaced inline nav with PublicNav component (hamburger menu)
✅ Added Footer component
✅ Responsive heading (text-3xl sm:text-4xl)
✅ Responsive spacing (py-8 sm:py-12, mb-6 sm:mb-8)
✅ Grid: 1 column mobile, 2 tablet, 3 desktop (grid-cols-1 sm:grid-cols-2 lg:grid-cols-3)
✅ Responsive gaps (gap-6 sm:gap-8)
✅ Responsive image height (h-40 sm:h-48)
✅ Responsive card padding (p-5 sm:p-6)
✅ Responsive text sizes (text-lg sm:text-xl, text-sm sm:text-base)
✅ Responsive link sizes (text-xs sm:text-sm)
✅ Links wrap properly on mobile (flex-wrap)

MOBILE OPTIMIZATIONS:
- Single column on mobile for easy scrolling
- Smaller text for better fit on small screens
- Tighter spacing on mobile
- Touch-friendly card size
- Proper image sizing for mobile bandwidth
*/