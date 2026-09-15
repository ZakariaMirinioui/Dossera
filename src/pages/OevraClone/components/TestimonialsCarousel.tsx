import { useCallback, useState } from 'react';
import { useScrollReveal } from './useScrollReveal';

const PROOF = [
    {
        quote: 'Hours of manual archive search became milliseconds. Our teams stopped hunting folders and started finding answers — the workflow simply vanished.',
        author: 'ARCHIVE DIRECTOR',
        role: 'Court of Appeal',
    },
    {
        quote: 'The 5-VLAN segmentation and SOC monitoring gave us something we never had: full visibility. Intrusion tests are detected and blocked in real time.',
        author: 'IT ADMINISTRATOR',
        role: 'Judicial institution',
    },
    {
        quote: 'Arabic OCR above 98% changed everything. Thousands of scanned documents became searchable text overnight — no re-keying, no typing errors.',
        author: 'DOCUMENTATION LEAD',
        role: 'Court services',
    },
    {
        quote: 'The deployment from bare metal to production took three weeks, with training included. No cloud, no third party — everything runs on-premise.',
        author: 'PROJECT SPONSOR',
        role: 'Institutional buyer',
    },
    {
        quote: 'For the first time we have a certified, immutable audit trail. Every view, edit, and export is timestamped and unalterable. Compliance is now an outcome, not a threat.',
        author: 'COMPLIANCE OFFICER',
        role: 'Regulatory oversight',
    },
    {
        quote: 'AES-256 with 90-day key rotation, 2FA on everything, and a validated DRP with sub-24h RPO. Security stopped being a worry and became a fact.',
        author: 'SECURITY MANAGER',
        role: 'Datacenter operations',
    },
    {
        quote: 'Our judges now search across decades of case history in less than 100 milliseconds. The confidence and speed this brings is transformative.',
        author: 'HEAD OF RECORDS',
        role: 'Court of First Instance',
    },
];

const ARROW_LEFT = (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
);

const ARROW_RIGHT = (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
);

export default function TestimonialsCarousel() {
    const ref = useScrollReveal<HTMLElement>({ stagger: 0.05 });
    const count = PROOF.length;
    const [active, setActive] = useState(0);

    const go = useCallback(
        (dir: number) => {
            setActive((a) => (a + dir + count) % count);
        },
        [count]
    );

    const position = (i: number): string => {
        const diff = (i - active + count) % count;
        if (diff === 0) return ' is-active';
        if (diff === 1) return ' is-next';
        if (diff === count - 1) return ' is-prev';
        return '';
    };

    return (
        <section className="oevra-proof" id="testimonials" ref={ref}>
            <div className="oevra-proof__inner">
                <header className="oevra-proof__header" data-reveal>
                    <span className="oevra-proof__count">(07)</span>
                    <span className="oevra-proof__label">client outcomes</span>
                </header>

                <div
                    className="oevra-proof__stage"
                    role="group"
                    aria-roledescription="carousel"
                    aria-label="Proof statements"
                    tabIndex={0}
                    onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
                        if (e.key === 'ArrowLeft') {
                            e.preventDefault();
                            go(-1);
                        }
                        if (e.key === 'ArrowRight') {
                            e.preventDefault();
                            go(1);
                        }
                    }}
                    data-reveal
                >
                    {PROOF.map((t, i) => (
                        <blockquote
                            key={i}
                            className={`oevra-proof__card${position(i)}`}
                            aria-hidden={i !== active}
                        >
                            <span className="oevra-proof__card-index">
                                {String(i + 1).padStart(2, '0')}
                            </span>
                            <p className="oevra-proof__card-quote">{t.quote}</p>
                            <footer className="oevra-proof__card-meta">
                                <span className="oevra-proof__card-role">— {t.role}</span>
                                <span className="oevra-proof__card-author">{t.author}</span>
                            </footer>
                        </blockquote>
                    ))}
                </div>

                <div className="oevra-proof__controls" data-reveal>
                    <div className="oevra-proof__dots" role="group" aria-label="Choose proof">
                        {PROOF.map((_, i) => (
                            <button
                                key={i}
                                type="button"
                                className={`oevra-proof__dot${i === active ? ' is-active' : ''}`}
                                aria-label={`Show proof ${i + 1}`}
                                aria-current={i === active}
                                onClick={() => setActive(i)}
                            />
                        ))}
                    </div>

                    <div className="oevra-proof__index" aria-hidden="true">
                        <span className="oevra-proof__index-current">
                            {String(active + 1).padStart(2, '0')}
                        </span>
                        <span> / {String(count).padStart(2, '0')}</span>
                    </div>

                    <div className="oevra-proof__arrows">
                        <button
                            type="button"
                            className="oevra-proof__arrow"
                            aria-label="Previous proof"
                            onClick={() => go(-1)}
                        >
                            {ARROW_LEFT}
                        </button>
                        <button
                            type="button"
                            className="oevra-proof__arrow"
                            aria-label="Next proof"
                            onClick={() => go(1)}
                        >
                            {ARROW_RIGHT}
                        </button>
                    </div>

                    <p className="oevra-proof__sr" role="status">
                        proof {active + 1} of {count}
                    </p>
                </div>
            </div>
        </section>
    );
}