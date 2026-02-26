import { useState, useEffect, useRef } from "react";

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const useInView = (threshold = 0.12) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(() => prefersReducedMotion());
  useEffect(() => {
    if (prefersReducedMotion()) { setIsVisible(true); return; }
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, isVisible];
};

const TypingText = ({ text, delay = 0, style = {} }) => {
  const reduced = prefersReducedMotion();
  const [ref, isVisible] = useInView();
  const [displayed, setDisplayed] = useState(reduced ? text : "");
  const [done, setDone] = useState(reduced);
  const hasRun = useRef(reduced);
  useEffect(() => {
    if (!isVisible || hasRun.current) return;
    hasRun.current = true;
    let i = 0;
    let intervalId;
    const timeout = setTimeout(() => {
      intervalId = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) { clearInterval(intervalId); setDone(true); }
      }, 38);
    }, delay * 1000);
    return () => { clearTimeout(timeout); if (intervalId) clearInterval(intervalId); };
  }, [isVisible]);
  return (
    <p ref={ref} style={style}>
      {displayed}
      <span style={{
        display: "inline-block", width: "1px", height: "0.85em",
        background: "currentColor", marginLeft: "2px", verticalAlign: "text-bottom",
        opacity: done ? 0 : 1,
        animation: done ? "none" : "cursor-blink 1s step-end infinite",
        transition: done ? "opacity 0.4s ease 0.6s" : "none",
      }} />
    </p>
  );
};

const FadeIn = ({ children, delay = 0, className = "", style = {} }) => {
  const [ref, isVisible] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
};

const SectionLabel = ({ children, center }) => (
  <div className={`section-label${center ? " section-label-center" : ""}`}>{children}</div>
);

const SectionHeading = ({ children }) => (
  <h2 className="section-title">{children}</h2>
);

const PublicationList = ({ title, items }) => (
  <div style={{ marginBottom: 40 }}>
    <div className="sub-label">{title}</div>
    {items.map((p, i) => (
      <div key={i} className="pub-item">
        <a href={p.url} className="pub-title" target="_blank" rel="noopener noreferrer">{p.title}</a>
        <div className="pub-journal">{p.subtitle}</div>
      </div>
    ))}
  </div>
);

const CountUpValue = ({ value }) => {
  const [ref, isVisible] = useInView();
  const hasRun = useRef(false);
  const init = value.replace(/\d+/, "0");
  const [display, setDisplay] = useState(init);

  useEffect(() => {
    if (!isVisible || hasRun.current) return;
    const m = value.match(/^([^0-9]*)(\d+)(.*)$/);
    if (!m) return;
    hasRun.current = true;
    const [, pre, num, suf] = m;
    const target = parseInt(num, 10);
    const dur = 1200;
    const t0 = performance.now();
    let raf;
    (function tick(now) {
      const p = Math.min((now - t0) / dur, 1);
      setDisplay(`${pre}${Math.round((1 - (1 - p) ** 3) * target)}${suf}`);
      if (p < 1) raf = requestAnimationFrame(tick);
    })(t0);
    return () => cancelAnimationFrame(raf);
  }, [isVisible, value]);

  return <div ref={ref} className="metric-value">{display}</div>;
};

const NAV_LINKS = ["About", "Philosophy", "Experience", "Impact", "Digital R&D", "Publications", "Contact"];
const toSlug = (s) => s.toLowerCase().replace(/\s+/g, "-").replace("&", "and");
const NAV_SLUGS = NAV_LINKS.map(toSlug);

export default function PersonalSite() {
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [simpleMode, setSimpleMode] = useState(false);

  useEffect(() => {
    document.body.style.background = isDark ? "#0a0a0a" : "#f0ede8";
    document.body.style.transition = "background 0.4s ease";
  }, [isDark]);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrollY(window.scrollY);
        document.documentElement.style.setProperty(
          '--scroll-progress',
          String(window.scrollY / (document.documentElement.scrollHeight - window.innerHeight || 1))
        );
        for (let i = NAV_SLUGS.length - 1; i >= 0; i--) {
          const el = document.getElementById(NAV_SLUGS[i]);
          if (el && el.getBoundingClientRect().top < 200) {
            setActiveSection(NAV_SLUGS[i]);
            break;
          }
        }
        ticking = false;
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(toSlug(id))?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div style={{ fontFamily: "'Source Serif 4', 'Georgia', serif", background: "var(--clr-bg)", color: "var(--clr-text)", minHeight: "100vh", transition: "background 0.4s ease, color 0.4s ease" }}>
      <style>{`
        :root {
          --clr-bg: ${isDark ? '#0a0a0a' : '#f0ede8'};
          --clr-bg-section: ${isDark ? '#0d0c0b' : '#e8e4df'};
          --clr-bg-card: ${isDark ? '#0f0e0d' : '#faf8f5'};
          --clr-text: ${isDark ? '#e8e4df' : '#1a1815'};
          --clr-text-sec: ${isDark ? '#a09a93' : '#5a5550'};
          --clr-text-sec-light: ${isDark ? '#d4cfc8' : '#3d3930'};
          --clr-text-muted: ${isDark ? '#6b665e' : '#8a8480'};
          --clr-text-footer: ${isDark ? '#3d3a36' : '#b0aba4'};
          --clr-accent: ${isDark ? '#c4956a' : '#9a6f3a'};
          --clr-accent-hover: ${isDark ? '#d4a57a' : '#b07f45'};
          --clr-accent-muted: ${isDark ? 'rgba(196,149,106,0.27)' : 'rgba(154,111,58,0.27)'};
          --clr-accent-subtle: ${isDark ? 'rgba(196,149,106,0.2)' : 'rgba(154,111,58,0.2)'};
          --clr-border: ${isDark ? '#1f1d1a' : '#d8d3cc'};
          --clr-border-subtle: ${isDark ? '#1a1917' : '#ddd9d2'};
          --clr-border-faint: ${isDark ? '#141311' : '#e5e2dc'};
          --clr-border-btn: ${isDark ? '#2a2724' : '#c0bab2'};
          --clr-nav-bg: ${isDark ? 'rgba(10,10,10,0.85)' : 'rgba(240,237,232,0.85)'};
          --clr-mobile-menu: ${isDark ? 'rgba(10,10,10,0.97)' : 'rgba(240,237,232,0.97)'};
          --clr-selection-bg: ${isDark ? '#c4956a' : '#9a6f3a'};
          --clr-selection-color: ${isDark ? '#0a0a0a' : '#f0ede8'};
        }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { background: var(--clr-bg); }
        ::selection { background: var(--clr-selection-bg); color: var(--clr-selection-color); }
        *:focus-visible { outline: 2px solid var(--clr-accent); outline-offset: 2px; }

        .nav-fixed {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
          transition: all 0.4s ease;
        }
        .nav-link {
          font-family: 'DM Sans', sans-serif; font-size: 12.5px; font-weight: 400;
          letter-spacing: 1.2px; text-transform: uppercase; color: var(--clr-text-sec);
          background: none; border: none; cursor: pointer; padding: 8px 0;
          position: relative; transition: color 0.3s; white-space: nowrap;
        }
        .nav-link:hover, .nav-link.active { color: var(--clr-text); }
        .nav-link::after {
          content: ''; position: absolute; bottom: 4px; left: 0; width: 0; height: 1px;
          background: var(--clr-accent); transition: width 0.3s;
        }
        .nav-link:hover::after, .nav-link.active::after { width: 100%; }

        .scroll-progress {
          position: fixed; top: 0; left: 0; right: 0; height: 2px;
          background: var(--clr-accent); transform-origin: left;
          transform: scaleX(var(--scroll-progress, 0));
          z-index: 101; pointer-events: none;
        }

        .back-to-top {
          position: fixed; bottom: 32px; right: 32px; z-index: 50;
          width: 44px; height: 44px; border-radius: 50%;
          background: var(--clr-border); border: 1px solid var(--clr-border-btn); color: var(--clr-accent);
          font-size: 18px; cursor: pointer;
          opacity: 0; transform: translateY(8px);
          transition: opacity 0.3s, transform 0.3s, background 0.3s;
          display: flex; align-items: center; justify-content: center;
        }
        .back-to-top.visible { opacity: 1; transform: translateY(0); }
        .back-to-top:hover { background: var(--clr-border-btn); }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0; transform: scale(1.8); }
        }
        @keyframes cursor-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .status-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: #4ade80; display: inline-block; position: relative;
        }
        .status-dot::after {
          content: ''; position: absolute; inset: -3px; border-radius: 50%;
          background: #4ade80; animation: pulse 2s ease-in-out infinite;
        }

        .topo-overlay {
          position: fixed; top: 0; left: 0; width: 100%; height: 100%;
          pointer-events: none; z-index: 99; opacity: ${isDark ? 0.07 : 0.06};
          background-image: url("/topo.svg");
          background-size: cover;
          background-position: center;
          ${isDark ? 'filter: invert(1);' : ''}
        }

        .section-label {
          font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 500;
          letter-spacing: 3px; text-transform: uppercase; color: var(--clr-accent); margin-bottom: 12px;
          position: relative; padding-left: 64px;
        }
        .section-label::before {
          content: ''; position: absolute; left: 0; top: 50%;
          width: 48px; height: 24px; transform: translateY(-50%); background-color: var(--clr-accent);
          -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 24' fill='none' stroke='currentColor' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M4 12l6-6 6 6 6-6 6 6 6-6 6 6'/%3E%3Cpath d='M10 6v-4M22 6v-4M34 6v-4'/%3E%3Cpath d='M16 12v4M28 12v4M40 12v4'/%3E%3Cpath d='M15 16h2M27 16h2M39 16h2'/%3E%3C/svg%3E");
          mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 24' fill='none' stroke='currentColor' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M4 12l6-6 6 6 6-6 6 6 6-6 6 6'/%3E%3Cpath d='M10 6v-4M22 6v-4M34 6v-4'/%3E%3Cpath d='M16 12v4M28 12v4M40 12v4'/%3E%3Cpath d='M15 16h2M27 16h2M39 16h2'/%3E%3C/svg%3E");
          -webkit-mask-size: contain;
          mask-size: contain;
          -webkit-mask-repeat: no-repeat;
          mask-repeat: no-repeat;
          -webkit-mask-position: center;
          mask-position: center;
        }
        .section-label-center {
          padding-left: 0; text-align: center;
        }
        .section-label-center::before { display: none; }

        .section-title {
          font-family: 'Source Serif 4', serif; font-size: clamp(28px, 4vw, 42px);
          font-weight: 300; line-height: 1.2; color: var(--clr-text); margin-bottom: 40px;
        }
        .section-title em { font-style: italic; color: var(--clr-accent); }

        .metric-card {
          border: 1px solid var(--clr-border); padding: 32px; position: relative;
          background: linear-gradient(135deg, var(--clr-bg-card) 0%, var(--clr-bg) 100%);
          transition: border-color 0.4s, transform 0.3s; height: 100%;
        }
        .metric-card:hover { border-color: var(--clr-accent-muted); transform: translateY(-2px); }
        .metric-value {
          font-family: 'Source Serif 4', serif; font-size: clamp(36px, 5vw, 56px);
          font-weight: 300; color: var(--clr-accent); line-height: 1;
        }
        .metric-label {
          font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 400;
          color: var(--clr-text-sec); margin-top: 12px; line-height: 1.5; letter-spacing: 0.3px;
        }

        .timeline-item {
          border-left: 1px solid var(--clr-border); padding-left: 32px; padding-bottom: 48px;
          position: relative;
        }
        .timeline-item::before {
          content: ''; position: absolute; left: -4px; top: 6px;
          width: 7px; height: 7px; border-radius: 50%;
          background: var(--clr-accent); border: 2px solid var(--clr-bg);
        }
        .timeline-company {
          font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 500;
          letter-spacing: 2px; text-transform: uppercase; color: var(--clr-accent);
        }
        .timeline-role {
          font-family: 'Source Serif 4', serif; font-size: clamp(20px, 2.5vw, 26px);
          font-weight: 400; color: var(--clr-text); margin: 8px 0 4px;
        }
        .timeline-date {
          font-family: 'JetBrains Mono', monospace; font-size: 12px; color: var(--clr-text-muted);
          letter-spacing: 0.5px;
        }
        .timeline-desc {
          font-family: 'DM Sans', sans-serif; font-size: 15px; line-height: 1.7;
          color: var(--clr-text-sec); margin-top: 16px;
        }

        .pub-item {
          display: flex; justify-content: space-between; align-items: baseline; gap: 24px;
          padding: 20px 0; border-bottom: 1px solid var(--clr-border-subtle); transition: padding-left 0.3s;
        }
        .pub-item:hover { padding-left: 8px; }
        .pub-title {
          font-family: 'Source Serif 4', serif; font-size: 15px; font-weight: 400;
          color: var(--clr-text-sec-light); line-height: 1.5;
        }
        a.pub-title {
          text-decoration: none; transition: color 0.3s;
        }
        a.pub-title:hover { color: var(--clr-accent); }
        .pub-journal {
          font-family: 'DM Sans', sans-serif; font-size: 12px; color: var(--clr-text-muted);
          margin-top: 4px; letter-spacing: 0.3px; flex-shrink: 0; white-space: nowrap;
        }

        .tag {
          display: inline-block; font-family: 'JetBrains Mono', monospace;
          font-size: 11px; padding: 6px 14px; border: 1px solid var(--clr-border);
          color: var(--clr-text-sec); margin: 4px; transition: all 0.3s;
        }
        .tag:hover { border-color: var(--clr-accent); color: var(--clr-accent); }

        .contact-link {
          font-family: 'DM Sans', sans-serif; font-size: 15px; color: var(--clr-text-sec);
          text-decoration: none; border-bottom: 1px solid transparent;
          transition: all 0.3s; padding-bottom: 2px;
        }
        .contact-link:hover { color: var(--clr-accent); border-bottom-color: var(--clr-accent); }

        .sub-label {
          font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500;
          letter-spacing: 2px; text-transform: uppercase; color: var(--clr-text-muted); margin-bottom: 16px;
        }

        .hero-line { position: absolute; background: var(--clr-border-subtle); }

        .philosophy-card {
          padding: 40px; border: 1px solid var(--clr-border); position: relative;
          background: linear-gradient(145deg, var(--clr-bg-card) 0%, var(--clr-bg) 100%);
          transition: border-color 0.4s; height: 100%;
        }
        .philosophy-card:hover { border-color: var(--clr-accent-subtle); }
        .philosophy-num {
          font-family: 'JetBrains Mono', monospace; font-size: 11px; color: var(--clr-accent);
          letter-spacing: 2px; margin-bottom: 16px;
        }
        .philosophy-heading {
          font-family: 'Source Serif 4', serif; font-size: 20px; font-weight: 400;
          color: var(--clr-text); margin-bottom: 12px;
        }
        .philosophy-text {
          font-family: 'DM Sans', sans-serif; font-size: 14px; line-height: 1.7;
          color: var(--clr-text-sec);
        }

        .headshot-wrapper {
          width: clamp(160px, 20vw, 220px); height: clamp(160px, 20vw, 220px);
          border-radius: 50%; overflow: hidden; position: relative;
          border: 2px solid var(--clr-border); flex-shrink: 0;
        }
        .headshot-wrapper::after {
          content: ''; position: absolute; inset: 0; border-radius: 50%;
          box-shadow: inset 0 0 30px rgba(0,0,0,0.4);
        }
        .headshot-wrapper img {
          width: 100%; height: 100%; object-fit: cover; object-position: center 15%;
          filter: grayscale(15%) contrast(1.05);
        }

        .digital-grid-card {
          padding: 32px; border: 1px solid var(--clr-border);
          background: linear-gradient(145deg, var(--clr-bg-card) 0%, var(--clr-bg) 100%);
          transition: border-color 0.4s; height: 100%;
        }
        .digital-grid-card:hover { border-color: var(--clr-accent-subtle); }

        .beyond-item {
          display: flex; gap: 16px; align-items: baseline;
          padding: 16px 0; border-bottom: 1px solid var(--clr-border-faint);
        }
        .beyond-icon {
          font-family: 'JetBrains Mono', monospace; font-size: 11px;
          color: var(--clr-accent); letter-spacing: 1px; flex-shrink: 0; width: 24px;
        }
        .beyond-text {
          font-family: 'DM Sans', sans-serif; font-size: 15px; line-height: 1.6;
          color: var(--clr-text-sec);
        }

        .toggle-simple {
          font-family: 'JetBrains Mono', monospace; font-size: 12px;
          color: var(--clr-text-muted); background: none; border: none;
          cursor: pointer; padding: 0; margin-top: 24px;
          border-bottom: 1px dashed var(--clr-border);
          transition: color 0.3s, border-color 0.3s;
        }
        .toggle-simple:hover { color: var(--clr-accent); border-color: var(--clr-accent); }

        .motto-text {
          font-family: 'JetBrains Mono', monospace; font-size: clamp(11px, 1.2vw, 13px);
          letter-spacing: 3px; text-transform: uppercase; color: var(--clr-text-muted);
        }

        .hamburger {
          display: none; background: none; border: none; cursor: pointer;
          width: 32px; height: 24px; position: relative;
        }
        .hamburger span {
          display: block; width: 100%; height: 1px; background: var(--clr-text);
          position: absolute; transition: all 0.3s;
        }
        .hamburger span:nth-child(1) { top: 4px; }
        .hamburger span:nth-child(2) { top: 11px; }
        .hamburger span:nth-child(3) { top: 18px; }

        .mobile-menu {
          display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0;
          background: var(--clr-mobile-menu); z-index: 200;
          flex-direction: column; align-items: center; justify-content: center; gap: 32px;
        }
        .mobile-menu.open { display: flex; }
        .mobile-menu button {
          font-family: 'Source Serif 4', serif; font-size: 28px; font-weight: 300;
          background: none; border: none; color: var(--clr-text); cursor: pointer;
        }
        .mobile-close {
          position: absolute; top: 24px; right: 24px; background: none;
          border: none; color: var(--clr-text-sec); font-size: 28px; cursor: pointer;
        }

        @media (max-width: 768px) {
          .nav-links-desktop { display: none !important; }
          .hamburger { display: block; }
          .hero-grid { flex-direction: column-reverse !important; text-align: center !important; }
          .hero-grid .headshot-wrapper { margin: 0 auto 32px; }
          .hero-buttons { justify-content: center !important; }
          .about-columns { grid-template-columns: 1fr !important; }
          .philosophy-grid { grid-template-columns: 1fr !important; }
          .digital-grid { grid-template-columns: 1fr !important; }
          .pub-item { flex-direction: column; gap: 4px; }
          .back-to-top { bottom: 20px; right: 20px; }
        }
      `}</style>

      <div className="topo-overlay" />

      {/* Navigation */}
      <nav className="nav-fixed" style={{
        background: scrollY > 60 ? "var(--clr-nav-bg)" : "transparent",
          borderBottom: scrollY > 60 ? "1px solid var(--clr-border-subtle)" : "1px solid transparent",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "16px 32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500, letterSpacing: 2, textTransform: "uppercase", color: "var(--clr-text)" }}>
            JPS
          </div>
          <div className="nav-links-desktop" style={{ display: "flex", gap: 28 }}>
            {NAV_LINKS.map((link, i) => (
              <button key={link} className={`nav-link ${activeSection === NAV_SLUGS[i] ? "active" : ""}`} onClick={() => scrollTo(link)}>
                {link}
              </button>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button
              onClick={() => setIsDark(d => !d)}
              title={isDark ? "sp\u00B2 \u2014 graphite" : "sp\u00B3 \u2014 diamond"}
              aria-label="Toggle hybridization theme"
              style={{
                background: "none",
                border: "1px solid var(--clr-border)",
                color: "var(--clr-accent)",
                cursor: "pointer",
                height: 32,
                padding: "0 10px",
                display: "flex",
                alignItems: "center",
                gap: 6,
                borderRadius: 3,
                transition: "border-color 0.3s, color 0.3s",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 13,
                letterSpacing: 0.5,
                flexShrink: 0,
              }}
            >
              {isDark ? (
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12,2 20.5,7 20.5,17 12,22 3.5,17 3.5,7" />
                  <line x1="12" y1="2" x2="12" y2="22" />
                  <line x1="3.5" y1="7" x2="20.5" y2="17" />
                  <line x1="20.5" y1="7" x2="3.5" y2="17" />
                </svg>
              ) : (
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12,1 23,9 12,23 1,9" />
                  <polyline points="1,9 7,9 12,1 17,9 23,9" />
                  <line x1="7" y1="9" x2="12" y2="23" />
                  <line x1="17" y1="9" x2="12" y2="23" />
                </svg>
              )}
              sp{isDark ? "\u00B2" : "\u00B3"}
            </button>
            <button className="hamburger" onClick={() => setMenuOpen(true)} aria-label="Open menu">
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>

      {/* Scroll Progress */}
      <div className="scroll-progress" />

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <button className="mobile-close" onClick={() => setMenuOpen(false)} aria-label="Close menu">&#10005;</button>
        {NAV_LINKS.map((link) => (
          <button key={link} onClick={() => scrollTo(link)}>{link}</button>
        ))}
      </div>

      {/* Hero */}
      <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden", paddingTop: 80 }}>
        <div className="hero-line" style={{ width: 1, height: "40%", top: 0, left: "12%", opacity: 0.4 }} />
        <div className="hero-line" style={{ width: 1, height: "25%", bottom: 0, right: "18%", opacity: 0.25 }} />
        <div className="hero-line" style={{ width: "20%", height: 1, top: "25%", right: 0, opacity: 0.25 }} />

        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 32px", width: "100%" }}>
          <div className="hero-grid" style={{ display: "flex", alignItems: "center", gap: "clamp(40px, 6vw, 80px)" }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 20, padding: "6px 16px", border: "1px solid var(--clr-border)", borderRadius: 20 }}>
                <span className="status-dot" />
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 500, letterSpacing: 0.5, color: "var(--clr-text-sec)" }}>
                  Open to Opportunities
                </span>
              </div>

              <div className="motto-text" style={{ marginBottom: 28 }}>
                Do science &middot; Make money &middot; Have fun
              </div>

              <h1 style={{
                fontFamily: "'Source Serif 4', serif", fontSize: "clamp(40px, 6vw, 76px)",
                fontWeight: 300, lineHeight: 1.05, color: "var(--clr-text)", marginBottom: 24, letterSpacing: "-0.02em",
              }}>
                John P.<br />Swanson
                <span style={{
                  display: "block", fontSize: "clamp(14px, 1.6vw, 17px)",
                  fontFamily: "'DM Sans', sans-serif", fontWeight: 300,
                  color: "var(--clr-text-muted)", marginTop: 10, letterSpacing: 1,
                }}>
                  R&D Director &middot; Ph.D. Polymer Science &middot; Cleveland
                </span>
              </h1>

              <p style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(15px, 1.5vw, 17px)",
                fontWeight: 300, color: "var(--clr-text-sec)", maxWidth: 540, lineHeight: 1.75,
              }}>
                I build R&D functions that turn science into revenue and build
                the teams to run them. I've built a $50M+ product pipeline and I've officiated
                four weddings. Both require understanding what people actually need.
              </p>

              <div className="hero-buttons" style={{ marginTop: 40, display: "flex", gap: 20, flexWrap: "wrap" }}>
                <button onClick={() => scrollTo("Contact")} style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500,
                  letterSpacing: 1.5, textTransform: "uppercase", padding: "14px 36px",
                  background: "var(--clr-accent)", color: "var(--clr-bg)", border: "none", cursor: "pointer",
                  transition: "all 0.3s",
                }}
                  onMouseEnter={(e) => e.target.style.background = "var(--clr-accent-hover)"}
                  onMouseLeave={(e) => e.target.style.background = "var(--clr-accent)"}
                >
                  Get in Touch
                </button>
                <button onClick={() => scrollTo("Experience")} style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500,
                  letterSpacing: 1.5, textTransform: "uppercase", padding: "14px 36px",
                  background: "transparent", color: "var(--clr-text-sec)", border: "1px solid var(--clr-border-btn)",
                  cursor: "pointer", transition: "all 0.3s",
                }}
                  onMouseEnter={(e) => { e.target.style.borderColor = "var(--clr-accent)"; e.target.style.color = "var(--clr-text)"; }}
                  onMouseLeave={(e) => { e.target.style.borderColor = "var(--clr-border-btn)"; e.target.style.color = "var(--clr-text-sec)"; }}
                >
                  View Experience
                </button>
              </div>
            </div>

            <div className="headshot-wrapper">
              <picture>
                <source srcSet="/headshot.webp" type="image/webp" />
                <img src="/headshot.jpg" alt="John P. Swanson" />
              </picture>
            </div>
          </div>
        </div>

        <div style={{ position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)" }}>
          <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom, transparent, var(--clr-accent))" }} />
        </div>
      </section>

      {/* About */}
      <section id="about" style={{ maxWidth: 900, margin: "0 auto", padding: "120px 32px" }}>
        <FadeIn>
          <SectionLabel>About</SectionLabel>
          <SectionHeading>I connect research<br />to <em>results</em>.</SectionHeading>
        </FadeIn>
        <FadeIn delay={0.15}>
          {simpleMode ? (
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 17, lineHeight: 1.9, color: "var(--clr-text-sec)", maxWidth: 600 }}>
              <p>You know how some stuff melts when it gets hot and some stuff breaks when you bend it? I figure out how to make stuff that doesn't do either of those things. Scientists and business people speak different languages. I speak both. But mostly I write emails about it.</p>
            </div>
          ) : (
            <div className="about-columns" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, fontFamily: "'DM Sans', sans-serif", fontSize: 15, lineHeight: 1.8, color: "var(--clr-text-sec)" }}>
              <div>
                <p>
                  Every role follows one pattern: I build things that didn't exist before. Platforms,
                  pipelines, teams, processes. Then I make sure they ship. I work across the table from
                  sales, manufacturing, executives, and external partners, and I'm as fluent in the lab
                  as I am in the boardroom. I connect those worlds.
                </p>
                <p style={{ marginTop: 16 }}>
                  I'm a polymer scientist by training, but the pattern is always the same:
                  understand the real need, build the solution, make the business case, and
                  drive it to revenue.
                </p>
              </div>
              <div>
                <p>
                  At NeoGraf I inherited a four-person R&D team and made three new hires to build out the function. At Avient I designed
                  LDP rotation assignments that added capacity at zero cost, and mentored every
                  associate through real projects, not busywork. I care about structure: stage-gates,
                  clear ownership, documented processes. Good systems let good scientists focus on
                  science instead of fighting the organization.
                </p>
                <p style={{ marginTop: 16 }}>
                  I've loved science since I was a kid building model rockets and trebuchets in middle
                  school. That curiosity hasn't changed. I still love asking questions, understanding
                  how things work, and figuring out how to make them better. I just get to do it at
                  a bigger scale now.
                </p>
              </div>
            </div>
          )}
          <button className="toggle-simple" onClick={() => setSimpleMode(s => !s)}>
            {simpleMode ? "\u2190 Back to the real version" : "Explain it to a five-year-old \u2192"}
          </button>
        </FadeIn>
      </section>

      {/* Philosophy */}
      <section id="philosophy" style={{ background: "var(--clr-bg-section)", padding: "120px 0" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 32px" }}>
          <FadeIn>
            <SectionLabel>How I Work</SectionLabel>
            <SectionHeading>Principles, not <em>platitudes</em>.</SectionHeading>
          </FadeIn>

          <div className="philosophy-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 1 }}>
            {[
              {
                num: "01",
                heading: "Leave it better than you found it",
                text: "Product lines, labs, teams, processes. My measure of success is whether things are meaningfully better because I was involved. I hate waste. I love solving problems. If something's broken, I'm probably already sketching a fix.",
              },
              {
                num: "02",
                heading: "Translate, don't gatekeep",
                text: "The best R&D leaders are bilingual: they speak science and they speak business. I sit between the lab and the P&L and make both sides feel understood. Customer requirements become technical specifications. Data becomes a story executives can act on.",
              },
              {
                num: "03",
                heading: "Build the team, then get out of the way",
                text: "Hire well, set clear goals, remove blockers, and trust people to deliver. I invest in structured onboarding and real development conversations. Good scientists don't need micromanagement. They need a culture where they can say 'I don't know' without getting punished for it. They need air cover.",
              },
              {
                num: "04",
                heading: "Innovation is the fire, not the spark",
                text: "Invention creates something new. Innovation turns it into business value. I didn't invent polyketone or graphite materials. I built the systems, IP strategy, and commercial pathways that turned them into revenue. That distinction matters to me, and it shapes how I run R&D.",
              },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.1} style={{ height: "100%" }}>
                <div className="philosophy-card">
                  <div className="philosophy-num">{item.num}</div>
                  <div className="philosophy-heading">{item.heading}</div>
                  <div className="philosophy-text">{item.text}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" style={{ maxWidth: 800, margin: "0 auto", padding: "120px 32px" }}>
        <FadeIn>
          <SectionLabel>Experience</SectionLabel>
          <SectionHeading>Where I've done the <em>work</em>.</SectionHeading>
        </FadeIn>

        <div style={{ marginTop: 24 }}>
          {[
            {
              company: "NeoGraf Solutions",
              role: "Director of R&D",
              date: "2024 — 2026",
              desc: "Inherited a four-person R&D team and made three new hires to build out the function. Turned it into a stage-gate organization and grew the development pipeline to multimillion-dollar scale across thermal, flame retardant, fuel cell, and sealing applications. Wrote the IP policy from scratch (25 documents condensed to 4 people would actually read), deployed electronic lab notebooks, and built patent analytics and portfolio reviews. Helped manage a $2M DOE-funded program for fuel cell bipolar plate development. Presented innovation strategy quarterly to the Board. Zero safety incidents in 24 months.",
            },
            {
              company: "Avient Corporation",
              role: "Technology Manager — Specialty Engineered Materials",
              date: "2022 — 2024",
              desc: "Led a team of 6 scientists delivering customized solutions across 22 engineered thermoplastic product lines. Generated $12M+ in new revenue through product launches and global technology transfers. Reduced R&D working capital by 93% through strategic inventory management. Doubled year-over-year invention records. Hosted R&D Leadership Development Program rotations, mentoring early-career scientists through structured product line and project assignments. Designed digital workflow systems that streamlined project management for a 25-person organization.",
            },
            {
              company: "Avient Corporation",
              role: "Lead R&D Engineer — Specialty Engineered Materials",
              date: "2018 — 2022",
              desc: "Identified aliphatic polyketone as a compounding opportunity and developed patented blend families that grew into a $50M+ global sales pipeline across four international business units, earning three Technology Excellence Awards. Developed biodegradable packaging generating a $34.5M pipeline. Led rapid customer co-development for brands including Bose ($1.53M launch).",
            },
            {
              company: "PolyOne Corporation",
              role: "Senior R&D Engineer — Leadership Development Program",
              date: "2016 — 2018",
              desc: "Selected for competitive corporate R&D leadership program with rotations across Lean Six Sigma, DOE, thermoplastic composite formulation, processing, and analytical methods. Learned how a $3B company actually moves products from lab to market.",
            },
            {
              company: "University of Akron",
              role: "Ph.D. Polymer Science — NSF Graduate Research Fellow",
              date: "2011 — 2016",
              desc: "Designed and synthesized thermoresponsive biodegradable polyesters for biomedical applications. Published across Macromolecules, Polymer Chemistry, and ACS Macro Letters. Research became the foundation for D-Glue thermoresponsive adhesive technology. 3.73 GPA.",
            },
          ].map((item, i) => (
            <FadeIn key={i} delay={i * 0.07}>
              <div className="timeline-item">
                <div className="timeline-company">{item.company}</div>
                <div className="timeline-role">{item.role}</div>
                <div className="timeline-date">{item.date}</div>
                <div className="timeline-desc">{item.desc}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Impact */}
      <section id="impact" style={{ background: "var(--clr-bg-section)", padding: "120px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
          <FadeIn>
            <SectionLabel>Impact</SectionLabel>
            <SectionHeading>The numbers behind the <em>work</em>.</SectionHeading>
          </FadeIn>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 1 }}>
            {[
              { value: "$50M+", label: "Global sales pipeline built from aliphatic polyketone platform at Avient" },
              { value: "$12M+", label: "New product revenue across multiple launches and technology transfers" },
              { value: "12", label: "Patents in thermoplastic blends, composites & biodegradable materials" },
              { value: "9", label: "Peer-reviewed publications in Macromolecules, Polymer Chemistry & ACS Macro Letters" },
              { value: "22", label: "Product lines managed across global business units" },
              { value: "$18M+", label: "NPI pipeline developed as Director of R&D across thermal, FR, fuel cell & sealing applications" },
              { value: "25", label: "Documents in IP policy framework: invention disclosure triage, trade secret management, FTO analysis & role-specific training" },
              { value: "93%", label: "Reduction in R&D working capital through proactive management" },
            ].map((m, i) => (
              <FadeIn key={i} delay={i * 0.06} style={{ height: "100%" }}>
                <div className="metric-card">
                  <CountUpValue value={m.value} />
                  <div className="metric-label">{m.label}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Digital R&D */}
      <section id="digital-randd" style={{ maxWidth: 1000, margin: "0 auto", padding: "120px 32px" }}>
        <FadeIn>
          <SectionLabel>Point of View</SectionLabel>
          <SectionHeading>The next generation of R&D is <em>digital</em>.</SectionHeading>
        </FadeIn>

        <FadeIn delay={0.1}>
          <p style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 16, lineHeight: 1.8,
            color: "var(--clr-text-sec)", maxWidth: 700, marginBottom: 48,
          }}>
            Every team I've led, I've built digital systems to make the science faster
            and the decisions sharper. Not because I read an article about digital
            transformation, but because I got tired of watching scientists spend their time
            on work a machine should do.
          </p>
        </FadeIn>

        <div className="digital-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 1 }}>
          {[
            {
              label: "AI-Powered Data Tools",
              desc: "Scientists were spending hours every week on manual data entry. I built tools to fix that: automated parsing of certificates of analysis, legacy test data extraction, and searchable databases that actually get used.",
            },
            {
              label: "Patent Analytics & IP Strategy",
              desc: "Patent searches used to take weeks and cost a fortune in outside counsel. I championed bringing in a patent analytics platform for prior-art searches, competitor monitoring, and freedom-to-operate analyses, then got the team actually using it. Hours instead of weeks.",
            },
            {
              label: "Electronic Lab Notebooks",
              desc: "Moved the lab from paper notebooks to a structured ELN. Standardized experimental templates so when someone leaves, their data doesn't leave with them.",
            },
            {
              label: "Innovation Management",
              desc: "Built innovation management systems that connect the pipeline to the P&L: voice-of-customer data feeding into stage-gate workflows, with portfolio dashboards that show what's actually making money.",
            },
          ].map((item, i) => (
            <FadeIn key={i} delay={i * 0.08} style={{ height: "100%" }}>
              <div className="digital-grid-card">
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500, color: "var(--clr-accent)", marginBottom: 12, letterSpacing: 0.5 }}>
                  {item.label}
                </div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, lineHeight: 1.7, color: "var(--clr-text-sec)" }}>
                  {item.desc}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <TypingText
          text="Full disclosure: this website was built with AI too."
          delay={0.3}
          style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: "var(--clr-text-muted)",
            marginTop: 32, fontStyle: "normal", minHeight: "1.6em",
          }}
        />
      </section>

      {/* Technical Expertise */}
      <section style={{ background: "var(--clr-bg-section)", padding: "120px 0" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 32px" }}>
          <FadeIn>
            <SectionLabel>Technical Expertise</SectionLabel>
            <SectionHeading>What I <em>work</em> with.</SectionHeading>
          </FadeIn>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 48 }}>
            {[
              {
                heading: "Materials & Formulation",
                tags: ["Polyamides", "Polyketone", "Polyolefins", "TPEs", "Specialty Chemical Formulations", "Biodegradable Polymers", "Flame Retardants", "Masterbatching", "Composites"],
              },
              {
                heading: "Characterization & Processing",
                tags: ["DSC / TGA / TMA", "Polymer Rheology", "Mechanical Testing (ASTM & ISO)", "Extrusion & Compounding", "Injection Molding", "Blown Film", "Multilayer Coextrusion"],
              },
              {
                heading: "Leadership & Methods",
                tags: ["Stage-Gate (Cooper)", "DOE / Lean Six Sigma", "Team Building & Talent Development", "Digital R&D Transformation", "Patent Strategy & FTO", "IP Policy & Trade Secret Management", "Voice of Customer Integration", "Innovation Portfolio Management", "Stakeholder Engagement", "Grant Program Management"],
              },
            ].map((cat, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500, color: "var(--clr-accent)", marginBottom: 16, letterSpacing: 0.5 }}>
                    {cat.heading}
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 0 }}>
                    {cat.tags.map((tag, j) => <span key={j} className="tag">{tag}</span>)}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Publications */}
      <section id="publications" style={{ maxWidth: 900, margin: "0 auto", padding: "120px 32px" }}>
        <FadeIn>
          <SectionLabel>Selected Work</SectionLabel>
          <SectionHeading><em>Publications</em> & Patents</SectionHeading>
        </FadeIn>

        <FadeIn delay={0.1}>
          <PublicationList title="Patents (selected from 12)" items={[
            { title: "Continuous fiber reinforced tapes", subtitle: "WO/2024/243499, 2024", url: "https://patents.google.com/patent/WO2024243499A1/en" },
            { title: "Thermoset articles comprising nitrile butadiene rubber", subtitle: "WO/2023/278572, 2023", url: "https://patents.google.com/patent/WO2023278572A1/en" },
            { title: "Polymer blends of aliphatic polyketone and ABS", subtitle: "WO/2022/047030, 2022", url: "https://patents.google.com/patent/WO2022047030A1/en" },
            { title: "Polymer blends of polyamide and aliphatic polyketone", subtitle: "WO/2022/005896, 2022", url: "https://patents.google.com/patent/WO2022005896A1/en" },
            { title: "Thermoresponsive Polyesters", subtitle: "US Patent 10,106,514, 2018", url: "https://patents.google.com/patent/US10106514B2/en" },
            { title: "Vegetable oil based viscoelastic polymers with photoresponsive properties", subtitle: "US Patent 10,899,885, 2021", url: "https://patents.google.com/patent/US10899885B2/en" },
          ]} />
        </FadeIn>

        <FadeIn delay={0.15}>
          <PublicationList title="Journal Articles (selected from 9)" items={[
            { title: "A Library of Thermoresponsive, Coacervate-Forming Biodegradable Polyesters", subtitle: "Macromolecules, 2015 — Most Read Article, June & July 2015", url: "https://doi.org/10.1021/acs.macromol.5b00585" },
            { title: "The Effect of Pendant Group Structure on the Thermoresponsive Properties of N-Substituted Polyesters", subtitle: "Polymer Chemistry, 2017", url: "https://doi.org/10.1039/C7PY01391D" },
            { title: "Efficient Protein Encapsulation within Thermoresponsive Coacervate-Forming Biodegradable Polyesters", subtitle: "ACS Macro Letters, 2018", url: "https://doi.org/10.1021/acsmacrolett.8b00118" },
            { title: "A Solvent and Initiator Free, Low-Modulus, Degradable Polyester Platform with Modular Functionality", subtitle: "Macromolecules, 2016", url: "https://doi.org/10.1021/acs.macromol.5b02399" },
            { title: "Development of Polymeric Phase Change Materials On the basis of Diels-Alder Chemistry", subtitle: "Macromolecules, 2010", url: "https://doi.org/10.1021/ma100836c" },
          ]} />
        </FadeIn>

        <FadeIn delay={0.2}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "var(--clr-text-muted)", marginTop: 32, fontStyle: "italic" }}>
            Full publication list and Google Scholar profile available upon request.
          </p>
        </FadeIn>
      </section>

      {/* Beyond the Lab */}
      <section style={{ background: "var(--clr-bg-section)", padding: "120px 0" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", padding: "0 32px" }}>
          <FadeIn>
            <SectionLabel>Beyond the Lab</SectionLabel>
            <SectionHeading>A few things you won't find<br />on my <em>resume</em>.</SectionHeading>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div>
              {[
                { icon: "\u2192", text: "I'm a registered minister and have officiated four weddings — apparently people trust me with the important stuff." },
                { icon: "\u2192", text: "During COVID, with no races running, I organized my own solo marathon through the Rocky River Reservation, supported by my wife at water stops along the route. I've since run the Cleveland Marathon and two half marathons. Not fast, but finished." },
                { icon: "\u2192", text: "My phone number is 330-POLYMER (330-765-9637). Yes, really." },
                { icon: "\u2192", text: "Guest lecturer for Cal Poly's polymer chemistry course — bringing industry perspective back to where I started." },
                { icon: "\u2192", text: "Father and husband in Lakewood, Ohio. NSF Fellow. Clevelander by choice — Seattle born, Cal Poly educated, Akron trained." },
              ].map((item, i) => (
                <div key={i} className="beyond-item">
                  <div className="beyond-icon">{item.icon}</div>
                  <div className="beyond-text">{item.text}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" style={{ padding: "120px 0" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", padding: "0 32px", textAlign: "center" }}>
          <FadeIn>
            <SectionLabel center>Contact</SectionLabel>
            <h2 style={{
              fontFamily: "'Source Serif 4', serif", fontSize: "clamp(32px, 5vw, 52px)",
              fontWeight: 300, color: "var(--clr-text)", lineHeight: 1.15, marginBottom: 24,
            }}>
              Let's talk.
            </h2>
            <p style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: "var(--clr-text-sec)",
              lineHeight: 1.7, maxWidth: 500, margin: "0 auto 48px",
            }}>
              Whether you're hiring, building an innovation team, or exploring
              how digital tools are changing R&D — I'd love to hear from you.
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
              <a href="mailto:john@john-swanson.com" className="contact-link">john@john-swanson.com</a>
              <a href="https://linkedin.com/in/johnpswanson" className="contact-link" target="_blank" rel="noopener noreferrer">linkedin.com/in/johnpswanson</a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        borderTop: "1px solid var(--clr-border-subtle)", padding: "48px 32px", textAlign: "center",
        fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "var(--clr-text-footer)", letterSpacing: 0.5,
      }}>
        <div style={{ marginBottom: 32 }}>
          &copy; 2026 John P. Swanson &middot; Lakewood, Ohio
        </div>
        
        <div style={{ 
          maxWidth: 500, margin: "0 auto", fontSize: 10, color: "var(--clr-text-muted)", 
          opacity: 0.5, lineHeight: 1.6, transition: "opacity 0.3s"
        }}
        onMouseEnter={(e) => e.currentTarget.style.opacity = 1}
        onMouseLeave={(e) => e.currentTarget.style.opacity = 0.5}
        >
          <strong>About this site:</strong> This site was designed in conversation with Claude, Gemini, Codex, and VS Code/Windsurf, built with React and Vite, and deployed on Netlify. The background texture is inspired by USGS topographic maps of the Rocky River Reservation. Minimal frameworks were harmed in the making of this website.
        </div>
      </footer>

      {/* Back to Top */}
      <button
        className={`back-to-top ${scrollY > 400 ? "visible" : ""}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
      >
        &#8593;
      </button>
    </div>
  );
}
