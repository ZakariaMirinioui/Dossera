/* ═══════════════════════════════════════════════════
   DOSSERA — Motion Tokens (single source of truth)

   Matches the Phase 4 timing table. The marquee is the only
   element allowed to use linear easing.
   ═══════════════════════════════════════════════════ */

export const EASE_PREMIUM = 'cubic-bezier(0.16, 1, 0.3, 1)';
export const EASE_SOFT_OUT = 'cubic-bezier(0.22, 1, 0.36, 1)';
export const EASE_SNAP = 'cubic-bezier(0.34, 1.56, 0.64, 1)';
export const EASE_LINEAR = 'linear';

export const TRANSFORM_TRANSITION = `transform 400ms ${EASE_PREMIUM}`;
export const BOX_SHADOW_TRANSITION = `box-shadow 400ms ${EASE_PREMIUM}`;
export const BACKGROUND_TRANSITION = 'background-color 300ms ease-out';
export const BORDER_TRANSITION = 'border-color 300ms ease-out';

export const DURATION_INSTANT = '120ms';
export const DURATION_FAST = '250ms';
export const DURATION_MEDIUM = '400ms';
export const DURATION_SLOW = '800ms';
export const DURATION_SCENE = '900ms';
export const DURATION_MARQUEE = '32s';

/** Framer Motion cubic-bezier ease arrays mirroring the CSS tokens above. */
export const FM_EASE_PREMIUM = [0.16, 1, 0.3, 1] as const;
export const FM_EASE_SOFT_OUT = [0.22, 1, 0.36, 1] as const;
export const FM_EASE_SNAP = [0.34, 1.56, 0.64, 1] as const;

/** Magnetic spring config (stiffness 150, damping 15). */
export const MAGNETIC_SPRING = { stiffness: 150, damping: 15 };

/** Entrance transition used by <Reveal />. */
export const REVEAL_DURATION = 0.9;
export const REVEAL_EASE = FM_EASE_PREMIUM;
export const STAGGER_DEFAULT = 0.09;
export const STAGGER_TIGHT = 0.08;
export const STAGGER_LOOSE = 0.14;