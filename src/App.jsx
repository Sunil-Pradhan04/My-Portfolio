import { useState, useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ProjectDetail from './components/ProjectDetail'

function App() {
    const [selectedProject, setSelectedProject] = useState(null);

    // Close project detail on escape key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                setSelectedProject(null);
            }
        };

        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, []);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (selectedProject) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [selectedProject]);

    return (
        <div className="app">
            <Header />
            <main>
                <Hero />
                <About />
                <Skills />
                <Projects onProjectClick={setSelectedProject} />
                <Contact />
            </main>
            <Footer />

            {selectedProject && (
                <ProjectDetail
                    project={selectedProject}
                    onClose={() => setSelectedProject(null)}
                />
            )}
        </div>
    )
}

export default App
