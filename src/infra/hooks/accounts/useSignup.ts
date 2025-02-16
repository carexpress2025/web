import { Account } from '@prisma/client';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export const useSignup = (onSuccess: (accountId: string) => void) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError(t('hooks.errors.signup.requiredFields'));
      return;
    }

    setLoading(true);

    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    setLoading(false);

    if (response.ok) {
      const data: { account: Account } = await response.json();

      const accountId = data.account.id.toString();

      onSuccess(accountId);
    } else {
      setError(t('hooks.errors.failedSignup'));
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
};
