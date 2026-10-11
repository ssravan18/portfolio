import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowDownRight, ArrowRight, ArrowUpRight, Award, BriefcaseBusiness, Check,
  ChevronDown, Cloud, Code2, Database, ExternalLink, Github, GraduationCap,
  Mail, MapPin, Menu, Network, Rocket, Send, ShieldCheck, Sparkles, Terminal,
  Workflow, X, Zap, Phone, Linkedin, Star, Trophy, Target, TrendingUp,
  BookOpen, Layers, GitBranch, BarChart3, Activity, ChevronRight
} from 'lucide-react';
import {
  profile, skills, projects, certifications, experience,
  education, achievements, stats
} from './data.js';

// ─── Intersection Observer Hook ───────────────────────────────────────────────
function useInView(options = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
      { threshold: 0.12, ...options }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, inView];
}

// ─── Animated Number Counter ─────────────────────────────────────────────────
function AnimatedNumber({ value, suffix = '' }) {
  const [display, setDisplay] = useState('0');
  const [ref, inView] = useInView();
  useEffect(() => {
    if (!inView) return;
    const num = parseFloat(value.replace(/[^0-9.]/g, ''));
    if (isNaN(num)) { setDisplay(value); return; }
    let start = 0;
    const duration = 1600;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.floor(eased * num).toString() + suffix);
      if (progress < 1) requestAnimationFrame(step);
      else setDisplay(value);
    };
    requestAnimationFrame(step);
  }, [inView, value]);
  return <span ref={ref}>{display}</span>;
}

// ─── Fade-in wrapper ──────────────────────────────────────────────────────────
function FadeIn({ children, delay = 0, direction = 'up', className = '' }) {
  const [ref, inView] = useInView();
  const transforms = { up: 'translateY(32px)', down: 'translateY(-32px)', left: 'translateX(32px)', right: 'translateX(-32px)', none: 'none' };
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'none' : transforms[direction],
        transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// ─── Section Heading ──────────────────────────────────────────────────────────
function SectionHeading({ eyebrow, title, description }) {
  return (
    <FadeIn>
      <div className="section-heading">
        <span className="eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>
    </FadeIn>
  );
}

// ─── Brand Mark ───────────────────────────────────────────────────────────────
function BrandMark() {
  return (
    <span className="brand-mark">
      <Cloud size={20} strokeWidth={1.8} />
      <span className="brand-dot" />
    </span>
  );
}

// ─── Header ───────────────────────────────────────────────────────────────────
const nav = [
  ['About', '#about'], ['Skills', '#skills'], ['Projects', '#projects'],
  ['Experience', '#experience'], ['Certifications', '#certifications'],
  ['Education', '#education'], ['Contact', '#contact'],
];

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = nav.map(([, href]) => href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => { if (entry.isIntersecting) setActiveSection(entry.target.id); });
      },
      { threshold: 0.4 }
    );
    sections.forEach((id) => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  return (
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-wrap container">
        <a className="brand" href="#home" aria-label="Sravan Kumar home">
          <BrandMark />
          <span>
            <strong>Sravan Kumar</strong>
            <small>AZURE DATA ENGINEER</small>
          </span>
        </a>
        <button className="menu-toggle" onClick={() => setOpen(!open)} aria-label="Toggle navigation">
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
        <nav className={open ? 'nav-links open' : 'nav-links'}>
          {nav.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className={activeSection === href.slice(1) ? 'nav-active' : ''}
              onClick={() => setOpen(false)}
            >
              {label}
            </a>
          ))}
          <a className="nav-cta" href={profile.resume} download>
            <ArrowDownRight size={14} /> Resume
          </a>
        </nav>
      </div>
    </header>
  );
}

// ─── Data Pipeline Visual ─────────────────────────────────────────────────────
function DataVisual() {
  return (
    <div className="data-visual" aria-label="Azure cloud data pipeline illustration">
      <div className="visual-orbit orbit-one" />
      <div className="visual-orbit orbit-two" />
      <div className="visual-orbit orbit-three" />
      <div className="cloud-core">
        <Cloud size={80} strokeWidth={1.1} />
        <span>AZURE DATA</span>
      </div>
      <div className="pipeline-line" />
      <div className="pipeline-nodes">
        {[
          { icon: <Network />, label: 'INGEST' },
          { icon: <Workflow />, label: 'TRANSFORM' },
          { icon: <Database />, label: 'STORE' },
          { icon: <BarChart3 />, label: 'ANALYZE' },
        ].map((node, i) => (
          <React.Fragment key={node.label}>
            <div className="pipeline-node" style={{ animationDelay: `${i * 0.15}s` }}>
              {node.icon}
              <span>{node.label}</span>
            </div>
            {i < 3 && <ArrowRight className="node-arrow" />}
          </React.Fragment>
        ))}
      </div>
      <div className="visual-tags">
        <span><Database size={13} /> Delta Lake</span>
        <span><Zap size={13} /> PySpark</span>
        <span><Terminal size={13} /> SQL</span>
      </div>
      <div className="visual-caption"><span className="pulse-green" /> DATA FLOW · DESIGN · TRUST</div>
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const [typedText, setTypedText] = useState('');
  const roles = ['Azure Data Engineer', 'PySpark Developer', 'Cloud Data Architect', 'ETL/ELT Specialist'];
  const [roleIdx, setRoleIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIdx];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setTypedText(current.slice(0, typedText.length + 1));
        if (typedText === current) {
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        setTypedText(current.slice(0, typedText.length - 1));
        if (typedText === '') {
          setIsDeleting(false);
          setRoleIdx((i) => (i + 1) % roles.length);
        }
      }
    }, isDeleting ? 45 : 80);
    return () => clearTimeout(timeout);
  }, [typedText, isDeleting, roleIdx]);

  return (
    <section id="home" className="hero">
      <div className="hero-bg-grid" />
      <div className="hero-bg-glow" />
      <div className="hero-grid container">
        <div className="hero-copy">
          <div className="availability">
            <span className="pulse-green" />
            OPEN TO DATA ENGINEERING OPPORTUNITIES
          </div>
          <p className="hero-kicker">{profile.tagline.toUpperCase()}</p>
          <h1>
            Hi, I'm <span className="gradient-text">{profile.displayName}.</span>
          </h1>
          <h2 className="hero-typewriter">
            <span>{typedText}</span>
            <span className="cursor">|</span>
          </h2>
          <p className="hero-summary">{profile.summary}</p>
          <div className="hero-meta">
            <span><MapPin size={15} />{profile.location}</span>
            <span><Activity size={15} />{profile.experience} Years Experience</span>
            <span><Mail size={15} />{profile.email}</span>
          </div>
          <div className="hero-actions">
            <a className="button button-primary" href="#projects">
              View My Projects <ArrowRight size={16} />
            </a>
            <a className="button button-ghost" href={profile.resume} download>
              Download Resume <ArrowDownRight size={16} />
            </a>
          </div>
          <div className="hero-socials">
            <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub">
              <Github size={18} />
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <Linkedin size={18} />
            </a>
            <a href={`mailto:${profile.email}`} aria-label="Email">
              <Mail size={18} />
            </a>
          </div>
        </div>
        <DataVisual />
      </div>
      <div className="hero-bottom container">
        <div className="ticker-wrap">
          {['DATA ENGINEERING', 'AZURE CLOUD', 'MEDALLION ARCHITECTURE', 'PYSPARK', 'DELTA LAKE', 'ETL/ELT PIPELINES', 'SYNAPSE ANALYTICS'].map((t) => (
            <React.Fragment key={t}><span>{t}</span><i /></React.Fragment>
          ))}
        </div>
        <a href="#about" className="scroll-hint">
          Scroll to explore <ChevronDown size={14} />
        </a>
      </div>
    </section>
  );
}

// ─── Stats Bar ────────────────────────────────────────────────────────────────
function StatsBar() {
  return (
    <section className="stats-bar">
      <div className="container stats-grid">
        {stats.map((s, i) => (
          <FadeIn key={s.label} delay={i * 0.1} direction="up">
            <div className="stat-item">
              <span className="stat-icon">{s.icon}</span>
              <div>
                <div className="stat-value">
                  <AnimatedNumber value={s.value} />
                </div>
                <div className="stat-label">{s.label}</div>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

// ─── About ────────────────────────────────────────────────────────────────────
function About() {
  return (
    <section id="about" className="section section-about">
      <div className="container about-grid">
        <div>
          <SectionHeading
            eyebrow="01 / ABOUT ME"
            title="Engineering data into clarity."
            description="A practical, quality-first approach to cloud data engineering."
          />
          {profile.about.map((p, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <p className="body-copy">{p}</p>
            </FadeIn>
          ))}
          <FadeIn delay={0.2}>
            <div className="trait-badges">
              {profile.traits.map((t) => (
                <span key={t} className="trait-badge"><Check size={13} />{t}</span>
              ))}
            </div>
          </FadeIn>
          <FadeIn delay={0.3}>
            <a className="text-link" href="#experience">
              Explore my background <ArrowUpRight size={16} />
            </a>
          </FadeIn>
        </div>
        <div className="about-cards">
          {[
            { icon: <Rocket size={20} />, title: 'Build with purpose', desc: 'Design pipelines that are understandable, observable, and easier to operate at scale.' },
            { icon: <Check size={20} />, title: 'Validate the data', desc: 'Reconciliation and quality checks belong in the pipeline — not as afterthoughts.' },
            { icon: <Sparkles size={20} />, title: 'Keep learning', desc: 'Turn concepts into working projects. Certify skills. Document the trade-offs.' },
            { icon: <Target size={20} />, title: 'Measure outcomes', desc: 'Every pipeline optimization has a number: processing time, cost, data quality score.' },
          ].map((card, i) => (
            <FadeIn key={card.title} delay={i * 0.08} direction="right">
              <div className="about-card">
                <span className="card-icon">{card.icon}</span>
                <div>
                  <h3>{card.title}</h3>
                  <p>{card.desc}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Skills ───────────────────────────────────────────────────────────────────
function Skills() {
  const [hoveredIdx, setHoveredIdx] = useState(null);
  return (
    <section id="skills" className="section section-skills">
      <div className="container">
        <SectionHeading
          eyebrow="02 / TOOLKIT"
          title="Tools I work with."
          description="A focused toolkit for ingestion, transformation, storage, analytics, and governance across the Azure data ecosystem."
        />
        <div className="skills-grid">
          {skills.map((skill, i) => (
            <FadeIn key={skill.name} delay={i * 0.05}>
              <article
                className={`skill-card ${hoveredIdx === i ? 'skill-hovered' : ''}`}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                <div className="skill-top">
                  <span className="skill-icon" style={{ color: skill.color }}>{skill.icon}</span>
                  <span className="skill-number">0{i + 1}</span>
                </div>
                <h3>{skill.name}</h3>
                <p>{skill.group}</p>
                <div className="skill-line">
                  <span style={{ width: `${Math.max(55, 98 - i * 4)}%`, background: `linear-gradient(90deg, ${skill.color}aa, ${skill.color})` }} />
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={0.1}>
          <div className="skill-note">
            <span><Sparkles size={15} /> Core principle</span>
            <p>Choose the simplest architecture that meets data volume, latency, security, and recovery requirements — then optimize with evidence.</p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Project Card ─────────────────────────────────────────────────────────────
function ProjectCard({ project, onOpen, index }) {
  return (
    <FadeIn delay={index * 0.12} direction="up">
      <article className="project-card">
        <div className="project-card-top">
          <span className="project-number">{project.number}</span>
          <span className="project-status"><span className="status-dot" />{project.status}</span>
        </div>
        <div className="project-symbol"><Workflow size={24} /></div>
        <p className="project-type">{project.type}</p>
        <h3>{project.title}</h3>
        <p className="project-subtitle">{project.subtitle}</p>
        <p className="project-description">{project.description}</p>
        <div className="project-flow">
          {project.flow.map((step, i) => (
            <React.Fragment key={step}>
              <span>{step}</span>
              {i < project.flow.length - 1 && <ChevronRight size={12} className="flow-arrow" />}
            </React.Fragment>
          ))}
        </div>
        <div className="project-metrics-mini">
          {project.metrics.slice(0, 2).map((m) => (
            <div key={m.label} className="metric-mini">
              <strong>{m.value}</strong><span>{m.label}</span>
            </div>
          ))}
        </div>
        <div className="tag-list">
          {project.stack.map((t) => <span key={t}>{t}</span>)}
        </div>
        <button className="text-link project-link" onClick={() => onOpen(project)}>
          View case study <ArrowUpRight size={15} />
        </button>
      </article>
    </FadeIn>
  );
}

// ─── Project Modal ────────────────────────────────────────────────────────────
function ProjectModal({ project, onClose }) {
  useEffect(() => {
    if (project) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [project]);

  if (!project) return null;
  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <div className="project-modal" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close"><X size={18} /></button>
        <span className="eyebrow">PROJECT CASE STUDY / {project.number}</span>
        <h2>{project.title}</h2>
        <p className="modal-subtitle">{project.subtitle}</p>
        <p className="modal-lead">{project.description}</p>
        <div className="modal-flow">
          {project.flow.map((step, i) => (
            <React.Fragment key={step}>
              <span>{step}</span>
              {i < project.flow.length - 1 && <ArrowRight size={14} />}
            </React.Fragment>
          ))}
        </div>
        <div className="modal-metrics">
          {project.metrics.map((m) => (
            <div key={m.label} className="modal-metric">
              <strong>{m.value}</strong>
              <span>{m.label}</span>
            </div>
          ))}
        </div>
        <h3>Implementation details</h3>
        <ul className="detail-list">
          {project.details.map((item) => (
            <li key={item}><Check size={15} /><span>{item}</span></li>
          ))}
        </ul>
        <div className="tag-list" style={{ marginTop: 20 }}>
          {project.stack.map((t) => <span key={t}>{t}</span>)}
        </div>
        {project.github && (
          <a className="button button-primary" href={project.github} target="_blank" rel="noreferrer" style={{ marginTop: 22, display: 'inline-flex' }}>
            View on GitHub <Github size={15} />
          </a>
        )}
      </div>
    </div>
  );
}

// ─── Projects ─────────────────────────────────────────────────────────────────
function Projects() {
  const [selected, setSelected] = useState(null);
  return (
    <section id="projects" className="section section-projects">
      <div className="container">
        <div className="section-heading-row">
          <SectionHeading
            eyebrow="03 / SELECTED WORK"
            title="Projects, not just buzzwords."
            description="Real implementations with real numbers — architecture decisions, measured outcomes, and honest trade-offs."
          />
          <span className="section-stamp">FIELD NOTES<br />VOL. 01</span>
        </div>
        <div className="projects-grid">
          {projects.map((p, i) => <ProjectCard key={p.number} project={p} onOpen={setSelected} index={i} />)}
        </div>
        <FadeIn delay={0.2}>
          <div className="project-bottom-note">
            <span className="note-line" />
            <p>Strong project write-ups explain <b>why</b> each service was chosen — not only which services were used.</p>
            <a href={profile.github} target="_blank" rel="noreferrer" className="button button-ghost" style={{ fontSize: 11 }}>
              More on GitHub <ArrowUpRight size={13} />
            </a>
          </div>
        </FadeIn>
      </div>
      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}

// ─── Experience ───────────────────────────────────────────────────────────────
function Experience() {
  return (
    <section id="experience" className="section section-experience">
      <div className="container">
        <SectionHeading
          eyebrow="04 / EXPERIENCE"
          title="Professional journey."
          description="Building production-grade data pipelines for enterprise B2B systems."
        />
        <div className="experience-layout">
          {experience.map((job, i) => (
            <FadeIn key={job.role + job.company} delay={0.1}>
              <div className="experience-card">
                <div className="exp-left">
                  <div className="company-logo" style={{ borderColor: job.logoColor + '55' }}>
                    <span style={{ color: job.logoColor, fontWeight: 800, fontSize: 18 }}>{job.logo}</span>
                  </div>
                  <div>
                    <h3>{job.role}</h3>
                    <h4 style={{ color: job.logoColor }}>{job.company}</h4>
                    <div className="exp-meta">
                      <span><BriefcaseBusiness size={13} />{job.period}</span>
                      <span><MapPin size={13} />{job.location}</span>
                      <span className="exp-type-badge">{job.type}</span>
                    </div>
                  </div>
                </div>
                <div className="exp-bullets">
                  <h5>Responsibilities</h5>
                  <ul>
                    {job.bullets.map((b) => (
                      <li key={b}><ChevronRight size={14} className="bullet-arrow" /><span>{b}</span></li>
                    ))}
                  </ul>
                </div>
                <div className="contributions-panel">
                  <h5><TrendingUp size={14} /> Key Contributions</h5>
                  <ul>
                    {job.contributions.map((c) => (
                      <li key={c}><Check size={14} /><span>{c}</span></li>
                    ))}
                  </ul>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Certifications ───────────────────────────────────────────────────────────
function Certifications() {
  return (
    <section id="certifications" className="section section-credentials">
      <div className="container">
        <SectionHeading
          eyebrow="05 / CERTIFICATIONS"
          title="Learning with evidence."
          description="Industry-recognized Microsoft certifications verifiable on MS Learn."
        />
        <div className="cert-grid">
          {certifications.map((c, i) => (
            <FadeIn key={c.code} delay={i * 0.1}>
              <article className="cert-card">
                <div className="cert-badge" style={{ borderColor: c.color + '55', background: c.color + '15' }}>
                  <span style={{ color: c.color }}>{c.badge}</span>
                </div>
                <div className="cert-info">
                  <small className="cert-issuer">{c.issuer}</small>
                  <h3>{c.name}</h3>
                  <p className="cert-status">{c.status}</p>
                  <small className="cert-date">Earned: {c.date}</small>
                  {c.url && (
                    <a href={c.url} target="_blank" rel="noreferrer" className="cert-link">
                      View Credential <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              </article>
            </FadeIn>
          ))}
          {/* Always Learning Card */}
          <FadeIn delay={0.4}>
            <article className="cert-card cert-next-goal">
              <div className="next-goal-icon">
                <Sparkles size={28} />
              </div>
              <div className="cert-info">
                <small className="cert-issuer" style={{ color: '#f59e0b' }}>ALWAYS LEARNING...</small>
                <h3>Next Goal</h3>
                <p className="cert-status">DP-203 — Azure Data Engineer Associate</p>
                <div className="next-goal-progress">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: '65%' }} />
                  </div>
                  <small>In preparation</small>
                </div>
              </div>
            </article>
          </FadeIn>
        </div>
        <FadeIn delay={0.2}>
          <div className="credentials-note">
            <ShieldCheck size={16} />
            <p><b>Verify all credentials</b> at <a href={profile.credly} target="_blank" rel="noreferrer">learn.microsoft.com/users/sravansulige <ExternalLink size={11} /></a></p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Education ────────────────────────────────────────────────────────────────
function Education() {
  return (
    <section id="education" className="section section-education">
      <div className="container edu-ach-grid">
        <div>
          <SectionHeading eyebrow="06 / EDUCATION" title="Academic foundation." />
          <div className="edu-cards">
            {education.map((e) => (
              <FadeIn key={e.degree}>
                <div className="edu-card">
                  <div className="edu-icon"><GraduationCap size={26} /></div>
                  <div>
                    <h3>{e.degree}</h3>
                    <h4>{e.institution}</h4>
                    <div className="edu-meta">
                      <span>{e.period}</span>
                      {e.cgpa && <span className="cgpa-badge">CGPA: {e.cgpa}</span>}
                    </div>
                    <p className="edu-location"><MapPin size={12} />{e.location}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
        <div>
          <SectionHeading eyebrow="07 / ACHIEVEMENTS" title="Other highlights." />
          <div className="achievement-grid">
            {achievements.map((a, i) => (
              <FadeIn key={a.title} delay={i * 0.1} direction="right">
                <div className="achievement-card" style={{ '--ach-color': a.color }}>
                  <div className="ach-icon-wrap">
                    <span className="ach-icon">{a.icon}</span>
                  </div>
                  <div>
                    <h4>{a.title}</h4>
                    <p>{a.description}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Contact Form ─────────────────────────────────────────────────────────────
function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email required';
    if (!form.subject.trim()) e.subject = 'Subject is required';
    if (!form.message.trim() || form.message.length < 20) e.message = 'Message must be at least 20 characters';
    return e;
  };

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) setErrors((er) => ({ ...er, [e.target.name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v = validate();
    if (Object.keys(v).length) { setErrors(v); return; }
    setStatus('sending');
    try {
      // Using Formspree (free tier) — replace YOUR_FORM_ID with actual ID from formspree.io
      const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('sent');
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        // Fallback: open mail client
        window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(`From: ${form.name} (${form.email})\n\n${form.message}`)}`;
        setStatus('sent');
      }
    } catch {
      // Fallback: open mail client
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(`From: ${form.name} (${form.email})\n\n${form.message}`)}`;
      setStatus('sent');
    }
  };

  return (
    <section id="contact" className="section section-contact">
      <div className="container contact-layout">
        <div className="contact-info">
          <SectionHeading
            eyebrow="08 / CONTACT"
            title="Let's build something reliable."
            description="Open to relevant conversations about data engineering, cloud data platforms, analytics, and new opportunities."
          />
          <div className="contact-links">
            {[
              { icon: <Mail size={18} />, label: 'EMAIL', value: profile.email, href: `mailto:${profile.email}` },
              { icon: <Linkedin size={18} />, label: 'LINKEDIN', value: 'linkedin.com/in/sravansulige', href: profile.linkedin },
              { icon: <Github size={18} />, label: 'GITHUB', value: 'github.com/ssravan18', href: profile.github },
              { icon: <MapPin size={18} />, label: 'LOCATION', value: profile.location, href: null },
            ].map((link) => (
              <div key={link.label} className="contact-item">
                <span className="contact-icon">{link.icon}</span>
                <div>
                  <small>{link.label}</small>
                  {link.href
                    ? <a href={link.href} target={link.href.startsWith('http') ? '_blank' : '_self'} rel="noreferrer"><b>{link.value}</b></a>
                    : <b>{link.value}</b>
                  }
                </div>
              </div>
            ))}
          </div>
          <div className="contact-availability">
            <span className="pulse-green" />
            <span>Available for data engineering opportunities</span>
          </div>
        </div>

        <div className="contact-form-wrap">
          {status === 'sent' ? (
            <div className="form-success">
              <div className="success-icon"><Check size={32} /></div>
              <h3>Message sent!</h3>
              <p>Thanks for reaching out. I'll get back to you as soon as possible.</p>
              <button className="button button-ghost" onClick={() => setStatus('idle')}>Send another</button>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <h3>Send a message</h3>
              <div className="form-row">
                <div className={`form-group ${errors.name ? 'has-error' : ''}`}>
                  <label htmlFor="name">Name</label>
                  <input id="name" name="name" type="text" placeholder="Your name" value={form.name} onChange={handleChange} />
                  {errors.name && <span className="field-error">{errors.name}</span>}
                </div>
                <div className={`form-group ${errors.email ? 'has-error' : ''}`}>
                  <label htmlFor="email">Email</label>
                  <input id="email" name="email" type="email" placeholder="your@email.com" value={form.email} onChange={handleChange} />
                  {errors.email && <span className="field-error">{errors.email}</span>}
                </div>
              </div>
              <div className={`form-group ${errors.subject ? 'has-error' : ''}`}>
                <label htmlFor="subject">Subject</label>
                <input id="subject" name="subject" type="text" placeholder="What's this about?" value={form.subject} onChange={handleChange} />
                {errors.subject && <span className="field-error">{errors.subject}</span>}
              </div>
              <div className={`form-group ${errors.message ? 'has-error' : ''}`}>
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" rows={5} placeholder="Tell me about the opportunity or project..." value={form.message} onChange={handleChange} />
                {errors.message && <span className="field-error">{errors.message}</span>}
              </div>
              <button type="submit" className="button button-primary" disabled={status === 'sending'} style={{ width: '100%' }}>
                {status === 'sending' ? 'Sending...' : <><Send size={15} /> Send Message</>}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <a className="brand" href="#home">
            <BrandMark />
            <span><strong>Sravan Kumar</strong><small>AZURE DATA ENGINEER</small></span>
          </a>
          <p>Designing pipelines that are understandable, observable, and reliable.</p>
          <div className="footer-socials">
            <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={17} /></a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={17} /></a>
            <a href={`mailto:${profile.email}`} aria-label="Email"><Mail size={17} /></a>
          </div>
        </div>
        <div className="footer-links">
          <h5>Navigate</h5>
          <ul>
            {nav.map(([label, href]) => (
              <li key={href}><a href={href}>{label}</a></li>
            ))}
          </ul>
        </div>
        <div className="footer-contact">
          <h5>Let's Connect</h5>
          <p>I'm open to opportunities and collaborations.<br />Feel free to reach out!</p>
          <a className="button button-primary" href={profile.resume} download style={{ fontSize: 11 }}>
            <ArrowDownRight size={14} /> Download Resume
          </a>
        </div>
      </div>
      <div className="footer-bottom container">
        <small>© {new Date().getFullYear()} Sulige Sravan. All rights reserved.</small>
        <small>Built with React + Vite · Deployed on Azure Static Web Apps</small>
        <a href="#home" className="back-top">BACK TO TOP ↑</a>
      </div>
    </footer>
  );
}

// ─── App Root ─────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <StatsBar />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Certifications />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
