'use client';

import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import i18n from '../../../i18n';
import { LanguageState } from '@/store/languageSlice';

export default function LanguageSwitcher() {
  const dispatch = useDispatch();
  const currentLanguage = useSelector(
    (state: { language: LanguageState }) => state.language.language,
  );
  const { t } = useTranslation();

  const changeLanguage = useCallback(
    (lng: string) => {
      dispatch({ type: 'SET_LANGUAGE', payload: lng });
      i18n.changeLanguage(lng);
    },
    [dispatch],
  );

  const languages = [
    { code: 'en', label: t('components.language_switcher.languages.en_US') },
    { code: 'fi', label: t('components.language_switcher.languages.fi_FI') },
    { code: 'br', label: t('components.language_switcher.languages.pt_BR') },
  ];

  return (
    <div className="flex items-center justify-between w-full p-2 rounded-md bg-gradient-to-r from-gray-400 to-gray-600">
      <span className="text-sm text-gray-800">
        {t('components.layout.sidebar.language')}
      </span>
      <select
        className="bg-gray-400 text-gray-800 text-sm rounded px-2 py-1 focus:outline-none focus:ring focus:ring-blue-500 transition"
        onChange={(e) => changeLanguage(e.target.value)}
        value={currentLanguage}
      >
        {languages.map(({ code, label }) => (
          <option
            key={code}
            value={code}
            className="text-gray-800 hover:text-white"
          >
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}
