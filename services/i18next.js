import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from '../locales/en.json';
import ta from '../locales/ta.json';

export const languageResources = {
  en: {translation: en},
  ta: {translation: ta},
};

i18next.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lang: 'en',
  fallbackLng: 'en',
  resources: languageResources,
});

export default i18next;
