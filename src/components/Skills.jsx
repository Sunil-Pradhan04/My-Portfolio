import { useEffect, useRef, useState, useCallback } from 'react';
import { SiMongodb, SiExpress, SiReact, SiNodedotjs } from 'react-icons/si';
import { FaEdit, FaTrash, FaPlus, FaRobot, FaMobileAlt } from 'react-icons/fa';
import { api } from '../services/api';
import { useAdmin } from '../context/AdminContext';
import SkillEditModal from './SkillEditModal';
import './Skills.css';

// Map iconKey strings to actual icon elements
const getIcon = (iconKey) => {
    switch (iconKey) {
        case 'mern':
            return [<SiReact key="r" />, <SiNodedotjs key="n" />, <SiExpress key="e" />, <SiMongodb key="m" />];
        case 'react': return <SiReact />;
        case 'node': return <SiNodedotjs />;
        case 'mongo': return <SiMongodb />;
        case 'ai': return <FaRobot />;
        case 'mobile': return <FaMobileAlt />;
        default: return null;
    }
};

const Skills = () => {
    const { isAdmin } = useAdmin();
    const [isVisible, setIsVisible] = useState(false);
    const skillsRef = useRef(null);
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);

    const [editingSkill, setEditingSkill] = useState(null);
    const [isNewSkill, setIsNewSkill] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
            { threshold: 0.3 }
        );
        if (skillsRef.current) observer.observe(skillsRef.current);
        return () => { if (skillsRef.current) observer.unobserve(skillsRef.current); };
    }, []);

    const fetchSkills = useCallback(async () => {
        try {
            setLoading(true);
            const data = await api.getSkills();
            setSkills(Array.isArray(data) ? data : []);
        } catch {
            console.error('Failed to load skills');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { fetchSkills(); }, [fetchSkills]);

    const handleDelete = async (skill) => {
        if (!window.confirm(`Delete "${skill.name}"?`)) return;
        try {
            await api.deleteSkill(skill._id);
            fetchSkills();
        } catch { alert('Delete failed.'); }
    };

    const handleSave = async (formData) => {
        try {
            if (isNewSkill) {
                await api.createSkill(formData);
            } else {
                await api.updateSkill(editingSkill._id, formData);
            }
            setEditingSkill(null);
            setIsNewSkill(false);
            fetchSkills();
        } catch { alert('Save failed.'); }
    };

    return (
        <section className="skills section" id="skills" ref={skillsRef}>
            <div className="container">
                <div className="section-header-row">
                    <h2 className="section-title">Skills &amp; Expertise</h2>
                    {isAdmin && (
                        <button
                            className="add-new-btn"
                            style={{ margin: 0 }}
                            onClick={() => { setEditingSkill(null); setIsNewSkill(true); }}
                        >
                            <FaPlus /> Add Skill
                        </button>
                    )}
                </div>

                <div className="skills-intro">
                    <p className="skills-subtitle">Turning Ideas Into Reality — My Skillset</p>
                    <p className="skills-tagline">Skills grow with curiosity. I keep learning, always.</p>
                </div>

                {loading && (
                    <div className="loading-state">
                        <div className="spinner" />
                        <p>Loading skills...</p>
                    </div>
                )}

                <div className="skills-grid">
                    {skills.map((skill, index) => {
                        const icon = getIcon(skill.iconKey);
                        return (
                            <div
                                key={skill._id}
                                className="skill-card glass-card"
                                style={{ animationDelay: `${index * 0.2}s` }}
                            >
                                {isAdmin && (
                                    <div className="edit-controls">
                                        <button
                                            className="ctrl-btn edit-btn"
                                            onClick={() => { setEditingSkill(skill); setIsNewSkill(false); }}
                                            title="Edit"
                                        ><FaEdit /></button>
                                        <button
                                            className="ctrl-btn delete-btn"
                                            onClick={() => handleDelete(skill)}
                                            title="Delete"
                                        ><FaTrash /></button>
                                    </div>
                                )}

                                <div className="skill-header">
                                    {icon && (
                                        <div className="skill-icon-container">
                                            {Array.isArray(icon) ? (
                                                <div className="icon-group">
                                                    {icon.map((ic, i) => (
                                                        <span key={i} className="skill-icon">{ic}</span>
                                                    ))}
                                                </div>
                                            ) : (
                                                <span className="skill-icon single-icon">{icon}</span>
                                            )}
                                        </div>
                                    )}
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
                                            <div className="progress-glow" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {(editingSkill !== null || isNewSkill) && (
                <SkillEditModal
                    skill={editingSkill}
                    isNew={isNewSkill}
                    onSave={handleSave}
                    onClose={() => { setEditingSkill(null); setIsNewSkill(false); }}
                />
            )}
        </section>
    );
};

export default Skills;
