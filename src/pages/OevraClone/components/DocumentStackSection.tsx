import { motion, useReducedMotion } from 'framer-motion';
import { content } from '../content/dosseraLanding';
import { EyebrowReveal } from './Reveal';
import { FM_EASE_PREMIUM } from './motionTokens';

/* ═══════════════════════════════════════════════════
   Section 01 — "Every document becomes intelligence."

   Left: SYS/BOOT copy. Right: a layered paper stack that
   fans out (stagger 90ms) on scroll into view.
   ═══════════════════════════════════════════════════ */

const fan = {
    hidden: { y: 0, rotate: 0, scale: 0.95, opacity: 0 },
    visible: (i: number) => ({
        y: i * -14,
        rotate: [-6, -2, 2, 6][i] ?? 0,
        scale: 1,
        opacity: 1,
        transition: { duration: 0.7, ease: FM_EASE_PREMIUM, delay: 0.06 * i },
    }),
};

const BACK = [
    { ref: 'N° 2024-A72', bars: ['96%', '88%', '72%', '60%'] },
    { ref: 'N° 2023-0118', bars: ['90%', '78%', '84%', '56%'] },
    { ref: 'N° 2022-0154', bars: ['94%', '80%', '70%'] },
];

export default function DocumentStackSection() {
    const { story } = content;
    const reduced = useReducedMotion();

    if (reduced) {
        return (
            <section className="dz-story" id="story">
                <div className="dz-story__inner">
                    <div className="dz-story__grid">
                        <div className="dz-story__text">
                            <EyebrowReveal>
                                <span className="dz-eyebrow">{story.eyebrow}</span>
                            </EyebrowReveal>
                            <h2 className="dz-story__title">{story.title}</h2>
                            <p className="dz-story__desc">{story.desc}</p>
                        </div>
                        <div className="dz-story__visual">
                            <DocStack staticRender />
                            <p className="dz-story__caption">{story.caption}</p>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="dz-story" id="story">
            <div className="dz-glow dz-glow--story" aria-hidden="true" />
            <div className="dz-story__inner">
                <div className="dz-story__grid">
                    <div className="dz-story__text">
                        <EyebrowReveal>
                            <span className="dz-eyebrow">{story.eyebrow}</span>
                        </EyebrowReveal>
                        <h2 className="dz-story__title">{story.title}</h2>
                        <p className="dz-story__desc">{story.desc}</p>
                    </div>
                    <div className="dz-story__visual">
                        <DocStack />
                        <p className="dz-story__caption">{story.caption}</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

function DocStack({ staticRender = false }: { staticRender?: boolean }) {
    return (
        <motion.div
            className="dz-doc-stage"
            initial={staticRender ? false : 'hidden'}
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
        >
            {BACK.map((doc, i) => (
                <motion.div
                    key={doc.ref}
                    className={`dz-doc-layer dz-doc-layer--back${i + 1}`}
                    custom={i + 1}
                    variants={fan}
                >
                    <div className="dz-doc dz-doc--back">
                        <span className="dz-doc__ref">{doc.ref}</span>
                        <span className="dz-doc__bars" aria-hidden="true">
                            {doc.bars.map((w) => (
                                <i key={w} style={{ width: w }} />
                            ))}
                        </span>
                    </div>
                </motion.div>
            ))}
            <motion.div
                className="dz-doc-layer dz-doc-layer--primary"
                custom={4}
                variants={fan}
            >
                <div className="dz-doc dz-doc--primary">
                    <span className="dz-doc__head">
                        <span className="dz-doc__mark" aria-hidden="true">◆</span>
                        <span className="dz-doc__ref">DOSSIER N° 2024-0063</span>
                        <span className="dz-doc__tag">JUDICIAL</span>
                    </span>
                    <span className="dz-doc__title">Demande de révision — dossier 2024-0063</span>
                    <span className="dz-doc__body">
                        <span>Objet : certificat d'existence et de non-recours.</span>
                        <span lang="ar" dir="rtl">طلب مراجعة الملف رقم 2024-0063 الصادر عن المحكمة</span>
                        <span>Pièce annexée : procès-verbal n° 2024-A72, sous scellé numérique.</span>
                    </span>
                    <span className="dz-doc__foot">
                        <span>مصادق عليه — certifié conforme</span>
                        <span>14.06.2024 · RABAT</span>
                    </span>
                </div>
            </motion.div>
        </motion.div>
    );
}