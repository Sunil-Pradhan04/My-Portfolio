import { FaTimes, FaExternalLinkAlt, FaGithub, FaCheckCircle } from 'react-icons/fa';
import './ProjectDetail.css';

const ProjectDetail = ({ project, onClose }) => {
    if (!project) return null;

    return (
        <div className="project-detail-overlay" onClick={onClose}>
            <div className="project-detail-modal" onClick={(e) => e.stopPropagation()}>
                <button className="close-button" onClick={onClose} aria-label="Close">
                    <FaTimes />
                </button>

                <div className="modal-content">
                    <div className="modal-header">
                        <div className="project-icon-large">{project.icon}</div>
                        <h2 className="modal-title">{project.name}</h2>
                        <p className="modal-tagline">{project.tagline}</p>

                        <div className="modal-links">
                            {project.liveUrl && (
                                <a
                                    href={project.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-primary"
                                >
                                    <FaExternalLinkAlt /> Live Demo
                                </a>
                            )}
                            {project.githubUrl && (
                                <a
                                    href={project.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-secondary"
                                >
                                    <FaGithub /> View Code
                                </a>
                            )}
                        </div>
                    </div>

                    <div className="modal-body">
                        <section className="detail-section">
                            <h3 className="section-heading">📋 Project Overview</h3>
                            <p className="detail-text">{project.fullDescription}</p>
                        </section>

                        <section className="detail-section">
                            <h3 className="section-heading">🛠️ Tech Stack</h3>
                            <div className="tech-stack-grid">
                                {Object.entries(project.techStack).map(([category, techs]) => (
                                    <div key={category} className="tech-category">
                                        <h4 className="tech-category-title">
                                            {category.charAt(0).toUpperCase() + category.slice(1).replace(/([A-Z])/g, ' $1')}
                                        </h4>
                                        <div className="tech-list">
                                            {techs.map((tech, i) => (
                                                <span key={i} className="tech-item">{tech}</span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="detail-section">
                            <h3 className="section-heading">✨ Key Features</h3>
                            <ul className="features-list">
                                {project.features.map((feature, i) => (
                                    <li key={i} className="feature-item">
                                        <FaCheckCircle className="feature-icon" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        {project.challenges && project.challenges.length > 0 && (
                            <section className="detail-section">
                                <h3 className="section-heading">🎯 Challenges & Solutions</h3>
                                <ul className="challenges-list">
                                    {project.challenges.map((challenge, i) => (
                                        <li key={i} className="challenge-item">{challenge}</li>
                                    ))}
                                </ul>
                            </section>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetail;
