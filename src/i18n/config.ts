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

const SUPPORTED_LANGS = ['fr', 'en'];

const getBrowserLanguage = () => {
    const browserLang = navigator.language.split('-')[0];
    return SUPPORTED_LANGS.includes(browserLang) ? browserLang : 'fr';
};

const detectedLang = localStorage.getItem('language') || getBrowserLanguage();
document.documentElement.lang = detectedLang;
document.documentElement.dir = 'ltr';

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: detectedLang,
        fallbackLng: 'fr',
        interpolation: {
            escapeValue: false,
        },
    });

i18n.on('languageChanged', (lng) => {
    document.documentElement.lang = lng;
    localStorage.setItem('language', lng);
});

export default i18n;
