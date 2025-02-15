'use client';

import { ReactNode, useState, useEffect } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { AuthContext } from './authContext';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(status === 'loading');

  useEffect(() => {
    if (status !== 'loading') {
      setIsLoading(false);
    }
  }, [status]);

  const handleSignIn = async (email: string, password: string) => {
    await signIn('credentials', { email, password, redirect: false });
  };

  const handleSignOut = () => {
    signOut({ callbackUrl: '/signin' });
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        isLoading,
        signIn: handleSignIn,
        signOut: handleSignOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
