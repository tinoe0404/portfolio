import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // 1. Check if user typed anything
        if (!credentials?.email || !credentials.password) return null;

        // 2. Get the env variables
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;

        // 3. CRITICAL FIX: Check if env vars exist before comparing.
        // This tells TypeScript that adminEmail is definitely a 'string' and not 'undefined'.
        if (!adminEmail || !adminPassword) {
          console.error("Admin credentials are not set in the .env file");
          return null;
        }

        // 4. Compare input against env variables
        const isValidEmail = credentials.email === adminEmail;
        const isValidPassword = credentials.password === adminPassword;

        if (isValidEmail && isValidPassword) {
          return {
            id: '1',
            email: adminEmail, // TypeScript is happy now because we checked "!adminEmail" above
            name: 'Admin',
            role: 'ADMIN',
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) token.role = (user as any).role; // Type assertion helps here if types aren't extended
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/admin/login',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
};