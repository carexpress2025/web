'use client';

import { LanguageState } from '@/data/store/languageSlice';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import i18n from '../../../i18n';

interface IProps {
  itemKey: string;
}

export default function HeaderView({ itemKey }: IProps) {
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
    <header className="absolute top-0 mt-8 flex justify-start font-bold">
      <h1 className="text-2xl">{t(itemKey)}</h1>
    </header>
  );
}
