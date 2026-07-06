import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en/translation.json';
import ar from './locales/ar/translation.json';
import dosseraLandingEn from './copy/dosseraLanding.en';
import dosseraLandingAr from './copy/dosseraLanding.ar';

const resources = {
    en: { translation: { ...en, dosseraLanding: dosseraLandingEn } },
    ar: { translation: { ...ar, dosseraLanding: dosseraLandingAr } },
};

const SUPPORTED_LANGS = ['en', 'ar'];

const getBrowserLanguage = () => {
    const browserLang = navigator.language.split('-')[0];
    return SUPPORTED_LANGS.includes(browserLang) ? browserLang : 'en';
};

const setDocumentDirection = (lng: string) => {
    document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lng;
};

const detectedLang = localStorage.getItem('language') || getBrowserLanguage();
setDocumentDirection(detectedLang);

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: detectedLang,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
    });

i18n.on('languageChanged', (lng) => {
    setDocumentDirection(lng);
    localStorage.setItem('language', lng);
});

export default i18n;
