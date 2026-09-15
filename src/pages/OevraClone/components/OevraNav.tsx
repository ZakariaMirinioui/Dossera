import { useState, useEffect, useRef, useCallback } from 'react';
import usePrefersReducedMotion from './usePrefersReducedMotion';

interface NavLink {
    label: string;
    href: string;
    className?: string;
}

const NAV_LINKS: NavLink[] = [
    { label: 'Platform', href: '#about' },
    { label: 'Capabilities', href: '#features' },
    { label: 'Outcomes', href: '#testimonials' },
    { label: 'Engage', href: '#pricing' },
    { label: 'back to dossera', href: '/', className: 'oevra-nav-links__back' },
    { label: 'Book assessment', href: '#contact', className: 'oevra-nav-links__cta' },
];

export default function OevraNav() {
    const [scrolled, setScrolled] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const lastY = useRef(0);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const menuRef = useRef<HTMLElement>(null);
    const lastFocusedRef = useRef<HTMLElement | null>(null);

    const prefersReducedMotion = usePrefersReducedMotion();

    useEffect(() => {
        const onScroll = () => {
            const y = window.scrollY;
            const delta = y - lastY.current;
            setScrolled(y > 60);
            if (prefersReducedMotion || menuOpen) {
                lastY.current = y;
                return;
            }
            if (delta > 4 && y > window.innerHeight * 0.85) {
                setHidden(true);
            } else if (delta < -4) {
                setHidden(false);
            }
            lastY.current = y;
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, [menuOpen, prefersReducedMotion]);

    useEffect(() => {
        document.body.style.overflow = menuOpen ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [menuOpen]);

    useEffect(() => {
        if (!menuOpen) return;

        lastFocusedRef.current = document.activeElement as HTMLElement;
        requestAnimationFrame(() => {
            menuRef.current?.querySelector<HTMLAnchorElement>('a')?.focus();
        });

        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') closeMenu();
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [menuOpen]);

    const closeMenu = useCallback(() => {
        setMenuOpen(false);
        requestAnimationFrame(() => lastFocusedRef.current?.focus());
    }, []);

    const handleNavHover = (e: React.MouseEvent<HTMLAnchorElement>) => {
        const el = e.currentTarget;
        const rect = el.getBoundingClientRect();
        const pct = ((e.clientX - rect.left) / rect.width) * 100;
        el.style.setProperty('--nav-hover-x', `${pct}%`);
    };

    const headerClass = [
        'oevra-header',
        scrolled ? 'oevra-header--scrolled' : '',
        hidden ? 'oevra-header--hidden' : '',
        menuOpen ? 'oevra-header--menu-open' : '',
    ]
        .filter(Boolean)
        .join(' ');

    const linksClass = [
        'oevra-nav-links',
        menuOpen ? 'oevra-nav-links--open' : '',
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <header className={headerClass}>
            <div className="oevra-header__inner">
                <a href="/oevra-clone" className="oevra-logo" data-cursor="hover" onClick={() => closeMenu()}>
                    <svg viewBox="0 0 140 28" width="120" fill="none" className="oevra-logo__svg">
                        <text x="0" y="22" className="oevra-logo__text">dossera</text>
                    </svg>
                </a>

                <nav id="oevra-nav" className={linksClass} aria-label="Primary" ref={menuRef}>
                    {NAV_LINKS.map((link, i) => (
                        <a
                            key={link.label}
                            href={link.href}
                            className={link.className ?? undefined}
                            onClick={() => closeMenu()}
                            onMouseMove={handleNavHover}
                            data-index={i}
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>

                <button
                    ref={buttonRef}
                    className={`oevra-menu-btn ${menuOpen ? 'oevra-menu-btn--open' : ''}`}
                    onClick={() => setMenuOpen((open) => !open)}
                    aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                    aria-expanded={menuOpen}
                    aria-controls="oevra-nav"
                >
                    <span />
                    <span />
                </button>
            </div>
        </header>
    );
}