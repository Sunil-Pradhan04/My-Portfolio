import { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import './Header.css';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsMobileMenuOpen(false);
        }
    };

    return (
        <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
            <div className="header-container">
                <div className="logo">
                    <span className="logo-text">Sunil</span>
                    <span className="logo-dot">.</span>
                </div>

                <nav className={`nav ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
                    <button 
                        className="sidebar-close" 
                        onClick={() => setIsMobileMenuOpen(false)}
                        aria-label="Close menu"
                    >
                        <FaTimes />
                    </button>
                    <a onClick={() => scrollToSection('home')} className="nav-link">Home</a>
                    <a onClick={() => scrollToSection('about')} className="nav-link">About</a>
                    <a onClick={() => scrollToSection('skills')} className="nav-link">Skills</a>
                    <a onClick={() => scrollToSection('projects')} className="nav-link">Projects</a>
                    <a onClick={() => scrollToSection('contact')} className="nav-link">Contact</a>
                </nav>

                <button
                    className="mobile-toggle"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>
        </header>
    );
};

export default Header;
