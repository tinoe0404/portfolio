// ============================================================
// FILE: components/Footer.tsx (Modern, Same Hue)
// ============================================================
import Link from 'next/link';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-gray-800/60 bg-gradient-to-b from-transparent to-black/40">
      {/* subtle glow */}
      <div className="pointer-events-none absolute inset-x-0 -top-24 h-24 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-transparent blur-2xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold tracking-tight bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Portfolio
            </h3>
            <p className="text-sm leading-relaxed text-gray-400 max-w-sm">
              Full-stack developer crafting performant, modern web applications
              with clean architecture and great UX.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-300">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm">
              {[
                { href: '/', label: 'Home' },
                { href: '/projects', label: 'Projects' },
                { href: '/case-studies', label: 'Case Studies' },
                { href: '/contact', label: 'Contact' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-gray-400 transition-colors hover:text-white"
                  >
                    <span className="h-px w-0 bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-300 group-hover:w-4" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-300">
              Connect
            </h4>
            <div className="flex flex-wrap gap-3">
              {[
                {
                  href: 'https://github.com/tinoe0404',
                  label: 'GitHub',
                  Icon: Github,
                },
                {
                  href: 'https://x.com/tinotendac17284?s=21',
                  label: 'Twitter',
                  Icon: Twitter,
                },
                {
                  href: 'https://www.linkedin.com/in/tinotenda-chandengenda-691526285',
                  label: 'LinkedIn',
                  Icon: Linkedin,
                },
                {
                  href: 'mailto:tinochan06@gmail.com',
                  label: 'Email',
                  Icon: Mail,
                },
              ].map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="group relative flex h-10 w-10 items-center justify-center rounded-xl border border-gray-800 bg-gray-900/60 transition-all hover:border-purple-500/50 hover:bg-gray-900"
                >
                  <Icon className="h-5 w-5 text-gray-400 transition-colors group-hover:text-white" />
                  <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/0 to-purple-500/0 opacity-0 transition-opacity group-hover:opacity-100" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-gray-800/60 pt-6 text-center md:flex-row">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Tinotenda Chandengenda. All rights reserved.
          </p>

          <span className="text-xs text-gray-600">
            Built with <span className="text-purple-400">Next.js</span> &{' '}
            <span className="text-blue-400">Tailwind</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
