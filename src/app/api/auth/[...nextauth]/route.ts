import { NextRequest, NextResponse } from 'next/server';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { PrismaAdapter } from '@next-auth/prisma-adapter';

const authOptions = {
  pages: {
    signIn: '/signin',
    error: '/signin',
  },
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 1 dia
  },
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Missing email or password');
        }

        const user = await prisma.accounts.findUnique({
          where: { email: credentials.email },
        });

        if (
          !user ||
          !(await bcrypt.compare(credentials.password, user.password))
        ) {
          throw new Error('Invalid credentials');
        }

        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
      }
      return session;
    },
  },
};

// Função para lidar com a solicitação POST usando o NextAuth
export async function POST(req: NextRequest) {
  const body = await req.json();

  const response = await NextAuth(req, {
    ...authOptions,
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
            !user ||
            !(await bcrypt.compare(credentials?.password, user.password))
          ) {
            throw new Error('Invalid credentials');
          }

          return user;
        },
      }),
    ],
  });

  // Caso o NextAuth tenha retornado um erro
  if (response?.error) {
    return NextResponse.json({ error: response.error }, { status: 401 });
  }

  return NextResponse.json({ user: response?.user });
}

// Função GET caso precise
export async function GET(req: NextRequest) {
  return NextResponse.json({
    message: 'GET method is not supported for this route.',
  });
}
