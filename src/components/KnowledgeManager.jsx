import { useState } from 'react';
import { FaTimes, FaBrain, FaTrash, FaPlus } from 'react-icons/fa';
import { tokenStorage } from '../services/api';
import './KnowledgeManager.css';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';

const SECTIONS = [
    { value: 'about', label: '👤 About Me', placeholder: "Write about yourself — who you are, your background, education, what you're passionate about..." },
    { value: 'skills', label: '💡 Skills', placeholder: 'List your skills and proficiency levels. Include details about technologies you know...' },
    { value: 'projects', label: '🚀 Projects', placeholder: 'Describe your projects — what they do, the tech stack used, challenges solved...' },
    { value: 'experience', label: '💼 Experience', placeholder: 'Work experience, internships, freelance work, contributions...' },
    { value: 'education', label: '🎓 Education', placeholder: 'Your educational background, courses, certifications...' },
    { value: 'contact', label: '📞 Contact Info', placeholder: 'How people can reach you, your availability, preferred contact methods...' },
    { value: 'general', label: '📝 General', placeholder: 'Any other information about you that should be in the chatbot knowledge base...' },
];

const KnowledgeManager = ({ onClose }) => {
    const [section, setSection] = useState('about');
    const [text, setText] = useState('');
    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState('');
    const [result, setResult] = useState(null); // { type: 'success'|'error', message }

    const selectedSection = SECTIONS.find(s => s.value === section);

    const handleStore = async () => {
        if (!text.trim() || text.trim().length < 10) {
            setResult({ type: 'error', message: 'Please enter at least 10 characters of text.' });
            return;
        }
        setSaving(true);
        setResult(null);
        try {
            const res = await fetch(`${API_BASE}/chatbot/knowledge`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${tokenStorage.get()}`
                },
                body: JSON.stringify({ text: text.trim(), section })
            });
            const data = await res.json();
            if (res.ok) {
                setResult({ type: 'success', message: `✅ ${data.message} (${data.chunks} chunks stored)` });
                setText('');
            } else {
                setResult({ type: 'error', message: data.message || 'Failed to store knowledge.' });
            }
        } catch {
            setResult({ type: 'error', message: 'Network error. Is the backend running?' });
        } finally {
            setSaving(false);
        }
    };

    const handleDeleteSection = async (sec) => {
        if (!window.confirm(`Delete ALL knowledge for section "${sec}"? This cannot be undone.`)) return;
        setDeleting(sec);
        setResult(null);
        try {
            const res = await fetch(`${API_BASE}/chatbot/knowledge/${sec}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${tokenStorage.get()}` }
            });
            const data = await res.json();
            setResult({ type: res.ok ? 'success' : 'error', message: data.message });
        } catch {
            setResult({ type: 'error', message: 'Network error.' });
        } finally {
            setDeleting('');
        }
    };

    const handleDeleteAll = async () => {
        if (!window.confirm('⚠️ Wipe ALL portfolio knowledge from Pinecone? The chatbot will have no context until you re-add information.')) return;
        setDeleting('all');
        setResult(null);
        try {
            const res = await fetch(`${API_BASE}/chatbot/knowledge`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${tokenStorage.get()}` }
            });
            const data = await res.json();
            setResult({ type: res.ok ? 'success' : 'error', message: data.message });
        } catch {
            setResult({ type: 'error', message: 'Network error.' });
        } finally {
            setDeleting('');
        }
    };

    return (
        <div className="km-overlay" onClick={onClose}>
            <div className="km-modal" onClick={e => e.stopPropagation()}>
                <button className="close-button" onClick={onClose}><FaTimes /></button>

                <div className="km-header">
                    <div className="km-icon"><FaBrain /></div>
                    <h2 className="km-title">Chatbot Knowledge Manager</h2>
                    <p className="km-subtitle">
                        Add information about yourself to the Pinecone vector database. The chatbot uses this to answer visitor questions.
                    </p>
                </div>

                {/* Section selector */}
                <div className="km-section-tabs">
                    {SECTIONS.map(s => (
                        <button
                            key={s.value}
                            className={`km-tab ${section === s.value ? 'active' : ''}`}
                            onClick={() => { setSection(s.value); setResult(null); }}
                        >
                            {s.label}
                        </button>
                    ))}
                </div>

                {/* Text input */}
                <div className="km-input-group">
                    <div className="km-input-header">
                        <label className="km-label">Knowledge for: <strong>{selectedSection?.label}</strong></label>
                        <button
                            className="km-delete-section"
                            onClick={() => handleDeleteSection(section)}
                            disabled={!!deleting}
                            title={`Clear "${section}" section from Pinecone`}
                        >
                            {deleting === section ? 'Clearing...' : <><FaTrash /> Clear section</>}
                        </button>
                    </div>
                    <textarea
                        className="km-textarea"
                        value={text}
                        onChange={e => setText(e.target.value)}
                        placeholder={selectedSection?.placeholder}
                        rows={8}
                    />
                    <div className="km-char-count">{text.length} characters</div>
                </div>

                {/* How it works */}
                <div className="km-info-box">
                    <strong>How it works:</strong> Your text is split into ~30-word chunks → embedded with OpenAI → stored in Pinecone. When a visitor asks a question, the 2 most relevant chunks are retrieved and given to GPT-4.1-mini to answer.
                </div>

                {/* Result message */}
                {result && (
                    <div className={`km-result ${result.type}`}>
                        {result.message}
                    </div>
                )}

                {/* Actions */}
                <div className="km-actions">
                    <button
                        className="km-danger-btn"
                        onClick={handleDeleteAll}
                        disabled={!!deleting}
                    >
                        {deleting === 'all' ? 'Wiping...' : '🗑️ Wipe All'}
                    </button>

                    <div style={{ flex: 1 }} />

                    <button className="btn btn-secondary" onClick={onClose}>
                        Close
                    </button>
                    <button
                        className="btn btn-primary"
                        onClick={handleStore}
                        disabled={saving || !text.trim()}
                    >
                        {saving ? '⏳ Storing...' : <><FaPlus /> Store in Pinecone</>}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default KnowledgeManager;
