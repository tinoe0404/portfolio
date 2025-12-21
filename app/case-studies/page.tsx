// FILE: app/case-studies/page.tsx (Mobile Responsive)
import Link from 'next/link';
import { getCaseStudies } from '@/lib/actions';
import { ArrowRight } from 'lucide-react';
import PublicNav from '@/components/PublicNav';
import { Footer } from '@/components/Footer';

export const metadata = {
  title: 'Case Studies | Portfolio',
  description: 'In-depth case studies of my projects',
};

export default async function CaseStudiesPage() {
  const projects = await getCaseStudies();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <PublicNav />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <h1 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4 text-white">Case Studies</h1>
        <p className="text-lg sm:text-xl text-gray-400 mb-8 sm:mb-12">
          Deep dives into the problems I've solved and how I solved them
        </p>

        {projects.length === 0 ? (
          <p className="text-gray-400 text-base sm:text-lg">No case studies available yet.</p>
        ) : (
          <div className="space-y-6 sm:space-y-8">
            {projects.map((project) => (
              <Link
                key={project.id}
                href={`/case-studies/${project.slug}`}
                className="block bg-gray-800 border border-gray-700 rounded-lg overflow-hidden hover:border-blue-500 transition-colors"
              >
                <div className="flex flex-col md:flex-row">
                  {project.coverImage && (
                    <div className="w-full md:w-1/3 flex-shrink-0">
                      <img
                        src={project.coverImage}
                        alt={project.title}
                        className="w-full h-48 sm:h-64 md:h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6 sm:p-8 flex-1">
                    <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-white">
                      {project.title}
                    </h2>
                    <p className="text-sm sm:text-base text-gray-400 mb-3 sm:mb-4">
                      {project.caseStudy?.overview.substring(0, 200)}...
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.techStack.map((tech, i) => (
                        <span 
                          key={i} 
                          className="px-2 sm:px-3 py-1 bg-gray-900 text-xs sm:text-sm text-gray-300 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center text-blue-400 font-semibold text-sm sm:text-base">
                      Read Case Study
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                    </div>
                  </div>
                </div>
              </Link>
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
✅ Responsive heading sizes (text-3xl sm:text-4xl)
✅ Responsive spacing (py-8 sm:py-12, space-y-6 sm:space-y-8)
✅ Image responsive height (h-48 sm:h-64 md:h-full)
✅ Card layout: vertical on mobile, horizontal on desktop (flex-col md:flex-row)
✅ Responsive padding (p-6 sm:p-8)
✅ Responsive text sizes (text-sm sm:text-base, text-xl sm:text-2xl)
✅ Responsive tags (px-2 sm:px-3, text-xs sm:text-sm)
✅ Responsive icon sizes (w-4 h-4 sm:w-5 sm:h-5)

BREAKPOINTS USED:
- sm: 640px (small tablets and larger phones)
- md: 768px (tablets)
- lg: 1024px (desktops)
*/