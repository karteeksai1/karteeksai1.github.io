import { useEffect, useRef, useState } from 'react'
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
    gallery: ['/projects/codereviewai-connect.png', '/projects/codereviewai-agents.png'],
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
    gallery: ['/projects/hiregraph-config.png', '/projects/hiregraph-report.png'],
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
    diagram: true,
    securitySuite: true,
    accent: 'mint',
    live: null,
    href: 'https://github.com/karteeksai1/Warden',
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
    comparison: true,
    accent: 'mint',
    live: null,
    href: 'https://github.com/karteeksai1/LegalAid',
  },
  {
    id: '05',
    title: 'RAG-Hallucination-Guard',
    type: 'RETRIEVAL EVALUATION',
    description: 'An open-source decision guard that scores LLM answers against retrieved context and decides whether to deliver, retry retrieval, or refuse.',
    impact: 'Laya grounding guard · Pinecone + SQuAD 2.0 benchmarks',
    stack: ['Python', 'Pinecone', 'SQuAD 2.0', 'Evaluation'],
    image: null,
    gallery: [],
    benchmark: 'rag',
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
    image: null,
    gallery: [],
    weatherFeatures: true,
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
    image: null,
    gallery: [],
    accent: 'coral',
    live: null,
    href: 'https://github.com/karteeksai1/GrepTrace',
  },
]

const skills = ['Python', 'JavaScript', 'TypeScript', 'React', 'FastAPI', 'Node.js', 'RAG', 'LangGraph', 'LangChain', 'Pinecone', 'PostgreSQL', 'Redis']

function PixelMark() {
  return <span className="pixel-mark" aria-hidden="true"><i /><i /><i /><i /></span>
}

function WardenDiagram() {
  return <div className="warden-diagram" aria-label="Warden gateway architecture diagram"><div className="diagram-agent"><strong>AI Agent</strong><span>LangGraph / Claude / GPT</span></div><div className="diagram-arrow">▼ <span>Streamable HTTP / SSE</span></div><div className="diagram-gateway"><strong>Warden Gateway</strong><span>Upstash Redis &amp; Neon Postgres</span></div><div className="diagram-branches">{[['orders', 'HTTP MCP'], ['refunds', 'HTTP MCP'], ['kb', 'HTTP MCP'], ['email', 'HTTP MCP / stdio']].map(([name, protocol]) => <div key={name} className="diagram-branch"><i /><strong>{name}</strong><span>{protocol}</span></div>)}</div></div>
}

function RagBenchmark() {
  const rows = [
    ['No Guard (Baseline)', 'Strict', '20', '4 (20.0%)', '0 (0.0%)', '2.15s'],
    ['Laya Guard', 'Strict', '20', '1 (5.0%)', '2 (10.0%)', '14.28s'],
    ['LLM-as-Judge', 'Strict', '20', '2 (10.0%)', '2 (10.0%)', '5.42s'],
    ['No Guard (Baseline)', 'Plain', '20', '11 (55.0%)', '0 (0.0%)', '2.08s'],
    ['Laya Guard', 'Plain', '20', '2 (10.0%)', '1 (5.0%)', '14.65s'],
    ['LLM-as-Judge', 'Plain', '20', '3 (15.0%)', '2 (10.0%)', '5.61s'],
  ]
  return <div className="rag-benchmark"><div className="rag-demo"><div className="rag-demo-head"><strong>🛡 RAG Hallucination Guard</strong><span>[ Tab 1: Live Demo ] &nbsp; [ Tab 2: Evaluation Results ]</span></div><p><b>Question:</b> Who conquered England killing King Harold II at the Battle of Hastings?</p><div className="rag-columns"><div><h4>🛡 Guarded Pipeline</h4><strong className="rag-good">✅ Delivered</strong><p>“Duke William II of Normandy.”</p><span>Grounded Score (P_sup): 0.9910<br />Sufficiency Score (P_suf): 0.9912<br />⏱ Latency: 14.69s</span></div><div><h4>⚡ Unguarded Baseline</h4><strong>ℹ️ Baseline Delivered</strong><p>“Duke William II of Normandy.”</p><span>No verification applied.<br />Model output directly delivered.<br />⏱ Latency: 2.11s</span></div></div></div><h3>Tab 2: Evaluation &amp; Calibration</h3><ul className="rag-feature-list"><li><b>Comparative Benchmark Table:</b> No Guard, Laya Guard, and LLM-as-Judge across prompt variants.</li><li><b>Threshold Trade-off Curve:</b> Precision vs. recall across thresholds from 0.30 to 0.95.</li><li><b>Score Distribution Histogram:</b> Separation between answerable and unanswerable questions.</li><li><b>Error Analysis Table:</b> Hallucinations delivered versus false rejections.</li></ul><h3>📊 Measured Benchmark Results</h3><p>Evaluated across the held-out split of SQuAD 2.0 under strict (“refuse if unknown”) and plain (“just answer”) prompt variants.</p><div className="rag-table-wrap"><table className="rag-table"><thead><tr><th>Configuration</th><th>Prompt Variant</th><th>Total Queries</th><th>Wrong Answers Delivered</th><th>Correct Answers Wrongly Refused</th><th>Avg Latency</th></tr></thead><tbody>{rows.map((row) => <tr key={row.join('-')}>{row.map((cell, index) => <td key={`${cell}-${index}`}>{cell}</td>)}</tr>)}</tbody></table></div><p className="rag-finding"><b>Key finding:</b> Under a plain prompt, an unguarded RAG pipeline hallucinates on 55.0% of unanswerable questions, while the Laya Guard reduces that rate to 10.0%.</p></div>
}

function WardenSecuritySuite() {
  return <section className="warden-security"><div className="security-heading"><span>SECURITY EVALUATION SUITE</span><strong>evals/</strong></div><p>Warden validates agent-tool boundaries against adversarial inputs while checking that legitimate business workflows remain usable.</p><div className="security-grid"><article><b>attacks.json</b><strong>40+ adversarial vectors</strong><ul><li>Tool description poisoning and invisible Unicode injections</li><li>Indirect prompt injection through tool inputs and return data</li><li>Delimiter injection and LLM persona hijack attempts</li><li>Schema rug-pulls and unauthorized parameter modifications</li></ul></article><article><b>benign.json</b><strong>60+ legitimate payloads</strong><p>Complex business payloads verify that the security scanner maintains low false-positive rates across realistic agent workflows.</p></article><article><b>npm test</b><strong>Continuous verification</strong><p>Runs the evaluation suite against the security scanner on every test cycle, turning attack coverage into a repeatable regression check.</p></article></div></section>
}

function LegalAidComparison() {
  const rows = [
    ['Multi-agent adversarial review', '✅', '❌', '❌', 'Partial'],
    ['Source-grounded verbatim citations', '✅', 'Partial', 'Partial', '✅'],
    ['Pre-flight contract classifier', '✅', '❌', '✅', 'Partial'],
    ['Dual-mode presentation (Simple / Standard)', '✅', '❌', '❌', '❌'],
    ['Cross-agent consensus arbitration', '✅', '❌', '❌', 'Partial'],
    ['Conversational synonym RAG Q&A', '✅', '❌', '❌', 'Partial'],
    ['Anti-hallucination & anti-injection guardrails', '✅', 'Partial', '❌', 'Partial'],
    ['Deterministic 0–100 risk scoring', '✅', '❌', '✅ (rule-only)', 'Partial'],
    ['Per-user document persistence & lifecycle', '✅', '❌', '✅', '✅'],
    ['Open microservice architecture (self-hostable)', '✅', '❌', '❌', '❌'],
  ]
  return <section className="legalaid-comparison"><h2>What Makes This Different From Existing Tools</h2><div className="comparison-table-wrap"><table className="comparison-table"><thead><tr><th>Capability</th><th>LegalAid</th><th>ChatGPT / Claude</th><th>Ironclad / DocuSign</th><th>Robin AI / Spellbook</th></tr></thead><tbody>{rows.map((row) => <tr key={row[0]}>{row.map((cell, index) => <td key={`${row[0]}-${index}`} className={cell === '✅' ? 'yes' : cell === '❌' ? 'no' : ''}>{cell}</td>)}</tr>)}</tbody></table></div></section>
}

function WeatherFeatures() {
  return <section className="feature-suite weather-features"><h2>Key Features</h2><div className="feature-grid"><article><span>01</span><h3>Standardized MCP Architecture</h3><p>Weather tools are decoupled from the LLM and served over Streamable HTTP at <code>/mcp</code> using the official Python MCP SDK 2.x <code>MCPServer</code>.</p></article><article><span>02</span><h3>Dual Data Sources</h3><p><b>Historical:</b> 60-day archived weather metrics stored locally in SQLite for instant statistical aggregation.</p><p><b>Live:</b> Temperature, humidity, wind speed, and precipitation queried on demand via the Open-Meteo Forecast API.</p></article><article><span>03</span><h3>Agent Reasoning with Google ADK</h3><p>A Gemini-powered <code>LlmAgent</code> discovers MCP tools through <code>McpToolset</code>, plans multi-step lookups, and answers with grounded data.</p></article><article><span>04</span><h3>Robust Error Handling</h3><p>Domain-level validation with <code>ToolError</code> prevents server crashes and gives the agent human-readable explanations.</p></article><article><span>05</span><h3>Dedicated Test Suite</h3><p>A standalone <code>test_client.py</code> integration script tests the MCP server without consuming LLM tokens.</p></article></div></section>
}

function ProjectDetail({ project, onBack }) {
  return (
    <div className="detail-page">
      <header className="topbar"><button className="back-button" onClick={onBack}>← BACK TO WORK</button><a className="brand" href="/?#top" aria-label="Karteek Portfolio home"><PixelMark /> KARTEEK PORTFOLIO</a><span className="detail-status">PROJECT // {project.id}</span></header>
      <main className="detail-main">
        <div className="detail-hero"><div><span className="eyebrow"><span className="red-block" /> {project.type}</span><h1>{project.title}</h1><p>{project.description}</p></div><div className="detail-links">{project.live && <a href={project.live} target="_blank" rel="noreferrer">OPEN LIVE ↗</a>}{project.href && <a href={project.href} target="_blank" rel="noreferrer">VIEW REPO ↗</a>}</div></div>
        <div className="detail-meta"><div><span>IMPACT</span><strong>{project.impact}</strong></div><div><span>STACK</span><div className="tag-row">{project.stack.map((tag) => <span key={tag}>{tag}</span>)}</div></div></div>
        {project.diagram ? <WardenDiagram /> : project.benchmark === 'rag' ? <RagBenchmark /> : project.gallery?.length > 0 ? <div className="detail-gallery">{project.gallery.map((shot, index) => <figure key={shot}><img src={shot} alt={`${project.title} screen ${index + 1}`} /><figcaption>SCREEN {String(index + 1).padStart(2, '0')} // {project.type}</figcaption></figure>)}</div> : null}
        {project.securitySuite && <WardenSecuritySuite />}
        {project.comparison && <LegalAidComparison />}
        {project.weatherFeatures && <WeatherFeatures />}
      </main>
    </div>
  )
}

function App() {
  const [selectedProjectId, setSelectedProjectId] = useState(() => new URLSearchParams(window.location.search).get('project'))
  const [clock, setClock] = useState('00:00:00')
  const previousScrollPosition = useRef(0)
  const restoreScrollOnReturn = useRef(false)

  useEffect(() => {
    const tick = () => setClock(new Date().toLocaleTimeString('en-GB', { hour12: false }))
    tick()
    const timer = setInterval(tick, 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const handlePopState = () => {
      const nextProjectId = new URLSearchParams(window.location.search).get('project')
      if (!nextProjectId) restoreScrollOnReturn.current = true
      setSelectedProjectId(nextProjectId)
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  useEffect(() => {
    if (!selectedProjectId && restoreScrollOnReturn.current) {
      requestAnimationFrame(() => {
        window.scrollTo({ top: previousScrollPosition.current, behavior: 'smooth' })
        restoreScrollOnReturn.current = false
      })
    }
  }, [selectedProjectId])

  const scrollTo = (id) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  const openProject = (id) => { previousScrollPosition.current = window.scrollY; window.history.pushState({}, '', `?project=${id}`); setSelectedProjectId(id); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  const closeProject = () => { window.history.pushState({}, '', window.location.pathname); restoreScrollOnReturn.current = true; setSelectedProjectId(null) }

  const selectedProject = projects.find((project) => project.id === selectedProjectId)
  if (selectedProject) return <ProjectDetail project={selectedProject} onBack={closeProject} />

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
              <article className={`project-card ${project.image ? 'has-image' : 'no-image'}`} key={project.id} onClick={() => openProject(project.id)} role="link" tabIndex="0" onKeyDown={(event) => event.key === 'Enter' && openProject(project.id)}>
                <div className="project-number">{project.id}</div>
                {project.image && <div className={`project-visual ${project.accent}`}><img src={project.image} alt={`${project.title} interface`} /><span className="visual-label">{project.type}</span></div>}
                <div className="project-info">
                  <div className="project-title-row"><h3>{project.title}</h3><div className="project-links">{project.live && <a href={project.live} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>LIVE ↗</a>}{project.href && <a href={project.href} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>REPO ↗</a>}</div></div>
                  <p>{project.description}</p>
                  <div className="project-impact">↳ {project.impact}</div>
                  <div className="tag-row">{project.stack.map((tag) => <span key={tag}>{tag}</span>)}</div>
                </div>
                <div className="project-toggle">↗</div>
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
