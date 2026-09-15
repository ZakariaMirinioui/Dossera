import { useScrollReveal } from './useScrollReveal';
import Counter from './Counter';

const STATS = [
    { value: 99.9, decimals: 1, suffix: '%', label: 'system availability', sub: 'automatic failover' },
    { value: 100, suffix: '', label: 'milliseconds search', sub: 'normalized < 100ms' },
    { value: 98.2, decimals: 1, suffix: '%', label: 'OCR accuracy', sub: 'Arabic + French' },
    { value: 5, suffix: '', label: 'isolated VLANs', sub: 'default-deny' },
];

export default function StatsWall() {
    const ref = useScrollReveal<HTMLDivElement>({ stagger: 0.1 });

    return (
        <section className="oevra-stats" ref={ref}>
            <div className="oevra-stats__inner">
                <div className="oevra-stats__head" data-reveal>
                    <span className="oevra-stats__label">measured outcomes</span>
                    <p className="oevra-stats__rule" aria-hidden="true" />
                </div>
                <div className="oevra-stats__grid">
                    {STATS.map((s, i) => (
                        <div className="oevra-stats__cell" key={i} data-reveal>
                            <span className="oevra-stats__value">
                                {s.value < 1 ? '<' : s.value < 100 && s.value >= 1 ? '' : ''}
                                {s.value > 98.1 && s.value < 99.96 ? '' : ''}
                                {s.label.toLowerCase().startsWith('milliseconds') ? '<' : ''}
                                <Counter
                                    value={s.value}
                                    suffix={s.suffix}
                                    decimals={s.decimals ?? 0}
                                />
                            </span>
                            <span className="oevra-stats__label-text">{s.label}</span>
                            <span className="oevra-stats__sub">{s.sub}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}