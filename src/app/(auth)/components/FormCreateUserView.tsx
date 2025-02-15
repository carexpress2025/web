'use client';

import { JSX } from 'react';
import { useCreateUser } from '@/hooks';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { LanguageState } from '@/store/languageSlice';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import i18n from '../../../../i18n';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function FormCreateUserView({
  accountId,
}: {
  accountId: string;
}): JSX.Element {
  const { t } = useTranslation();
  const language = useSelector(
    (state: { language: LanguageState }) => state.language.language,
  );

  useEffect(() => {
    if (language) {
      i18n.changeLanguage(language);
    }
  }, [language]);

  const { error, handleSubmit, loading, name, setName } =
    useCreateUser(accountId);

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
          <Label>{t('pages.auth.signup.labels.name')}</Label>
          <Input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            className="w-full"
            placeholder={t('pages.auth.signup.placeholders.name')}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading
          ? t('pages.auth.signup.creatingAccount')
          : t('pages.auth.signup.buttons.createAccount')}
      </Button>
    </form>
  );
}
