'use client';

import { AuthProvider } from '@/contexts/auth';
import WithAuth from '@/hoc/withAuth';
import { SessionProvider } from 'next-auth/react';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <AuthProvider>
        <WithAuth>{children}</WithAuth>
      </AuthProvider>
    </SessionProvider>
  );
}
