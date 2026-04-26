import { useState, useEffect } from 'react';
import { FaTimes, FaPlus, FaTrash } from 'react-icons/fa';
import './ProjectEditModal.css';

const emptyProject = {
    name: '',
    tagline: '',
    shortDescription: '',
    fullDescription: '',
    techStack: { frontend: [], backend: [] },
    features: [''],
    challenges: [''],
    liveUrl: '',
    githubUrl: '',
    category: 'Full Stack',
    icon: '🚀',
    order: 0
};

const ProjectEditModal = ({ project, onSave, onClose, isNew = false }) => {
    const [form, setForm] = useState(emptyProject);
    const [techInput, setTechInput] = useState({ frontend: '', backend: '', other: '' });
    const [customTechCategory, setCustomTechCategory] = useState('');
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (project) {
            setForm({ ...emptyProject, ...project });
        }
    }, [project]);

    const handleChange = (field, value) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

    // Features / Challenges list helpers
    const handleListChange = (field, index, value) => {
        const list = [...form[field]];
        list[index] = value;
        setForm(prev => ({ ...prev, [field]: list }));
    };
    const addListItem = (field) => setForm(prev => ({ ...prev, [field]: [...prev[field], ''] }));
    const removeListItem = (field, index) => {
        const list = form[field].filter((_, i) => i !== index);
        setForm(prev => ({ ...prev, [field]: list.length ? list : [''] }));
    };

    // Tech stack helpers
    const addTech = (category) => {
        const val = (techInput[category] || '').trim();
        if (!val) return;
        const existing = form.techStack[category] || [];
        setForm(prev => ({
            ...prev,
            techStack: { ...prev.techStack, [category]: [...existing, val] }
        }));
        setTechInput(prev => ({ ...prev, [category]: '' }));
    };
    const removeTech = (category, idx) => {
        const arr = (form.techStack[category] || []).filter((_, i) => i !== idx);
        setForm(prev => ({
            ...prev,
            techStack: { ...prev.techStack, [category]: arr }
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        // Clean empty strings from arrays
        const cleaned = {
            ...form,
            features: form.features.filter(f => f.trim()),
            challenges: form.challenges.filter(c => c.trim())
        };
        await onSave(cleaned);
        setSaving(false);
    };

    const allTechCategories = Object.keys(form.techStack);

    return (
        <div className="edit-overlay" onClick={onClose}>
            <div className="edit-modal" onClick={e => e.stopPropagation()}>
                <button className="close-button" onClick={onClose}>
                    <FaTimes />
                </button>

                <h2 className="edit-modal-title">
                    {isNew ? '➕ Add New Project' : `✏️ Edit — ${form.name || 'Project'}`}
                </h2>

                <form onSubmit={handleSubmit} className="edit-form">
                    <div className="edit-grid-2">
                        <div className="form-group">
                            <label>Project Name *</label>
                            <input
                                value={form.name}
                                onChange={e => handleChange('name', e.target.value)}
                                placeholder="e.g. MY PROJECT"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Icon (emoji)</label>
                            <input
                                value={form.icon}
                                onChange={e => handleChange('icon', e.target.value)}
                                placeholder="🚀"
                                maxLength={4}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Tagline *</label>
                        <input
                            value={form.tagline}
                            onChange={e => handleChange('tagline', e.target.value)}
                            placeholder="Short one-line description"
                            required
                        />
                    </div>

                    <div className="edit-grid-2">
                        <div className="form-group">
                            <label>Category</label>
                            <select value={form.category} onChange={e => handleChange('category', e.target.value)}>
                                <option>Full Stack</option>
                                <option>Frontend</option>
                                <option>Backend</option>
                                <option>Mobile</option>
                                <option>AI/ML</option>
                                <option>Other</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Display Order</label>
                            <input
                                type="number"
                                value={form.order}
                                onChange={e => handleChange('order', Number(e.target.value))}
                                min="0"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Short Description *</label>
                        <textarea
                            value={form.shortDescription}
                            onChange={e => handleChange('shortDescription', e.target.value)}
                            rows={3}
                            placeholder="Brief summary shown on project cards"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Full Description *</label>
                        <textarea
                            value={form.fullDescription}
                            onChange={e => handleChange('fullDescription', e.target.value)}
                            rows={6}
                            placeholder="Detailed description shown in modal"
                            required
                        />
                    </div>

                    {/* Tech Stack */}
                    <div className="form-group">
                        <label>Tech Stack</label>
                        {allTechCategories.map(cat => (
                            <div key={cat} className="tech-category-editor">
                                <p className="tech-cat-label">{cat}</p>
                                <div className="tech-tags">
                                    {(form.techStack[cat] || []).map((t, i) => (
                                        <span key={i} className="tech-tag-edit">
                                            {t}
                                            <button type="button" onClick={() => removeTech(cat, i)}>
                                                <FaTimes />
                                            </button>
                                        </span>
                                    ))}
                                </div>
                                <div className="tech-add-row">
                                    <input
                                        value={techInput[cat] || ''}
                                        onChange={e => setTechInput(prev => ({ ...prev, [cat]: e.target.value }))}
                                        onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTech(cat))}
                                        placeholder={`Add ${cat} tech…`}
                                    />
                                    <button type="button" className="add-btn" onClick={() => addTech(cat)}>
                                        <FaPlus />
                                    </button>
                                </div>
                            </div>
                        ))}
                        {/* Add custom category */}
                        <div className="tech-add-row" style={{ marginTop: '0.75rem' }}>
                            <input
                                value={customTechCategory}
                                onChange={e => setCustomTechCategory(e.target.value)}
                                placeholder="New category name (e.g. ai, devops)…"
                            />
                            <button
                                type="button"
                                className="add-btn"
                                onClick={() => {
                                    const cat = customTechCategory.trim().toLowerCase();
                                    if (cat && !form.techStack[cat]) {
                                        setForm(prev => ({ ...prev, techStack: { ...prev.techStack, [cat]: [] } }));
                                        setCustomTechCategory('');
                                    }
                                }}
                            >
                                + Category
                            </button>
                        </div>
                    </div>

                    {/* Features */}
                    <div className="form-group">
                        <label>Key Features</label>
                        {form.features.map((f, i) => (
                            <div key={i} className="list-row">
                                <input
                                    value={f}
                                    onChange={e => handleListChange('features', i, e.target.value)}
                                    placeholder={`Feature ${i + 1}`}
                                />
                                <button type="button" className="remove-btn" onClick={() => removeListItem('features', i)}>
                                    <FaTrash />
                                </button>
                            </div>
                        ))}
                        <button type="button" className="add-list-btn" onClick={() => addListItem('features')}>
                            <FaPlus /> Add Feature
                        </button>
                    </div>

                    {/* Challenges */}
                    <div className="form-group">
                        <label>Challenges & Solutions</label>
                        {form.challenges.map((c, i) => (
                            <div key={i} className="list-row">
                                <input
                                    value={c}
                                    onChange={e => handleListChange('challenges', i, e.target.value)}
                                    placeholder={`Challenge ${i + 1}`}
                                />
                                <button type="button" className="remove-btn" onClick={() => removeListItem('challenges', i)}>
                                    <FaTrash />
                                </button>
                            </div>
                        ))}
                        <button type="button" className="add-list-btn" onClick={() => addListItem('challenges')}>
                            <FaPlus /> Add Challenge
                        </button>
                    </div>

                    <div className="edit-grid-2">
                        <div className="form-group">
                            <label>Live URL</label>
                            <input
                                type="url"
                                value={form.liveUrl}
                                onChange={e => handleChange('liveUrl', e.target.value)}
                                placeholder="https://..."
                            />
                        </div>
                        <div className="form-group">
                            <label>GitHub URL</label>
                            <input
                                type="url"
                                value={form.githubUrl}
                                onChange={e => handleChange('githubUrl', e.target.value)}
                                placeholder="https://github.com/..."
                            />
                        </div>
                    </div>

                    <div className="edit-actions">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-primary" disabled={saving}>
                            {saving ? 'Saving...' : isNew ? '✅ Add Project' : '💾 Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProjectEditModal;
