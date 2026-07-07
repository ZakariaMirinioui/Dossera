import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Shield, Activity, Gauge, CheckCircle } from "lucide-react";
import WebsiteHeader from "../../layouts/Website/Header";
import WebsiteFooter from "../../layouts/Website/Footer";

const springConfig = { type: "spring" as const, stiffness: 100, damping: 18, mass: 0.9 };
const springBounce = { type: "spring" as const, stiffness: 200, damping: 10, mass: 0.8 };

export default function DemoRequestPage() {
    const { t } = useTranslation();
    const reduceMotion = useReducedMotion();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [organization, setOrganization] = useState("");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("sending");
        const form = e.currentTarget;

        await new Promise((r) => setTimeout(r, 1200));
        setStatus("success");
        form.reset();
        setName("");
        setEmail("");
        setPhone("");
        setOrganization("");
        setMessage("");
    };

    return (
        <div className="min-h-screen bg-background overflow-x-hidden relative">
            <div
                className="fixed inset-0 pointer-events-none z-0 opacity-[0.015]"
                style={{
                    backgroundImage:
                        "radial-gradient(rgba(6,78,59,0.8) 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                }}
            />
            <div className="fixed top-1/3 -left-48 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[150px] pointer-events-none z-0" />
            <div className="fixed bottom-1/3 -right-48 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[150px] pointer-events-none z-0" />

            <WebsiteHeader variant="main" />

            <section className="relative z-10 py-16 lg:py-24 px-4 sm:px-6 lg:px-container-margin">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                    <motion.div
                        initial={reduceMotion ? undefined : { opacity: 0, y: 40, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={reduceMotion ? undefined : springConfig}
                    >
                        <motion.div
                            initial={reduceMotion ? undefined : { opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={reduceMotion ? undefined : { delay: 0.1, ...springConfig }}
                            className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200/50 px-4 py-1.5 rounded-full mb-6"
                        >
                            <span className="w-2 h-2 rounded-full bg-emerald-500" />
                            <span className="font-label-md text-label-md text-emerald-800 uppercase tracking-widest">
                                {t("dosseraLanding.demo.main.badge")}
                            </span>
                        </motion.div>

                        <motion.h1
                            initial={reduceMotion ? undefined : { opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={reduceMotion ? undefined : { delay: 0.15, ...springConfig }}
                            className="font-headline-xl text-headline-xl lg:text-[52px] leading-tight text-emerald-900 mb-4"
                        >
                            {t("dosseraLanding.demo.main.title")}
                        </motion.h1>

                        <motion.p
                            initial={reduceMotion ? undefined : { opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={reduceMotion ? undefined : { delay: 0.2, ...springConfig }}
                            className="font-body-lg text-body-lg text-gray-500 mb-10 max-w-lg leading-relaxed"
                        >
                            {t("dosseraLanding.demo.main.description")}
                        </motion.p>

                        <motion.div
                            initial={reduceMotion ? undefined : { opacity: 0, y: 30, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={reduceMotion ? undefined : { delay: 0.3, ...springConfig }}
                            className="relative hidden lg:block"
                        >
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
                                        ].map(({ label, icon: Icon }, idx) => (
                                            <motion.div
                                                key={label}
                                                initial={reduceMotion ? undefined : { opacity: 0, y: 16 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={reduceMotion ? undefined : { delay: 0.4 + idx * 0.1, ...springConfig }}
                                                whileHover={reduceMotion ? undefined : { y: -4, scale: 1.05, transition: { type: "spring", stiffness: 300, damping: 12 } }}
                                                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-gray-50 border border-gray-100 cursor-default"
                                            >
                                                <Icon size={20} className="text-emerald-700" />
                                                <span className="font-label-md text-label-md text-emerald-900 font-semibold">
                                                    {label}
                                                </span>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={reduceMotion ? undefined : { opacity: 0, y: 60 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={reduceMotion ? undefined : { delay: 0.2, ...springConfig }}
                    >
                        <motion.div
                            initial={reduceMotion ? undefined : { opacity: 0, scale: 0.92 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={reduceMotion ? undefined : { delay: 0.3, type: "spring", stiffness: 80, damping: 16 }}
                            whileHover={reduceMotion ? undefined : { scale: 1.005 }}
                            className="p-[2px] rounded-[2rem] bg-gradient-to-br from-emerald-200 via-white to-emerald-100"
                        >
                            <div className="relative rounded-[calc(2rem-2px)] bg-white/95 backdrop-blur-xl p-8 lg:p-10">
                                <h2 className="font-headline-md text-headline-md text-emerald-900 mb-3">
                                    {t("dosseraLanding.demo.main.title")}
                                </h2>
                                <p className="font-body-sm text-body-sm text-amber-700 bg-amber-50 border border-amber-200/50 rounded-xl px-4 py-3 mb-6 leading-relaxed">
                                    {t("dosseraLanding.demo.coming_soon.desc")}
                                </p>

                                {status === "success" ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={reduceMotion ? undefined : springBounce}
                                        className="flex flex-col items-center justify-center py-12 text-center"
                                    >
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={reduceMotion ? undefined : { type: "spring", stiffness: 250, damping: 8, delay: 0.1 }}
                                            className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-4"
                                        >
                                            <CheckCircle
                                                size={32}
                                                className="text-emerald-700"
                                            />
                                        </motion.div>
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

                                        <motion.div
                                            whileHover={reduceMotion ? undefined : { scale: 1.015 }}
                                            whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                                        >
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
                                        </motion.div>
                                    </form>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            <WebsiteFooter />
        </div>
    );
}
