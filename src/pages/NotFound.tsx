import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div className="min-h-[90vh] px-3 flex flex-col gap-5 items-center justify-center dossera-page">
            <h1 className="dossera-section-title">404 — Not Found</h1>
            <p className="text-sm mt-7 mb-3 font-semibold text-center dossera-body">
                The page you're visiting is not available.
            </p>
            <button
                className="transition-colors duration-300 text-base bg-[var(--accent-red)] hover:bg-[var(--accent-hover)] text-white py-3 px-5 rounded-full font-extrabold tracking-widest uppercase"
                onClick={() => navigate(-1)}
            >
                Go back
            </button>
        </div>
    );
};

export default NotFound;
