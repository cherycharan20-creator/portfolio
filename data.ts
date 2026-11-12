/**
 * data.ts - Strongly Typed TypeScript Interfaces & Comprehensive Profile Store
 */

export interface PortfolioProfile {
    name: string;
    role: string;
    email: string;
    phone: string;
    location: string;
    githubUrl: string;
    graduationYear: number;
    cgpa: string;
    typingSpeed: string;
    summary: string;
}

export interface ProjectItem {
    id: string;
    title: string;
    category: 'aiml' | 'fullstack' | 'security';
    stack: string[];
    shortDesc: string;
    metrics: string;
    fullDesc: string;
    features: string[];
    githubUrl: string;
}

export interface SkillGroup {
    category: string;
    icon: string;
    skills: string[];
}

export interface EducationItem {
    institution: string;
    degree: string;
    period: string;
    score: string;
}

export const developerData: PortfolioProfile = {
    name: "M. Charan Teja",
    role: "Python Full Stack Developer & AI/ML Engineer",
    email: "cherycharan20@gmail.com",
    phone: "+91 9014939096",
    location: "Atmakur, Kurnool, Andhra Pradesh, India",
    githubUrl: "https://github.com/cherycharan20-creator",
    graduationYear: 2026,
    cgpa: "8.3 / 10",
    typingSpeed: "60 WPM (100% Accuracy)",
    summary: "Results-driven Python Full Stack Developer and B.Tech Computer Science graduate specializing in AI/ML, scalable web systems, and cloud-ready API architectures. Adept in developing robust RESTful microservices using Django and FastAPI, responsive front-ends with React.js, and end-to-end Machine Learning pipelines."
};

export const portfolioProjects: ProjectItem[] = [
    {
        id: "phishing-detector",
        title: "Phishing URL Detection System using Novel ML Fusion Architecture",
        category: "aiml",
        stack: ["Python", "Scikit-Learn", "FastAPI", "React", "Random Forest", "SVM", "PyTorch"],
        shortDesc: "Automated end-to-end cybersecurity pipeline extracting 30+ lexical, host-based, and domain heuristic features, benchmarked with 95%+ classification accuracy.",
        metrics: "95%+ Accuracy · <150ms Latency · 30+ Heuristics",
        fullDesc: "Engineered an enterprise-grade cybersecurity pipeline that performs deep real-time URL inspection. It analyzes URL structure, SSL parameters, domain age, host reputations, and lexical entropy. Combines Random Forest, SVM, and Neural Networks into a weighted fusion ensemble to defeat zero-day phishing vectors with sub-150ms classification speeds.",
        features: [
            "30+ lexical, host-based, and domain heuristic feature extraction",
            "Weighted averaging ensemble model (Random Forest, SVM, DNN)",
            "Sub-150ms inference latency for seamless API integration",
            "Adaptive zero-day phishing attack mitigation reduces false positives by 18%"
        ],
        githubUrl: "https://github.com/cherycharan20-creator"
    },
    {
        id: "omnichat-ai",
        title: "OmniChat AI Assistant — Context-Aware Conversational System",
        category: "aiml",
        stack: ["Python", "LangChain", "FastAPI", "React.js", "Tailwind CSS", "WebSockets"],
        shortDesc: "Intelligent conversational assistant featuring context-aware memory buffers, multi-turn reasoning, and high-throughput streaming responses.",
        metrics: "WebSocket Streaming · Multi-turn Memory · Low Latency",
        fullDesc: "Designed and implemented a full-stack AI conversational assistant using LangChain and FastAPI. Integrated stateful session tracking with Redis memory buffers, allowing uninterrupted context retention across multi-turn user dialogues. Features real-time token streaming over WebSockets.",
        features: [
            "Context-aware conversation memory with sliding window buffers",
            "High-throughput WebSocket streaming with sub-second token delivery",
            "Modular prompt routing and retrieval-augmented reasoning",
            "Responsive modern UI with syntax highlighting and conversation export"
        ],
        githubUrl: "https://github.com/cherycharan20-creator"
    },
    {
        id: "enterprise-microservices",
        title: "Scalable Full Stack E-Commerce & REST API Architecture",
        category: "fullstack",
        stack: ["Python", "Django", "FastAPI", "PostgreSQL", "React.js", "Docker"],
        shortDesc: "High-performance modular REST API platform with JWT authentication, role-based access control (RBAC), and query-optimized PostgreSQL storage.",
        metrics: "Django REST · PostgreSQL · JWT Auth · Dockerized",
        fullDesc: "Architected a production-ready web platform supporting complex transactional workflows. Engineered normalized relational models in PostgreSQL, automated database migrations, implemented robust error-handling middleware, and exposed secure REST endpoints consumed by a dynamic React front-end.",
        features: [
            "Secure stateless authentication utilizing JWT and Refresh tokens",
            "Optimized SQL queries with indexed lookups and zero N+1 bottlenecks",
            "Comprehensive API documentation generated via OpenAPI / Swagger",
            "Containerized with Docker for repeatable local and cloud deployments"
        ],
        githubUrl: "https://github.com/cherycharan20-creator"
    },
    {
        id: "ml-latency-optimizer",
        title: "High-Dimensional ML Feature Optimization & Pipeline Accelerator",
        category: "aiml",
        stack: ["Python", "Pandas", "NumPy", "Scikit-Learn", "Matplotlib"],
        shortDesc: "Diagnostics and algorithmic optimization of high-dimensional feature matrices, cutting training compute latency and inference overhead by ~25%.",
        metrics: "25% Latency Reduction · Vectorized Ops · PCA Pruning",
        fullDesc: "Conducted exhaustive benchmarking on large-scale datasets, identifying feature collinearity and compute bottlenecks. Refactored data transformations into vectorized NumPy/Pandas operations and applied Principal Component Analysis (PCA) to significantly accelerate batch inference without loss of model fidelity.",
        features: [
            "Vectorized pipeline transformations eliminating iterative overhead",
            "Dimensionality reduction via PCA and mutual information filtering",
            "~25% reduction in training compute runtime across benchmark suites",
            "Automated data validation and outlier filtering routines"
        ],
        githubUrl: "https://github.com/cherycharan20-creator"
    }
];

export const skillArsenal: SkillGroup[] = [
    {
        category: "Backend & Microservices",
        icon: "fa-server",
        skills: ["Python 3.x", "FastAPI", "Django", "Flask", "RESTful APIs", "Microservices", "GraphQL", "WebSockets"]
    },
    {
        category: "AI, ML & Data Science",
        icon: "fa-brain",
        skills: ["Scikit-Learn", "Random Forest", "SVM", "PyTorch", "TensorFlow", "LangChain", "Pandas", "NumPy"]
    },
    {
        category: "Frontend Development",
        icon: "fa-code",
        skills: ["React.js", "Angular", "TypeScript", "JavaScript (ES6+)", "Tailwind CSS", "HTML5", "CSS3"]
    },
    {
        category: "Databases & Storage",
        icon: "fa-database",
        skills: ["PostgreSQL", "MySQL", "MongoDB", "SQL Optimization", "Database Normalization", "SQLAlchemy"]
    },
    {
        category: "DevOps & Tools",
        icon: "fa-screwdriver-wrench",
        skills: ["Git", "GitHub", "Docker Basics", "Postman", "CI/CD Workflows", "VS Code", "Jupyter Notebook"]
    }
];

export const educationHistory: EducationItem[] = [
    {
        institution: "Siddartha Institute of Science and Technology",
        degree: "B.Tech in Computer Science & Engineering (AI-ML)",
        period: "2022 - 2026",
        score: "CGPA: 8.3 / 10"
    },
    {
        institution: "Sri Chaitanya Junior College",
        degree: "Intermediate (MPC)",
        period: "2020 - 2022",
        score: "87%"
    },
    {
        institution: "De Paul High School",
        degree: "Secondary Education (SSC)",
        period: "2020",
        score: "577 / 600"
    }
];
