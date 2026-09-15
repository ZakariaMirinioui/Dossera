import usePrefersReducedMotion from './usePrefersReducedMotion';

interface MarqueeProps {
    items: string[];
    speed?: number;
    className?: string;
    reverse?: boolean;
}

export default function Marquee({
    items,
    speed = 30,
    className = '',
    reverse = false,
}: MarqueeProps) {
    const prefersReducedMotion = usePrefersReducedMotion();

    const row = [...items, ...items, ...items];

    return (
        <div
            className={`oevra-marquee ${reverse ? 'oevra-marquee--reverse' : ''} ${className}`}
            data-cursor="hover"
        >
            <div
                className="oevra-marquee__track"
                style={{
                    animationDuration: prefersReducedMotion ? 'none' : `${speed}s`,
                    animationDirection: reverse ? 'reverse' : 'normal',
                }}
            >
                {row.map((item, i) => (
                    <span className="oevra-marquee__item" key={i}>
                        <span className="oevra-marquee__star" aria-hidden="true">
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                                <path d="M7 0l1.7 5.3L14 7l-5.3 1.7L7 14l-1.7-5.3L0 7l5.3-1.7L7 0z" />
                            </svg>
                        </span>
                        {item}
                    </span>
                ))}
            </div>
        </div>
    );
}