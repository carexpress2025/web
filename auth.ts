import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { authConfig } from './auth.config';

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const user = await prisma.accounts.findUnique({
          where: { email: credentials?.email },
        });

        if (
          user &&
          credentials?.password &&
          (await bcrypt.compare(credentials.password, user.password))
        ) {
          return user;
        }
        return null;
      },
    }),
  ],
});
