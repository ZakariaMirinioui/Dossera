export default function OevraFooter() {
    return (
        <footer className="oevra-footer">
            <div className="oevra-footer__inner">
                <div className="oevra-footer__left">
                    <span className="oevra-footer__copy">
                        &copy; 2026 DOSSERA — JAMS System
                    </span>
                    <span className="oevra-footer__sovereign">
                        built in Khouribga · sovereign by design
                    </span>
                </div>
                <div className="oevra-footer__right">
                    <a href="#about" data-cursor="hover">Platform</a>
                    <a href="#contact" data-cursor="hover">Contact</a>
                    <a href="/demande-demo" data-cursor="hover">Request demo</a>
                    <a href="/" data-cursor="hover">Back to site</a>
                </div>
            </div>
        </footer>
    );
}