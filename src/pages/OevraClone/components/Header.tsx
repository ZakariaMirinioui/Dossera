import { useState, useEffect, useRef, useCallback } from 'react';
import { content } from '../content/dosseraLanding';
import MagneticButton from './MagneticButton';

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLElement>(null);
    const lastFocusedRef = useRef<HTMLElement | null>(null);

    const { header } = content;

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 80);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

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

    const headerClass = [
        'dz-header',
        scrolled ? 'dz-header--scrolled' : '',
        menuOpen ? 'dz-header--menu-open' : '',
    ]
        .filter(Boolean)
        .join(' ');

    const navClass = ['dz-header__nav', menuOpen ? 'dz-header__nav--open' : '']
        .filter(Boolean)
        .join(' ');

    return (
        <header className={headerClass}>
            <div className="dz-header__inner">
                <a
                    href="/oevra-clone"
                    className="dz-header__logo"
                    data-cursor="hover"
                    onClick={closeMenu}
                    aria-label={header.logo}
                >
                    <svg viewBox="0 0 132 28" width="118" fill="none" className="dz-header__logo-svg" aria-hidden="true">
                        <text x="0" y="22" className="dz-header__logo-text">{header.logo}</text>
                    </svg>
                </a>

                <nav
                    id="dz-nav"
                    className={navClass}
                    aria-label={header.ariaNav}
                    ref={menuRef}
                >
                    <a href={header.backLink.href} className="dz-header__back" onClick={closeMenu} data-cursor="hover">
                        ← {header.backLink.label}
                    </a>

                    {header.navLinks.map((link) => (
                        <a key={link.label} href={link.href} className="dz-header__link" onClick={closeMenu} data-cursor="hover">
                            {link.label}
                        </a>
                    ))}

                    <MagneticButton
                        as="a"
                        href={header.cta.href}
                        className="dz-header__cta"
                        onClick={closeMenu}
                    >
                        {header.cta.label}
                    </MagneticButton>
                </nav>

                <button
                    type="button"
                    className={`dz-header__menu-btn${menuOpen ? ' is-open' : ''}`}
                    onClick={() => setMenuOpen((open) => !open)}
                    aria-label={menuOpen ? header.menuCloseLabel : header.menuOpenLabel}
                    aria-expanded={menuOpen}
                    aria-controls="dz-nav"
                >
                    <span />
                    <span />
                </button>
            </div>
        </header>
    );
}