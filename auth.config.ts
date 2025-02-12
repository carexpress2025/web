import prisma from '@/lib/prisma';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/signin',
    error: '/signin',
  },
  session: {
    strategy: 'jwt',
  },
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isAuthPage = nextUrl.pathname.startsWith('/signin');

      if (isAuthPage) {
        if (isLoggedIn)
          return Response.redirect(new URL('/dashboard', nextUrl));

        return true;
      }

      if (!isLoggedIn) {
        return Response.redirect(new URL('/signin', nextUrl));
      }

      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
