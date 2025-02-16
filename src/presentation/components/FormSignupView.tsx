'use client';

import { JSX } from 'react';
import { useSignup } from '@/infra/hooks';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { LanguageState } from '@/data/store/languageSlice';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import i18n from '../../../i18n';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface FormSignupViewProps {
  onSuccess: (accountId: string) => void;
}

export default function FormSignupView({
  onSuccess,
}: FormSignupViewProps): JSX.Element {
  const { t } = useTranslation();
  const language = useSelector(
    (state: { language: LanguageState }) => state.language.language,
  );

  useEffect(() => {
    if (language) {
      i18n.changeLanguage(language);
    }
  }, [language]);

  const {
    error,
    loading,
    email,
    password,
    setEmail,
    setPassword,
    handleSubmit,
  } = useSignup(onSuccess);

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-2" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <div className="space-y-4">
        <div>
          <Label>{t('pages.auth.signup.labels.email')}</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="w-full"
            placeholder={t('pages.auth.signup.placeholders.email')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <Label>{t('pages.auth.signup.labels.password')}</Label>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="password"
            required
            className="w-full"
            placeholder={t('pages.auth.signup.placeholders.password')}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading
          ? t('pages.auth.signup.creatingAccount')
          : t('pages.auth.signup.buttons.createAccount')}
      </Button>
      <p className="text-muted-foreground px-8 text-center text-sm">
        {t('pages.auth.signup.alreadyHaveAccount')}
        <Link
          href="/signin"
          className="text-primary hover:text-blue-600 underline underline-offset-4"
        >
          {t('pages.auth.signup.buttons.loginHere')}
        </Link>{' '}
      </p>
    </form>
  );
}
