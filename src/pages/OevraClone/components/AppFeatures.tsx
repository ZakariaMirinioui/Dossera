import { useEffect, useRef, useState } from 'react';

const APP_FEATURES = [
    {
        id: 'creative-process',
        num: '01',
        title: 'THE CREATIVE PROCESS',
        subtitle: 'the creative process down to a science',
        desc: 'Meet your creative OS — a suite of daily practices, tools, courses and more, designed based on science and psychology for holistic support.',
        details: [
            'A daily practice to get you started for any creative activity',
            'Our proprietary 5-step process comes alive in an interactive, immersive experience',
            'Creative prompt generator inspired by Brian Eno\'s Oblique Strategies',
            'Science-backed exercises to support creativity',
            'Ambient soundscapes designed to support focus and flow states',
        ],
    },
    {
        id: 'flow-state',
        num: '02',
        title: 'THE FLOW STATE',
        subtitle: null,
        desc: 'A science-based tool to guide any task into deep focus and flow. Powered by sound, rhythm, and cadence.',
        details: [
            'Different timer modes for various work styles',
            'Quotes and inspirational breaks during pauses',
            'Focus support with helpful tips during breaks',
            'Do Not Disturb mode for uninterrupted sessions',
        ],
    },
    {
        id: 'get-unblocked',
        num: '03',
        title: 'GET UNBLOCKED',
        subtitle: null,
        desc: 'Move past obstacles like self-doubt and perfectionism. Get Unblocked is designed to help you overcome the most common barriers.',
        details: [
            'Action plans for every type of creative block',
            'Daily progress tracking with streak tracker',
            'Creative warmups inspired by Oblique Strategies',
            'Techniques based on psychology and neuroscience',
        ],
    },
    {
        id: 'courses',
        num: '04',
        title: 'SELF-PACED COURSES',
        subtitle: null,
        desc: 'Research-backed lessons to integrate creativity into daily life.',
        details: [
            'The Creative Mind — learn how creativity works in the brain',
            'Creativity for Mental Health — explore creativity and wellness',
            'Advanced Praxis for Professionals — deepen your daily practice',
        ],
    },
    {
        id: 'community',
        num: '05',
        title: 'COMMUNITY & COWORKING',
        subtitle: null,
        desc: 'Connect with fellow creatives. Meet collaborators, share your work, and find support.',
        details: [
            'Connect with fellow creatives for cross-pollination of ideas',
            'Co-Flow virtual coworking for motivation and focus',
            'Support and accountability from people who get it',
        ],
    },
];

export default function AppFeatures() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
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
            { threshold: 0.1 }
        );

        const els = sectionRef.current?.querySelectorAll('.oevra-reveal');
        els?.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <section className="oevra-app-features" ref={sectionRef}>
            <div className="oevra-app-features__inner">
                <div className="oevra-app-features__header oevra-reveal">
                    <h2 className="oevra-app-features__title">
                        app features
                    </h2>
                    <p className="oevra-app-features__subtitle">
                        the creative<br />process<br />down to<br />a science
                    </p>
                    <p className="oevra-app-features__desc">
                        Meet your creative OS — a suite of daily practices,
                        tools, courses and more, designed based on science
                        and psychology for holistic support.
                    </p>
                </div>

                <div className="oevra-app-features__list oevra-reveal">
                    {APP_FEATURES.map((feat, i) => {
                        const isOpen = openIndex === i;
                        return (
                            <div
                                key={feat.id}
                                className={`oevra-app-features__item ${isOpen ? 'oevra-app-features__item--open' : ''}`}
                            >
                                <button
                                    className="oevra-app-features__item-header"
                                    onClick={() => setOpenIndex(isOpen ? null : i)}
                                >
                                    <span className="oevra-app-features__item-title">
                                        {feat.title}
                                    </span>
                                    <span className="oevra-app-features__item-toggle">
                                        {isOpen ? '−' : '+'}
                                    </span>
                                </button>
                                <div className={`oevra-app-features__item-body ${isOpen ? 'oevra-app-features__item-body--open' : ''}`}>
                                    <p className="oevra-app-features__item-desc">{feat.desc}</p>
                                    <ul className="oevra-app-features__item-list">
                                        {feat.details.map((d, j) => (
                                            <li key={j}>{d}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
