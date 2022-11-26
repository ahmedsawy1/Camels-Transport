import ar from './ar';
import en from './en';
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import {I18nManager} from 'react-native';

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources: {
    ar: {
      translation: ar,
    },
    en: {
      translation: en,
    },
  },
  lng: I18nManager.isRTL ? 'ar' : 'en',
  fallbackLng: I18nManager.isRTL ? 'ar' : 'en',
  interpolation: {
    escapeValue: false,
  },
});
