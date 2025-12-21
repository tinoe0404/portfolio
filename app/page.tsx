// ============================================================
// FILE: app/page.tsx (Updated with CV Download)
// ============================================================
import Link from 'next/link';
import {
  ArrowRight,
  Code,
  Briefcase,
  Mail,
  Layers,
  Brain,
  Server,
} from 'lucide-react';

import PublicNav from '@/components/PublicNav';
import { Footer } from '@/components/Footer';
import DownloadCVButton from '@/components/DownloadCVButton';
import { getCV } from '@/lib/actions';

const skills = [
  {
    title: 'Clean Code',
    description:
      'Writing maintainable, readable, and scalable code that follows industry best practices and standards.',
    icon: Code,
    color: 'text-blue-400',
  },
  {
    title: 'Full-Stack Development',
    description:
      'Building complete solutions across frontend, backend, and databases using modern frameworks and tools.',
    icon: Briefcase,
    color: 'text-purple-400',
  },
  {
    title: 'Software Design & Architecture',
    description:
      'Designing well-structured systems using proven patterns, modular architecture, and clear abstractions.',
    icon: Layers,
    color: 'text-pink-400',
  },
  {
    title: 'Problem Solving',
    description:
      'Breaking down complex problems into efficient solutions using algorithms, data structures, and logic.',
    icon: Brain,
    color: 'text-green-400',
  },
  {
    title: 'Scalable Systems',
    description:
      'Building systems that scale reliably with performance, security, and maintainability in mind.',
    icon: Server,
    color: 'text-yellow-400',
  },
  {
    title: 'Collaboration & Communication',
    description:
      'Working effectively in teams, communicating ideas clearly, and contributing in agile environments.',
    icon: Mail,
    color: 'text-cyan-400',
  },
];

export default async function HomePage() {
  const cv = await getCV();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <PublicNav />

      {/* ================= HERO ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Full-Stack Software Engineer
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-gray-400 mb-10 max-w-3xl mx-auto">
            I design and build modern, scalable web applications using
            Next.js, React, TypeScript, and backend technologies — focused on
            clean architecture and great user experience.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* CV Download Button */}
            <DownloadCVButton 
              cvUrl={cv?.cvUrl} 
              fileName={cv?.cvFileName}
            />

            <Link
              href="/projects"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors font-semibold"
            >
              View Projects
              <ArrowRight className="w-5 h-5" />
            </Link>

            <Link
              href="/contact"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 rounded-lg border border-gray-700 bg-gray-800 hover:bg-gray-700 transition-colors font-semibold"
            >
              Get in Touch
              <Mail className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ================= SKILLS ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {skills.map(({ title, description, icon: Icon, color }) => (
            <div
              key={title}
              className="group rounded-xl border border-gray-700 bg-gray-800/60 p-6 sm:p-8 transition-all hover:border-gray-600 hover:bg-gray-800"
            >
              <Icon
                className={`w-11 h-11 mb-4 ${color} transition-transform group-hover:scale-110`}
              />
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-3">
                {title}
              </h3>
              <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}

// ============================================================
// CHANGES MADE:
// ============================================================
/*
✅ Added async to HomePage function
✅ Imported getCV from @/lib/actions
✅ Imported DownloadCVButton component
✅ Fetched CV data with await getCV()
✅ Added DownloadCVButton as first button in hero section
✅ Made all buttons full-width on mobile (w-full sm:w-auto)
✅ CV button only shows if CV is uploaded (handled in DownloadCVButton component)
✅ Maintained responsive design and spacing
✅ Kept all existing functionality and styling

BUTTON ORDER IN HERO:
1. Download CV (gradient blue-purple)
2. View Projects (blue)
3. Get in Touch (gray)

The Download CV button will only appear when an admin uploads a CV
through the dashboard. If no CV is uploaded, the button won't show.
*/