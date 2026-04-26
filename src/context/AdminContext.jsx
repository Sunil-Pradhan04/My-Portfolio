import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { api, tokenStorage } from '../services/api';

const AdminContext = createContext(null);

export const AdminProvider = ({ children }) => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [checking, setChecking] = useState(true);

    // On mount: validate existing token
    useEffect(() => {
        const validate = async () => {
            const valid = await tokenStorage.isValid();
            setIsAdmin(valid);
            if (!valid) tokenStorage.remove();
            setChecking(false);
        };
        validate();
    }, []);

    // Login: call backend, store token
    const login = useCallback(async (password) => {
        const result = await api.login(password);
        if (result.success && result.token) {
            tokenStorage.set(result.token);
            setIsAdmin(true);
            return { success: true };
        }
        return { success: false, message: result.message || 'Incorrect password' };
    }, []);

    // Logout: clear token
    const logout = useCallback(() => {
        tokenStorage.remove();
        setIsAdmin(false);
    }, []);

    return (
        <AdminContext.Provider value={{ isAdmin, checking, login, logout }}>
            {children}
        </AdminContext.Provider>
    );
};

export const useAdmin = () => {
    const ctx = useContext(AdminContext);
    if (!ctx) throw new Error('useAdmin must be used inside AdminProvider');
    return ctx;
};
