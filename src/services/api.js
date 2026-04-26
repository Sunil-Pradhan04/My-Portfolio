// Central API service for the portfolio backend
const API_BASE = '/api';

// ── Token helpers ────────────────────────────────────────────
export const tokenStorage = {
    get: () => localStorage.getItem('portfolio_admin_token'),
    set: (t) => localStorage.setItem('portfolio_admin_token', t),
    remove: () => localStorage.removeItem('portfolio_admin_token'),
    isValid: async () => {
        const token = localStorage.getItem('portfolio_admin_token');
        if (!token) return false;
        try {
            const res = await fetch(`${API_BASE}/auth/verify`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token })
            });
            const data = await res.json();
            return data.valid === true;
        } catch {
            return false;
        }
    }
};

const authHeader = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${tokenStorage.get()}`
});

export const api = {
    // ── Auth ─────────────────────────────────────────────────
    login: (password) =>
        fetch(`${API_BASE}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password })
        }).then(r => r.json()),

    verifyToken: (token) =>
        fetch(`${API_BASE}/auth/verify`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token })
        }).then(r => r.json()),

    // ── Portfolio Info ────────────────────────────────────────
    getInfo: () => fetch(`${API_BASE}/info`).then(r => r.json()),
    updateInfo: (data) =>
        fetch(`${API_BASE}/info`, {
            method: 'PUT',
            headers: authHeader(),
            body: JSON.stringify(data)
        }).then(r => r.json()),

    // ── Projects ─────────────────────────────────────────────
    getProjects: () => fetch(`${API_BASE}/projects`).then(r => r.json()),
    getProject: (id) => fetch(`${API_BASE}/projects/${id}`).then(r => r.json()),
    createProject: (data) =>
        fetch(`${API_BASE}/projects`, {
            method: 'POST',
            headers: authHeader(),
            body: JSON.stringify(data)
        }).then(r => r.json()),
    updateProject: (id, data) =>
        fetch(`${API_BASE}/projects/${id}`, {
            method: 'PUT',
            headers: authHeader(),
            body: JSON.stringify(data)
        }).then(r => r.json()),
    deleteProject: (id) =>
        fetch(`${API_BASE}/projects/${id}`, {
            method: 'DELETE',
            headers: authHeader()
        }).then(r => r.json()),

    // ── Skills ───────────────────────────────────────────────
    getSkills: () => fetch(`${API_BASE}/skills`).then(r => r.json()),
    createSkill: (data) =>
        fetch(`${API_BASE}/skills`, {
            method: 'POST',
            headers: authHeader(),
            body: JSON.stringify(data)
        }).then(r => r.json()),
    updateSkill: (id, data) =>
        fetch(`${API_BASE}/skills/${id}`, {
            method: 'PUT',
            headers: authHeader(),
            body: JSON.stringify(data)
        }).then(r => r.json()),
    deleteSkill: (id) =>
        fetch(`${API_BASE}/skills/${id}`, {
            method: 'DELETE',
            headers: authHeader()
        }).then(r => r.json()),

    // ── Contact ──────────────────────────────────────────────
    sendContact: (data) =>
        fetch(`${API_BASE}/contact`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }).then(r => r.json()),
};
