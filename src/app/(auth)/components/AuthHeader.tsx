'use client';

import { LanguageState } from '@/store/languageSlice';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import i18n from '../../../../i18n';

export default function AuthHeader({
  keyItem1,
  keyItem2,
}: Readonly<{
  keyItem1: string;
  keyItem2: string;
}>) {
  const { t } = useTranslation();
  const language = useSelector(
    (state: { language: LanguageState }) => state.language.language,
  );

  useEffect(() => {
    if (language) {
      i18n.changeLanguage(language);
    }
  }, [language]);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex items-center gap-2">
        <span className="text-primary text-2xl font-bold">
          {t('site.name')}
        </span>
      </div>
      <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
        {t(keyItem1)}
      </h2>
      <p className="mt-2 text-center text-sm text-gray-600">{t(keyItem2)}</p>
    </div>
  );
}
