import { useState, useEffect } from 'react';
import { FaTimes, FaPlus, FaTrash } from 'react-icons/fa';
import { api } from '../services/api';
import './InfoEditModal.css';

const InfoEditModal = ({ info, onSave, onClose }) => {
    const [form, setForm] = useState({});
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (info) {
            setForm({
                name: info.name || '',
                greeting: info.greeting || "Hi, I'm",
                roles: info.roles || [],
                rolePrefix: info.rolePrefix || 'Creative',
                heroTagline: info.heroTagline || '',
                aboutHeading: info.aboutHeading || '',
                aboutPara1: info.aboutPara1 || '',
                aboutPara2: info.aboutPara2 || '',
                email: info.email || '',
                location: info.location || '',
                locationMapUrl: info.locationMapUrl || '',
                githubUrl: info.githubUrl || '',
                linkedinUrl: info.linkedinUrl || '',
                footerTagline: info.footerTagline || ''
            });
        }
    }, [info]);

    const set = (field, val) => setForm(prev => ({ ...prev, [field]: val }));

    const handleRoleChange = (i, val) => {
        const r = [...form.roles];
        r[i] = val;
        set('roles', r);
    };
    const addRole = () => set('roles', [...(form.roles || []), '']);
    const removeRole = (i) => set('roles', form.roles.filter((_, idx) => idx !== i));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError('');
        try {
            const cleaned = { ...form, roles: form.roles.filter(r => r.trim()) };
            const result = await api.updateInfo(cleaned);
            if (result._id) {
                onSave(result);
            } else {
                setError(result.message || 'Save failed');
            }
        } catch {
            setError('Network error. Please try again.');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="info-edit-overlay" onClick={onClose}>
            <div className="info-edit-modal" onClick={e => e.stopPropagation()}>
                <button className="close-button" onClick={onClose}><FaTimes /></button>
                <h2 className="edit-modal-title">✏️ Edit Portfolio Info</h2>

                <form onSubmit={handleSubmit} className="edit-form">
                    {/* ── Hero Section ── */}
                    <div className="info-section-label">🦸 Hero Section</div>

                    <div className="edit-grid-2">
                        <div className="form-group">
                            <label>Your Name *</label>
                            <input value={form.name || ''} onChange={e => set('name', e.target.value)} required placeholder="Sunil Pradhan" />
                        </div>
                        <div className="form-group">
                            <label>Greeting</label>
                            <input value={form.greeting || ''} onChange={e => set('greeting', e.target.value)} placeholder="Hi, I'm" />
                        </div>
                    </div>

                    <div className="edit-grid-2">
                        <div className="form-group">
                            <label>Role Prefix</label>
                            <input value={form.rolePrefix || ''} onChange={e => set('rolePrefix', e.target.value)} placeholder="Creative" />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Typing Roles (animated text)</label>
                        {(form.roles || []).map((r, i) => (
                            <div key={i} className="list-row" style={{ marginBottom: '0.4rem' }}>
                                <input value={r} onChange={e => handleRoleChange(i, e.target.value)} placeholder={`Role ${i + 1}`} />
                                <button type="button" className="remove-btn" onClick={() => removeRole(i)}><FaTrash /></button>
                            </div>
                        ))}
                        <button type="button" className="add-list-btn" onClick={addRole}>
                            <FaPlus /> Add Role
                        </button>
                    </div>

                    <div className="form-group">
                        <label>Hero Tagline / Description</label>
                        <textarea value={form.heroTagline || ''} onChange={e => set('heroTagline', e.target.value)} rows={3} placeholder="Curious mind. Creative Code..." />
                    </div>

                    {/* ── About Section ── */}
                    <div className="info-section-label">👤 About Section</div>

                    <div className="form-group">
                        <label>About Heading</label>
                        <input value={form.aboutHeading || ''} onChange={e => set('aboutHeading', e.target.value)} placeholder="Who am I?" />
                    </div>
                    <div className="form-group">
                        <label>About Paragraph 1 (supports &lt;strong&gt; tags)</label>
                        <textarea value={form.aboutPara1 || ''} onChange={e => set('aboutPara1', e.target.value)} rows={4} />
                    </div>
                    <div className="form-group">
                        <label>About Paragraph 2</label>
                        <textarea value={form.aboutPara2 || ''} onChange={e => set('aboutPara2', e.target.value)} rows={4} />
                    </div>

                    {/* ── Contact & Social ── */}
                    <div className="info-section-label">📞 Contact & Social</div>

                    <div className="edit-grid-2">
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" value={form.email || ''} onChange={e => set('email', e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Location</label>
                            <input value={form.location || ''} onChange={e => set('location', e.target.value)} placeholder="Odisha, India" />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Location Map URL</label>
                        <input type="url" value={form.locationMapUrl || ''} onChange={e => set('locationMapUrl', e.target.value)} placeholder="https://maps.app.goo.gl/..." />
                    </div>

                    <div className="edit-grid-2">
                        <div className="form-group">
                            <label>GitHub URL</label>
                            <input type="url" value={form.githubUrl || ''} onChange={e => set('githubUrl', e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>LinkedIn URL</label>
                            <input type="url" value={form.linkedinUrl || ''} onChange={e => set('linkedinUrl', e.target.value)} />
                        </div>
                    </div>

                    {/* ── Footer ── */}
                    <div className="info-section-label">🦶 Footer</div>
                    <div className="form-group">
                        <label>Footer Tagline</label>
                        <input value={form.footerTagline || ''} onChange={e => set('footerTagline', e.target.value)} placeholder="Building meaningful things..." />
                    </div>

                    {error && <p className="save-error">{error}</p>}

                    <div className="edit-actions">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
                        <button type="submit" className="btn btn-primary" disabled={saving}>
                            {saving ? 'Saving...' : '💾 Save All Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default InfoEditModal;
