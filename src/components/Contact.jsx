import { useState } from 'react';
import { FaPaperPlane, FaEnvelope, FaUser, FaComment } from 'react-icons/fa';
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    access_key: '98924596-6746-4039-9500-b5b93e54b4e0',
                    ...formData
                }),
            });

            if (response.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', message: '' });
                setTimeout(() => setStatus(''), 5000);
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
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
                                    <a href="mailto:sunilpradhan042006@gmail.com" className="contact-value">
                                        sunilpradhan042006@gmail.com
                                    </a>
                                </div>
                            </div>
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
                                'Sending...'
                            ) : (
                                <>
                                    <FaPaperPlane /> Send Message
                                </>
                            )}
                        </button>

                        {status === 'success' && (
                            <div className="form-message success">
                                ✓ Message sent successfully! I'll get back to you soon.
                            </div>
                        )}

                        {status === 'error' && (
                            <div className="form-message error">
                                ✗ Failed to send message. Please try again.
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;
