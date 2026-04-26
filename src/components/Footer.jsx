import { useState } from 'react';
import { FaGithub, FaLinkedin, FaInstagram, FaFacebook, FaHeart, FaLock, FaUnlock, FaEdit, FaBrain } from 'react-icons/fa';
import { useAdmin } from '../context/AdminContext';
import AdminLoginModal from './AdminLoginModal';
import InfoEditModal from './InfoEditModal';
import KnowledgeManager from './KnowledgeManager';
import './Footer.css';

const Footer = ({ info, onInfoUpdate }) => {
    const currentYear = new Date().getFullYear();
    const { isAdmin, logout } = useAdmin();
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showInfoEdit, setShowInfoEdit] = useState(false);
    const [showKnowledgeManager, setShowKnowledgeManager] = useState(false);

    const name = info?.name || 'Sunil Pradhan';
    const tagline = info?.footerTagline || 'Building meaningful things, one commit at a time.';
    const githubUrl = info?.githubUrl || 'https://github.com/Sunil-Pradhan04';
    const linkedinUrl = info?.linkedinUrl || 'https://www.linkedin.com/in/sunil-pradhan-174364338';

    return (
        <>
            <footer className="footer">
                <div className="container">
                    <div className="footer-content">
                        <div className="footer-brand">
                            <h3 className="footer-logo">
                                {name.split(' ')[0]}<span className="logo-dot">.</span>
                            </h3>
                            <p className="footer-tagline">{tagline}</p>
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
                                <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="social-link" aria-label="GitHub">
                                    <FaGithub />
                                </a>
                                <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
                                    <FaLinkedin />
                                </a>
                                <a href="https://www.instagram.com/attitude._boy_sunil/" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Instagram">
                                    <FaInstagram />
                                </a>
                                <a href="https://www.facebook.com/share/1BesrRorLD/" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Facebook">
                                    <FaFacebook />
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="footer-bottom">
                        <p className="copyright">
                            © {currentYear} {name}. All rights reserved.
                        </p>
                        <p className="made-with">
                            Made with <FaHeart className="heart" /> using React
                        </p>

                        {/* Admin Access Section */}
                        <div className="admin-section">
                            {isAdmin ? (
                                <div className="admin-bar">
                                    <span className="admin-badge">🔓 Admin Mode</span>
                                    <button
                                        className="admin-edit-btn"
                                        onClick={() => setShowInfoEdit(true)}
                                        title="Edit portfolio info"
                                    >
                                        <FaEdit /> Edit Info
                                    </button>
                                    <button
                                        className="admin-edit-btn"
                                        onClick={() => setShowKnowledgeManager(true)}
                                        title="Manage chatbot knowledge"
                                        style={{ background: 'rgba(99,102,241,0.2)', borderColor: 'rgba(99,102,241,0.5)' }}
                                    >
                                        <FaBrain /> Chatbot KB
                                    </button>
                                    <button className="admin-logout-btn" onClick={logout}>
                                        <FaLock /> Logout
                                    </button>
                                </div>
                            ) : (
                                <button
                                    className="admin-access-btn"
                                    onClick={() => setShowLoginModal(true)}
                                    title="Admin access"
                                >
                                    <FaLock /> Admin Access
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </footer>

            {showLoginModal && (
                <AdminLoginModal
                    onClose={() => setShowLoginModal(false)}
                    onSuccess={() => setShowLoginModal(false)}
                />
            )}

            {showInfoEdit && isAdmin && (
                <InfoEditModal
                    info={info}
                    onSave={(updated) => {
                        onInfoUpdate?.(updated);
                        setShowInfoEdit(false);
                    }}
                    onClose={() => setShowInfoEdit(false)}
                />
            )}

            {showKnowledgeManager && isAdmin && (
                <KnowledgeManager onClose={() => setShowKnowledgeManager(false)} />
            )}
        </>
    );
};

export default Footer;
