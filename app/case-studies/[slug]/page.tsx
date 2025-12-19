// app/case-studies/[slug]/page.tsx - Single Case Study
import Link from 'next/link';
import { getProjectBySlug } from '@/lib/actions';
import { notFound } from 'next/navigation';
import { Github, ExternalLink, ArrowLeft } from 'lucide-react';

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
      <nav className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Portfolio
            </Link>
            <div className="flex items-center gap-8">
              <Link href="/projects" className="text-gray-300 hover:text-white transition-colors">
                Projects
              </Link>
              <Link href="/case-studies" className="text-gray-300 hover:text-white transition-colors">
                Case Studies
              </Link>
              <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          href="/case-studies"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Case Studies
        </Link>

        <h1 className="text-5xl font-bold mb-6 text-white">{project.title}</h1>

        <div className="flex flex-wrap gap-3 mb-8">
          {project.techStack.map((tech, i) => (
            <span key={i} className="px-3 py-1 bg-gray-800 border border-gray-700 text-sm text-gray-300 rounded">
              {tech}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-4 mb-12">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg transition-colors"
            >
              <Github className="w-5 h-5" />
              View Code
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              <ExternalLink className="w-5 h-5" />
              Live Demo
            </a>
          )}
        </div>

        {project.coverImage && (
          <img
            src={project.coverImage}
            alt={project.title}
            className="w-full rounded-lg mb-12 border border-gray-700"
          />
        )}

        <div className="prose prose-invert prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4 text-white">Overview</h2>
            <p className="text-gray-300 leading-relaxed">{caseStudy.overview}</p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4 text-white">The Problem</h2>
            <p className="text-gray-300 leading-relaxed">{caseStudy.problem}</p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4 text-white">The Solution</h2>
            <p className="text-gray-300 leading-relaxed">{caseStudy.solution}</p>
          </section>

          {caseStudy.architecture && (
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-4 text-white">Architecture</h2>
              <p className="text-gray-300 leading-relaxed">{caseStudy.architecture}</p>
            </section>
          )}

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4 text-white">Challenges & Learnings</h2>
            <p className="text-gray-300 leading-relaxed">{caseStudy.challenges}</p>
          </section>

          {caseStudy.screenshots.length > 0 && (
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-white">Screenshots</h2>
              <div className="grid md:grid-cols-2 gap-6">
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
    </div>
  );
}
