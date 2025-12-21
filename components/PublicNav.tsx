// FILE: components/PublicNav.tsx (Enhanced with animations)
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function PublicNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="border-b border-gray-800 sticky top-0 z-50 bg-gray-900/95 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link 
            href="/" 
            className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
          >
            Portfolio
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link 
              href="/projects" 
              className={`transition-colors ${
                isActive('/projects') 
                  ? 'text-white font-semibold' 
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Projects
            </Link>
            <Link 
              href="/case-studies" 
              className={`transition-colors ${
                pathname.startsWith('/case-studies')
                  ? 'text-white font-semibold' 
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Case Studies
            </Link>
            <Link 
              href="/contact" 
              className={`transition-colors ${
                isActive('/contact')
                  ? 'text-white font-semibold' 
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Contact
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-gray-800"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Dropdown with Animation */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="py-4 space-y-2">
            <Link
              href="/projects"
              className={`block px-4 py-3 rounded-lg transition-all ${
                isActive('/projects')
                  ? 'text-white bg-gray-800 font-semibold'
                  : 'text-gray-300 hover:text-white hover:bg-gray-800'
              }`}
            >
              Projects
            </Link>
            <Link
              href="/case-studies"
              className={`block px-4 py-3 rounded-lg transition-all ${
                pathname.startsWith('/case-studies')
                  ? 'text-white bg-gray-800 font-semibold'
                  : 'text-gray-300 hover:text-white hover:bg-gray-800'
              }`}
            >
              Case Studies
            </Link>
            <Link
              href="/contact"
              className={`block px-4 py-3 rounded-lg transition-all ${
                isActive('/contact')
                  ? 'text-white bg-gray-800 font-semibold'
                  : 'text-gray-300 hover:text-white hover:bg-gray-800'
              }`}
            >
              Contact
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm md:hidden -z-10"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </nav>
  );
}

// ============================================================
// ENHANCEMENTS ADDED:
// ============================================================
/*
✅ Smooth slide-down animation for dropdown
✅ Active page highlighting (shows which page you're on)
✅ Sticky navigation (stays at top when scrolling)
✅ Backdrop overlay when menu is open
✅ Prevents body scroll when menu is open
✅ Auto-closes menu when navigating to new page
✅ Better hover effects
✅ Improved accessibility (aria-expanded)
✅ Smooth transitions for all interactions

FEATURES:
- Desktop: Horizontal nav with active state highlighting
- Mobile: Animated dropdown with backdrop overlay
- Sticky: Nav bar sticks to top of screen
- Active state: Current page is highlighted in bold white
- Smooth: CSS transitions for all animations
- Accessible: Proper ARIA labels and keyboard support
*/