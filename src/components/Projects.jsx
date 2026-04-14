import { projectsData } from '../data/projectsData';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';
import './Projects.css';

const Projects = ({ onProjectClick }) => {
    return (
        <section className="projects section" id="projects">
            <div className="container">
                <h2 className="section-title">Featured Projects</h2>

                <div className="projects-grid">
                    {projectsData.map((project, index) => (
                        <div
                            key={project.id}
                            className="project-card glass-card"
                            style={{ animationDelay: `${index * 0.2}s` }}
                        >
                            <div className="project-icon">{project.icon}</div>

                            <div className="project-header">
                                <h3 className="project-name">{project.name}</h3>
                                <p className="project-tagline">{project.tagline}</p>
                            </div>

                            <p className="project-description">{project.shortDescription}</p>

                            <div className="project-tech">
                                {Object.values(project.techStack)[0].slice(0, 4).map((tech, i) => (
                                    <span key={i} className="tech-badge">{tech}</span>
                                ))}
                                {Object.values(project.techStack).flat().length > 4 && (
                                    <span className="tech-badge more">
                                        +{Object.values(project.techStack).flat().length - 4} more
                                    </span>
                                )}
                            </div>

                            <div className="project-actions">
                                <button
                                    className="btn btn-primary project-btn"
                                    onClick={() => onProjectClick(project)}
                                >
                                    View Details
                                </button>

                                <div className="project-links">
                                    {project.liveUrl && (
                                        <a
                                            href={project.liveUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="project-link"
                                            title="Live Demo"
                                        >
                                            <FaExternalLinkAlt />
                                        </a>
                                    )}
                                    {project.githubUrl && (
                                        <a
                                            href={project.githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="project-link"
                                            title="View on GitHub"
                                        >
                                            <FaGithub />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
