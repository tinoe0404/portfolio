// app/page.tsx - Landing Page
import Link from 'next/link';
import { ArrowRight, Code, Briefcase, Mail } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Navigation */}
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

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Full-Stack Developer
          </h1>
          <p className="text-2xl text-gray-400 mb-12 max-w-3xl mx-auto">
            Building modern web applications with Next.js, React, TypeScript, and more.
            Passionate about creating elegant solutions to complex problems.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/projects"
              className="flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors font-semibold"
            >
              View Projects
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/contact"
              className="flex items-center gap-2 px-8 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg transition-colors font-semibold"
            >
              Get in Touch
              <Mail className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-8">
            <Code className="w-12 h-12 text-blue-400 mb-4" />
            <h3 className="text-xl font-bold mb-3 text-white">Clean Code</h3>
            <p className="text-gray-400">
              Writing maintainable, scalable, and well-documented code following industry best practices.
            </p>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-8">
            <Briefcase className="w-12 h-12 text-purple-400 mb-4" />
            <h3 className="text-xl font-bold mb-3 text-white">Full-Stack Expertise</h3>
            <p className="text-gray-400">
              Experience with both frontend and backend technologies to deliver complete solutions.
            </p>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-8">
            <Mail className="w-12 h-12 text-pink-400 mb-4" />
            <h3 className="text-xl font-bold mb-3 text-white">Collaborative</h3>
            <p className="text-gray-400">
              Strong communication skills and experience working in agile team environments.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}