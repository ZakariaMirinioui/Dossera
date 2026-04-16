import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en/translation.json';
import fr from './locales/fr/translation.json';
import dosseraLandingEn from './copy/dosseraLanding.en';
import dosseraLandingFr from './copy/dosseraLanding.fr';

const resources = {
    en: { translation: { ...en, dosseraLanding: dosseraLandingEn } },
    fr: { translation: { ...fr, dosseraLanding: dosseraLandingFr } },
};

// Get browser language or fallback to English
const getBrowserLanguage = () => {
    const browserLang = navigator.language.split('-')[0];
    return ['en', 'fr'].includes(browserLang) ? browserLang : 'en';
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: localStorage.getItem('language') || getBrowserLanguage(),
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
