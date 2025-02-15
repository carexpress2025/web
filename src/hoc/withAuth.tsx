'use client';

import { useAuth } from '@/hooks';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';

interface WithAuthProps {
  children: ReactNode;
}

const WithAuth = ({ children }: WithAuthProps) => {
  const { session, isLoading } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    if (!isLoading && !session) {
      router.push('/signin');
    }
  }, [session, isLoading, router]);

  if (!mounted || isLoading) {
    return <p>Loading...</p>;
  }

  return <>{children}</>;
};

export default WithAuth;
