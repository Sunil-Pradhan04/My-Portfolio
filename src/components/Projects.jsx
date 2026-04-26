import { useState, useEffect, useCallback } from 'react';
import { FaExternalLinkAlt, FaGithub, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { api } from '../services/api';
import { useAdmin } from '../context/AdminContext';
import ProjectEditModal from './ProjectEditModal';
import './Projects.css';

const Projects = ({ onProjectClick }) => {
    const { isAdmin } = useAdmin();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Edit state
    const [editingProject, setEditingProject] = useState(null);
    const [isNewProject, setIsNewProject] = useState(false);

    const fetchProjects = useCallback(async () => {
        try {
            setLoading(true);
            const data = await api.getProjects();
            setProjects(Array.isArray(data) ? data : []);
        } catch {
            setError('Failed to load projects. Is the backend running?');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { fetchProjects(); }, [fetchProjects]);

    const handleDelete = async (project) => {
        if (!window.confirm(`Delete "${project.name}"? This cannot be undone.`)) return;
        try {
            await api.deleteProject(project._id);
            fetchProjects();
        } catch {
            alert('Delete failed. Please try again.');
        }
    };

    const handleSave = async (formData) => {
        try {
            if (isNewProject) {
                await api.createProject(formData);
            } else {
                await api.updateProject(editingProject._id, formData);
            }
            setEditingProject(null);
            setIsNewProject(false);
            fetchProjects();
        } catch {
            alert('Save failed. Please try again.');
        }
    };

    return (
        <section className="projects section" id="projects">
            <div className="container">
                <div className="section-header-row">
                    <h2 className="section-title">Featured Projects</h2>
                    {isAdmin && (
                        <button
                            className="add-new-btn"
                            style={{ margin: 0 }}
                            onClick={() => { setEditingProject(null); setIsNewProject(true); }}
                        >
                            <FaPlus /> Add Project
                        </button>
                    )}
                </div>

                {loading && (
                    <div className="loading-state">
                        <div className="spinner" />
                        <p>Loading projects...</p>
                    </div>
                )}

                {error && <p className="error-state">{error}</p>}

                <div className="projects-grid">
                    {projects.map((project, index) => (
                        <div
                            key={project._id}
                            className="project-card glass-card"
                            style={{ animationDelay: `${index * 0.2}s` }}
                        >
                            {isAdmin && (
                                <div className="edit-controls">
                                    <button
                                        className="ctrl-btn edit-btn"
                                        onClick={() => { setEditingProject(project); setIsNewProject(false); }}
                                        title="Edit project"
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        className="ctrl-btn delete-btn"
                                        onClick={() => handleDelete(project)}
                                        title="Delete project"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            )}

                            <div className="project-icon">{project.icon}</div>

                            <div className="project-header">
                                <h3 className="project-name">{project.name}</h3>
                                <p className="project-tagline">{project.tagline}</p>
                            </div>

                            <p className="project-description">{project.shortDescription}</p>

                            <div className="project-tech">
                                {Object.values(project.techStack || {})[0]?.slice(0, 4).map((tech, i) => (
                                    <span key={i} className="tech-badge">{tech}</span>
                                ))}
                                {Object.values(project.techStack || {}).flat().length > 4 && (
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
                                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="project-link" title="Live Demo">
                                            <FaExternalLinkAlt />
                                        </a>
                                    )}
                                    {project.githubUrl && (
                                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="project-link" title="View on GitHub">
                                            <FaGithub />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Project Edit Modal */}
            {(editingProject !== null || isNewProject) && (
                <ProjectEditModal
                    project={editingProject}
                    isNew={isNewProject}
                    onSave={handleSave}
                    onClose={() => { setEditingProject(null); setIsNewProject(false); }}
                />
            )}
        </section>
    );
};

export default Projects;
