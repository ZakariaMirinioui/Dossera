import { useScrollReveal } from './useScrollReveal';
import Counter from './Counter';
import MagneticButton from './MagneticButton';

const STEPS = [
    { num: '01', label: 'DIGITIZE' },
    { num: '02', label: 'ARCHIVE' },
    { num: '03', label: 'SEARCH' },
    { num: '04', label: 'SECURE' },
    { num: '05', label: 'SCALE' },
];

const MINI_STATS = [
    { value: 98.2, decimals: 1, suffix: '%', label: 'OCR accuracy' },
    { value: 100, suffix: 'ms', label: 'search response' },
    { value: 8, suffix: '', label: 'security layers' },
];

export default function AppIntroSection() {
    const ref = useScrollReveal<HTMLDivElement>({ stagger: 0.1 });

    return (
        <section className="oevra-intro" id="about" ref={ref}>
            <div className="oevra-intro__inner">
                <div className="oevra-intro__badge" data-reveal>
                    <span>sovereign by design</span>
                </div>

                <h2 className="oevra-intro__title" data-reveal>
                    the sovereign platform<br />
                    that transforms your<br />
                    document operations
                </h2>

                <p className="oevra-intro__desc" data-reveal>
                    Millions of paper documents. Endless manual searches. Escalating compliance
                    risk. DOSSERA replaces fragile paper workflows with a certified, immutable,
                    AI-assisted archive — designed to run entirely in your own datacenter, with
                    zero cloud dependency.
                </p>

                <div data-reveal>
                    <MagneticButton
                        as="a"
                        href="#features"
                        className="oevra-intro__cta"
                    >
                        Explore the platform
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </MagneticButton>
                </div>

                <div className="oevra-intro__steps" data-reveal>
                    {STEPS.map((step) => (
                        <div className="oevra-intro__step" key={step.num}>
                            <span className="oevra-intro__step-num">{step.num}</span>
                            <span className="oevra-intro__step-label">{step.label}</span>
                        </div>
                    ))}
                </div>

                <div className="oevra-intro__stats" data-reveal>
                    {MINI_STATS.map((s, i) => (
                        <div className="oevra-intro__stat" key={i}>
                            <span className="oevra-intro__stat-value">
                                <Counter value={s.value} suffix={s.suffix} decimals={s.decimals ?? 0} />
                            </span>
                            <span className="oevra-intro__stat-label">{s.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}