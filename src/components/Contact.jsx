import { useState } from 'react';
import { FaPaperPlane, FaEnvelope, FaUser, FaComment } from 'react-icons/fa';
import { api } from '../services/api';
import './Contact.css';

const Contact = ({ info }) => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState(''); // '' | 'sending' | 'success' | 'error'
    const [errorMsg, setErrorMsg] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');
        setErrorMsg('');
        try {
            const result = await api.sendContact(formData);
            if (result.message && !result.error) {
                setStatus('success');
                setFormData({ name: '', email: '', message: '' });
                setTimeout(() => setStatus(''), 6000);
            } else {
                setStatus('error');
                setErrorMsg(result.message || 'Failed to send. Please try again.');
            }
        } catch {
            setStatus('error');
            setErrorMsg('Network error. Please check your connection.');
        }
    };

    return (
        <section className="contact section" id="contact">
            <div className="container">
                <h2 className="section-title">Get In Touch</h2>

                <div className="contact-content">
                    <div className="contact-info">
                        <h3 className="contact-heading">Let's Connect!</h3>
                        <p className="contact-text">
                            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
                        </p>

                        <div className="contact-details">
                            <div className="contact-item">
                                <FaEnvelope className="contact-icon" />
                                <div>
                                    <h4 className="contact-label">Email</h4>
                                    <a href={`mailto:${info?.email || 'sunilpradhanpersonal@gmail.com'}`} className="contact-value">
                                        {info?.email || 'sunilpradhanpersonal@gmail.com'}
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="contact-note">
                            <p>📬 I'll also send you a confirmation email once your message is received!</p>
                        </div>
                    </div>

                    <form className="contact-form glass-card" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name" className="form-label">
                                <FaUser /> Your Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter your name"
                                className="form-input"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email" className="form-label">
                                <FaEnvelope /> Your Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                className="form-input"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="message" className="form-label">
                                <FaComment /> Your Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Enter your message"
                                className="form-input form-textarea"
                                rows="6"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary form-submit"
                            disabled={status === 'sending'}
                        >
                            {status === 'sending' ? (
                                <>⏳ Sending...</>
                            ) : (
                                <><FaPaperPlane /> Send Message</>
                            )}
                        </button>

                        {status === 'success' && (
                            <div className="form-message success">
                                ✅ Message sent! Check your inbox for a confirmation email. I'll reply soon!
                            </div>
                        )}

                        {status === 'error' && (
                            <div className="form-message error">
                                ✗ {errorMsg || 'Failed to send. Please try again.'}
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;
