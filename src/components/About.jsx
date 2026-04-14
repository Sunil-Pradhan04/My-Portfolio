import { FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import './About.css';

const About = () => {
    return (
        <section className="about section" id="about">
            <div className="container">
                <h2 className="section-title">About Me</h2>

                <div className="about-content">
                    <div className="about-card glass-card">
                        <h3 className="about-heading">Who am I?</h3>
                        <p className="about-text">
                            Hi, I'm <span className="highlight">Sunil Pradhan</span>, a B.Tech student at GEC Autonomous College with
                            a passion for coding and creating smart, user-friendly applications. I
                            love turning ideas into real projects and continuously explore new
                            technologies to grow as a developer.
                        </p>
                        <p className="about-text">
                            I'm especially interested in full-stack development and enjoy learning through hands-on experience.
                            My goal is to build impactful solutions that combine creativity,
                            performance, and real-world value.
                        </p>

                        <div className="about-details">
                            <div className="detail-item">
                                <FaEnvelope className="detail-icon" />
                                <div>
                                    <p className="detail-label">Email</p>
                                    <a href="mailto:sunilpradhan042006@gmail.com" className="detail-value">
                                        sunilpradhan042006@gmail.com
                                    </a>
                                </div>
                            </div>

                            <div className="detail-item">
                                <FaMapMarkerAlt className="detail-icon" />
                                <div>
                                    <p className="detail-label">Location</p>
                                    <a
                                        href="https://maps.app.goo.gl/mTt8xaoqpJWRsuTJ9"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="detail-value"
                                    >
                                        View on Map
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </section>
    );
};

export default About;
