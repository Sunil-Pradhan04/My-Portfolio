import { useState } from 'react';
import { FaTimes, FaLock, FaEye, FaEyeSlash, FaShieldAlt } from 'react-icons/fa';
import { useAdmin } from '../context/AdminContext';
import './AdminLoginModal.css';

const AdminLoginModal = ({ onClose, onSuccess }) => {
    const { login } = useAdmin();
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const result = await login(password);
            if (result.success) {
                setSuccess(true);
                setTimeout(() => {
                    onSuccess?.();
                }, 1200);
            } else {
                setError(result.message || 'Incorrect password. Try again.');
            }
        } catch {
            setError('Server error. Please check if the backend is running.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-login-overlay" onClick={onClose}>
            <div className="admin-login-modal" onClick={e => e.stopPropagation()}>
                <button className="close-button" onClick={onClose} aria-label="Close">
                    <FaTimes />
                </button>

                {success ? (
                    <div className="login-success">
                        <div className="success-icon">🔓</div>
                        <h2>Welcome back, Sunil!</h2>
                        <p>Admin access granted for 15 days.</p>
                    </div>
                ) : (
                    <>
                        <div className="admin-login-header">
                            <div className="admin-shield">
                                <FaShieldAlt />
                            </div>
                            <h2 className="admin-login-title">Admin Access</h2>
                            <div className="only-for-sunil">
                                <span className="sunil-badge">🔒 Only for Sunil</span>
                                <p>This area is restricted. Only Sunil Pradhan can access the admin panel to edit portfolio content.</p>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="admin-login-form">
                            <div className="password-input-wrapper">
                                <FaLock className="input-icon" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    placeholder="Enter admin password..."
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

                            {error && <p className="login-error">⚠️ {error}</p>}

                            <button
                                type="submit"
                                className="btn btn-primary login-submit"
                                disabled={loading || !password}
                            >
                                {loading ? '⏳ Verifying...' : '🔓 Get Access'}
                            </button>
                        </form>

                        <p className="session-info">
                            ✅ Session lasts <strong>15 days</strong> — no need to log in again
                        </p>
                    </>
                )}
            </div>
        </div>
    );
};

export default AdminLoginModal;
