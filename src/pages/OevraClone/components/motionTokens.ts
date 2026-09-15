export const motion = {
    duration: {
        micro: 0.18,
        ui: 0.32,
        content: 0.65,
        scene: 1.0,
    },
    distance: {
        micro: 4,
        small: 12,
        medium: 24,
        large: 48,
    },
    ease: {
        editorial: [0.22, 1, 0.36, 1] as const,
        soft: [0.4, 0, 0.2, 1] as const,
        linear: [0, 0, 1, 1] as const,
        snap: [0.43, 0.195, 0.02, 1] as const,
    },
} as const;

export const EASE_EDITORIAL = 'cubic-bezier(0.22, 1, 0.36, 1)';
export const EASE_SOFT = 'cubic-bezier(0.4, 0, 0.2, 1)';
export const EASE_SNAP = 'cubic-bezier(0.43, 0.195, 0.02, 1)';
export const EASE_LINEAR = 'linear';

export const DURATION_MICRO = '180ms';
export const DURATION_UI = '320ms';
export const DURATION_CONTENT = '650ms';
export const DURATION_SCENE = '1000ms';

export type EaseCurve = keyof typeof motion.ease;