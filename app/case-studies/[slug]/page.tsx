// FILE: app/case-studies/[slug]/page.tsx (Mobile Responsive)
import Link from 'next/link';
import { getProjectBySlug } from '@/lib/actions';
import { notFound } from 'next/navigation';
import { Github, ExternalLink, ArrowLeft } from 'lucide-react';
import PublicNav from '@/components/PublicNav';
import { Footer } from '@/components/Footer';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const project = await getProjectBySlug(params.slug);
  
  if (!project) {
    return {
      title: 'Not Found',
    };
  }

  return {
    title: `${project.title} - Case Study | Portfolio`,
    description: project.caseStudy?.overview || project.shortDesc,
  };
}

export default async function CaseStudyPage({ params }: { params: { slug: string } }) {
  const project = await getProjectBySlug(params.slug);

  if (!project || !project.caseStudy || !project.isPublished) {
    notFound();
  }

  const { caseStudy } = project;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <PublicNav />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Link
          href="/case-studies"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 sm:mb-8 transition-colors text-sm sm:text-base"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Case Studies
        </Link>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-white leading-tight">
          {project.title}
        </h1>

        <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8">
          {project.techStack.map((tech, i) => (
            <span 
              key={i} 
              className="px-2 sm:px-3 py-1 bg-gray-800 border border-gray-700 text-xs sm:text-sm text-gray-300 rounded"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-8 sm:mb-12">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg transition-colors text-sm sm:text-base"
            >
              <Github className="w-4 h-4 sm:w-5 sm:h-5" />
              View Code
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors text-sm sm:text-base"
            >
              <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
              Live Demo
            </a>
          )}
        </div>

        {project.coverImage && (
          <img
            src={project.coverImage}
            alt={project.title}
            className="w-full rounded-lg mb-8 sm:mb-12 border border-gray-700"
          />
        )}

        <div className="prose prose-invert prose-sm sm:prose-base lg:prose-lg max-w-none">
          <section className="mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-white">Overview</h2>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">{caseStudy.overview}</p>
          </section>

          <section className="mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-white">The Problem</h2>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">{caseStudy.problem}</p>
          </section>

          <section className="mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-white">The Solution</h2>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">{caseStudy.solution}</p>
          </section>

          {caseStudy.architecture && (
            <section className="mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-white">Architecture</h2>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">{caseStudy.architecture}</p>
            </section>
          )}

          <section className="mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-white">Challenges & Learnings</h2>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">{caseStudy.challenges}</p>
          </section>

          {caseStudy.screenshots.length > 0 && (
            <section className="mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-white">Screenshots</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {caseStudy.screenshots.map((screenshot, i) => (
                  <img
                    key={i}
                    src={screenshot}
                    alt={`Screenshot ${i + 1}`}
                    className="w-full rounded-lg border border-gray-700"
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      </article>

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
✅ Responsive title (text-3xl sm:text-4xl md:text-5xl) with leading-tight
✅ Responsive spacing (py-8 sm:py-12, mb-6 sm:mb-8)
✅ Responsive tech tags (px-2 sm:px-3, text-xs sm:text-sm, gap-2 sm:gap-3)
✅ Stacked buttons on mobile (flex-col sm:flex-row)
✅ Full-width buttons on mobile with items-stretch
✅ Responsive button text and icons (text-sm sm:text-base, w-4 h-4 sm:w-5 sm:h-5)
✅ Responsive section headings (text-2xl sm:text-3xl)
✅ Responsive body text (text-sm sm:text-base) with leading-relaxed
✅ Responsive prose styles (prose-sm sm:prose-base lg:prose-lg)
✅ Screenshots grid: 1 column on mobile, 2 on desktop (grid-cols-1 sm:grid-cols-2)
✅ Responsive grid gaps (gap-4 sm:gap-6)
✅ Back link responsive (text-sm sm:text-base)

MOBILE OPTIMIZATIONS:
- Smaller font sizes for better readability on small screens
- Tighter spacing to fit more content
- Stacked layout for buttons and cards
- Single column for screenshots on mobile
- Touch-friendly button sizes
*/