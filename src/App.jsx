import { useState, useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ProjectDetail from './components/ProjectDetail'
import ChatBot from './components/ChatBot'
import { api } from './services/api'

function App() {
    const [selectedProject, setSelectedProject] = useState(null);
    const [portfolioInfo, setPortfolioInfo] = useState(null);
    const [infoLoading, setInfoLoading] = useState(true);

    // Fetch dynamic portfolio info once
    useEffect(() => {
        api.getInfo()
            .then(data => setPortfolioInfo(data))
            .catch(() => setPortfolioInfo(null))
            .finally(() => setInfoLoading(false));
    }, []);

    const refreshInfo = (updated) => {
        if (updated && updated._id) {
            setPortfolioInfo(updated);
        } else {
            api.getInfo().then(data => setPortfolioInfo(data));
        }
    };

    // Close project detail on escape key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') setSelectedProject(null);
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, []);

    // Prevent body scroll when modal is open
    useEffect(() => {
        document.body.style.overflow = selectedProject ? 'hidden' : 'auto';
    }, [selectedProject]);

    if (infoLoading) {
        return (
            <div style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--bg-primary, #0a0a0f)',
                flexDirection: 'column',
                gap: '1rem'
            }}>
                <div className="spinner" style={{
                    width: 48, height: 48,
                    border: '3px solid rgba(99,102,241,0.2)',
                    borderTopColor: '#6366f1',
                    borderRadius: '50%',
                    animation: 'spin 0.8s linear infinite'
                }} />
                <p style={{ color: '#6366f1', fontFamily: 'sans-serif' }}>Loading portfolio...</p>
            </div>
        );
    }

    return (
        <div className="app">
            <Header info={portfolioInfo} />
            <main>
                <Hero info={portfolioInfo} onInfoUpdate={refreshInfo} />
                <About info={portfolioInfo} onInfoUpdate={refreshInfo} />
                <Skills />
                <Projects onProjectClick={setSelectedProject} />
                <Contact info={portfolioInfo} />
            </main>
            <Footer info={portfolioInfo} onInfoUpdate={refreshInfo} />

            {selectedProject && (
                <ProjectDetail
                    project={selectedProject}
                    onClose={() => setSelectedProject(null)}
                />
            )}

            {/* Floating chatbot — visible on all pages */}
            <ChatBot />
        </div>
    )
}

export default App
