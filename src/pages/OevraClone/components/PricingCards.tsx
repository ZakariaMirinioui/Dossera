import { content } from '../content/dosseraLanding';
import MagneticButton from './MagneticButton';
import { RevealGroup, RevealChild, EyebrowReveal } from './Reveal';
import Reveal from './Reveal';

/* ═══════════════════════════════════════════════════
   PricingCards — "choose how you engage"

   Two engagement cards. The full-deployment card is flagged
   RECOMMENDED FOR INSTITUTIONS with an accent hairline.
   ═══════════════════════════════════════════════════ */

export default function PricingCards() {
    const { pricing } = content;

    return (
        <section className="dz-pricing" id="engage">
            <div className="dz-glow dz-glow--pricing" aria-hidden="true" />
            <div className="dz-pricing__inner">
                <EyebrowReveal>
                    <span className="dz-eyebrow">ENGAGE</span>
                </EyebrowReveal>
                <Reveal>
                    <h2 className="dz-pricing__title">{pricing.title}</h2>
                </Reveal>
                <Reveal delay={0.05}>
                    <p className="dz-pricing__subtitle">{pricing.subtitle}</p>
                </Reveal>
                <Reveal delay={0.1}>
                    <p className="dz-pricing__desc">{pricing.desc}</p>
                </Reveal>

                <RevealGroup className="dz-pricing__cards" stagger={0.12}>
                    {pricing.cards.map((card) => (
                        <RevealChild
                            key={card.id}
                            className={`dz-pricing__card${card.featured ? ' is-featured' : ''}`}
                        >
                            {card.ribbon && (
                                <span className="dz-pricing__ribbon">{card.ribbon}</span>
                            )}
                            <span className="dz-pricing__card-label">{card.label}</span>
                            <span className="dz-pricing__card-price">
                                <span className="dz-pricing__card-amount">{card.amount}</span>
                                <span className="dz-pricing__card-period">{card.period}</span>
                            </span>
                            <p className="dz-pricing__card-info">{card.info}</p>
                            <MagneticButton
                                as="a"
                                href={card.href}
                                className={`dz-btn dz-pricing__card-btn${card.featured ? ' dz-btn--primary' : ' dz-btn--outline'}`}
                            >
                                {card.cta}
                            </MagneticButton>
                        </RevealChild>
                    ))}
                </RevealGroup>

                <Reveal delay={0.1}>
                    <a href={pricing.footHref} className="dz-pricing__foot" data-cursor="hover">
                        {pricing.foot}
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </a>
                </Reveal>
            </div>
        </section>
    );
}