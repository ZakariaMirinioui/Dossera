import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function DosseraBookingForm() {
    const { t } = useTranslation();
    const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
    const [institution, setInstitution] = useState("");
    const [role, setRole] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");

    const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT || "https://formspree.io/f/mwpejbne";

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setStatus("sending");
        const form = e.currentTarget;
        const formData = new FormData(form);

        try {
            const response = await fetch(FORMSPREE_ENDPOINT, {
                method: "POST",
                body: formData,
                headers: {
                    Accept: "application/json",
                },
            });

            if (response.ok) {
                setStatus("success");
                form.reset();
                setInstitution("");
                setRole("");
                setEmail("");
                setPhone("");
                setMessage("");
            } else {
                const data = await response.json().catch(() => ({}));
                console.error("Formspree error:", data);
                setStatus("error");
            }
        } catch (err) {
            console.error("Submission error:", err);
            setStatus("error");
        }
    }

    return (
        <form className="form-premium mx-auto w-full max-w-[560px]" action={FORMSPREE_ENDPOINT} method="POST" onSubmit={handleSubmit}>
            <input type="hidden" name="_subject" value="DOSSERA Discovery Call Request" />
            <input type="hidden" name="source" value="dossera" />

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

            <div className={`form-field ${message ? "field-filled" : ""}`}>
                <textarea
                    id="dossera-message"
                    name="message"
                    rows={4}
                    placeholder=" "
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                />
                <label htmlFor="dossera-message">{t("dosseraLanding.book.fields.message")}</label>
            </div>

            <button type="submit" className="form-premium-submit mt-2 w-full" disabled={status === "sending"}>
                <span>{status === "sending" ? t("dosseraLanding.book.sending") : t("dosseraLanding.book.submit")}</span>
                <span className="arrow" aria-hidden>
                    →
                </span>
            </button>

            {status === "success" && (
                <p className="dossera-body mt-4 text-center text-sm text-[var(--text-secondary)]">{t("dosseraLanding.book.form_success")}</p>
            )}
            {status === "error" && (
                <p className="dossera-body mt-4 text-center text-sm text-[var(--accent-red)]">{t("dosseraLanding.book.form_error")}</p>
            )}
        </form>
    );
}
