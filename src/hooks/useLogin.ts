import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'next/navigation';

export function useLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { t } = useTranslation();

  const searchParams = useSearchParams();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError(t('hooks.errors.login.requiredFields'));
      return;
    }

    setLoading(true);

    const callbackUrl = searchParams.get('callbackUrl') || '/';

    const response = await signIn('credentials', {
      email,
      password,
      redirect: false,
      callbackUrl,
    });

    setLoading(false);

    if (!response?.ok) {
      setError(t('hooks.errors.failedLogin'));
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    loading,
    handleSubmit,
  };
}
