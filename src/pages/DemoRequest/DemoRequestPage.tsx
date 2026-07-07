import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Shield, Activity, Gauge, CheckCircle } from "lucide-react";
import WebsiteHeader from "../../layouts/Website/Header";
import WebsiteFooter from "../../layouts/Website/Footer";

export default function DemoRequestPage() {
    const { t } = useTranslation();
    const reduceMotion = useReducedMotion();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [organization, setOrganization] = useState("");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

    const FORMSPREE_ENDPOINT =
        import.meta.env.VITE_FORMSPREE_ENDPOINT || "https://formspree.io/f/mwpejbne";

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("sending");
        const form = e.currentTarget;
        const formData = new FormData(form);

        try {
            const response = await fetch(FORMSPREE_ENDPOINT, {
                method: "POST",
                body: formData,
                headers: { Accept: "application/json" },
            });

            if (response.ok) {
                setStatus("success");
                form.reset();
                setName("");
                setEmail("");
                setPhone("");
                setOrganization("");
                setMessage("");
            } else {
                setStatus("error");
            }
        } catch {
            setStatus("error");
        }
    };

    return (
        <div className="min-h-screen bg-background overflow-x-hidden relative">
            {/* ─── BACKGROUND TECH-GRID ─── */}
            <div
                className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]"
                style={{
                    backgroundImage:
                        "radial-gradient(rgba(6,78,59,0.8) 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                }}
            />
            <div className="fixed top-1/3 -left-48 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[150px] pointer-events-none z-0" />
            <div className="fixed bottom-1/3 -right-48 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[150px] pointer-events-none z-0" />

            <WebsiteHeader variant="minimal" />

            {/* ─── MAIN CONTENT ─── */}
            <section className="relative z-10 py-16 lg:py-24 px-4 sm:px-6 lg:px-container-margin">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                    {/* ─── LEFT: BRANDING ─── */}
                    <motion.div
                        initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200/50 px-4 py-1.5 rounded-full mb-6">
                            <span className="w-2 h-2 rounded-full bg-emerald-500" />
                            <span className="font-label-md text-label-md text-emerald-800 uppercase tracking-widest">
                                {t("dosseraLanding.demo.main.badge")}
                            </span>
                        </div>

                        <h1 className="font-headline-xl text-headline-xl lg:text-[52px] leading-tight text-emerald-900 mb-4">
                            {t("dosseraLanding.demo.main.title")}
                        </h1>

                        <p className="font-body-lg text-body-lg text-gray-500 mb-10 max-w-lg leading-relaxed">
                            {t("dosseraLanding.demo.main.description")}
                        </p>

                        <div className="relative hidden lg:block">
                            <div className="relative w-full max-w-md aspect-[4/3] rounded-[2rem] p-[2px] bg-gradient-to-br from-emerald-200 via-white to-emerald-100">
                                <div className="relative w-full h-full rounded-[calc(2rem-2px)] bg-white p-8 flex flex-col items-center justify-center overflow-hidden">
                                    <img
                                        src="/dossera-logo.png"
                                        alt="DOSSERA"
                                        className="w-36 h-36 mb-6 opacity-10"
                                    />
                                    <div className="grid grid-cols-3 gap-4 w-full">
                                        {[
                                            { label: "AES-256", icon: Shield },
                                            { label: "99.9%", icon: Activity },
                                            { label: "< 100ms", icon: Gauge },
                                        ].map(({ label, icon: Icon }) => (
                                            <div
                                                key={label}
                                                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-gray-50 border border-gray-100"
                                            >
                                                <Icon size={20} className="text-emerald-700" />
                                                <span className="font-label-md text-label-md text-emerald-900 font-semibold">
                                                    {label}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* ─── RIGHT: FORM ─── */}
                    <motion.div
                        initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="p-[2px] rounded-[2rem] bg-gradient-to-br from-emerald-200 via-white to-emerald-100">
                            <div className="relative rounded-[calc(2rem-2px)] bg-white/95 backdrop-blur-xl p-8 lg:p-10">
                                <h2 className="font-headline-md text-headline-md text-emerald-900 mb-3">
                                    {t("dosseraLanding.demo.main.title")}
                                </h2>
                                <p className="font-body-sm text-body-sm text-amber-700 bg-amber-50 border border-amber-200/50 rounded-xl px-4 py-3 mb-6 leading-relaxed">
                                    {t("dosseraLanding.demo.coming_soon.desc")}
                                </p>

                                {status === "success" ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="flex flex-col items-center justify-center py-12 text-center"
                                    >
                                        <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                                            <CheckCircle
                                                size={32}
                                                className="text-emerald-700"
                                            />
                                        </div>
                                        <p className="font-body-lg text-body-lg text-emerald-900 font-semibold mb-2">
                                            {t("dosseraLanding.demo.form.success")}
                                        </p>
                                        <p className="font-body-sm text-body-sm text-gray-500">
                                            {t("dosseraLanding.demo.coming_soon.success")}
                                        </p>
                                    </motion.div>
                                ) : (
                                    <form
                                        onSubmit={handleSubmit}
                                        className="space-y-5"
                                        action={FORMSPREE_ENDPOINT}
                                        method="POST"
                                    >
                                        <input
                                            type="hidden"
                                            name="_subject"
                                            value="DOSSERA JAMS Demo Request"
                                        />
                                        <input
                                            type="hidden"
                                            name="source"
                                            value="dossera-demo-page"
                                        />

                                        <div
                                            className={`form-field ${name ? "field-filled" : ""}`}
                                        >
                                            <input
                                                id="demo-name"
                                                name="name"
                                                type="text"
                                                autoComplete="name"
                                                placeholder=" "
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                required
                                            />
                                            <label htmlFor="demo-name">
                                                {t("dosseraLanding.demo.form.name")}
                                            </label>
                                        </div>

                                        <div
                                            className={`form-field ${email ? "field-filled" : ""}`}
                                        >
                                            <input
                                                id="demo-email"
                                                name="email"
                                                type="email"
                                                autoComplete="email"
                                                placeholder=" "
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                            />
                                            <label htmlFor="demo-email">
                                                {t("dosseraLanding.demo.form.email")}
                                            </label>
                                        </div>

                                        <div
                                            className={`form-field ${phone ? "field-filled" : ""}`}
                                        >
                                            <input
                                                id="demo-phone"
                                                name="phone"
                                                type="tel"
                                                autoComplete="tel"
                                                placeholder=" "
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                            />
                                            <label htmlFor="demo-phone">
                                                {t("dosseraLanding.demo.form.phone")}
                                            </label>
                                        </div>

                                        <div
                                            className={`form-field ${organization ? "field-filled" : ""}`}
                                        >
                                            <input
                                                id="demo-organization"
                                                name="organization"
                                                type="text"
                                                autoComplete="organization"
                                                placeholder=" "
                                                value={organization}
                                                onChange={(e) =>
                                                    setOrganization(e.target.value)
                                                }
                                                required
                                            />
                                            <label htmlFor="demo-organization">
                                                {t("dosseraLanding.demo.form.organization")}
                                            </label>
                                        </div>

                                        <div
                                            className={`form-field ${message ? "field-filled" : ""}`}
                                        >
                                            <textarea
                                                id="demo-message"
                                                name="message"
                                                rows={4}
                                                placeholder=" "
                                                value={message}
                                                onChange={(e) => setMessage(e.target.value)}
                                            />
                                            <label htmlFor="demo-message">
                                                {t("dosseraLanding.demo.form.message")}
                                            </label>
                                        </div>

                                        <button
                                            type="submit"
                                            className="form-submit mt-2"
                                            disabled={status === "sending"}
                                        >
                                            <span>
                                                {status === "sending"
                                                    ? t("dosseraLanding.demo.form.sending")
                                                    : t("dosseraLanding.demo.form.submit")}
                                            </span>
                                            <span className="arrow" aria-hidden>
                                                →
                                            </span>
                                        </button>

                                        {status === "error" && (
                                            <p className="mt-4 text-center font-body-sm text-body-sm text-red-600">
                                                {t("dosseraLanding.book.form_error")}
                                            </p>
                                        )}
                                    </form>
                                )}
                            </div>
                        </div>

                        {/* ─── TECH SPECS ─── */}
                        <div className="mt-8 grid grid-cols-3 gap-3">
                            {[
                                {
                                    icon: Shield,
                                    label: t("dosseraLanding.demo.tech.encryption_label"),
                                    desc: t("dosseraLanding.demo.tech.encryption_desc"),
                                },
                                {
                                    icon: Activity,
                                    label: t("dosseraLanding.demo.tech.availability_label"),
                                    desc: t("dosseraLanding.demo.tech.availability_desc"),
                                },
                                {
                                    icon: Gauge,
                                    label: t("dosseraLanding.demo.tech.access_label"),
                                    desc: t("dosseraLanding.demo.tech.access_desc"),
                                },
                            ].map(({ icon: Icon, label, desc }) => (
                                <div
                                    key={label}
                                    className="p-4 rounded-xl bg-white/70 backdrop-blur-sm border border-gray-100 text-center"
                                >
                                    <Icon
                                        size={18}
                                        className="mx-auto mb-2 text-emerald-700"
                                    />
                                    <div className="font-label-md text-label-md text-emerald-900 font-semibold">
                                        {label}
                                    </div>
                                    <div className="font-body-sm text-body-sm text-gray-400 mt-0.5">
                                        {desc}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            <WebsiteFooter />
        </div>
    );
}
