// app/case-studies/page.tsx - Case Studies List
import Link from 'next/link';
import { getCaseStudies } from '@/lib/actions';
import { ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Case Studies | Portfolio',
  description: 'In-depth case studies of my projects',
};

export default async function CaseStudiesPage() {
  const projects = await getCaseStudies();

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
              <Link href="/case-studies" className="text-white font-semibold">
                Case Studies
              </Link>
              <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-4 text-white">Case Studies</h1>
        <p className="text-xl text-gray-400 mb-12">
          Deep dives into the problems I've solved and how I solved them
        </p>

        {projects.length === 0 ? (
          <p className="text-gray-400 text-lg">No case studies available yet.</p>
        ) : (
          <div className="space-y-8">
            {projects.map((project) => (
              <Link
                key={project.id}
                href={`/case-studies/${project.slug}`}
                className="block bg-gray-800 border border-gray-700 rounded-lg overflow-hidden hover:border-blue-500 transition-colors"
              >
                <div className="md:flex">
                  {project.coverImage && (
                    <div className="md:w-1/3">
                      <img
                        src={project.coverImage}
                        alt={project.title}
                        className="w-full h-64 md:h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-8 md:w-2/3">
                    <h2 className="text-2xl font-bold mb-3 text-white">{project.title}</h2>
                    <p className="text-gray-400 mb-4">{project.caseStudy?.overview.substring(0, 200)}...</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.techStack.map((tech, i) => (
                        <span key={i} className="px-3 py-1 bg-gray-900 text-sm text-gray-300 rounded">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center text-blue-400 font-semibold">
                      Read Case Study
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}