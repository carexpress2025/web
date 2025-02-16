'use client';

import { JSX, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { LanguageState } from '@/data/store/languageSlice';
import i18n from '../../../i18n';
import { Card } from '@/components/ui/card';
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai';

export default function WhatsappView(): JSX.Element {
  const { t } = useTranslation();
  const language = useSelector(
    (state: { language: LanguageState }) => state.language.language,
  );

  useEffect(() => {
    if (language) {
      i18n.changeLanguage(language);
    }
  }, [language]);

  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsConnected(true);
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center space-y-8 w-full max-w-xl mx-auto">
      <header className="flex justify-center font-bold text-3xl text-gray-800">
        <h1>{t('pages.whatsapp.title')}</h1>
      </header>
      <Card className="p-6 shadow-lg rounded-xl bg-white w-full transition-transform transform hover:scale-105">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-700">
            {t('pages.whatsapp.subtitle')}
          </h2>
          <p className="flex items-center justify-start gap-4 text-lg text-gray-700">
            {isConnected ? (
              <AiOutlineCheckCircle className="text-green-500 text-3xl animate-pulse" />
            ) : (
              <AiOutlineCloseCircle className="text-red-500 text-3xl animate-pulse" />
            )}
            <span>
              {isConnected
                ? t('pages.whatsapp.connected')
                : t('pages.whatsapp.notConnected')}
            </span>
          </p>
        </div>
      </Card>
    </div>
  );
}
