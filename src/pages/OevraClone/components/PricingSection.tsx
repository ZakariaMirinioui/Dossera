export default function PricingSection() {
    return (
        <section className="oevra-pricing" id="pricing">
            <div className="oevra-pricing__glow" aria-hidden="true" />
            <div className="oevra-pricing__inner">
                <h2 className="oevra-pricing__title">
                    choose your preferred subscription
                </h2>
                <p className="oevra-pricing__subtitle">
                    Try the dossera app with a 7 day free trial
                </p>
                <p className="oevra-pricing__desc">
                    Join the community for conscious creativity. Choose your membership plan
                    and commit to your creative practice today (or try it out for free).
                </p>

                <div className="oevra-pricing__cards">
                    <div className="oevra-pricing__card">
                        <span className="oevra-pricing__card-label">Monthly Subscription</span>
                        <div className="oevra-pricing__card-price">
                            <span className="oevra-pricing__card-amount">$15</span>
                            <span className="oevra-pricing__card-period">/MONTH</span>
                        </div>
                        <p className="oevra-pricing__card-info">7 days free | renews each month</p>
                        <a href="#" className="oevra-pricing__card-btn oevra-pricing__card-btn--outline">
                            Subscribe
                        </a>
                    </div>

                    <div className="oevra-pricing__card oevra-pricing__card--featured">
                        <span className="oevra-pricing__card-label">Yearly Plan</span>
                        <div className="oevra-pricing__card-price">
                            <span className="oevra-pricing__card-amount">$150</span>
                            <span className="oevra-pricing__card-period">/YEAR</span>
                        </div>
                        <p className="oevra-pricing__card-info">only $12,5 per month | 7 days free | cancel anytime</p>
                        <a href="#" className="oevra-pricing__card-btn oevra-pricing__card-btn--filled">
                            Activate now
                        </a>
                    </div>
                </div>

                <a href="#" className="oevra-pricing__app-cta">
                    Get the app
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                </a>
            </div>
        </section>
    );
}
