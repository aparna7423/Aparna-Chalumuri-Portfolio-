import React, { useState, useEffect, useRef } from 'react';
import { 
  BrainCircuit, 
  Terminal, 
  Database, 
  Cloud, 
  Code, 
  Bot, 
  LineChart, 
  ShieldCheck, 
  Mail, 
  Phone, 
  Linkedin, 
  ChevronRight,
  Server,
  Sparkles,
  Send,
  X,
  MessageSquare,
  Download
} from 'lucide-react';

// --- DATA ---
const PORTFOLIO_DATA = {
  name: "Aparna Chalumuri",
  title: "Enterprise Data Scientist | GenAI Engineer",
  experience: "4 Years",
  email: "chalumuriaparna42@gmail.com",
  phone: "+19402798214",
  linkedin: "https://www.linkedin.com/in/aparna-chalumuri/",
  resume: "https://docs.google.com/document/d/1zhy2R2LV6cv_BkwRFC-K2s95_1lQwb5a/edit?usp=sharing&ouid=105813527600453356229&rtpof=true&sd=true",
  summary: "Innovative AI/ML professional with expertise in data science, applied machine learning, and large language models (LLMs). Experienced in architecting end-to-end pipelines across data engineering, model development, and cloud deployment in AWS, Azure, and GCP ecosystems. Skilled at combining predictive analytics, NLP/GenAI, and advanced forecasting techniques to solve enterprise-scale problems in finance, healthcare, insurance, and retail domains.",
  philosophy: "What interests me the most about Data Science and AI is the potential to bridge the gap between raw data and real-world impact. I see difficulties as puzzles that require a creative, well-engineered solution, rather than hurdles. My goal is always the same: create systems that people can rely on, organisations can grow with, and that continue to advance long after deployment.",
  
  skills: [
    { category: "Programming", icon: <Code size={20}/>, items: ["Python", "R", "SQL"] },
    { category: "GenAI & NLP", icon: <Bot size={20}/>, items: ["LLMs (GPT, BERT)", "LangChain", "CrewAI", "RAG Architectures", "Prompt Engineering", "Hugging Face", "FAISS / Chroma"] },
    { category: "Machine Learning", icon: <BrainCircuit size={20}/>, items: ["Scikit-learn", "XGBoost", "LightGBM", "TensorFlow", "PyTorch", "Time-Series (Prophet, ARIMA, TFT)"] },
    { category: "MLOps & Cloud", icon: <Cloud size={20}/>, items: ["AWS", "Azure", "GCP", "MLflow", "Docker", "Kubernetes", "Airflow", "GitHub Actions"] },
    { category: "Testing & Explainability", icon: <ShieldCheck size={20}/>, items: ["SHAP", "LIME", "RAGAS Metrics", "Adversarial Prompting", "Red Teaming"] },
    { category: "Data & Visualization", icon: <Database size={20}/>, items: ["Snowflake", "MongoDB", "BigQuery", "Power BI", "Tableau", "Plotly"] },
  ],

  experienceList: [
    {
      company: "Discover",
      role: "Generative AI Engineer",
      context: "Finance & Banking | AWS",
      achievements: [
        "Engineered a GenAI-enabled banking intelligence platform using GPT APIs, LangChain, and Hugging Face to automate customer query resolution across 200+ daily workflows, reducing manual review by 45%.",
        "Optimised RAG pipeline retrieval using FAISS vector indexing across 10,000+ regulatory documents, improving accuracy by 38%.",
        "Orchestrated multi-agent AI workflows using CrewAI and LangGraph, processing 500+ regulatory filings monthly with 96% classification accuracy.",
        "Implemented LangSmith-based prompt evaluation across 60+ active prompt templates, reducing response inconsistency by 30%.",
        "Applied RAGAS framework to assess GenAI quality, achieving 91% answer relevance and 87% faithfulness."
      ]
    },
    {
      company: "Geico",
      role: "Data Scientist",
      context: "Insurance | GCP",
      achievements: [
        "Developed fraud detection and claims risk models using CatBoost and LightGBM on 5M+ historical records, achieving 89% precision and reducing fraudulent payouts by 22%.",
        "Built claims volume and premium forecasting models using Prophet, SARIMA, and TFT, achieving 91% forecast accuracy (MAPE < 9%).",
        "Designed GCP Dataflow and BigQuery ETL pipelines processing 8M+ insurance records monthly, cutting data prep time by 40%.",
        "Segmented 2M+ policyholders into 8 behavioral cohorts using k-means/DBSCAN, reducing churn rate by 18%."
      ]
    },
    {
      company: "CIGNA",
      role: "Machine Learning Engineer",
      context: "Healthcare & Life Sciences | Azure",
      achievements: [
        "Architected ML pipelines for patient outcome prediction using XGBoost/LightGBM across 800K+ records, achieving AUC-ROC of 0.91.",
        "Deployed TFT and ARIMA time-series models for 72-hour early warning predictions, reducing unplanned readmissions by 19%.",
        "Built end-to-end MLOps workflows with MLflow, Docker, and AKS, sustaining 99.9% inference availability.",
        "Delivered SHAP and LIME interpretability reports to clinical teams, achieving zero audit findings across 3 consecutive reviews.",
        "Enforced HIPAA-compliant PII/PHI redaction and HITL validation, ensuring zero PHI exposure incidents."
      ]
    }
  ],

  projects: [
    {
      title: "Financial Compliance GenAI System",
      description: "Built an LLM-powered RAG pipeline with LangChain & CrewAI, reducing enterprise audit workloads by 75%.",
      tags: ["LangChain", "CrewAI", "RAG", "LLMs"]
    },
    {
      title: "Insurance Fraud Detection AI",
      description: "Deployed SHAP-based XGBoost models on AWS SageMaker for real-time claims fraud scoring and interpretability.",
      tags: ["XGBoost", "SageMaker", "SHAP", "Real-time Inference"]
    },
    {
      title: "Healthcare Demand Forecasting",
      description: "Designed LSTM/TFT models to forecast ICU bed demand and medical supply requirements, improving allocation accuracy by 35%.",
      tags: ["TFT", "LSTM", "Time-Series", "PyTorch"]
    }
  ]
};

// --- HELPER COMPONENT ---
const SectionHeading = ({ title, subtitle, isMd }) => (
  <div style={{ marginBottom: '48px' }}>
    <h2 style={{ 
      fontSize: isMd ? '36px' : '30px', 
      fontWeight: 'bold', 
      color: '#f1f5f9', 
      marginBottom: '8px', 
      display: 'flex', 
      alignItems: 'center', 
      gap: '12px' 
    }}>
      <span style={{ 
        width: '32px', 
        height: '4px', 
        background: 'linear-gradient(to right, #22d3ee, #3b82f6)', 
        borderRadius: '9999px' 
      }}></span>
      {title}
    </h2>
    {subtitle && (
      <p style={{ color: '#94a3b8', fontSize: '18px', marginLeft: '44px' }}>
        {subtitle}
      </p>
    )}
  </div>
);

// --- MAIN APP COMPONENT ---
export default function App() {
  // State for responsiveness and scroll
  const [isScrolled, setIsScrolled] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  
  // State for hover effects (since we can't use CSS :hover)
  const [hoveredNav, setHoveredNav] = useState(null);
  const [hoveredConnectBtn, setHoveredConnectBtn] = useState(false);
  const [hoveredBtnPrimary, setHoveredBtnPrimary] = useState(false);
  const [hoveredBtnSecondary, setHoveredBtnSecondary] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [hoveredJob, setHoveredJob] = useState(null);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [hoveredContactLink, setHoveredContactLink] = useState(null);
  const [hoveredChatBtn, setHoveredChatBtn] = useState(false);

  // State for AI Chat
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { role: 'model', text: `Hi! I'm Aparna's AI Assistant ✨. I can answer questions about her experience, skills, and projects. What would you like to know?` }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  // Refs for javascript animations & chat scrolling
  const pulseRef = useRef(null);
  const spin1Ref = useRef(null);
  const spin2Ref = useRef(null);
  const chatBottomRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    // JS Animations using Web Animations API (Replacing Tailwind keyframes)
    if (pulseRef.current) {
      pulseRef.current.animate([
        { opacity: 1 }, { opacity: 0.5 }, { opacity: 1 }
      ], { duration: 4000, iterations: Infinity, easing: 'cubic-bezier(0.4, 0, 0.6, 1)' });
    }
    if (spin1Ref.current) {
      spin1Ref.current.animate([
        { transform: 'rotate(0deg)' }, { transform: 'rotate(360deg)' }
      ], { duration: 10000, iterations: Infinity });
    }
    if (spin2Ref.current) {
      spin2Ref.current.animate([
        { transform: 'rotate(360deg)' }, { transform: 'rotate(0deg)' }
      ], { duration: 15000, iterations: Infinity });
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages, isTyping, isChatOpen]);

  // Breakpoints
  const isMd = windowWidth >= 768;
  const isLg = windowWidth >= 1024;

  // AI Chat Logic using Gemini API
  const handleSendMessage = async () => {
    if (!chatInput.trim()) return;

    const userMessage = chatInput.trim();
    setChatInput("");
    setChatMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsTyping(true);

    const apiKey = ""; 
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;

    const systemInstruction = `You are a professional, helpful, and concise AI assistant built by Chalumuri Aparna to represent her on her portfolio website. 
    Your goal is to answer questions from recruiters and visitors about her background. 
    Here is her data: ${JSON.stringify(PORTFOLIO_DATA)}. 
    Do not invent any information not present in this data. If you don't know the answer based on the data, politely say so. Always be polite, enthusiastic, and highlight her strengths in GenAI, ML, and scalable architecture.`;

    const payload = {
      contents: [{ parts: [{ text: userMessage }] }],
      systemInstruction: { parts: [{ text: systemInstruction }] }
    };

    const delays = [1000, 2000, 4000, 8000, 16000];
    let aiResponseText = "Sorry, I am having trouble connecting right now. Please try again later or contact Aparna directly!";

    // Exponential Backoff for Gemini API
    for (let attempt = 0; attempt < 6; attempt++) {
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        
        if (!response.ok) throw new Error(`API Error: ${response.status}`);
        
        const data = await response.json();
        if (data.candidates && data.candidates[0].content && data.candidates[0].content.parts) {
            aiResponseText = data.candidates[0].content.parts[0].text;
            break; // Success, exit loop
        } else {
            throw new Error("Invalid response format");
        }
      } catch (error) {
        if (attempt === 5) {
          console.error("Failed to fetch from Gemini API after 5 retries.", error);
          break;
        }
        await new Promise(res => setTimeout(res, delays[attempt]));
      }
    }

    setChatMessages(prev => [...prev, { role: 'model', text: aiResponseText }]);
    setIsTyping(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#0a0f1c', 
      color: '#cbd5e1', 
      fontFamily: 'system-ui, -apple-system, sans-serif',
      lineHeight: 1.5,
      overflowX: 'hidden'
    }}>
      
      {/* --- BACKGROUND EFFECTS --- */}
      <div style={{ position: 'fixed', top: 0, right: 0, bottom: 0, left: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '40%', height: '40%', borderRadius: '50%', backgroundColor: 'rgba(22, 78, 99, 0.1)', filter: 'blur(120px)' }}></div>
        <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '40%', height: '40%', borderRadius: '50%', backgroundColor: 'rgba(30, 58, 138, 0.1)', filter: 'blur(120px)' }}></div>
        <div style={{ position: 'absolute', top: '40%', left: '60%', width: '30%', height: '30%', borderRadius: '50%', backgroundColor: 'rgba(88, 28, 135, 0.1)', filter: 'blur(100px)' }}></div>
      </div>

      {/* --- NAVIGATION --- */}
      <nav style={{
        position: 'fixed',
        width: '100%',
        zIndex: 50,
        transition: 'all 0.3s ease',
        backgroundColor: isScrolled ? 'rgba(10, 15, 28, 0.8)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: isScrolled ? 'blur(12px)' : 'none',
        borderBottom: isScrolled ? '1px solid rgba(255, 255, 255, 0.05)' : 'none',
        padding: isScrolled ? '16px 0' : '24px 0'
      }}>
        <div style={{ maxWidth: '1152px', margin: '0 auto', padding: '0 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: 'white', display: 'flex', alignItems: 'center', gap: '8px', letterSpacing: '-0.05em' }}>
            <Terminal color="#22d3ee" size={24} />
            <span>C.Aparna<span style={{ color: '#22d3ee' }}>_</span></span>
          </div>

          {isMd && (
            <div style={{ display: 'flex', gap: '32px', fontSize: '14px', fontWeight: '500' }}>
              {['Home', 'About', 'Experience', 'Projects'].map((item, idx) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`}
                  onMouseEnter={() => setHoveredNav(idx)}
                  onMouseLeave={() => setHoveredNav(null)}
                  style={{ 
                    color: hoveredNav === idx ? '#22d3ee' : '#cbd5e1', 
                    textDecoration: 'none', 
                    transition: 'color 0.2s',
                    cursor: 'pointer'
                  }}
                >
                  {item}
                </a>
              ))}
            </div>
          )}

          <a 
            href="#contact" 
            onMouseEnter={() => setHoveredConnectBtn(true)}
            onMouseLeave={() => setHoveredConnectBtn(false)}
            style={{
              padding: '8px 20px',
              fontSize: '14px',
              fontWeight: '600',
              color: 'white',
              textDecoration: 'none',
              background: 'linear-gradient(to right, #0891b2, #2563eb)',
              borderRadius: '6px',
              transition: 'all 0.3s',
              boxShadow: hoveredConnectBtn ? '0 0 20px rgba(8, 145, 178, 0.6)' : '0 0 15px rgba(8, 145, 178, 0.4)',
              filter: hoveredConnectBtn ? 'brightness(1.1)' : 'none'
            }}
          >
            Connect
          </a>
        </div>
      </nav>

      <main style={{ position: 'relative', zIndex: 10 }}>
        
        {/* --- HERO SECTION --- */}
        <section id="home" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: '80px', paddingBottom: '40px' }}>
          <div style={{ maxWidth: '1152px', margin: '0 auto', padding: '0 24px', display: 'flex', flexDirection: isMd ? 'row' : 'column', gap: '48px', alignItems: 'center' }}>
            
            <div style={{ flex: 1 }}>
              <div style={{ 
                display: 'inline-block', padding: '4px 12px', marginBottom: '24px', borderRadius: '9999px',
                border: '1px solid rgba(34, 211, 238, 0.3)', backgroundColor: 'rgba(34, 211, 238, 0.1)',
                color: '#67e8f9', fontSize: '14px', fontWeight: '500', backdropFilter: 'blur(4px)'
              }}>
                Available for New Opportunities
              </div>
              
              <h1 style={{ fontSize: isMd ? '72px' : '48px', fontWeight: '800', color: 'white', marginBottom: '16px', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                Hi, I'm <span style={{ 
                  color: 'transparent', 
                  backgroundImage: 'linear-gradient(to right, #22d3ee, #3b82f6, #a855f7)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text'
                }}>{PORTFOLIO_DATA.name}</span>
              </h1>
              
              <h2 style={{ fontSize: isMd ? '30px' : '24px', fontWeight: '500', color: '#94a3b8', marginBottom: '24px' }}>
                {PORTFOLIO_DATA.title}
              </h2>
              
              <p style={{ fontSize: '18px', color: '#64748b', marginBottom: '40px', lineHeight: 1.625, maxWidth: '512px' }}>
                Building scalable GenAI solutions, robust machine learning pipelines, and predictive models that transform raw data into enterprise-level impact.
              </p>
              
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                <a 
                  href="#projects" 
                  onMouseEnter={() => setHoveredBtnPrimary(true)}
                  onMouseLeave={() => setHoveredBtnPrimary(false)}
                  style={{
                    padding: '12px 24px', backgroundColor: hoveredBtnPrimary ? '#e2e8f0' : 'white', color: '#0f172a',
                    fontWeight: '600', borderRadius: '6px', textDecoration: 'none', transition: 'all 0.2s',
                    display: 'flex', alignItems: 'center', gap: '8px'
                  }}
                >
                  View My Work <ChevronRight size={18} />
                </a>
                <a 
                  href="#experience" 
                  onMouseEnter={() => setHoveredBtnSecondary(true)}
                  onMouseLeave={() => setHoveredBtnSecondary(false)}
                  style={{
                    padding: '12px 24px', backgroundColor: 'rgba(15, 23, 42, 0.5)', color: hoveredBtnSecondary ? '#22d3ee' : '#cbd5e1',
                    border: hoveredBtnSecondary ? '1px solid #22d3ee' : '1px solid #334155',
                    fontWeight: '600', borderRadius: '6px', textDecoration: 'none', transition: 'all 0.2s',
                    display: 'flex', alignItems: 'center', gap: '8px', backdropFilter: 'blur(4px)'
                  }}
                >
                  <Terminal size={18} /> Experience
                </a>
                <a 
                  href={PORTFOLIO_DATA.resume} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onMouseEnter={() => setHoveredBtnSecondary(true)}
                  onMouseLeave={() => setHoveredBtnSecondary(false)}
                  style={{
                    padding: '12px 24px', backgroundColor: 'rgba(15, 23, 42, 0.5)', color: hoveredBtnSecondary ? '#22d3ee' : '#cbd5e1',
                    border: hoveredBtnSecondary ? '1px solid #22d3ee' : '1px solid #334155',
                    fontWeight: '600', borderRadius: '6px', textDecoration: 'none', transition: 'all 0.2s',
                    display: 'flex', alignItems: 'center', gap: '8px', backdropFilter: 'blur(4px)'
                  }}
                >
                  <Download size={18} /> Download Resume
                </a>
              </div>
            </div>
            
            {/* Abstract Tech Graphic */}
            {isMd && (
              <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', height: '500px' }}>
                <div ref={pulseRef} style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, background: 'linear-gradient(to top right, rgba(6, 182, 212, 0.1), rgba(168, 85, 247, 0.1))', borderRadius: '50%', filter: 'blur(60px)' }}></div>
                
                <div style={{ position: 'relative', width: '320px', height: '320px', border: '1px solid #1e293b', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div ref={spin1Ref} style={{ position: 'absolute', width: '256px', height: '256px', border: '1px solid rgba(8, 145, 178, 0.5)', borderRadius: '50%' }}></div>
                  <div ref={spin2Ref} style={{ position: 'absolute', width: '192px', height: '192px', border: '1px solid rgba(30, 58, 138, 0.5)', borderRadius: '50%' }}></div>
                  
                  <div style={{ width: '128px', height: '128px', backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 30px rgba(8, 145, 178, 0.2)', zIndex: 10 }}>
                    <BrainCircuit size={64} color="#22d3ee" />
                  </div>
                  
                  {/* Floating Badges */}
                  <div style={{ position: 'absolute', top: '40px', left: '40px', padding: '8px 16px', backgroundColor: 'rgba(15, 23, 42, 0.8)', backdropFilter: 'blur(4px)', border: '1px solid #334155', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)', zIndex: 20 }}>
                    <Bot size={16} color="#c084fc"/> <span style={{ fontSize: '14px', fontWeight: '600', color: '#e2e8f0' }}>LLMs</span>
                  </div>
                  <div style={{ position: 'absolute', bottom: '80px', right: 0, padding: '8px 16px', backgroundColor: 'rgba(15, 23, 42, 0.8)', backdropFilter: 'blur(4px)', border: '1px solid #334155', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)', zIndex: 20 }}>
                    <LineChart size={16} color="#4ade80"/> <span style={{ fontSize: '14px', fontWeight: '600', color: '#e2e8f0' }}>MLOps</span>
                  </div>
                  <div style={{ position: 'absolute', bottom: '128px', left: '-16px', padding: '8px 16px', backgroundColor: 'rgba(15, 23, 42, 0.8)', backdropFilter: 'blur(4px)', border: '1px solid #334155', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)', zIndex: 20 }}>
                    <Cloud size={16} color="#60a5fa"/> <span style={{ fontSize: '14px', fontWeight: '600', color: '#e2e8f0' }}>AWS/GCP</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* --- ABOUT & SKILLS SECTION --- */}
        <section id="about" style={{ padding: '96px 0', backgroundColor: '#0d1326', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', position: 'relative' }}>
          <div style={{ maxWidth: '1152px', margin: '0 auto', padding: '0 24px' }}>
            <SectionHeading title="About & Expertise" subtitle={`Driving innovation with ${PORTFOLIO_DATA.experience} of applied AI experience.`} isMd={isMd} />
            
            <div style={{ display: 'flex', flexDirection: isLg ? 'row' : 'column', gap: '64px' }}>
              
              <div style={{ flex: '2', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div style={{ padding: '24px', borderRadius: '16px', backgroundColor: 'rgba(15, 23, 42, 0.5)', border: '1px solid #1e293b', backdropFilter: 'blur(4px)' }}>
                  <p style={{ color: '#cbd5e1', lineHeight: 1.625, marginBottom: '16px' }}>
                    {PORTFOLIO_DATA.summary}
                  </p>
                  <p style={{ color: '#94a3b8', lineHeight: 1.625, fontStyle: 'italic', borderLeft: '2px solid #22d3ee', paddingLeft: '16px', marginTop: '24px' }}>
                    "{PORTFOLIO_DATA.philosophy}"
                  </p>
                </div>
              </div>
              
              <div style={{ flex: '3', display: 'grid', gridTemplateColumns: isMd ? 'repeat(2, 1fr)' : '1fr', gap: '16px' }}>
                {PORTFOLIO_DATA.skills.map((skillGroup, idx) => (
                  <div 
                    key={idx} 
                    onMouseEnter={() => setHoveredSkill(idx)}
                    onMouseLeave={() => setHoveredSkill(null)}
                    style={{ 
                      padding: '20px', borderRadius: '12px', backgroundColor: hoveredSkill === idx ? 'rgba(30, 41, 59, 0.6)' : 'rgba(15, 23, 42, 0.4)', 
                      border: hoveredSkill === idx ? '1px solid rgba(34, 211, 238, 0.3)' : '1px solid rgba(30, 41, 59, 0.6)', 
                      transition: 'all 0.3s' 
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', color: 'white', fontWeight: '600' }}>
                      <div style={{ padding: '8px', borderRadius: '8px', backgroundColor: '#1e293b', color: '#22d3ee', transition: 'transform 0.3s', transform: hoveredSkill === idx ? 'scale(1.1)' : 'scale(1)' }}>
                        {skillGroup.icon}
                      </div>
                      {skillGroup.category}
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {skillGroup.items.map((item, i) => (
                        <span key={i} style={{ padding: '4px 8px', fontSize: '12px', fontWeight: '500', backgroundColor: '#020617', color: '#cbd5e1', borderRadius: '4px', border: '1px solid #1e293b' }}>
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </section>

        {/* --- EXPERIENCE SECTION --- */}
        <section id="experience" style={{ padding: '96px 0', position: 'relative' }}>
          <div style={{ maxWidth: '896px', margin: '0 auto', padding: '0 24px' }}>
            <SectionHeading title="Professional Experience" subtitle="Enterprise impact across Finance, Insurance, and Healthcare." isMd={isMd} />
            
            <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '48px', paddingLeft: isMd ? 0 : '40px' }}>
              
              {/* Timeline Vertical Line */}
              <div style={{ position: 'absolute', top: 0, bottom: 0, left: isMd ? '50%' : '20px', width: '2px', backgroundColor: '#1e293b', transform: 'translateX(-50%)', background: 'linear-gradient(to bottom, transparent, #1e293b, transparent)' }}></div>
              
              {PORTFOLIO_DATA.experienceList.map((job, index) => {
                const isEven = index % 2 === 0;
                const isHovered = hoveredJob === index;

                return (
                  <div 
                    key={index} 
                    onMouseEnter={() => setHoveredJob(index)}
                    onMouseLeave={() => setHoveredJob(null)}
                    style={{ position: 'relative', display: 'flex', flexDirection: isMd ? (isEven ? 'row' : 'row-reverse') : 'row', alignItems: 'center', justifyContent: isMd ? 'space-between' : 'flex-start' }}
                  >
                    
                    {/* Timeline Node Icon */}
                    <div style={{ 
                      position: isMd ? 'absolute' : 'static', left: isMd ? '50%' : 'auto', transform: isMd ? 'translateX(-50%)' : 'none',
                      width: '40px', height: '40px', borderRadius: '50%', border: '4px solid #0a0f1c', 
                      backgroundColor: isHovered ? '#06b6d4' : '#1e293b', color: isHovered ? 'white' : '#22d3ee',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10, flexShrink: 0,
                      marginLeft: isMd ? 0 : '-40px', marginRight: isMd ? 0 : '16px', transition: 'all 0.3s',
                      boxShadow: isHovered ? '0 0 15px rgba(34,211,238,0.5)' : '0 1px 3px rgba(0,0,0,0.5)'
                    }}>
                      <Server size={18} />
                    </div>
                    
                    {/* Content Card */}
                    <div style={{ 
                      width: isMd ? 'calc(50% - 48px)' : '100%', padding: '24px', borderRadius: '16px', 
                      backgroundColor: 'rgba(15, 23, 42, 0.5)', border: isHovered ? '1px solid rgba(34, 211, 238, 0.5)' : '1px solid #1e293b', 
                      transition: 'border-color 0.3s', backdropFilter: 'blur(4px)' 
                    }}>
                      <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '16px' }}>
                        <span style={{ color: '#22d3ee', fontFamily: 'monospace', fontSize: '14px', marginBottom: '4px' }}>{job.company}</span>
                        <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: 'white' }}>{job.role}</h3>
                        <span style={{ color: '#64748b', fontSize: '14px' }}>{job.context}</span>
                      </div>
                      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {job.achievements.map((bullet, i) => (
                          <li key={i} style={{ color: '#cbd5e1', fontSize: '14px', lineHeight: 1.625, display: 'flex', alignItems: 'flex-start' }}>
                            <ChevronRight style={{ flexShrink: 0, color: '#0891b2', marginTop: '2px', marginRight: '8px' }} size={16} />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>
                );
              })}
              
            </div>
          </div>
        </section>

        {/* --- KEY PROJECTS SECTION --- */}
        <section id="projects" style={{ padding: '96px 0', backgroundColor: '#0d1326', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', position: 'relative' }}>
          <div style={{ maxWidth: '1152px', margin: '0 auto', padding: '0 24px' }}>
             <SectionHeading title="Key Projects" subtitle="Architecting robust GenAI and predictive systems." isMd={isMd} />
             
             <div style={{ display: 'grid', gridTemplateColumns: isMd ? 'repeat(3, 1fr)' : '1fr', gap: '32px' }}>
               {PORTFOLIO_DATA.projects.map((project, idx) => {
                 const isHovered = hoveredProject === idx;
                 return (
                   <div 
                     key={idx}
                     onMouseEnter={() => setHoveredProject(idx)}
                     onMouseLeave={() => setHoveredProject(null)}
                     style={{ 
                       position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', 
                       padding: '32px', borderRadius: '16px', backgroundColor: 'rgba(15, 23, 42, 0.8)', 
                       border: isHovered ? '1px solid rgba(34, 211, 238, 0.5)' : '1px solid #1e293b', 
                       transition: 'all 0.3s', overflow: 'hidden', height: '100%',
                       boxShadow: isHovered ? '0 10px 30px rgba(8, 145, 178, 0.1)' : 'none'
                     }}
                   >
                     
                     {/* Hover Gradient Overlay */}
                     <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom right, rgba(6, 182, 212, 0.05), rgba(168, 85, 247, 0.05))', opacity: isHovered ? 1 : 0, transition: 'opacity 0.3s', pointerEvents: 'none' }}></div>
                     
                     <div style={{ position: 'relative', zIndex: 10 }}>
                       <div style={{ width: '48px', height: '48px', borderRadius: '8px', backgroundColor: '#1e293b', color: '#22d3ee', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px', transition: 'transform 0.3s', transform: isHovered ? 'scale(1.1)' : 'scale(1)' }}>
                         <Code size={24} />
                       </div>
                       <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: isHovered ? '#67e8f9' : 'white', marginBottom: '12px', transition: 'color 0.3s' }}>{project.title}</h3>
                       <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: 1.625, marginBottom: '24px' }}>
                         {project.description}
                       </p>
                     </div>
                     
                     <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid #1e293b' }}>
                       {project.tags.map((tag, i) => (
                         <span key={i} style={{ padding: '4px 10px', fontSize: '12px', fontWeight: '600', color: '#67e8f9', backgroundColor: 'rgba(8, 145, 178, 0.15)', border: '1px solid rgba(8, 145, 178, 0.3)', borderRadius: '6px' }}>
                           {tag}
                         </span>
                       ))}
                     </div>
                   </div>
                 );
               })}
             </div>
          </div>
        </section>

        {/* --- CONTACT FOOTER --- */}
        <section id="contact" style={{ padding: '64px 0', position: 'relative' }}>
          <div style={{ maxWidth: '896px', margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
            <h2 style={{ fontSize: '30px', fontWeight: 'bold', color: 'white', marginBottom: '24px' }}>Let's Build the Future of AI Together</h2>
            <p style={{ color: '#94a3b8', marginBottom: '40px', maxWidth: '672px', margin: '0 auto 40px auto' }}>
              I'm currently open to new opportunities where I can leverage GenAI, MLOps, and scalable architecture to solve complex enterprise problems.
            </p>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '24px', marginBottom: '48px' }}>
              {[
                { icon: <Mail size={18} color="#22d3ee" />, text: PORTFOLIO_DATA.email, href: `mailto:${PORTFOLIO_DATA.email}` },
                { icon: <Phone size={18} color="#22d3ee" />, text: PORTFOLIO_DATA.phone, href: "#" },
                { icon: <Linkedin size={18} color="#3b82f6" />, text: PORTFOLIO_DATA.linkedin, href: "#" }
              ].map((link, idx) => {
                const isHovered = hoveredContactLink === idx;
                return (
                  <a 
                    key={idx}
                    href={link.href}
                    onMouseEnter={() => setHoveredContactLink(idx)}
                    onMouseLeave={() => setHoveredContactLink(null)}
                    style={{ 
                      display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', 
                      backgroundColor: '#0f172a', border: isHovered ? '1px solid #22d3ee' : '1px solid #334155', 
                      borderRadius: '9999px', color: isHovered ? 'white' : '#cbd5e1', textDecoration: 'none', transition: 'all 0.3s' 
                    }}
                  >
                    {link.icon} {link.text}
                  </a>
                );
              })}
            </div>
            
            <div style={{ paddingTop: '32px', borderTop: '1px solid #1e293b', display: 'flex', flexDirection: isMd ? 'row' : 'column', justifyContent: isMd ? 'space-between' : 'center', alignItems: 'center', gap: '16px', fontSize: '14px', color: '#64748b' }}>
              <p>© {new Date().getFullYear()} {PORTFOLIO_DATA.name}. All rights reserved.</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                Designed for Impact <BrainCircuit size={14} color="#06b6d4" />
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* --- AI ASSISTANT CHAT FEATURE (GEMINI API) --- */}
      <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 100 }}>
        
        {/* Chat Toggle Button */}
        {!isChatOpen && (
          <button 
            onClick={() => setIsChatOpen(true)}
            onMouseEnter={() => setHoveredChatBtn(true)}
            onMouseLeave={() => setHoveredChatBtn(false)}
            style={{
              width: '64px', height: '64px', borderRadius: '50%', border: 'none', cursor: 'pointer',
              background: 'linear-gradient(to right, #0891b2, #2563eb)', color: 'white',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: hoveredChatBtn ? '0 0 25px rgba(34, 211, 238, 0.6)' : '0 0 15px rgba(8, 145, 178, 0.4)',
              transition: 'all 0.3s', transform: hoveredChatBtn ? 'scale(1.05)' : 'scale(1)'
            }}
          >
            <Sparkles size={28} />
          </button>
        )}

        {/* Chat Window */}
        {isChatOpen && (
          <div style={{
            width: isMd ? '380px' : 'calc(100vw - 48px)', height: '550px', maxHeight: '80vh',
            backgroundColor: 'rgba(15, 23, 42, 0.95)', border: '1px solid rgba(34, 211, 238, 0.4)',
            borderRadius: '16px', display: 'flex', flexDirection: 'column', overflow: 'hidden',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5), 0 0 20px rgba(8, 145, 178, 0.2)',
            backdropFilter: 'blur(16px)'
          }}>
            
            {/* Chat Header */}
            <div style={{ padding: '16px 20px', background: 'linear-gradient(to right, #0891b2, #2563eb)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'white', fontWeight: 'bold' }}>
                <Bot size={20} />
                <span>Ask My AI ✨</span>
              </div>
              <button 
                onClick={() => setIsChatOpen(false)}
                style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center' }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Chat Messages */}
            <div style={{ flex: 1, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {chatMessages.map((msg, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                  <div style={{
                    maxWidth: '85%', padding: '12px 16px', borderRadius: '12px', fontSize: '14px', lineHeight: 1.5,
                    backgroundColor: msg.role === 'user' ? '#2563eb' : '#1e293b',
                    color: 'white',
                    borderBottomRightRadius: msg.role === 'user' ? '4px' : '12px',
                    borderBottomLeftRadius: msg.role === 'model' ? '4px' : '12px',
                    border: msg.role === 'model' ? '1px solid #334155' : 'none'
                  }}>
                    {msg.text}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                  <div style={{ padding: '12px 16px', borderRadius: '12px', backgroundColor: '#1e293b', border: '1px solid #334155', display: 'flex', gap: '6px' }}>
                    <span style={{ width: '8px', height: '8px', backgroundColor: '#22d3ee', borderRadius: '50%', animation: 'pulse 1.5s infinite' }}></span>
                    <span style={{ width: '8px', height: '8px', backgroundColor: '#22d3ee', borderRadius: '50%', animation: 'pulse 1.5s infinite', animationDelay: '0.2s' }}></span>
                    <span style={{ width: '8px', height: '8px', backgroundColor: '#22d3ee', borderRadius: '50%', animation: 'pulse 1.5s infinite', animationDelay: '0.4s' }}></span>
                  </div>
                </div>
              )}
              <div ref={chatBottomRef} />
            </div>

            {/* Chat Input */}
            <div style={{ padding: '16px', borderTop: '1px solid #334155', display: 'flex', gap: '8px', backgroundColor: 'rgba(10, 15, 28, 0.9)' }}>
              <input 
                type="text" 
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask about my ML experience..."
                style={{
                  flex: 1, padding: '12px 16px', borderRadius: '9999px', border: '1px solid #334155',
                  backgroundColor: '#0f172a', color: 'white', outline: 'none', fontSize: '14px'
                }}
              />
              <button 
                onClick={handleSendMessage}
                disabled={!chatInput.trim() || isTyping}
                style={{
                  width: '44px', height: '44px', borderRadius: '50%', border: 'none', cursor: chatInput.trim() && !isTyping ? 'pointer' : 'not-allowed',
                  backgroundColor: chatInput.trim() && !isTyping ? '#22d3ee' : '#334155', color: '#0a0f1c',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background-color 0.3s'
                }}
              >
                <Send size={18} style={{ marginLeft: '2px' }} />
              </button>
            </div>

          </div>
        )}
      </div>

    </div>
  );
}