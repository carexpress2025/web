import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './src/locales/en_US.json';
import fi from './src/locales/fi_FI.json';
import br from './src/locales/pt_BR.json';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },
    fi: {
      translation: fi,
    },
    br: {
      translation: br,
    },
  },
  lng: 'fi',
  fallbackLng: 'fi',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
