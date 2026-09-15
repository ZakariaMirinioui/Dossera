import { useRef, useState, useEffect } from 'react';

const TESTIMONIALS = [
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

export default function TestimonialsCarousel() {
    const trackRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [progress, setProgress] = useState(0);

    const onMouseDown = (e: React.MouseEvent) => {
        if (!trackRef.current) return;
        setIsDragging(true);
        setStartX(e.pageX - trackRef.current.offsetLeft);
        setScrollLeft(trackRef.current.scrollLeft);
    };

    const onMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !trackRef.current) return;
        e.preventDefault();
        const x = e.pageX - trackRef.current.offsetLeft;
        const walk = (x - startX) * 1.5;
        trackRef.current.scrollLeft = scrollLeft - walk;
    };

    const onMouseUp = () => setIsDragging(false);

    const onScroll = () => {
        const el = trackRef.current;
        if (!el) return;
        const max = el.scrollWidth - el.clientWidth;
        setProgress(max > 0 ? el.scrollLeft / max : 0);
    };

    useEffect(() => {
        const el = trackRef.current;
        if (!el) return;
        el.addEventListener('scroll', onScroll, { passive: true });
        const onLeave = () => setIsDragging(false);
        el.addEventListener('mouseleave', onLeave);
        return () => {
            el.removeEventListener('scroll', onScroll);
            el.removeEventListener('mouseleave', onLeave);
        };
    }, []);

    return (
        <section className="oevra-testimonials" id="testimonials">
            <div className="oevra-testimonials__inner">
                <div className="oevra-testimonials__header">
                    <span className="oevra-testimonials__count">(07)</span>
                    <span className="oevra-testimonials__label">client outcomes</span>
                    <span className="oevra-testimonials__hint">— drag to explore</span>
                </div>

                <div
                    className={`oevra-testimonials__track ${isDragging ? 'oevra-testimonials__track--dragging' : ''}`}
                    ref={trackRef}
                    onMouseDown={onMouseDown}
                    onMouseMove={onMouseMove}
                    onMouseUp={onMouseUp}
                >
                    {TESTIMONIALS.map((t, i) => (
                        <div className="oevra-testimonials__card" key={i}>
                            <div className="oevra-testimonials__card-dot" />
                            <span className="oevra-testimonials__card-index">{String(i + 1).padStart(2, '0')}</span>
                            <p className="oevra-testimonials__card-quote">{t.quote}</p>
                            <div className="oevra-testimonials__card-meta">
                                <span className="oevra-testimonials__card-author">— {t.author}</span>
                                <span className="oevra-testimonials__card-role">{t.role}</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="oevra-testimonials__progress" aria-hidden="true">
                    <span
                        className="oevra-testimonials__progress-bar"
                        style={{ transform: `scaleX(${progress})` }}
                    />
                </div>
            </div>
        </section>
    );
}