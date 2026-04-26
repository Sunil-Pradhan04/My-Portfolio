import { FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import './About.css';

const About = ({ info }) => {
    const heading = info?.aboutHeading || 'Who am I?';
    const para1 = info?.aboutPara1 || "Hi, I'm <strong>Sunil Pradhan</strong>, a B.Tech student at GEC Autonomous College with a passion for coding and creating smart, user-friendly applications. I love turning ideas into real projects and continuously explore new technologies to grow as a developer.";
    const para2 = info?.aboutPara2 || "I'm especially interested in full-stack development and enjoy learning through hands-on experience. My goal is to build impactful solutions that combine creativity, performance, and real-world value.";
    const email = info?.email || 'sunilpradhanpersonal@gmail.com';
    const locationMapUrl = info?.locationMapUrl || 'https://maps.app.goo.gl/mTt8xaoqpJWRsuTJ9';

    return (
        <section className="about section" id="about">
            <div className="container">
                <h2 className="section-title">About Me</h2>

                <div className="about-content">
                    <div className="about-card glass-card">
                        <h3 className="about-heading">{heading}</h3>
                        {/* dangerouslySetInnerHTML for <strong> support in about text */}
                        <p className="about-text" dangerouslySetInnerHTML={{ __html: para1 }} />
                        <p className="about-text">{para2}</p>

                        <div className="about-details">
                            <div className="detail-item">
                                <FaEnvelope className="detail-icon" />
                                <div>
                                    <p className="detail-label">Email</p>
                                    <a href={`mailto:${email}`} className="detail-value">
                                        {email}
                                    </a>
                                </div>
                            </div>

                            <div className="detail-item">
                                <FaMapMarkerAlt className="detail-icon" />
                                <div>
                                    <p className="detail-label">Location</p>
                                    <a
                                        href={locationMapUrl}
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
