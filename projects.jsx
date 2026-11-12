/**
 * Projects.jsx - Modern React Component for Portfolio Projects
 */
import React, { useState } from 'react';

export const projectsData = [
    {
        id: "phishing-detector",
        title: "Phishing URL Detection System using Novel ML Fusion Architecture",
        category: "aiml",
        categoryLabel: "AI/ML & Security",
        stack: ["Python", "Scikit-Learn", "FastAPI", "React", "Random Forest", "SVM", "PyTorch"],
        desc: "Automated cybersecurity pipeline extracting 30+ lexical, host-based, and domain heuristic features to detect zero-day phishing attack vectors with <150ms classification speeds.",
        metrics: "95%+ Accuracy · <150ms Latency · 30+ Features",
        githubUrl: "https://github.com/cherycharan20-creator"
    },
    {
        id: "omnichat-ai",
        title: "OmniChat AI Assistant — Context-Aware Conversational System",
        category: "aiml",
        categoryLabel: "AI/ML & NLP",
        stack: ["Python", "LangChain", "FastAPI", "React.js", "Tailwind CSS", "WebSockets"],
        desc: "Intelligent conversational assistant featuring context-aware memory buffers, multi-turn reasoning, and high-throughput streaming responses.",
        metrics: "WebSocket Streaming · Multi-turn Memory",
        githubUrl: "https://github.com/cherycharan20-creator"
    },
    {
        id: "enterprise-microservices",
        title: "Scalable Full Stack E-Commerce & REST API Architecture",
        category: "fullstack",
        categoryLabel: "Full Stack",
        stack: ["Django", "FastAPI", "PostgreSQL", "React.js", "Docker", "JWT"],
        desc: "High-performance modular REST API platform with JWT authentication, role-based access control (RBAC), and query-optimized PostgreSQL storage.",
        metrics: "PostgreSQL · Docker · JWT Auth",
        githubUrl: "https://github.com/cherycharan20-creator"
    },
    {
        id: "ml-latency-optimizer",
        title: "High-Dimensional ML Feature Optimization & Pipeline Accelerator",
        category: "aiml",
        categoryLabel: "AI/ML Optimization",
        stack: ["Python", "NumPy", "Pandas", "Scikit-Learn", "PCA"],
        desc: "Diagnostics and algorithmic optimization of high-dimensional feature matrices, cutting training compute latency and inference overhead by ~25%.",
        metrics: "~25% Latency Reduction · Vectorized Ops",
        githubUrl: "https://github.com/cherycharan20-creator"
    }
];

export default function ProjectsList() {
    const [filter, setFilter] = useState('all');

    const filteredProjects = filter === 'all'
        ? projectsData
        : projectsData.filter(p => p.category === filter);

    return (
        <section className="py-12 max-w-7xl mx-auto px-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <div>
                    <h2 className="text-3xl font-extrabold text-white">Engineered Projects</h2>
                    <p className="text-sm text-slate-400 mt-1">High-impact machine learning and full stack systems</p>
                </div>
                
                {/* Filter Tabs */}
                <div className="flex gap-2">
                    <button
                        onClick={() => setFilter('all')}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
                            filter === 'all' ? 'bg-cyan-600 text-white' : 'bg-slate-900 text-slate-400 hover:text-white'
                        }`}
                    >
                        All
                    </button>
                    <button
                        onClick={() => setFilter('aiml')}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
                            filter === 'aiml' ? 'bg-cyan-600 text-white' : 'bg-slate-900 text-slate-400 hover:text-white'
                        }`}
                    >
                        AI / ML
                    </button>
                    <button
                        onClick={() => setFilter('fullstack')}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
                            filter === 'fullstack' ? 'bg-cyan-600 text-white' : 'bg-slate-900 text-slate-400 hover:text-white'
                        }`}
                    >
                        Full Stack
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredProjects.map((proj) => (
                    <div key={proj.id} className="glass-card p-6 rounded-3xl flex flex-col justify-between">
                        <div>
                            <div className="flex justify-between items-start mb-3">
                                <span className="px-3 py-1 bg-cyan-950/70 border border-cyan-800 text-cyan-400 text-xs font-mono rounded-full">
                                    {proj.categoryLabel}
                                </span>
                                <span className="text-xs font-mono text-slate-400">{proj.metrics}</span>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">{proj.title}</h3>
                            <p className="text-sm text-slate-300 mb-4 leading-relaxed">{proj.desc}</p>
                            
                            <div className="flex flex-wrap gap-1.5 mb-6">
                                {proj.stack.map((tech, idx) => (
                                    <span key={idx} className="px-2.5 py-1 bg-slate-900 text-cyan-300 border border-slate-800 rounded-lg text-xs font-mono">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                            <a 
                                href={proj.githubUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5"
                            >
                                View GitHub Repository &rarr;
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
