'use client';

import Sidebar from '@/components/layout/sidebar';
import AuthContext from '@/contexts/AuthContext';
import { SessionProvider } from 'next-auth/react';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <AuthContext>
        <div className="min-h-screen flex">
          <Sidebar />
          {children}
        </div>
      </AuthContext>
    </SessionProvider>
  );
}
