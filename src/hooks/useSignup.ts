import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';

export function useSignup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const router = useRouter();

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

    if (response.ok) {
      router.push('/signin');
    } else {
      setError(t('hooks.errors.failedSignup'));
    }

    setLoading(false);
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

//
// Configuração correta do `t`

//
//

//     setLoading(true);

//     const response = await fetch('/api/auth/signup', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ email, password }),
//     });

//     setLoading(false);

//     if (response.ok) {
//       const { signIn } = await import('next-auth/react');
//       signIn('credentials', { email, password });
//     } else {
//       setError(t('hooks.errors.errorSignupFailed'));
//     }
//   };

// }
