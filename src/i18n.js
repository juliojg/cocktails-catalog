import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import * as translationsES from './translations/translationsES/translationsES.json';
import * as translationsEN from './translations/translationsEN/translationsEN.json';

const resources = {
  es: {
    translation: translationsES
  },
  en: {
    translation: translationsEN
  }
};

const options = {
  order: ['sessionStorage', 'navigator', 'htmlTag', 'path', 'subdomain', 'cookie', 'localStorage', 'sessionStorage'],
  lookupLocalStorage: 'lng'
}

i18next.use(LanguageDetector).use(initReactI18next).init({
  resources: resources,
  load: 'languageOnly',
  lng: navigator.language,
  detection: options,
  interpolation: {
    escapeValue: false
  },
  fallbackLng: 'en',
  supportedLngs: ['en', 'es'],
});

export default i18next;
