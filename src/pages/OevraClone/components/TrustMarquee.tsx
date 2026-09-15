import Marquee from './Marquee';

const TRUST_ITEMS = [
    '99.9% availability',
    'sub-100ms search',
    '98%+ OCR accuracy',
    '8-layer defense in depth',
    'AES-256 encryption',
    'zero cloud dependency',
    '5 isolated VLANs',
    '2–4 week deployment',
    'RBAC & immutable audit',
    'fully sovereign',
];

export default function TrustMarquee() {
    return (
        <div className="oevra-trust" aria-label="Key platform metrics">
            <Marquee items={TRUST_ITEMS} speed={26} />
        </div>
    );
}