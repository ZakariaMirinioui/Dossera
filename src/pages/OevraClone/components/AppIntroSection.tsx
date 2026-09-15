import { useEffect, useRef } from 'react';

export default function AppIntroSection() {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('oevra-visible');
                    }
                });
            },
            { threshold: 0.15 }
        );

        const els = sectionRef.current?.querySelectorAll('.oevra-reveal');
        els?.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <section className="oevra-intro" id="about" ref={sectionRef}>
            <div className="oevra-intro__inner">
                <div className="oevra-intro__badge oevra-reveal">
                    <span>available now</span>
                </div>

                <h2 className="oevra-intro__title oevra-reveal">
                    the immersive portal<br />
                    that supports<br />
                    your creative practice
                </h2>

                <p className="oevra-intro__desc oevra-reveal">
                    Whether or not you consider yourself creative, dossera is designed to train your
                    brain to think more creatively — with structured daily practices, guided exercises,
                    focus tools, courses, and everything you need to break through creative blocks.
                </p>

                <a href="#features" className="oevra-intro__cta oevra-reveal">
                    Get the app
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                </a>

                <div className="oevra-intro__steps oevra-reveal">
                    {[
                        { num: '01', label: 'BE MORE CREATIVE' },
                        { num: '02', label: 'DEEP FOCUS AND FLOW' },
                        { num: '03', label: 'GET INSPIRED' },
                        { num: '04', label: 'THINK BIGGER' },
                        { num: '05', label: 'GET UNBLOCKED' },
                    ].map((step) => (
                        <div className="oevra-intro__step" key={step.num}>
                            <span className="oevra-intro__step-num">{step.num}</span>
                            <span className="oevra-intro__step-label">{step.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
