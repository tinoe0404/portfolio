// ============================================================
// FILE: app/contact/page.tsx (COMPLETE)
// ============================================================
import Link from 'next/link';
import ContactForm from '@/components/ContactForm';
import DownloadCVButton from '@/components/DownloadCVButton';
import { getCV } from '@/lib/actions';
import { Mail, Github, Linkedin, Twitter } from 'lucide-react';
import PublicNav from '@/components/PublicNav';
import { Footer } from '@/components/Footer';

export const metadata = {
  title: 'Contact | Portfolio',
  description: 'Get in touch with me',
};

export default async function ContactPage() {
  const cv = await getCV();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <PublicNav />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-3 sm:mb-4 text-white">Get In Touch</h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto">
            I'm currently looking for new opportunities. Whether you have a question or just want to say hi, feel free to reach out!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Contact Form */}
          <ContactForm />

          {/* Connect With Me & Quick Info */}
          <div className="space-y-6 sm:space-y-8">
            {/* Connect With Me */}
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">Connect With Me</h2>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <a
                  href="https://github.com/tinoe0404"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-gray-900 hover:bg-gray-700 border border-gray-700 rounded-lg transition-colors group"
                >
                  <Github className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 group-hover:text-white transition-colors" />
                  <span className="text-sm sm:text-base text-gray-300 group-hover:text-white transition-colors font-medium">GitHub</span>
                </a>

                <a
                  href="https://www.linkedin.com/in/tinotenda-chandengenda-691526285"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-gray-900 hover:bg-gray-700 border border-gray-700 rounded-lg transition-colors group"
                >
                  <Linkedin className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 group-hover:text-white transition-colors" />
                  <span className="text-sm sm:text-base text-gray-300 group-hover:text-white transition-colors font-medium">LinkedIn</span>
                </a>

                <a
                  href="https://x.com/tinotendac17284?s=21"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-gray-900 hover:bg-gray-700 border border-gray-700 rounded-lg transition-colors group"
                >
                  <Twitter className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 group-hover:text-white transition-colors" />
                  <span className="text-sm sm:text-base text-gray-300 group-hover:text-white transition-colors font-medium">Twitter</span>
                </a>

                <a
                  href="mailto:tinochan06@gmail.com"
                  className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-gray-900 hover:bg-gray-700 border border-gray-700 rounded-lg transition-colors group"
                >
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 group-hover:text-white transition-colors" />
                  <span className="text-sm sm:text-base text-gray-300 group-hover:text-white transition-colors font-medium">Email</span>
                </a>
              </div>
            </div>

            {/* Quick Info & CV Download */}
            <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-700/50 rounded-lg p-6 sm:p-8">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-4">Quick Info</h3>
              <div className="space-y-3 text-sm sm:text-base text-gray-300 mb-6">
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
              
              {/* CV Download Button */}
              <DownloadCVButton 
                className="w-full justify-center"
              />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}