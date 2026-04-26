import { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import './SkillEditModal.css';

const ICON_KEYS = ['mern', 'react', 'node', 'mongo', 'ai', 'mobile', 'custom'];
const COLOR_OPTIONS = ['blue', 'purple', 'pink', 'green', 'orange', 'cyan'];

const emptySkill = {
    name: '',
    percentage: 50,
    color: 'blue',
    details: '',
    badge: '',
    iconKey: 'mern',
    order: 0
};

const SkillEditModal = ({ skill, onSave, onClose, isNew = false }) => {
    const [form, setForm] = useState(emptySkill);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (skill) {
            setForm({ ...emptySkill, ...skill });
        }
    }, [skill]);

    const handleChange = (field, value) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        await onSave(form);
        setSaving(false);
    };

    return (
        <div className="skill-edit-overlay" onClick={onClose}>
            <div className="skill-edit-modal" onClick={e => e.stopPropagation()}>
                <button className="close-button" onClick={onClose}>
                    <FaTimes />
                </button>

                <h2 className="edit-modal-title">
                    {isNew ? '➕ Add New Skill' : `✏️ Edit — ${form.name || 'Skill'}`}
                </h2>

                <form onSubmit={handleSubmit} className="edit-form">
                    <div className="edit-grid-2">
                        <div className="form-group">
                            <label>Skill Name *</label>
                            <input
                                value={form.name}
                                onChange={e => handleChange('name', e.target.value)}
                                placeholder="e.g. MERN Stack"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Proficiency % *</label>
                            <input
                                type="number"
                                value={form.percentage}
                                onChange={e => handleChange('percentage', Math.min(100, Math.max(0, Number(e.target.value))))}
                                min="0"
                                max="100"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Details *</label>
                        <input
                            value={form.details}
                            onChange={e => handleChange('details', e.target.value)}
                            placeholder="e.g. MongoDB, Express.js, React.js, Node.js"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Progress Bar Color</label>
                        <div className="color-options">
                            {COLOR_OPTIONS.map(c => (
                                <button
                                    type="button"
                                    key={c}
                                    className={`color-btn color-${c} ${form.color === c ? 'selected' : ''}`}
                                    onClick={() => handleChange('color', c)}
                                    title={c}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Icon Type</label>
                        <select value={form.iconKey} onChange={e => handleChange('iconKey', e.target.value)}>
                            {ICON_KEYS.map(k => (
                                <option key={k} value={k}>{k}</option>
                            ))}
                        </select>
                        <p className="field-hint">
                            mern = MERN icons group · react = React icon · node = Node.js · ai = 🤖 · mobile = 📱 · custom = no icon
                        </p>
                    </div>

                    <div className="edit-grid-2">
                        <div className="form-group">
                            <label>Badge (optional)</label>
                            <input
                                value={form.badge}
                                onChange={e => handleChange('badge', e.target.value)}
                                placeholder="e.g. Beginner, Expert"
                            />
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

                    {/* Live preview */}
                    <div className="skill-preview">
                        <p className="preview-label">Preview</p>
                        <div className="preview-bar-row">
                            <span className="preview-name">{form.name || 'Skill Name'}</span>
                            <span className="preview-pct">{form.percentage}%</span>
                        </div>
                        <div className="preview-bar">
                            <div
                                className={`preview-fill progress-${form.color}`}
                                style={{ width: `${form.percentage}%` }}
                            />
                        </div>
                    </div>

                    <div className="edit-actions">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
                        <button type="submit" className="btn btn-primary" disabled={saving}>
                            {saving ? 'Saving...' : isNew ? '✅ Add Skill' : '💾 Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SkillEditModal;
