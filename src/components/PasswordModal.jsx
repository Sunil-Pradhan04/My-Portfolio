import { useState } from 'react';
import { FaTimes, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { api } from '../services/api';
import './PasswordModal.css';

const PasswordModal = ({ onSuccess, onClose, title = 'Enter Edit Password' }) => {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const result = await api.verifyPassword(password);
            if (result.valid) {
                onSuccess(password);
            } else {
                setError('Incorrect password. Please try again.');
            }
        } catch {
            setError('Server error. Please check if the backend is running.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="password-overlay" onClick={onClose}>
            <div className="password-modal" onClick={e => e.stopPropagation()}>
                <button className="close-button" onClick={onClose} aria-label="Close">
                    <FaTimes />
                </button>

                <div className="password-icon">
                    <FaLock />
                </div>
                <h2 className="password-title">{title}</h2>
                <p className="password-subtitle">This action is protected. Enter the admin password to continue.</p>

                <form onSubmit={handleSubmit} className="password-form">
                    <div className="password-input-wrapper">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="Enter password..."
                            className="password-input"
                            autoFocus
                            required
                        />
                        <button
                            type="button"
                            className="toggle-visibility"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>

                    {error && <p className="password-error">{error}</p>}

                    <button
                        type="submit"
                        className="btn btn-primary password-submit"
                        disabled={loading}
                    >
                        {loading ? 'Verifying...' : 'Unlock 🔓'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PasswordModal;
