import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';

export const useCreateUser = (accountId: string) => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name) {
      setError(t('hooks.errors.signup.requiredFields'));
      return;
    }

    setLoading(true);

    const response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ accountId, name }),
    });

    setLoading(false);

    if (response.ok) {
      router.push('/dashboard');
    } else {
      setError(t('hooks.errors.failedSignup'));
    }
  };

  return {
    setName,
    name,
    error,
    loading,
    handleSubmit,
  };
};
