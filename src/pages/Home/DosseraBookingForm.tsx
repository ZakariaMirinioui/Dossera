import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function DosseraBookingForm() {
    const { t } = useTranslation();
    const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
    const [institution, setInstitution] = useState("");
    const [institutionType, setInstitutionType] = useState("");
    const [city, setCity] = useState("");
    const [role, setRole] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [requestType, setRequestType] = useState("");
    const [message, setMessage] = useState("");

    const institutionTypes = [
        "institution_type_tpi",
        "institution_type_cour",
        "institution_type_avocat",
        "institution_type_notaire",
        "institution_type_autre",
    ];

    const requestTypes = [
        "request_type_demo",
        "request_type_audit",
        "request_type_info",
        "request_type_autre",
    ];

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setStatus("sending");

        await new Promise((r) => setTimeout(r, 1200));
        setStatus("success");
        const form = e.currentTarget;
        form.reset();
        setInstitution("");
        setInstitutionType("");
        setCity("");
        setRole("");
        setEmail("");
        setPhone("");
        setRequestType("");
        setMessage("");
    }

    return (
        <form className="mx-auto w-full max-w-[560px]" onSubmit={handleSubmit}>
            <input type="hidden" name="_subject" value="DOSSERA JAMS Contact Request" />
            <input type="hidden" name="source" value="dossera-jams" />

            <div className={`form-field ${institution ? "field-filled" : ""}`}>
                <input
                    id="dossera-institution"
                    name="institution"
                    type="text"
                    autoComplete="organization"
                    placeholder=" "
                    value={institution}
                    onChange={(e) => setInstitution(e.target.value)}
                    required
                />
                <label htmlFor="dossera-institution">{t("dosseraLanding.book.fields.institution")}</label>
            </div>

            <div className={`form-field ${institutionType ? "field-filled" : ""}`}>
                <select
                    id="dossera-institution-type"
                    name="institution_type"
                    value={institutionType}
                    onChange={(e) => setInstitutionType(e.target.value)}
                    required
                >
                    <option value="" disabled />
                    {institutionTypes.map((type) => (
                        <option key={type} value={t(`dosseraLanding.book.fields.${type}`)}>
                            {t(`dosseraLanding.book.fields.${type}`)}
                        </option>
                    ))}
                </select>
                <label htmlFor="dossera-institution-type">{t("dosseraLanding.book.fields.institution_type")}</label>
            </div>

            <div className={`form-field ${city ? "field-filled" : ""}`}>
                <input
                    id="dossera-city"
                    name="city"
                    type="text"
                    autoComplete="address-level2"
                    placeholder=" "
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                />
                <label htmlFor="dossera-city">{t("dosseraLanding.book.fields.city")}</label>
            </div>

            <div className={`form-field ${role ? "field-filled" : ""}`}>
                <input
                    id="dossera-role"
                    name="role"
                    type="text"
                    autoComplete="organization-title"
                    placeholder=" "
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                />
                <label htmlFor="dossera-role">{t("dosseraLanding.book.fields.role")}</label>
            </div>

            <div className={`form-field ${email ? "field-filled" : ""}`}>
                <input
                    id="dossera-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder=" "
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label htmlFor="dossera-email">{t("dosseraLanding.book.fields.email")}</label>
            </div>

            <div className={`form-field ${phone ? "field-filled" : ""}`}>
                <input
                    id="dossera-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder=" "
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
                <label htmlFor="dossera-phone">{t("dosseraLanding.book.fields.phone")}</label>
            </div>

            <div className={`form-field ${requestType ? "field-filled" : ""}`}>
                <select
                    id="dossera-request-type"
                    name="request_type"
                    value={requestType}
                    onChange={(e) => setRequestType(e.target.value)}
                    required
                >
                    <option value="" disabled />
                    {requestTypes.map((type) => (
                        <option key={type} value={t(`dosseraLanding.book.fields.${type}`)}>
                            {t(`dosseraLanding.book.fields.${type}`)}
                        </option>
                    ))}
                </select>
                <label htmlFor="dossera-request-type">{t("dosseraLanding.book.fields.request_type")}</label>
            </div>

            <div className={`form-field ${message ? "field-filled" : ""}`}>
                <textarea
                    id="dossera-message"
                    name="message"
                    rows={4}
                    placeholder=" "
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <label htmlFor="dossera-message">{t("dosseraLanding.book.fields.message")}</label>
            </div>

            <button type="submit" className="form-submit mt-2" disabled={status === "sending"}>
                <span>{status === "sending" ? t("dosseraLanding.book.sending") : t("dosseraLanding.book.submit")}</span>
                <span className="arrow" aria-hidden>→</span>
            </button>

            {status === "success" && (
                <p className="mt-4 text-center font-body-sm text-body-sm text-secondary">{t("dosseraLanding.book.form_success")}</p>
            )}
        </form>
    );
}
