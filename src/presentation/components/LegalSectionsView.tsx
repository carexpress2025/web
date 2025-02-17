'use client';

import { LanguageState } from '@/data/store/languageSlice';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import i18n from '../../../i18n';
import { ScrollArea } from '@radix-ui/react-scroll-area';

export default function LegalSectionsView({ mainKey }: { mainKey: string }) {
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
    <ScrollArea className="h-full">
      <div className="mx-auto max-w-4xl rounded-lg bg-white p-8 shadow">
        <h1 className="mb-8 text-3xl font-bold">
          {t(`pages.${mainKey}.title`)}
        </h1>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">
            {t(`pages.${mainKey}.section1.title`)}
          </h2>
          <p className="mb-4 text-gray-700">
            {t(`pages.${mainKey}.section1.content`)}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">
            {t(`pages.${mainKey}.section2.title`)}
          </h2>
          <p className="mb-4 text-gray-700">
            {t(`pages.${mainKey}.section2.content`)}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">
            {t(`pages.${mainKey}.section3.title`)}
          </h2>
          <p className="mb-4 text-gray-700">
            {t(`pages.${mainKey}.section3.content`)}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">
            {t(`pages.${mainKey}.section4.title`)}
          </h2>
          <p className="mb-4 text-gray-700">
            {t(`pages.${mainKey}.section4.content`)}
          </p>
          <ul className="mb-4 list-disc pl-6 text-gray-700">
            <li>{t(`pages.${mainKey}.section4.list.item1`)}</li>
            <li>{t(`pages.${mainKey}.section4.list.item2`)}</li>
            <li>{t(`pages.${mainKey}.section4.list.item3`)}</li>
            <li>{t(`pages.${mainKey}.section4.list.item4`)}</li>
            <li>{t(`pages.${mainKey}.section4.list.item5`)}</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">
            {t(`pages.${mainKey}.section5.title`)}
          </h2>
          <p className="mb-4 text-gray-700">
            {t(`pages.${mainKey}.section5.content`)}
          </p>
          <ul className="mb-4 list-disc pl-6 text-gray-700">
            <li>{t(`pages.${mainKey}.section5.list.item1`)}</li>
            <li>{t(`pages.${mainKey}.section5.list.item2`)}</li>
            <li>{t(`pages.${mainKey}.section5.list.item3`)}</li>
          </ul>
          <p className="mb-4 text-gray-700">
            {t(`pages.${mainKey}.section5.extra`)}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">
            {t(`pages.${mainKey}.section6.title`)}
          </h2>
          <p className="mb-4 text-gray-700">
            {t(`pages.${mainKey}.section6.content`)}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">
            {t(`pages.${mainKey}.section7.title`)}
          </h2>
          <p className="mb-4 text-gray-700">
            {t(`pages.${mainKey}.section7.content`)}
          </p>
        </section>
      </div>
    </ScrollArea>
  );
}
