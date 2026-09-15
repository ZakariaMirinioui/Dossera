import { useState, useEffect } from 'react';

export default function OevraNav() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = menuOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [menuOpen]);

    return (
        <header className={`oevra-header ${scrolled ? 'oevra-header--scrolled' : ''}`}>
            <div className="oevra-header__inner">
                <a href="/oevra-clone" className="oevra-logo" data-cursor="hover">
                    <svg viewBox="0 0 140 28" width="120" fill="none" className="oevra-logo__svg">
                        <text x="0" y="22" className="oevra-logo__text">dossera</text>
                    </svg>
                </a>

                <nav className={`oevra-nav-links ${menuOpen ? 'oevra-nav-links--open' : ''}`}>
                    <a href="#about" onClick={() => setMenuOpen(false)}>Platform</a>
                    <a href="#features" onClick={() => setMenuOpen(false)}>Capabilities</a>
                    <a href="#testimonials" onClick={() => setMenuOpen(false)}>Outcomes</a>
                    <a href="#pricing" onClick={() => setMenuOpen(false)}>Engage</a>
                    <a href="/" onClick={() => setMenuOpen(false)} className="oevra-nav-links__back">
                        back to dossera
                    </a>
                    <a href="#contact" className="oevra-nav-links__cta" onClick={() => setMenuOpen(false)}>
                        Book assessment
                    </a>
                </nav>

                <button
                    className={`oevra-menu-btn ${menuOpen ? 'oevra-menu-btn--open' : ''}`}
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    <span />
                    <span />
                </button>
            </div>
        </header>
    );
}
