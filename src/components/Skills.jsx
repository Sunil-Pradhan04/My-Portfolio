import { useEffect, useRef, useState } from 'react';
import { SiMongodb, SiExpress, SiReact, SiNodedotjs } from 'react-icons/si';
import './Skills.css';

const Skills = () => {
    const [isVisible, setIsVisible] = useState(false);
    const skillsRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.3 }
        );

        if (skillsRef.current) {
            observer.observe(skillsRef.current);
        }

        return () => {
            if (skillsRef.current) {
                observer.unobserve(skillsRef.current);
            }
        };
    }, []);

    const skillsData = [
        {
            name: 'MERN Stack',
            percentage: 90,
            color: 'blue',
            icon: [<SiReact key="react" />, <SiNodedotjs key="node" />, <SiExpress key="express" />, <SiMongodb key="mongo" />],
            details: 'MongoDB, Express.js, React.js, Node.js'
        },
        {
            name: 'React Native',
            percentage: 60,
            color: 'purple',
            icon: <SiReact />,
            details: 'Mobile app development with React Native'
        },
        {
            name: 'AI/ML',
            percentage: 20,
            color: 'pink',
            badge: 'Beginner',
            details: 'Artificial Intelligence & Machine Learning basics'
        }
    ];

    return (
        <section className="skills section" id="skills" ref={skillsRef}>
            <div className="container">
                <h2 className="section-title">Skills & Expertise</h2>

                <div className="skills-intro">
                    <p className="skills-subtitle">Turning Ideas Into Reality — My Skillset</p>
                    <p className="skills-tagline">Skills grow with curiosity. I keep learning, always.</p>
                </div>

                <div className="skills-grid">
                    {skillsData.map((skill, index) => (
                        <div
                            key={skill.name}
                            className="skill-card glass-card"
                            style={{ animationDelay: `${index * 0.2}s` }}
                        >
                            <div className="skill-header">
                                <div className="skill-icon-container">
                                    {Array.isArray(skill.icon) ? (
                                        <div className="icon-group">
                                            {skill.icon.map((Icon, i) => (
                                                <span key={i} className="skill-icon">{Icon}</span>
                                            ))}
                                        </div>
                                    ) : (
                                        <span className="skill-icon single-icon">{skill.icon}</span>
                                    )}
                                </div>
                                <div className="skill-info">
                                    <h3 className="skill-name">{skill.name}</h3>
                                    <p className="skill-details">{skill.details}</p>
                                </div>
                                {skill.badge && (
                                    <span className="skill-badge">{skill.badge}</span>
                                )}
                            </div>

                            <div className="skill-progress">
                                <div className="progress-info">
                                    <span className="progress-label">Proficiency</span>
                                    <span className="progress-percentage">{skill.percentage}%</span>
                                </div>
                                <div className="progress-bar">
                                    <div
                                        className={`progress-fill progress-${skill.color}`}
                                        style={{
                                            width: isVisible ? `${skill.percentage}%` : '0%',
                                            transition: 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)'
                                        }}
                                    >
                                        <div className="progress-glow"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
