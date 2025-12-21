// ============================================================
// FILE: app/layout.tsx (Updated)
// ============================================================
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Full-Stack Developer Portfolio',
  description: 'Showcasing modern web development projects and case studies',
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}