import { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

const projects = [
  {
    id: '01',
    title: 'CodeReviewAI',
    type: 'ASYNC PR REVIEWER',
    description: 'A multi-agent code review platform that runs security, performance, and style checks in parallel.',
    impact: '40% faster reviews · 30% fewer LLM tokens · 95% fewer false positives',
    stack: ['Node.js', 'FastAPI', 'LangGraph', 'BullMQ', 'Pinecone'],
    image: '/projects/codereviewai.png',
    gallery: ['/projects/codereviewai.png'],
    accent: 'coral',
    live: 'https://code-review-ai-web-sandy.vercel.app/',
    href: 'https://github.com/karteeksai1/CodeReviewAI',
  },
  {
    id: '02',
    title: 'HireGraph',
    type: 'AI INTERVIEW LAB',
    description: 'An AI-driven technical interview platform with agentic routing, local question banks, and RAG-based grading.',
    impact: '85% lower embedding costs · no 429 rate-limit crashes',
    stack: ['React', 'Express', 'LangGraph', 'Gemini API', 'PostgreSQL'],
    image: '/projects/hiregraph.png',
    gallery: ['/projects/hiregraph.png'],
    accent: 'sun',
    live: 'https://hire-graph.vercel.app/login',
    href: 'https://github.com/karteeksai1/HireGraph',
  },
  {
    id: '03',
    title: 'Warden',
    type: 'MCP GATEWAY',
    description: 'A security and observability control plane for AI agent tool use, with routing, access policy, and attack detection.',
    impact: 'Namespaced tool routing · per-agent API keys · Streamable HTTP',
    stack: ['TypeScript', 'Redis', 'Neon', 'MCP', 'LangGraph'],
    image: null,
    gallery: [],
    accent: 'mint',
    live: null,
    href: null,
  },
  {
    id: '04',
    title: 'LegalAid',
    type: 'LEGAL AI // EVIDENCE TRAIL',
    description: 'A multi-agent AI legal contract review platform that stress-tests agreements, uncovers hidden risks, and provides grounded plain-English audits.',
    impact: 'Adversarial review · grounded findings · human-readable evidence',
    stack: ['Python', 'Multi-Agent AI', 'RAG', 'Contract Analysis'],
    image: '/projects/legalaid-home.png',
    gallery: ['/projects/legalaid-home.png', '/projects/legalaid-login.png'],
    accent: 'mint',
    live: null,
    href: null,
  },
  {
    id: '05',
    title: 'RAG-Hallucination-Guard',
    type: 'RETRIEVAL EVALUATION',
    description: 'An open-source decision guard that scores LLM answers against retrieved context and decides whether to deliver, retry retrieval, or refuse.',
    impact: 'Laya grounding guard · Pinecone + SQuAD 2.0 benchmarks',
    stack: ['Python', 'Pinecone', 'SQuAD 2.0', 'Evaluation'],
    image: '/projects/rag-guard.png',
    gallery: ['/projects/rag-guard.png'],
    accent: 'coral',
    live: null,
    href: 'https://github.com/karteeksai1/RAG-Hallucination-Guard',
  },
  {
    id: '06',
    title: 'weather-agent-project',
    type: 'WEATHER INTELLIGENCE',
    description: 'An agentic weather intelligence assistant built with Google ADK and Gemini, combining SQLite historical analytics with live Open-Meteo forecasts over Streamable HTTP.',
    impact: 'MCP tools · Gemini reasoning · local historical analysis',
    stack: ['Python', 'Google ADK', 'Gemini', 'MCP', 'SQLite'],
    image: '/projects/weather-agent.png',
    gallery: ['/projects/weather-agent.png'],
    accent: 'sun',
    live: null,
    href: 'https://github.com/karteeksai1/weather-agent-project',
  },
  {
    id: '07',
    title: 'GrepTrace',
    type: 'AGENTIC EVAL LAB',
    description: 'A benchmarking platform comparing agentic tool use against vector RAG for deep codebase question answering, with trace logging, LLM-as-a-judge evaluation, and visual analytics.',
    impact: 'Tool-use vs RAG · benchmark traces · visual analytics',
    stack: ['Python', 'FastAPI', 'Pinecone', 'Evaluation', 'React'],
    image: '/projects/grep-trace.png',
    gallery: ['/projects/grep-trace.png'],
    accent: 'coral',
    live: null,
    href: 'https://github.com/karteeksai1/GrepTrace',
  },
]

const skills = ['Python', 'JavaScript', 'TypeScript', 'React', 'FastAPI', 'Node.js', 'RAG', 'LangGraph', 'LangChain', 'Pinecone', 'PostgreSQL', 'Redis']

function PixelMark() {
  return <span className="pixel-mark" aria-hidden="true"><i /><i /><i /><i /></span>
}

function App() {
  const [activeProject, setActiveProject] = useState(null)
  const [clock, setClock] = useState('00:00:00')

  useEffect(() => {
    const tick = () => setClock(new Date().toLocaleTimeString('en-GB', { hour12: false }))
    tick()
    const timer = setInterval(tick, 1000)
    return () => clearInterval(timer)
  }, [])

  const scrollTo = (id) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <div className="site-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Karteek Portfolio home"><PixelMark /> KARTEEK PORTFOLIO</a>
        <nav className="nav-links" aria-label="Main navigation">
          <button onClick={() => scrollTo('#work')}>WORK</button>
          <button onClick={() => scrollTo('#about')}>ABOUT</button>
          <button onClick={() => scrollTo('#contact')}>CONTACT</button>
        </nav>
        <div className="system-status"><span className="status-dot" /> AVAILABLE FOR BUILDING <span className="clock">{clock}</span></div>
      </header>

      <main id="top">
        <section className="hero section-grid">
          <div className="hero-copy">
            <div className="eyebrow"><span className="red-block" /> AI ENGINEER // HYDERABAD, INDIA</div>
            <h1>Systems that<br /><em>think in layers.</em></h1>
            <p className="hero-lede">I build production-grade AI tools with multi-agent systems, retrieval pipelines, and a healthy respect for the details.</p>
            <div className="hero-actions">
              <button className="button button-primary" onClick={() => scrollTo('#work')}>EXPLORE WORK <span>↘</span></button>
              <a className="button button-ghost" href="https://github.com/karteeksai1" target="_blank" rel="noreferrer">VIEW GITHUB <span>↗</span></a>
              <a className="button button-ghost" href="mailto:karteek0011@gmail.com">START A CONVERSATION</a>
            </div>
          </div>
          <div className="hero-console" aria-label="System readout">
            <div className="window-bar"><span className="window-lights"><b /><b /><b /></span><span>karteek@portfolio:~</span><span>v1.0.26</span></div>
            <div className="console-body">
              <p className="console-comment">// booting portfolio...</p>
              <p><span className="console-green">[OK]</span> agent runtime online</p>
              <p><span className="console-green">[OK]</span> retrieval layer connected</p>
              <p><span className="console-green">[OK]</span> three projects indexed</p>
              <p className="console-comment">// current focus</p>
              <p className="console-focus">agentic systems<span className="blink">_</span></p>
              <div className="console-identity"><img src="/avatar.png" alt="Karteek Reddy avatar" /><span>karteek.reddy<br /><small>AI ENGINEER</small></span></div>
              <div className="console-graph"><span style={{ height: '34%' }} /><span style={{ height: '58%' }} /><span style={{ height: '42%' }} /><span style={{ height: '81%' }} /><span style={{ height: '66%' }} /><span style={{ height: '92%' }} /><span style={{ height: '73%' }} /></div>
            </div>
          </div>
          <div className="scroll-note">SCROLL TO INSPECT <span>↓</span></div>
        </section>

        <section id="work" className="work-section content-section">
          <div className="section-heading"><div><span className="section-index">01</span><h2>SELECTED BUILDS</h2></div><span className="heading-note">SEVEN SYSTEMS // ONE CURIOSITY</span></div>
          <div className="project-list">
            {projects.map((project) => (
              <article className={`project-card ${project.image ? 'has-image' : 'no-image'} ${activeProject === project.id ? 'is-active' : ''}`} key={project.id} onClick={() => setActiveProject(activeProject === project.id ? null : project.id)}>
                <div className="project-number">{project.id}</div>
                {project.image && <div className={`project-visual ${project.accent}`}><img src={project.image} alt={`${project.title} interface`} /><span className="visual-label">{project.type}</span></div>}
                <div className="project-info">
                  <div className="project-title-row"><h3>{project.title}</h3><div className="project-links">{project.live && <a href={project.live} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>LIVE ↗</a>}{project.href && <a href={project.href} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>REPO ↗</a>}</div></div>
                  <p>{project.description}</p>
                  <div className="project-impact">↳ {project.impact}</div>
                  <div className="tag-row">{project.stack.map((tag) => <span key={tag}>{tag}</span>)}</div>
                  {activeProject === project.id && <div className="project-detail"><div><span className="detail-kicker">CASE FILE // {project.id}</span><p className="detail-copy">{project.description} This build is part of my ongoing exploration of reliable, observable AI systems that keep their reasoning grounded in real inputs.</p></div>{project.gallery?.length > 0 && <div className="project-gallery">{project.gallery.map((shot, index) => <img key={shot} src={shot} alt={`${project.title} screen ${index + 1}`} />)}</div>}</div>}
                </div>
                <div className="project-toggle">{activeProject === project.id ? '−' : '+'}</div>
              </article>
            ))}
          </div>
        </section>

        <section className="activity-section content-section">
          <div className="section-heading"><div><span className="section-index">02</span><h2>OPEN LOOP</h2></div><span className="heading-note">GITHUB ACTIVITY // LAST YEAR</span></div>
          <div className="activity-layout"><div className="activity-copy"><p className="activity-number">542<span>+</span></p><p className="activity-label">contributions in the last year</p><p className="activity-note">Shipping, experimenting, benchmarking, and leaving a trail of the work behind.</p><a className="text-link" href="https://github.com/karteeksai1" target="_blank" rel="noreferrer">VIEW GITHUB PROFILE ↗</a></div><div className="activity-image"><img src={`https://ghchart.rshah.org/1d5b42/karteeksai1?v=${new Date().toISOString().slice(0, 10)}`} alt="Live GitHub contribution graph for Karteek Reddy" /><span>LIVE CONTRIBUTION GRAPH // AUTO-UPDATED FROM GITHUB</span></div></div>
        </section>

        <section id="about" className="about-section content-section section-grid">
          <div className="section-heading"><div><span className="section-index">03</span><h2>THE OPERATOR</h2></div><span className="heading-note">PROFILE // 2026</span></div>
          <div className="about-layout">
            <div className="about-copy"><p className="big-copy">I like the messy middle: where an idea has to become a reliable product.</p><p>Currently pursuing a B.Tech in Computer Science and Data Science at GRIET, I spend my time making AI systems more useful, more observable, and harder to fool.</p><p>My toolkit spans the whole loop - from a webhook at the edge to a retrieval pipeline, agent supervisor, and the interface a person actually touches.</p></div>
            <div className="about-panel"><div className="panel-header">// FIELD NOTES</div><dl><div><dt>FOCUS</dt><dd>Multi-agent systems<br />RAG pipelines</dd></div><div><dt>PROOF OF WORK</dt><dd>500+ problems solved<br />LeetCode top 19%</dd></div><div><dt>NOW LEARNING</dt><dd>Systems design<br />AI observability</dd></div></dl></div>
          </div>
          <div className="skill-strip"><span>TOOLS I SPEAK</span><div>{skills.map((skill) => <span key={skill} className="skill-chip">{skill}</span>)}</div></div>
        </section>

        <section className="experience-section content-section">
          <div className="section-heading"><div><span className="section-index">04</span><h2>TRACE LOG</h2></div><span className="heading-note">EXPERIENCE + EDUCATION</span></div>
          <div className="timeline"><div className="timeline-item"><span className="timeline-date">JUL 2026 — AUG 2026</span><div><h3>Generative AI Engineer Intern</h3><p>Brio Technologies <span>// Hyderabad, Telangana</span></p><ul><li>Built a RAG-powered query agent for an insurance client's internal files.</li><li>Improved reliability with global and child fallback mechanisms, guardrails, and pipeline optimizations.</li></ul></div></div><div className="timeline-item"><span className="timeline-date">2023 — 2027</span><div><h3>B.Tech · Computer Science & Data Science</h3><p>Gokaraju Rangaraju Institute of Engineering and Technology <span>// CGPA 7.53</span></p></div></div></div>
        </section>

        <section id="contact" className="contact-section content-section"><div className="contact-inner"><div><span className="eyebrow"><span className="red-block" /> NEXT INPUT</span><h2>Have a hard problem?<br /><em>Let's make it legible.</em></h2></div><a className="contact-button" href="mailto:karteek0011@gmail.com"><span>EMAIL KARTEEK</span><strong>↗</strong></a></div><div className="contact-meta"><span>karteek0011@gmail.com</span><span>+91 83284 05146</span><span>HYDERABAD · INDIA</span></div></section>
      </main>
      <footer><span>© 2026 KARTEEK REDDY</span><span>BUILT WITH REACT + VITE <PixelMark /></span><span className="footer-socials"><a href="https://www.linkedin.com/in/karteek-reddy-b84469280/" target="_blank" rel="noreferrer">LINKEDIN ↗</a><a href="https://github.com/karteeksai1" target="_blank" rel="noreferrer">GITHUB ↗</a><a href="#top">BACK TO TOP ↑</a></span></footer>
    </div>
  )
}

export default App

createRoot(document.getElementById('root')).render(<App />)
