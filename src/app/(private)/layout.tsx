'use client';

import { AuthProvider } from '@/infra/contexts/auth';
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
        <div className="min-h-screen flex">
          <Sidebar />
          {children}
        </div>
      </AuthProvider>
    </SessionProvider>
  );
}
