import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'next/navigation';
import { signinAccountSchema } from '@/validations';
import { useRouter } from 'next/navigation';

export function useLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { t } = useTranslation();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationResult = signinAccountSchema.safeParse({ email, password });

    if (!validationResult.success) {
      const validationError = validationResult.error.format();
      const firstError = Object.values(validationError)
        .flat()
        .map((err) => (typeof err === 'string' ? err : err._errors[0]))[0];

      setError(firstError);
      return;
    }

    setLoading(true);

    const callbackUrl = searchParams.get('callbackUrl') || '/';

    try {
      const response = await signIn('credentials', {
        email,
        password,
        redirect: false,
        callbackUrl,
      });

      setLoading(false);

      if (response && response.ok) {
        router.push('/');
      } else {
        setError(t('messages.errors.auth.signin.failedLogin'));
      }
    } catch (error) {
      console.error('Erro ao tentar autenticar:', error);
      setError(t('messages.errors.auth.signin.generalError'));
      setLoading(false);
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
