import { useEffect, useRef, useState } from 'react';

const FEATURES = [
    {
        num: '01',
        title: 'BE MORE CREATIVE',
        desc: 'Creativity is a skill anyone can learn and improve. The dossera app is designed to enhance your creative thinking skills and create the optimal conditions for your creativity to thrive — all based on volumes of research in neuroscience and psychology.',
        color: '#395d38',
        ratio: '3/4',
        width: '16rem',
        pos: 'left: 14rem; top: 6rem',
    },
    {
        num: '02',
        title: 'DEEP FOCUS AND FLOW',
        desc: 'Daily practices and tools designed to activate the flow state. The flow state isn\'t just a productivity hack — it\'s key to happiness and satisfaction at work, and it\'s got proven mental health benefits.',
        color: '#4f663c',
        ratio: '0.8',
        width: '30rem',
        pos: 'left: 28rem; top: 0rem',
    },
    {
        num: '03',
        title: 'GET INSPIRED',
        desc: 'Reimagine creativity as part of your mental wellness routine. Creativity is proven to benefit mental health. Mindfulness practices are central to the dossera creative process.',
        color: '#5a7340',
        ratio: '1.4',
        width: '33rem',
        pos: 'right: 10rem; top: 4rem',
    },
    {
        num: '04',
        title: 'THINK BIGGER',
        desc: 'Improve your cognitive performance and brain health. Studies show that creativity helps improve memory, mood, and productivity. It\'s also neuroprotective.',
        color: '#6b7f42',
        ratio: '1.35',
        width: '27rem',
        pos: 'left: 20rem; bottom: 2rem',
    },
    {
        num: '05',
        title: 'GET UNBLOCKED',
        desc: 'Demystify the creative process with structured practices. Don\'t let procrastination, perfectionism, stress or distractions get in your way anymore.',
        color: '#778643',
        ratio: '2/3',
        width: '20rem',
        pos: 'right: 4rem; bottom: 4rem',
    },
];

export default function FeaturesShowcase() {
    const [activeIndex, setActiveIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            const totalHeight = containerRef.current.scrollHeight - window.innerHeight;
            const scrolled = -rect.top;
            const progress = Math.max(0, Math.min(1, scrolled / totalHeight));
            const index = Math.min(
                FEATURES.length - 1,
                Math.floor(progress * FEATURES.length)
            );
            setActiveIndex(index);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section className="oevra-features-showcase" ref={containerRef}>
            <div className="oevra-features-showcase__sticky">
                <div className="oevra-features-showcase__media oevra-media-details">
                    {FEATURES.map((feat, i) => (
                        <div
                            key={feat.num}
                            className={`oevra-media oevra-media--${i + 1} ${
                                i === activeIndex ? 'oevra-media--active' : ''
                            }`}
                            style={
                                {
                                    '--card-color': feat.color,
                                    '--ratio': feat.ratio,
                                    '--media-width': feat.width,
                                } as React.CSSProperties
                            }
                        >
                            <div className="oevra-media__inner">
                                <div className="oevra-media__phone">
                                    <div className="oevra-media__phone-screen">
                                        <div className="oevra-media__phone-title">{feat.title}</div>
                                        <div className="oevra-media__phone-bar" />
                                        <div className="oevra-media__phone-bar oevra-media__phone-bar--short" />
                                        <div className="oevra-media__phone-bar" />
                                        <div className="oevra-media__phone-dots">
                                            <span />
                                            <span />
                                            <span />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="oevra-media__text">
                                <span className="oevra-media__text-num">{feat.num}</span>
                                <span className="oevra-media__text-title">{feat.title}</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="oevra-features-showcase__info">
                    {FEATURES.map((feat, i) => (
                        <div
                            key={feat.num}
                            className={`oevra-features-showcase__detail ${
                                i === activeIndex ? 'oevra-features-showcase__detail--active' : ''
                            }`}
                        >
                            <h3 className="oevra-features-showcase__detail-title">
                                <span className="oevra-features-showcase__detail-num">{feat.num}</span>
                                {feat.title}
                            </h3>
                            <p className="oevra-features-showcase__detail-desc">{feat.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}