'use client';

import { LanguageState } from '@/data/store/languageSlice';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import i18n from '../../../i18n';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/core/libs/utils';

export function ButtonRedirect({
  link,
  keyItem1,
}: {
  keyItem1: string;
  link: string;
}) {
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
    <Link
      href={link}
      className={cn(
        buttonVariants({ variant: 'ghost' }),
        'hover:bg-primary/10 absolute right-4 top-8 md:right-8',
      )}
    >
      {t(keyItem1)}
    </Link>
  );
}
