export const projectsData = [
    {
        id: 'event',
        name: 'EVENT',
        tagline: 'Full-Stack Event Management System',
        shortDescription: 'Complete event management platform with role-based authentication, AI-powered recommendations, and real-time notifications.',
        fullDescription: `EVENT is a comprehensive full-stack event management system designed to streamline event organization and participation. The platform features role-based authentication supporting both Students and Teachers, allowing admins to create and manage events while users can discover and register for events that match their interests.

The system includes advanced AI-powered features using OpenAI and Pinecone vector database to provide intelligent event recommendations based on user preferences and past interactions. With a secure JWT-based authentication system, email verification workflow, and password reset functionality, the platform ensures both security and user convenience.

Built with a modern tech stack and deployed on Vercel, EVENT demonstrates proficiency in full-stack development, database design, API integration, and cloud deployment.`,
        techStack: {
            frontend: ['React.js', 'Redux Toolkit', 'React Router', 'React Icons', 'Vite'],
            backend: ['Node.js', 'Express.js', 'MongoDB', 'Mongoose'],
            authentication: ['JWT', 'bcryptjs', 'express-session', 'cookie-parser'],
            ai: ['OpenAI API', 'Pinecone Vector Database'],
            email: ['Nodemailer'],
            deployment: ['Vercel']
        },
        features: [
            'Role-based authentication (Student & Teacher roles)',
            'Email verification system for new users',
            'Secure password reset flow with email verification',
            'Event CRUD operations for admins/teachers',
            'Event registration and management for students',
            'AI-powered event recommendations using OpenAI',
            'Vector similarity search with Pinecone database',
            'Real-time session management with JWT',
            'Responsive design for all devices',
            'Toast notifications for user feedback',
            'Protected routes with authentication middleware',
            'RESTful API architecture with 20+ endpoints'
        ],
        challenges: [
            'Implementing secure JWT-based authentication with refresh tokens',
            'Integrating AI recommendations using vector embeddings',
            'Managing complex state with Redux Toolkit',
            'Handling email verification workflows',
            'Optimizing database queries for event filtering'
        ],
        liveUrl: 'https://event-management-frontend-eqe7.vercel.app/',
        githubUrl: 'https://github.com/Sunil-Pradhan04/EventManagement-Frontend',
        category: 'Full Stack',
        color: 'from-blue-500 to-purple-600',
        icon: '🎯'
    },
    {
        id: 'vistora',
        name: 'VISTORA',
        tagline: 'Modern Social Media Platform',
        shortDescription: 'Feature-rich social media application with video sharing, photo galleries, and real-time content discovery.',
        fullDescription: `VISTORA is a modern social media platform that brings together content sharing, discovery, and user interaction in a sleek, intuitive interface. The platform supports multiple content types including traditional posts, short-form videos (similar to Instagram Reels/YouTube Shorts), and photo galleries.

Built with React and Bootstrap, VISTORA features a responsive design that works seamlessly across devices. Users can explore content through a dynamic home feed, watch engaging short videos, browse photo galleries, manage their profiles, and discover new content through an intelligent search system.

The application demonstrates strong frontend development skills, effective state management using React Context API, and modern UI/UX design principles. Deployed on GitHub Pages, VISTORA showcases the ability to create engaging, user-friendly social platforms.`,
        techStack: {
            frontend: ['React.js', 'React Router', 'Bootstrap 5', 'React Icons', 'Vite'],
            stateManagement: ['React Context API'],
            deployment: ['GitHub Pages']
        },
        features: [
            'Dynamic home feed with post rendering',
            'Short-form video player (Shorts) with swipe navigation',
            'Photo gallery with grid layout',
            'User profile management',
            'Search functionality for content discovery',
            'Responsive sidebar navigation',
            'Content sharing and interaction',
            'Smooth page transitions',
            'Mobile-first responsive design',
            'Clean and modern UI/UX',
            'Fast loading with optimized assets'
        ],
        challenges: [
            'Implementing smooth video playback for shorts',
            'Managing global state with Context API',
            'Creating responsive layouts for different content types',
            'Optimizing performance for image-heavy pages',
            'Designing intuitive navigation patterns'
        ],
        liveUrl: 'https://Sunil-Pradhan04.github.io/VISTORA',
        githubUrl: 'https://github.com/Sunil-Pradhan04/VISTORA',
        category: 'Frontend',
        color: 'from-pink-500 to-orange-500',
        icon: '📱'
    }
];
