import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const NotFound: React.FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    return (
        <div className="min-h-screen flex flex-col gap-6 items-center justify-center bg-background px-4">
            <h1 className="font-headline-xl text-headline-xl text-primary text-center">
                {t("dosseraLanding.notFound.title")}
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant text-center max-w-md">
                {t("dosseraLanding.notFound.subtitle")}
            </p>
            <button
                className="bg-primary text-secondary-container px-8 py-3.5 rounded font-label-md text-label-md hover:bg-primary-container transition-colors mt-4"
                onClick={() => navigate("/")}
            >
                {t("dosseraLanding.notFound.button")}
            </button>
        </div>
    );
};

export default NotFound;
