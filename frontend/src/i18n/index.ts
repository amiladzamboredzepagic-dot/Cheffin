import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import en from './locales/en.json'
import bs from './locales/bs.json'
import de from './locales/de.json'

void i18n.use(LanguageDetector).use(initReactI18next).init({
  resources: {
    en: { translation: en },
    bs: { translation: bs },
    de: { translation: de },
  },
  supportedLngs: ['en', 'bs', 'de'],
  fallbackLng: 'en',
  load: 'languageOnly',
  detection: {
    order: ['navigator'],
    caches: [],
  },
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
