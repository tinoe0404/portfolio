// app/contact/page.tsx - Contact Page
import Link from 'next/link';
import { Mail, Github, Linkedin } from 'lucide-react';

export const metadata = {
  title: 'Contact | Portfolio',
  description: 'Get in touch with me',
};

export default function ContactPage() {
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
              <Link href="/contact" className="text-white font-semibold">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-4 text-white">Get in Touch</h1>
        <p className="text-xl text-gray-400 mb-12">
          Have a project in mind or want to collaborate? I'd love to hear from you.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          <a
            href="mailto:your.email@example.com"
            className="flex flex-col items-center p-8 bg-gray-800 border border-gray-700 rounded-lg hover:border-blue-500 transition-colors"
          >
            <Mail className="w-12 h-12 text-blue-400 mb-4" />
            <h3 className="text-xl font-bold mb-2 text-white">Email</h3>
            <p className="text-gray-400 text-center">your.email@example.com</p>
          </a>

          <a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center p-8 bg-gray-800 border border-gray-700 rounded-lg hover:border-purple-500 transition-colors"
          >
            <Github className="w-12 h-12 text-purple-400 mb-4" />
            <h3 className="text-xl font-bold mb-2 text-white">GitHub</h3>
            <p className="text-gray-400 text-center">@yourusername</p>
          </a>

          <a
            href="https://linkedin.com/in/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center p-8 bg-gray-800 border border-gray-700 rounded-lg hover:border-pink-500 transition-colors"
          >
            <Linkedin className="w-12 h-12 text-pink-400 mb-4" />
            <h3 className="text-xl font-bold mb-2 text-white">LinkedIn</h3>
            <p className="text-gray-400 text-center">Your Name</p>
          </a>
        </div>
      </div>
    </div>
  );
}