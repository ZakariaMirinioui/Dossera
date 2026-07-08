import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const LANGUAGES = [
    { code: 'fr', labelKey: 'common.language_fr' },
    { code: 'en', labelKey: 'common.language_en' },
];

const LanguageSwitcher: React.FC = () => {
    const { i18n, t } = useTranslation();
    const [isOpen, setIsOpen] = React.useState(false);

    const toggleLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg border border-outline-variant hover:border-primary transition-colors text-on-surface-variant hover:text-primary"
                aria-label={t('common.language')}
            >
                <Globe size={18} />
                <span className="text-sm font-medium">{i18n.language.toUpperCase()}</span>
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-40 rounded-lg bg-white border border-outline-variant shadow-lg z-50 overflow-hidden">
                    {LANGUAGES.map((lang) => (
                        <button
                            key={lang.code}
                            type="button"
                            onClick={() => toggleLanguage(lang.code)}
                            className="w-full text-left px-4 py-2.5 text-sm text-on-surface-variant hover:bg-secondary-container hover:text-primary transition-colors"
                        >
                            {t(lang.labelKey)}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LanguageSwitcher;
