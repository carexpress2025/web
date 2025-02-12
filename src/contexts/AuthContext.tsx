'use client';

import { Loading } from '@/components/Loading';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';

export default function AuthContext({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { status } = useSession();

  useEffect(() => {
    if (status === 'unauthenticated') {
      window.location.href = '/signin';
    }
  }, [status]);

  if (status === 'loading') {
    return (
      <div className="h-screen flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  return <>{children}</>;
}
