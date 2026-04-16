import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import { motion } from 'framer-motion';

const LanguageSwitcher: React.FC = () => {
    const { i18n } = useTranslation();
    const [isOpen, setIsOpen] = React.useState(false);

    const toggleLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
        localStorage.setItem('language', lng);
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--card-bg)] border border-[var(--card-border)] hover:border-[var(--accent)] transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <Globe size={18} />
                <span className="text-sm font-medium">{i18n.language.toUpperCase()}</span>
            </motion.button>

            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-32 rounded-lg bg-[var(--card-bg)] border border-[var(--card-border)] shadow-lg z-50"
                >
                    <button
                        onClick={() => toggleLanguage('en')}
                        className={`w-full text-left px-4 py-2 rounded-t-lg transition-colors ${i18n.language === 'en'
                            ? 'bg-[var(--accent)] text-white'
                            : 'hover:bg-[var(--card-bg-hover)]'
                            }`}
                    >
                        English
                    </button>
                    <button
                        onClick={() => toggleLanguage('fr')}
                        className={`w-full text-left px-4 py-2 rounded-b-lg transition-colors ${i18n.language === 'fr'
                            ? 'bg-[var(--accent)] text-white'
                            : 'hover:bg-[var(--card-bg-hover)]'
                            }`}
                    >
                        Français
                    </button>
                </motion.div>
            )}
        </div>
    );
};

export default LanguageSwitcher;
