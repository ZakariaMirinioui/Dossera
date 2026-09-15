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
                <a href="/oevra-clone" className="oevra-logo">
                    <svg viewBox="0 0 140 28" fill="none" className="oevra-logo__svg">
                        <text x="0" y="22" className="oevra-logo__text">dossera</text>
                    </svg>
                </a>

                <nav className={`oevra-nav-links ${menuOpen ? 'oevra-nav-links--open' : ''}`}>
                    <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
                    <a href="#features" onClick={() => setMenuOpen(false)}>Features</a>
                    <a href="#testimonials" onClick={() => setMenuOpen(false)}>Testimonials</a>
                    <a href="#pricing" onClick={() => setMenuOpen(false)}>Pricing</a>
                    <a href="#contact" className="oevra-nav-links__cta" onClick={() => setMenuOpen(false)}>Contact</a>
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
