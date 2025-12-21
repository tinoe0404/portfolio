// FILE: app/contact/page.tsx
import Link from 'next/link';
import ContactForm from '@/components/ContactForm';
import { Mail, Github, Linkedin, Twitter } from 'lucide-react';

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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 text-white">Get In Touch</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            I'm currently looking for new opportunities. Whether you have a question or just want to say hi, feel free to reach out!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <ContactForm />

          {/* Connect With Me */}
          <div>
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-white mb-6">Connect With Me</h2>
              <div className="grid grid-cols-2 gap-4">
                <a
                  href="https://github.com/tinoe0404"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 bg-gray-900 hover:bg-gray-700 border border-gray-700 rounded-lg transition-colors group"
                >
                  <Github className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" />
                  <span className="text-gray-300 group-hover:text-white transition-colors font-medium">GitHub</span>
                </a>

                <a
                  href="https://www.linkedin.com/in/tinotenda-chandengenda-691526285"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 bg-gray-900 hover:bg-gray-700 border border-gray-700 rounded-lg transition-colors group"
                >
                  <Linkedin className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" />
                  <span className="text-gray-300 group-hover:text-white transition-colors font-medium">LinkedIn</span>
                </a>

                <a
                  href="https://twitter.com/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 bg-gray-900 hover:bg-gray-700 border border-gray-700 rounded-lg transition-colors group"
                >
                  <Twitter className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" />
                  <span className="text-gray-300 group-hover:text-white transition-colors font-medium">Twitter</span>
                </a>

                <a
                  href="mailto:tinochan06@gmail.com"
                  className="flex items-center gap-3 p-4 bg-gray-900 hover:bg-gray-700 border border-gray-700 rounded-lg transition-colors group"
                >
                  <Mail className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" />
                  <span className="text-gray-300 group-hover:text-white transition-colors font-medium">Email</span>
                </a>
              </div>
            </div>

            {/* Additional Info */}
            <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-700/50 rounded-lg p-8">
              <h3 className="text-xl font-bold text-white mb-4">Quick Info</h3>
              <div className="space-y-3 text-gray-300">
                <p className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">📧</span>
                  <span>Email: tinochan06@gmail.com</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-purple-400 mt-1">🌍</span>
                  <span>Open to remote opportunities and willing to relocate for the right role</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-pink-400 mt-1">⏱️</span>
                  <span>Response time: Usually within 24 hours</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

