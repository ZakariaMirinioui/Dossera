import { useRef, useState, useEffect } from 'react';

const TESTIMONIALS = [
    {
        quote: "It's like The Artist's Way, but for today. I love the focus on science-backed practices, which help me approach creative thinking from a new slant.",
        author: 'CAIT',
    },
    {
        quote: "This is exactly what I needed to get unblocked. I've always been afraid to try things I wasn't 'good at,' but after a few weeks, I feel more free to create for the joy of it.",
        author: 'EMILY',
    },
    {
        quote: 'I feel like I\'m meeting my authentic self for the first time. The Creative Process is helping me reconnect with my authentic self in ways I never imagined.',
        author: 'CARLOS',
    },
    {
        quote: 'If you\'re a left-brained creative who wants to see measurable results, this app is for you. The neuroscience behind it grounded a lot of concepts I\'ve deemed too abstract.',
        author: 'CHANEL',
    },
    {
        quote: 'The evidence-based insights gave me a better understanding of how my own creative process works. I learned that sound is really effective for helping me get into the zone.',
        author: 'CARLY',
    },
    {
        quote: "This is the secret sauce to unlearning and relearning creativity in a way that'll make the practice stick for good. The dossera app gave me a clear, robust framework.",
        author: 'MEG',
    },
    {
        quote: "The discouraging voice in my head used to be so loud. Thanks to dossera, I've finally started turning down my inner critic and opening my mind to new possibilities.",
        author: 'DAVID',
    },
    {
        quote: "As a busy parent and professional, I didn't think I had time for creativity. But with dossera's adaptable approach, I've found ways to weave in a daily practice.",
        author: 'SOFIA',
    },
];

export default function TestimonialsCarousel() {
    const trackRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

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

    useEffect(() => {
        const el = trackRef.current;
        if (!el) return;
        const onLeave = () => setIsDragging(false);
        el.addEventListener('mouseleave', onLeave);
        return () => el.removeEventListener('mouseleave', onLeave);
    }, []);

    return (
        <section className="oevra-testimonials" id="testimonials">
            <div className="oevra-testimonials__inner">
                <div className="oevra-testimonials__header">
                    <span className="oevra-testimonials__count">(09)</span>
                    <span className="oevra-testimonials__label">words of affirmation</span>
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
                            <p className="oevra-testimonials__card-quote">{t.quote}</p>
                            <span className="oevra-testimonials__card-author">— {t.author}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
