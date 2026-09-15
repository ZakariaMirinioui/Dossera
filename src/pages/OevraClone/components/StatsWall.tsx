import { useScrollReveal } from './useScrollReveal';
import Counter from './Counter';

interface Metric {
    value: number;
    counter: boolean;
    decimals?: number;
    prefix?: string;
    suffix?: string;
    label: string;
    sub: string;
}

const METRICS: Metric[] = [
    { value: 99.9, counter: true, decimals: 1, suffix: '%', label: 'system availability', sub: 'automatic failover' },
    { value: 100, counter: false, prefix: '<', suffix: ' ms', label: 'search response', sub: 'normalized sub-100 ms' },
    { value: 98.2, counter: true, decimals: 1, suffix: '%', label: 'OCR accuracy', sub: 'Arabic + French' },
    { value: 5, counter: true, label: 'isolated VLANs', sub: 'default-deny routing' },
];

export default function StatsWall() {
    const ref = useScrollReveal<HTMLElement>({ stagger: 0.1 });

    return (
        <section className="oevra-stats" ref={ref}>
            <div className="oevra-stats__inner">
                <div className="oevra-stats__head" data-reveal>
                    <span className="oevra-stats__label">measured outcomes</span>
                    <p className="oevra-stats__rule" aria-hidden="true" />
                    <span className="oevra-stats__meta">in your datacenter · zero cloud</span>
                </div>

                <div className="oevra-stats__grid">
                    {METRICS.map((m, i) => (
                        <div className="oevra-stats__cell" key={i} data-reveal>
                            <span className="oevra-stats__value">
                                {m.counter ? (
                                    <Counter
                                        value={m.value}
                                        decimals={m.decimals ?? 0}
                                        prefix={m.prefix}
                                        suffix={m.suffix}
                                    />
                                ) : (
                                    <span className="oevra-stats__static">
                                        <b className="oevra-stats__lt">{m.prefix}</b>
                                        {m.value}
                                        <small className="oevra-stats__unit">{m.suffix?.trim()}</small>
                                    </span>
                                )}
                            </span>
                            <span className="oevra-stats__label-text">{m.label}</span>
                            <span className="oevra-stats__sub">{m.sub}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}