import { useEffect, useRef } from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import './Hero.css';
import sunilImg from '../assets/sunil.jpg';

const Hero = () => {
    const typedTextRef = useRef(null);

    useEffect(() => {
        const roles = ['Full Stack Developer', 'React Native Developer', 'AI Enthusiast'];
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;

        const typeText = () => {
            const currentRole = roles[roleIndex];

            if (!isDeleting) {
                typedTextRef.current.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;

                if (charIndex === currentRole.length) {
                    isDeleting = true;
                    typingSpeed = 2000; // Pause at end
                } else {
                    typingSpeed = 100;
                }
            } else {
                typedTextRef.current.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;

                if (charIndex === 0) {
                    isDeleting = false;
                    roleIndex = (roleIndex + 1) % roles.length;
                }
            }

            setTimeout(typeText, typingSpeed);
        };

        typeText();
    }, []);

    return (
        <section className="hero section" id="home">
            <div className="hero-container container">
                <div className="hero-content">
                    <div className="hero-text">
                        <p className="hero-greeting fade-in">Hi, I'm</p>
                        <h1 className="hero-name slide-in-left">
                            <span className="text-gradient">Sunil Pradhan</span>
                        </h1>
                        <div className="hero-role slide-in-right">
                            <span className="role-text">Creative </span>
                            <span ref={typedTextRef} className="typed-text text-gradient-warm"></span>
                            <span className="cursor">|</span>
                        </div>
                        <p className="hero-description fade-in-up">
                            Curious mind. Creative Code. Constantly improving.<br />
                            Learning by building. Growing through code.
                        </p>
                        <div className="hero-buttons fade-in-up">
                            <button
                                className="btn btn-primary"
                                onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                            >
                                Get In Touch
                            </button>
                            <button
                                className="btn btn-secondary"
                                onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
                            >
                                View Projects
                            </button>
                        </div>
                        <div className="hero-social fade-in-up">
                            <a href="https://github.com/Sunil-Pradhan04" target="_blank" rel="noopener noreferrer" className="social-link">
                                <FaGithub />
                            </a>
                            <a href="https://www.linkedin.com/in/sunil-pradhan-174364338" target="_blank" rel="noopener noreferrer" className="social-link">
                                <FaLinkedin />
                            </a>
                            <a href="mailto:sunilpradhan042006@gmail.com" className="social-link">
                                <FaEnvelope />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="hero-image-container slide-in-right">
                    <div className="hero-image">
                        <div className="image-glow"></div>
                        <img src={sunilImg} alt="Sunil Pradhan" />
                    </div>
                </div>
            </div>

            <div className="scroll-indicator">
                <div className="mouse">
                    <div className="wheel"></div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
