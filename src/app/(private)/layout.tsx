'use client';

import { AuthProvider } from '@contexts/auth';
import WithAuth from '@/infra/auth/hoc/withAuth';
import { SessionProvider } from 'next-auth/react';
import Sidebar from '@/presentation/components/Sidebar';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <AuthProvider>
        <WithAuth>
          <div className="min-h-screen flex">
            <Sidebar />
            {children}
          </div>
        </WithAuth>
      </AuthProvider>
    </SessionProvider>
  );
}
