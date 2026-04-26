import { useState, useRef, useEffect } from 'react';
import { FaRobot, FaTimes, FaPaperPlane, FaChevronDown } from 'react-icons/fa';
import './ChatBot.css';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: "👋 Hi! I'm PortfolioBot. Please introduce yourself to start chatting!"
        }
    ]);
    const [visitor, setVisitor] = useState(null);
    const [loginForm, setLoginForm] = useState({ name: '', email: '' });
    const [loginLoading, setLoginLoading] = useState(false);
    const [loginError, setLoginError] = useState('');
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    // Initialize visitor
    useEffect(() => {
        const stored = localStorage.getItem('chatbot_visitor');
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                if (parsed.token) {
                    setVisitor(parsed);
                    setMessages([{
                        role: 'assistant',
                        content: `👋 Welcome back, ${parsed.name}! How can I help you today?`
                    }]);
                }
            } catch (e) {}
        }
    }, []);

    // Auto-scroll to latest message
    useEffect(() => {
        if (isOpen && visitor) {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, isOpen, visitor]);

    // Rotating hint messages
    const [hintIndex, setHintIndex] = useState(0);
    const hints = [
        "Know more about me! 👋",
        "Talk with my AI agent 🤖",
        "How can I help you? ✨"
    ];

    useEffect(() => {
        if (isOpen) return; // Stop rotating if chat is open
        const interval = setInterval(() => {
            setHintIndex(prev => (prev + 1) % hints.length);
        }, 5000); // Change message every 5 seconds
        return () => clearInterval(interval);
    }, [isOpen]);

    // Focus input when chat opens
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [isOpen]);

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!loginForm.name || !loginForm.email) return setLoginError('Please fill all fields');
        
        setLoginLoading(true);
        setLoginError('');

        try {
            const res = await fetch(`${API_BASE}/chatbot/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginForm)
            });
            const data = await res.json();

            if (!res.ok) throw new Error(data.message || 'Login failed');

            const newVisitor = { token: data.token, name: data.visitor.name, email: data.visitor.email };
            localStorage.setItem('chatbot_visitor', JSON.stringify(newVisitor));
            setVisitor(newVisitor);
            
            const msg = data.isNew 
                ? `👋 Welcome to my portfolio, ${newVisitor.name}! I'm PortfolioBot. How can I help you today?`
                : `👋 Welcome back, ${newVisitor.name}! How can I help you today?`;
                
            setMessages([{ role: 'assistant', content: msg }]);
        } catch (err) {
            setLoginError(err.message);
        } finally {
            setLoginLoading(false);
        }
    };

    const sendMessage = async () => {
        const text = input.trim();
        if (!text || loading || !visitor) return;

        const userMsg = { role: 'user', content: text };
        const newMessages = [...messages, userMsg];
        setMessages(newMessages);
        setInput('');
        setLoading(true);

        try {
            // Send only the last 6 messages to save bandwidth, excluding initial greeting
            const history = newMessages.slice(1, -1).slice(-6);

            const res = await fetch(`${API_BASE}/chatbot/chat`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${visitor.token}`
                },
                body: JSON.stringify({ message: text, history })
            });
            
            if (res.status === 401) {
                // Token expired
                localStorage.removeItem('chatbot_visitor');
                setVisitor(null);
                return;
            }
            const data = await res.json();

            setMessages(prev => [
                ...prev,
                { role: 'assistant', content: data.reply || 'Sorry, something went wrong.' }
            ]);
        } catch {
            setMessages(prev => [
                ...prev,
                { role: 'assistant', content: '⚠️ Network error. Please check your connection.' }
            ]);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const clearChat = () => {
        if (!visitor) return;
        setMessages([{
            role: 'assistant',
            content: `👋 Hi ${visitor.name}! I'm PortfolioBot. Ask me anything about Sunil Pradhan!`
        }]);
    };
    
    const handleLogout = () => {
        localStorage.removeItem('chatbot_visitor');
        setVisitor(null);
        setMessages([]);
    };

    return (
        <>
            {/* Hint Bubble (only visible when closed) */}
            {!isOpen && (
                <div key={hintIndex} className="chatbot-hint">
                    {hints[hintIndex]}
                    <div className="chatbot-hint-arrow" />
                </div>
            )}

            {/* Floating button */}
            <button
                className={`chatbot-fab ${isOpen ? 'open' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Open chatbot"
                title="Chat with PortfolioBot"
            >
                {isOpen ? <FaChevronDown /> : <FaRobot />}
                {!isOpen && <span className="fab-pulse" />}
            </button>

            {/* Chat window */}
            {isOpen && (
                <div className="chatbot-window">
                    {/* Header */}
                    <div className="chatbot-header">
                        <div className="chatbot-header-info">
                            <div className="chatbot-avatar">
                                <FaRobot />
                            </div>
                            <div>
                                <p className="chatbot-name">PortfolioBot</p>
                                <p className="chatbot-status">
                                    <span className="status-dot" />
                                    Online
                                </p>
                            </div>
                        </div>
                        <div className="chatbot-header-actions">
                            {visitor && (
                                <button className="chatbot-clear" onClick={clearChat} title="Clear chat">
                                    🗑️
                                </button>
                            )}
                            <button className="chatbot-close" onClick={() => setIsOpen(false)}>
                                <FaTimes />
                            </button>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="chatbot-messages">
                        {messages.map((msg, i) => (
                            <div key={i} className={`chat-bubble ${msg.role}`}>
                                {msg.role === 'assistant' && (
                                    <div className="bubble-avatar"><FaRobot /></div>
                                )}
                                <div className="bubble-content">
                                    <p>{msg.content}</p>
                                </div>
                            </div>
                        ))}

                        {loading && (
                            <div className="chat-bubble assistant">
                                <div className="bubble-avatar"><FaRobot /></div>
                                <div className="bubble-content typing">
                                    <span /><span /><span />
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    {!visitor ? (
                        <div className="chatbot-auth-area">
                            <form onSubmit={handleLogin} className="chatbot-auth-form">
                                <div className="chatbot-auth-inputs">
                                    <input 
                                        type="text" 
                                        placeholder="Your Name" 
                                        value={loginForm.name} 
                                        onChange={e => setLoginForm({...loginForm, name: e.target.value})} 
                                        required 
                                        disabled={loginLoading}
                                    />
                                    <input 
                                        type="email" 
                                        placeholder="Your Email" 
                                        value={loginForm.email} 
                                        onChange={e => setLoginForm({...loginForm, email: e.target.value})} 
                                        required 
                                        disabled={loginLoading}
                                    />
                                </div>
                                <button type="submit" disabled={loginLoading} className="chatbot-send" title="Start Chat">
                                    <FaPaperPlane />
                                </button>
                            </form>
                            {loginError && <p className="chatbot-error-small">{loginError}</p>}
                        </div>
                    ) : (
                        <div className="chatbot-input-area">
                            <textarea
                                ref={inputRef}
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Ask about Sunil"
                                className="chatbot-input"
                                rows={1}
                                maxLength={500}
                                disabled={loading}
                            />
                            <button
                                className="chatbot-send"
                                onClick={sendMessage}
                                disabled={loading || !input.trim()}
                                title="Send message"
                            >
                                <FaPaperPlane />
                            </button>
                        </div>
                    )}

                    <p className="chatbot-footer-note">
                        Answers based on Sunil's knowledge base · May not always be accurate
                    </p>
                </div>
            )}
        </>
    );
};

export default ChatBot;
