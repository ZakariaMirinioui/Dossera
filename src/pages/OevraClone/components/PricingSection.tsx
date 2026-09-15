import MagneticButton from './MagneticButton';
import SpotlightCard from './SpotlightCard';

export default function PricingSection() {
    return (
        <section className="oevra-pricing" id="pricing">
            <div className="oevra-pricing__glow" aria-hidden="true" />
            <div className="oevra-pricing__inner">
                <h2 className="oevra-pricing__title">
                    choose how you engage
                </h2>
                <p className="oevra-pricing__subtitle">
                    start with a free, real assessment of your document operations
                </p>
                <p className="oevra-pricing__desc">
                    Every institution is different. Pick the entry point that fits —
                    then commit with confidence. Certified, sovereign, and designed
                    to pay for itself from the first week.
                </p>

                <div className="oevra-pricing__cards">
                    <SpotlightCard className="oevra-pricing__card">
                        <span className="oevra-pricing__card-label">30-min assessment</span>
                        <div className="oevra-pricing__card-price">
                            <span className="oevra-pricing__card-amount">$0</span>
                            <span className="oevra-pricing__card-period">free</span>
                        </div>
                        <p className="oevra-pricing__card-info">
                            30 minutes. No pitch. A real assessment of your
                            archive, your constraints, and your fast wins.
                        </p>
                        <MagneticButton
                            as="a"
                            href="#contact"
                            className="oevra-pricing__card-btn oevra-pricing__card-btn--outline"
                        >
                            Book the call
                        </MagneticButton>
                    </SpotlightCard>

                    <SpotlightCard className="oevra-pricing__card oevra-pricing__card--featured">
                        <span className="oevra-pricing__card-label">full deployment</span>
                        <div className="oevra-pricing__card-price">
                            <span className="oevra-pricing__card-amount">tailored</span>
                            <span className="oevra-pricing__card-period">fixed-cost</span>
                        </div>
                        <p className="oevra-pricing__card-info">
                            From bare metal to production in 2–4 weeks.
                            Ansible-virtualized, SOC-protected, with training
                            and a validated disaster recovery plan included.
                        </p>
                        <MagneticButton
                            as="a"
                            href="#contact"
                            className="oevra-pricing__card-btn oevra-pricing__card-btn--filled"
                        >
                            Request a proposal
                        </MagneticButton>
                    </SpotlightCard>
                </div>

                <div className="oevra-pricing__foot">
                    <a href="#features" className="oevra-pricing__app-cta" data-cursor="hover">
                        Explore platform capabilities
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    );
}