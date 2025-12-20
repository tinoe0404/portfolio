export { default } from 'next-auth/middleware';

export const config = {
  matcher: [
    '/_admin/dashboard/:path*',
    '/_admin/projects/:path*',
  ],
};