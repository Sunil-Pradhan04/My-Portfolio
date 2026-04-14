import { FaGithub, FaLinkedin, FaInstagram, FaFacebook, FaHeart } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-brand">
                        <h3 className="footer-logo">
                            Sunil<span className="logo-dot">.</span>
                        </h3>
                        <p className="footer-tagline">
                            Building the future, one line of code at a time.
                        </p>
                    </div>

                    <div className="footer-links">
                        <h4 className="footer-heading">Quick Links</h4>
                        <nav className="footer-nav">
                            <a href="#home" className="footer-link">Home</a>
                            <a href="#about" className="footer-link">About</a>
                            <a href="#skills" className="footer-link">Skills</a>
                            <a href="#projects" className="footer-link">Projects</a>
                            <a href="#contact" className="footer-link">Contact</a>
                        </nav>
                    </div>

                    <div className="footer-social">
                        <h4 className="footer-heading">Connect With Me</h4>
                        <div className="social-links">
                            <a
                                href="https://github.com/Sunil-Pradhan04"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-link"
                                aria-label="GitHub"
                            >
                                <FaGithub />
                            </a>
                            <a
                                href="https://www.linkedin.com/in/sunil-pradhan-174364338"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-link"
                                aria-label="LinkedIn"
                            >
                                <FaLinkedin />
                            </a>
                            <a
                                href="https://www.instagram.com/attitude._boy_sunil/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-link"
                                aria-label="Instagram"
                            >
                                <FaInstagram />
                            </a>
                            <a
                                href="https://www.facebook.com/share/1BesrRorLD/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-link"
                                aria-label="Facebook"
                            >
                                <FaFacebook />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p className="copyright">
                        © {currentYear} Sunil Pradhan. All rights reserved.
                    </p>
                    <p className="made-with">
                        Made with <FaHeart className="heart" /> using React
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
