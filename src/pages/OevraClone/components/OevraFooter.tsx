import { content } from '../content/dosseraLanding';
import Reveal from './Reveal';

/* ═══════════════════════════════════════════════════
   OevraFooter — quiet engraving, no ornament.
   ═══════════════════════════════════════════════════ */

export default function OevraFooter() {
    const { footer } = content;

    return (
        <footer className="dz-footer">
            <div className="dz-footer__inner">
                <Reveal className="dz-footer__word">dossera</Reveal>
                <Reveal className="dz-footer__line" delay={0.06}>
                    <span className="dz-footer__tag">{footer.sovereign}</span>
                    <span className="dz-footer__copy">{footer.copy}</span>
                </Reveal>
            </div>
        </footer>
    );
}