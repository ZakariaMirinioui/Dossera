import React, { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useCursorGlow } from "../../hooks/useCursorGlow";

export const DosseraBooking: React.FC = () => {
	const { t } = useTranslation();
	const bookGlowRef = useRef<HTMLDivElement>(null);

	useCursorGlow(bookGlowRef);

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
		<div ref={bookGlowRef} id="dossera-book" className="dossera-section dossera-section--booking cursor-glow-section scroll-mt-[5.5rem] px-4 sm:px-6 text-white">
			<div className="w-[30%] min-w-[120px] max-w-[240px] h-px bg-[var(--accent-red)] mx-auto mb-12" />
			<h2 className="dossera-section-title dossera-section-title--book mb-6">{t("dosseraLanding.book.title")}</h2>
			<p className="dossera-body text-center text-[#a0a0a0] max-w-[480px] mx-auto mb-10">
				{t("dosseraLanding.book.sub")}
			</p>
			<p className="dossera-mono text-center text-[length:var(--text-xs)] text-[#707070] max-w-3xl mx-auto mb-10 leading-relaxed">
				{t("dosseraLanding.book.trust_row")}
			</p>
			<div className="w-full max-w-xl mx-auto h-px bg-[#222] mb-12" />
			<div className="max-w-[560px] mx-auto">
				<form className="form-premium mx-auto w-full" action={FORMSPREE_ENDPOINT} method="POST" onSubmit={handleSubmit}>
					<input type="hidden" name="_subject" value="DOSSERA Discovery Call Request" />
					<input type="hidden" name="source" value="dossera" />

					<div className="form-field relative mb-8">
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
						<label htmlFor="dossera-institution" className="dossera-body text-[length:var(--text-xs)] uppercase tracking-widest text-[var(--text-muted)]">
							{t("dosseraLanding.book.fields.institution")}
						</label>
					</div>

					<div className="form-field relative mb-8">
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
						<label htmlFor="dossera-role" className="dossera-body text-[length:var(--text-xs)] uppercase tracking-widest text-[var(--text-muted)]">
							{t("dosseraLanding.book.fields.role")}
						</label>
					</div>

					<div className="form-field relative mb-8">
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
						<label htmlFor="dossera-email" className="dossera-body text-[length:var(--text-xs)] uppercase tracking-widest text-[var(--text-muted)]">
							{t("dosseraLanding.book.fields.email")}
						</label>
					</div>

					<div className="form-field relative mb-8">
						<input
							id="dossera-phone"
							name="phone"
							type="tel"
							autoComplete="tel"
							placeholder=" "
							value={phone}
							onChange={(e) => setPhone(e.target.value)}
							/>
						<label htmlFor="dossera-phone" className="dossera-body text-[length:var(--text-xs)] uppercase tracking-widest text-[var(--text-muted)]">
							{t("dosseraLanding.book.fields.phone")}
						</label>
					</div>

					<div className="form-field relative mb-8">
						<textarea
							id="dossera-message"
							name="message"
							rows={4}
							placeholder=" "
							value={message}
							onChange={(e) => setMessage(e.target.value)}
							required
						/>
						<label htmlFor="dossera-message" className="dossera-body text-[length:var(--text-xs)] uppercase tracking-widest text-[var(--text-muted)]">
							{t("dosseraLanding.book.fields.message")}
						</label>
					</div>

					<button type="submit" className="form-premium-submit w-full py-4 px-6 rounded-lg font-display font-semibold text-lg transition-all duration-300" disabled={status === "sending"}>
						<span>{status === "sending" ? t("dosseraLanding.book.sending") : t("dosseraLanding.book.submit")}</span>
						<span className="arrow ml-2" aria-hidden>→</span>
					</button>

					{status === "success" && (
						<p className="dossera-body mt-4 text-center text-sm text-[#a0a0a0]">{t("dosseraLanding.book.form_success")}</p>
					)}
					{status === "error" && (
						<p className="dossera-body mt-4 text-center text-sm text-[var(--accent-red)]">{t("dosseraLanding.book.form_error")}</p>
					)}
				</form>
			</div>
		</div>
	);
};

export default DosseraBooking;