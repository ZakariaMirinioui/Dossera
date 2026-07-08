import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const WebsiteFooter: React.FC = () => {
    const { t } = useTranslation();
    const year = new Date().getFullYear();

    return (
        <footer className="bg-primary-dark text-white pt-section-gap pb-12 border-t border-white/5">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter px-4 sm:px-6 lg:px-container-margin max-w-7xl mx-auto">
                <div className="col-span-1 md:col-span-1 flex flex-col items-start">
                    <img
                        src="/dossera-logo.png"
                        alt="DOSSERA Logo Footer"
                        className="h-24 w-auto mb-6 brightness-0 invert"
                    />
                    <p className="font-body-sm text-body-sm text-emerald-50/60">
                        {t("dosseraLanding.footer.tagline")}
                    </p>
                </div>

                <div>
                    <h6 className="font-label-md text-label-md uppercase mb-6 font-bold tracking-widest text-secondary">
                        {t("dosseraLanding.footer.plateforme")}
                    </h6>
                    <ul className="space-y-4">
                        <li>
                            <a href="#architecture" className="font-body-sm text-body-sm text-emerald-100/70 hover:text-white transition-all">
                                {t("dosseraLanding.footer.arch_link")}
                            </a>
                        </li>
                        <li>
                            <a href="#securite" className="font-body-sm text-body-sm text-emerald-100/70 hover:text-white transition-all">
                                {t("dosseraLanding.footer.securite_link")}
                            </a>
                        </li>
                        <li>
                            <Link to="/livre-blanc" className="font-body-sm text-body-sm text-emerald-100/70 hover:text-white transition-all">
                                {t("dosseraLanding.nav.livre_blanc")}
                            </Link>
                        </li>
                        <li>
                            <a href="#" className="font-body-sm text-body-sm text-emerald-100/70 hover:text-white transition-all">
                                {t("dosseraLanding.footer.meilisearch_link")}
                            </a>
                        </li>
                    </ul>
                </div>

                <div>
                    <h6 className="font-label-md text-label-md uppercase mb-6 font-bold tracking-widest text-secondary">
                        {t("dosseraLanding.footer.liens_utiles")}
                    </h6>
                    <ul className="space-y-4">
                        <li>
                            <a href="https://www.justice.gov.ma" target="_blank" rel="noopener noreferrer" className="font-body-sm text-body-sm text-emerald-100/70 hover:text-white transition-all">
                                {t("dosseraLanding.footer.portail_justice")}
                            </a>
                        </li>
                        <li>
                            <a href="https://www.sgg.gov.ma" target="_blank" rel="noopener noreferrer" className="font-body-sm text-body-sm text-emerald-100/70 hover:text-white transition-all">
                                {t("dosseraLanding.footer.sgg")}
                            </a>
                        </li>
                        <li>
                            <a href="#" className="font-body-sm text-body-sm text-emerald-100/70 hover:text-white transition-all">
                                {t("dosseraLanding.footer.confidentialite")}
                            </a>
                        </li>
                    </ul>
                </div>

                <div>
                    <h6 className="font-label-md text-label-md uppercase mb-6 font-bold tracking-widest text-secondary">
                        {t("dosseraLanding.footer.support")}
                    </h6>
                    <ul className="space-y-4">
                        <li className="flex items-center gap-2 text-emerald-100/70 hover:text-white transition-colors">
                            <span className="material-symbols-outlined text-sm">mail</span>
                            <a href="mailto:zakmirinioui@gmail.com" className="font-body-sm text-body-sm hover:text-white transition-colors">
                                zakmirinioui@gmail.com
                            </a>
                        </li>
                        <li className="flex items-center gap-2 text-emerald-100/70 hover:text-white transition-colors">
                            <span className="material-symbols-outlined text-sm">mail</span>
                            <a href="mailto:faridreguig07@gmail.com" className="font-body-sm text-body-sm hover:text-white transition-colors">
                                faridreguig07@gmail.com
                            </a>
                        </li>
                        <li className="flex items-center gap-2 text-emerald-100/70 hover:text-white transition-colors">
                            <span className="material-symbols-outlined text-sm">phone</span>
                            <a href="tel:+212688413049" className="font-body-sm text-body-sm hover:text-white transition-colors">
                                {t("dosseraLanding.footer.phone")}
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="mt-16 pt-8 border-t border-white/5 px-4 sm:px-6 lg:px-container-margin max-w-7xl mx-auto">
                <p className="font-body-sm text-body-sm text-center text-emerald-50/40">
                    &copy; {year} {t("dosseraLanding.footer.copyright")}
                </p>
                <p className="font-body-sm text-body-sm text-center text-emerald-50/30 mt-2">
                    Développé par{" "}
                    <a href="mailto:zakmirinioui@gmail.com" className="hover:text-white transition-colors">Zakaria Mirirnioui</a>
                    {" · "}Sécurité par{" "}
                    <a href="mailto:farid.reguig@example.com" className="hover:text-white transition-colors">Farid Reguig</a> (Wazuh)
                </p>
            </div>
        </footer>
    );
};

export default WebsiteFooter;
