import { useState, useEffect, useRef } from "react";

const useInView = (threshold = 0.12) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, isVisible];
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

const NAV_LINKS = ["About", "Philosophy", "Experience", "Impact", "Digital R&D", "Publications", "Contact"];

export default function PersonalSite() {
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      const sections = NAV_LINKS.map((s) => s.toLowerCase().replace(/\s+/g, "-").replace("&", "and"));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top < 200) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    const slug = id.toLowerCase().replace(/\s+/g, "-").replace("&", "and");
    document.getElementById(slug)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div style={{ fontFamily: "'Source Serif 4', 'Georgia', serif", background: "#0a0a0a", color: "#e8e4df", minHeight: "100vh" }}>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { background: #0a0a0a; }
        ::selection { background: #c4956a; color: #0a0a0a; }

        .nav-fixed {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
          transition: all 0.4s ease;
        }
        .nav-link {
          font-family: 'DM Sans', sans-serif; font-size: 12.5px; font-weight: 400;
          letter-spacing: 1.2px; text-transform: uppercase; color: #a09a93;
          background: none; border: none; cursor: pointer; padding: 8px 0;
          position: relative; transition: color 0.3s; white-space: nowrap;
        }
        .nav-link:hover, .nav-link.active { color: #e8e4df; }
        .nav-link::after {
          content: ''; position: absolute; bottom: 4px; left: 0; width: 0; height: 1px;
          background: #c4956a; transition: width 0.3s;
        }
        .nav-link:hover::after, .nav-link.active::after { width: 100%; }

        .grain-overlay {
          position: fixed; top: 0; left: 0; width: 100%; height: 100%;
          pointer-events: none; z-index: 99; opacity: 0.025;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
        }

        .section-label {
          font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 500;
          letter-spacing: 3px; text-transform: uppercase; color: #c4956a; margin-bottom: 12px;
        }
        .section-title {
          font-family: 'Source Serif 4', serif; font-size: clamp(28px, 4vw, 42px);
          font-weight: 300; line-height: 1.2; color: #e8e4df; margin-bottom: 40px;
        }

        .metric-card {
          border: 1px solid #1f1d1a; padding: 32px; position: relative;
          background: linear-gradient(135deg, #0f0e0d 0%, #0a0a0a 100%);
          transition: border-color 0.4s, transform 0.3s;
        }
        .metric-card:hover { border-color: #c4956a44; transform: translateY(-2px); }
        .metric-value {
          font-family: 'Source Serif 4', serif; font-size: clamp(36px, 5vw, 56px);
          font-weight: 300; color: #c4956a; line-height: 1;
        }
        .metric-label {
          font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 400;
          color: #a09a93; margin-top: 12px; line-height: 1.5; letter-spacing: 0.3px;
        }

        .timeline-item {
          border-left: 1px solid #1f1d1a; padding-left: 32px; padding-bottom: 48px;
          position: relative;
        }
        .timeline-item::before {
          content: ''; position: absolute; left: -4px; top: 6px;
          width: 7px; height: 7px; border-radius: 50%;
          background: #c4956a; border: 2px solid #0a0a0a;
        }
        .timeline-company {
          font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 500;
          letter-spacing: 2px; text-transform: uppercase; color: #c4956a;
        }
        .timeline-role {
          font-family: 'Source Serif 4', serif; font-size: clamp(20px, 2.5vw, 26px);
          font-weight: 400; color: #e8e4df; margin: 8px 0 4px;
        }
        .timeline-date {
          font-family: 'JetBrains Mono', monospace; font-size: 12px; color: #6b665e;
          letter-spacing: 0.5px;
        }
        .timeline-desc {
          font-family: 'DM Sans', sans-serif; font-size: 15px; line-height: 1.7;
          color: #a09a93; margin-top: 16px;
        }

        .pub-item {
          padding: 20px 0; border-bottom: 1px solid #1a1917; transition: padding-left 0.3s;
        }
        .pub-item:hover { padding-left: 8px; }
        .pub-title {
          font-family: 'Source Serif 4', serif; font-size: 15px; font-weight: 400;
          color: #d4cfc8; line-height: 1.5;
        }
        a.pub-title {
          text-decoration: none; transition: color 0.3s;
        }
        a.pub-title:hover { color: #c4956a; }
        .pub-journal {
          font-family: 'DM Sans', sans-serif; font-size: 12px; color: #6b665e;
          margin-top: 4px; letter-spacing: 0.3px;
        }

        .tag {
          display: inline-block; font-family: 'JetBrains Mono', monospace;
          font-size: 11px; padding: 6px 14px; border: 1px solid #1f1d1a;
          color: #a09a93; margin: 4px; transition: all 0.3s;
        }
        .tag:hover { border-color: #c4956a; color: #c4956a; }

        .contact-link {
          font-family: 'DM Sans', sans-serif; font-size: 15px; color: #a09a93;
          text-decoration: none; border-bottom: 1px solid transparent;
          transition: all 0.3s; padding-bottom: 2px;
        }
        .contact-link:hover { color: #c4956a; border-bottom-color: #c4956a; }

        .hero-line { position: absolute; background: #1a1917; }

        .philosophy-card {
          padding: 40px; border: 1px solid #1f1d1a; position: relative;
          background: linear-gradient(145deg, #0f0e0d 0%, #0a0a0a 100%);
          transition: border-color 0.4s; height: 100%;
        }
        .philosophy-card:hover { border-color: #c4956a33; }
        .philosophy-num {
          font-family: 'JetBrains Mono', monospace; font-size: 11px; color: #c4956a;
          letter-spacing: 2px; margin-bottom: 16px;
        }
        .philosophy-heading {
          font-family: 'Source Serif 4', serif; font-size: 20px; font-weight: 400;
          color: #e8e4df; margin-bottom: 12px;
        }
        .philosophy-text {
          font-family: 'DM Sans', sans-serif; font-size: 14px; line-height: 1.7;
          color: #a09a93;
        }

        .headshot-wrapper {
          width: clamp(160px, 20vw, 220px); height: clamp(160px, 20vw, 220px);
          border-radius: 50%; overflow: hidden; position: relative;
          border: 2px solid #1f1d1a; flex-shrink: 0;
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
          padding: 32px; border: 1px solid #1f1d1a;
          background: linear-gradient(145deg, #0f0e0d 0%, #0a0a0a 100%);
          transition: border-color 0.4s;
        }
        .digital-grid-card:hover { border-color: #c4956a33; }

        .beyond-item {
          display: flex; gap: 16px; align-items: baseline;
          padding: 16px 0; border-bottom: 1px solid #141311;
        }
        .beyond-icon {
          font-family: 'JetBrains Mono', monospace; font-size: 11px;
          color: #c4956a; letter-spacing: 1px; flex-shrink: 0; width: 24px;
        }
        .beyond-text {
          font-family: 'DM Sans', sans-serif; font-size: 15px; line-height: 1.6;
          color: #a09a93;
        }

        .motto-text {
          font-family: 'JetBrains Mono', monospace; font-size: clamp(11px, 1.2vw, 13px);
          letter-spacing: 3px; text-transform: uppercase; color: #6b665e;
        }

        .hamburger {
          display: none; background: none; border: none; cursor: pointer;
          width: 32px; height: 24px; position: relative;
        }
        .hamburger span {
          display: block; width: 100%; height: 1px; background: #e8e4df;
          position: absolute; transition: all 0.3s;
        }
        .hamburger span:nth-child(1) { top: 4px; }
        .hamburger span:nth-child(2) { top: 11px; }
        .hamburger span:nth-child(3) { top: 18px; }

        .mobile-menu {
          display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(10,10,10,0.97); z-index: 200;
          flex-direction: column; align-items: center; justify-content: center; gap: 32px;
        }
        .mobile-menu.open { display: flex; }
        .mobile-menu button {
          font-family: 'Source Serif 4', serif; font-size: 28px; font-weight: 300;
          background: none; border: none; color: #e8e4df; cursor: pointer;
        }
        .mobile-close {
          position: absolute; top: 24px; right: 24px; background: none;
          border: none; color: #a09a93; font-size: 28px; cursor: pointer;
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
        }
      `}</style>

      <div className="grain-overlay" />

      {/* Navigation */}
      <nav className="nav-fixed" style={{
        background: scrollY > 60 ? "rgba(10,10,10,0.85)" : "transparent",
        borderBottom: scrollY > 60 ? "1px solid #1a1917" : "1px solid transparent",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "16px 32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500, letterSpacing: 2, textTransform: "uppercase", color: "#e8e4df" }}>
            JPS
          </div>
          <div className="nav-links-desktop" style={{ display: "flex", gap: 28 }}>
            {NAV_LINKS.map((link) => {
              const slug = link.toLowerCase().replace(/\s+/g, "-").replace("&", "and");
              return (
                <button key={link} className={`nav-link ${activeSection === slug ? "active" : ""}`} onClick={() => scrollTo(link)}>
                  {link}
                </button>
              );
            })}
          </div>
          <button className="hamburger" onClick={() => setMenuOpen(true)} aria-label="Open menu">
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <button className="mobile-close" onClick={() => setMenuOpen(false)} aria-label="Close menu">&#10005;</button>
        {NAV_LINKS.map((link) => (
          <button key={link} onClick={() => scrollTo(link)}>{link}</button>
        ))}
      </div>

      {/* Hero */}
      <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden" }}>
        <div className="hero-line" style={{ width: 1, height: "40%", top: 0, left: "12%", opacity: 0.4 }} />
        <div className="hero-line" style={{ width: 1, height: "25%", bottom: 0, right: "18%", opacity: 0.25 }} />
        <div className="hero-line" style={{ width: "20%", height: 1, top: "25%", right: 0, opacity: 0.25 }} />

        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 32px", width: "100%" }}>
          <div className="hero-grid" style={{ display: "flex", alignItems: "center", gap: "clamp(40px, 6vw, 80px)" }}>
            <div style={{ flex: 1 }}>
              <div className="motto-text" style={{ marginBottom: 28 }}>
                Do science · Make money · Have fun
              </div>

              <h1 style={{
                fontFamily: "'Source Serif 4', serif", fontSize: "clamp(40px, 6vw, 76px)",
                fontWeight: 300, lineHeight: 1.05, color: "#e8e4df", marginBottom: 24, letterSpacing: "-0.02em",
              }}>
                John P.<br />Swanson
                <span style={{
                  display: "block", fontSize: "clamp(14px, 1.6vw, 17px)",
                  fontFamily: "'DM Sans', sans-serif", fontWeight: 300,
                  color: "#6b665e", marginTop: 10, letterSpacing: 1,
                }}>
                  Ph.D. Polymer Science · Cleveland, Ohio
                </span>
              </h1>

              <p style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(15px, 1.5vw, 17px)",
                fontWeight: 300, color: "#a09a93", maxWidth: 540, lineHeight: 1.75,
              }}>
                I'm an R&D leader who translates complex
                science into products that make money. I've built $53M product pipelines
                and I've officiated four weddings. Both require understanding what people
                actually need.
              </p>

              <div className="hero-buttons" style={{ marginTop: 40, display: "flex", gap: 20, flexWrap: "wrap" }}>
                <button onClick={() => scrollTo("Contact")} style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500,
                  letterSpacing: 1.5, textTransform: "uppercase", padding: "14px 36px",
                  background: "#c4956a", color: "#0a0a0a", border: "none", cursor: "pointer",
                  transition: "all 0.3s",
                }}
                  onMouseEnter={(e) => e.target.style.background = "#d4a57a"}
                  onMouseLeave={(e) => e.target.style.background = "#c4956a"}
                >
                  Get in Touch
                </button>
                <button onClick={() => scrollTo("Experience")} style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500,
                  letterSpacing: 1.5, textTransform: "uppercase", padding: "14px 36px",
                  background: "transparent", color: "#a09a93", border: "1px solid #2a2724",
                  cursor: "pointer", transition: "all 0.3s",
                }}
                  onMouseEnter={(e) => { e.target.style.borderColor = "#c4956a"; e.target.style.color = "#e8e4df"; }}
                  onMouseLeave={(e) => { e.target.style.borderColor = "#2a2724"; e.target.style.color = "#a09a93"; }}
                >
                  View Experience
                </button>
              </div>
            </div>

            <div className="headshot-wrapper">
              <img src="/headshot.jpg" alt="John P. Swanson" />
            </div>
          </div>
        </div>

        <div style={{ position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)" }}>
          <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom, transparent, #c4956a)" }} />
        </div>
      </section>

      {/* About */}
      <section id="about" style={{ maxWidth: 900, margin: "0 auto", padding: "120px 32px" }}>
        <FadeIn>
          <div className="section-label">About</div>
          <h2 className="section-title">I connect the lab to the<br />business case.</h2>
        </FadeIn>
        <FadeIn delay={0.15}>
          <div className="about-columns" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, fontFamily: "'DM Sans', sans-serif", fontSize: 15, lineHeight: 1.8, color: "#a09a93" }}>
            <div>
              <p>
                I've spent 10+ years doing one thing well: taking a customer's problem, translating
                it into a technical challenge my team can solve, and then making sure the solution
                actually ships. I work across the table from sales, manufacturing, and executives
                and I'm as fluent in the lab as I am in the boardroom. The value I bring is connecting those worlds.
              </p>
              <p style={{ marginTop: 16 }}>
                My background is in polymer science (engineered thermoplastics,
                sustainable polymers, composites, and specialty formulations), but the pattern is always the same:
                understand the real need, formulate the solution, build the case, and drive it to
                commercialization.
              </p>
            </div>
            <div>
              <p>
                I love building teams. I've been told my strength is acquiring great talent, removing
                blockers, and getting people what they need to do their best work. I care about
                structure: stage-gates, clear ownership, documented processes. Good systems
                let good scientists focus on science instead of fighting the organization.
              </p>
              <p style={{ marginTop: 16 }}>
                I've loved science since I was a kid building model rockets and trebuchets in middle
                school. That curiosity hasn't changed. I still love asking questions, understanding
                how things work, and figuring out how to make them better. I just get to do it at
                a bigger scale now.
              </p>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Philosophy */}
      <section id="philosophy" style={{ background: "#0d0c0b", padding: "120px 0" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 32px" }}>
          <FadeIn>
            <div className="section-label">How I Work</div>
            <h2 className="section-title">Principles, not platitudes.</h2>
          </FadeIn>

          <div className="philosophy-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1 }}>
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
                text: "Hire well, set clear goals, remove blockers, and trust people to deliver. I invest in structured onboarding, development conversations, and a culture where psychological safety and accountability coexist. Good scientists don't need micromanagement. They need air cover.",
              },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.1}>
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
          <div className="section-label">Experience</div>
          <h2 className="section-title">Where I've done the work.</h2>
        </FadeIn>

        <div style={{ marginTop: 24 }}>
          {[
            {
              company: "NeoGraf Solutions",
              role: "Director of R&D",
              date: "2024 — 2026",
              desc: "Led R&D strategy for a PE-backed advanced materials company, managing a cross-functional team of scientists, engineers, and technicians. Built an $18M+ development pipeline across thermal management, flame retardant, fuel cell, and sealing applications. Built innovation infrastructure from the ground up — stage-gate frameworks, a 25-document IP policy framework, electronic lab notebooks, portfolio review processes, and patent analytics. Managed government-funded programs and presented strategy to the Board of Directors.",
            },
            {
              company: "Avient Corporation",
              role: "Technology Manager — Specialty Engineered Materials",
              date: "2022 — 2024",
              desc: "Led a team of 6 scientists delivering customized solutions across 22 engineered thermoplastic product lines for this publicly traded, Fortune 1000 specialty materials company ($3.5B revenue). Generated $12M+ in new revenue through product launches and global technology transfers. Reduced R&D working capital by 93% through strategic inventory management. Doubled year-over-year invention records. Hosted R&D Leadership Development Program rotations, mentoring early-career scientists through structured product line and project assignments. Designed digital workflow systems that streamlined project management for a 25-person organization.",
            },
            {
              company: "Avient Corporation",
              role: "Lead R&D Engineer — Specialty Engineered Materials",
              date: "2018 — 2022",
              desc: "Built a sustainable polymer platform from concept to commercialization, creating a $53M global sales funnel across multiple business units and earning the company's Technology Excellence Award. Developed biodegradable packaging materials generating a $36M pipeline. Led rapid customer co-development projects for brands including Bose. Named inventor on multiple patents for novel thermoplastic blends.",
            },
            {
              company: "PolyOne Corporation",
              role: "Senior R&D Engineer — Leadership Development Program",
              date: "2016 — 2018",
              desc: "Selected for competitive corporate R&D leadership program with rotations across Lean Six Sigma, DOE, thermoplastic composite formulation, processing, and analytical methods. Built foundational skills in cross-functional collaboration and structured innovation.",
            },
            {
              company: "University of Akron",
              role: "Ph.D. Polymer Science — NSF Graduate Research Fellow",
              date: "2012 — 2016",
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
      <section id="impact" style={{ background: "#0d0c0b", padding: "120px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
          <FadeIn>
            <div className="section-label">Impact</div>
            <h2 className="section-title">The numbers behind the work.</h2>
          </FadeIn>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 1 }}>
            {[
              { value: "$53M", label: "Global sales funnel built for a sustainable polymer platform at Avient, from zero" },
              { value: "$12M+", label: "New product revenue across multiple launches and technology transfers" },
              { value: "11", label: "Patents in thermoplastic blends, composites & biodegradable materials" },
              { value: "20+", label: "Peer-reviewed publications in Macromolecules, Polymer Chemistry & more" },
              { value: "22", label: "Product lines managed across global business units" },
              { value: "$18M+", label: "Development pipeline built at NeoGraf across thermal, FR, fuel cell & sealing applications" },
              { value: "25", label: "Documents in IP policy framework — invention disclosure triage, trade secret management, FTO analysis & role-specific training" },
              { value: "93%", label: "Reduction in R&D working capital through proactive management" },
            ].map((m, i) => (
              <FadeIn key={i} delay={i * 0.06}>
                <div className="metric-card">
                  <div className="metric-value">{m.value}</div>
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
          <div className="section-label">Point of View</div>
          <h2 className="section-title">The next generation of R&D is digital.</h2>
        </FadeIn>

        <FadeIn delay={0.1}>
          <p style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 16, lineHeight: 1.8,
            color: "#a09a93", maxWidth: 700, marginBottom: 48,
          }}>
            I believe the next generation of R&D leaders need to be as fluent in digital
            infrastructure as they are in polymer chemistry. Scientists shouldn't spend their
            time on tasks a machine can do better. Every team I've led, I've built systems
            to make the science faster and the decisions sharper.
          </p>
        </FadeIn>

        <div className="digital-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 1 }}>
          {[
            {
              label: "AI-Powered Data Tools",
              desc: "Built custom tools using large language model APIs to parse scanned certificates of analysis, extract legacy test data, and populate searchable databases, replacing weeks of manual entry with automated workflows.",
            },
            {
              label: "Patent Analytics & IP Strategy",
              desc: "Deployed AI-powered patent landscaping for rapid prior-art searches, automated competitor monitoring, and freedom-to-operate analyses, cutting external legal review time from weeks to hours.",
            },
            {
              label: "Electronic Lab Notebooks",
              desc: "Led migration from paper-based data management to structured digital lab notebooks, creating standardized experimental templates and enabling cross-team knowledge sharing.",
            },
            {
              label: "Innovation Management",
              desc: "Implemented structured idea-to-launch platforms integrating voice-of-customer data, stage-gate workflows, and portfolio dashboards that connect R&D activity to commercial outcomes.",
            },
          ].map((item, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div className="digital-grid-card">
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500, color: "#c4956a", marginBottom: 12, letterSpacing: 0.5 }}>
                  {item.label}
                </div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, lineHeight: 1.7, color: "#a09a93" }}>
                  {item.desc}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.3}>
          <p style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#6b665e",
            marginTop: 32, fontStyle: "italic",
          }}>
            Full disclosure: this website was built with AI too.
          </p>
        </FadeIn>
      </section>

      {/* Technical Expertise */}
      <section style={{ background: "#0d0c0b", padding: "120px 0" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 32px" }}>
          <FadeIn>
            <div className="section-label">Technical Expertise</div>
            <h2 className="section-title">What I work with.</h2>
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
                tags: ["Stage-Gate (Cooper)", "DOE / Lean Six Sigma", "Team Building & Talent Development", "Digital R&D Transformation", "Patent Strategy & FTO", "IP Policy & Trade Secret Management", "Voice of Customer Integration", "Innovation Portfolio Management"],
              },
            ].map((cat, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500, color: "#c4956a", marginBottom: 16, letterSpacing: 0.5 }}>
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
          <div className="section-label">Selected Work</div>
          <h2 className="section-title">Publications & Patents</h2>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div style={{ marginBottom: 40 }}>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500, letterSpacing: 2, textTransform: "uppercase", color: "#6b665e", marginBottom: 16 }}>
              Patents (selected from 11)
            </div>
            {[
              { title: "Continuous fiber reinforced tapes", id: "WO/2024/243499, 2024", url: "https://patents.google.com/patent/WO2024243499A1/en" },
              { title: "Thermoset articles comprising nitrile butadiene rubber", id: "WO/2023/278572, 2023", url: "https://patents.google.com/patent/WO2023278572A1/en" },
              { title: "Polymer blends of aliphatic polyketone and ABS", id: "WO/2022/047030, 2022", url: "https://patents.google.com/patent/WO2022047030A1/en" },
              { title: "Polymer blends of polyamide and aliphatic polyketone", id: "WO/2022/005896, 2022", url: "https://patents.google.com/patent/WO2022005896A1/en" },
              { title: "Thermoresponsive Polyesters", id: "US Patent 10,106,514, 2018", url: "https://patents.google.com/patent/US10106514B2/en" },
              { title: "Vegetable oil based viscoelastic polymers with photoresponsive properties", id: "US Patent 10,899,885, 2021", url: "https://patents.google.com/patent/US10899885B2/en" },
            ].map((p, i) => (
              <div key={i} className="pub-item">
                <a href={p.url} className="pub-title" target="_blank" rel="noopener noreferrer">{p.title}</a>
                <div className="pub-journal">{p.id}</div>
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500, letterSpacing: 2, textTransform: "uppercase", color: "#6b665e", marginBottom: 16 }}>
              Journal Articles (selected from 20+)
            </div>
            {[
              { title: "A Library of Thermoresponsive, Coacervate-Forming Biodegradable Polyesters", journal: "Macromolecules, 2015 — Most Read Article, June & July 2015", url: "https://doi.org/10.1021/acs.macromol.5b00585" },
              { title: "The Effect of Pendant Group Structure on the Thermoresponsive Properties of N-Substituted Polyesters", journal: "Polymer Chemistry, 2017", url: "https://doi.org/10.1039/C7PY01391D" },
              { title: "Efficient Protein Encapsulation within Thermoresponsive Coacervate-Forming Biodegradable Polyesters", journal: "ACS Macro Letters, 2018", url: "https://doi.org/10.1021/acsmacrolett.8b00118" },
              { title: "A Solvent and Initiator Free, Low-Modulus, Degradable Polyester Platform with Modular Functionality", journal: "Macromolecules, 2016", url: "https://doi.org/10.1021/acs.macromol.6b01316" },
              { title: "Development of Polymeric Phase Change Materials On the basis of Diels-Alder Chemistry", journal: "Macromolecules, 2010", url: "https://doi.org/10.1021/ma100836c" },
            ].map((p, i) => (
              <div key={i} className="pub-item">
                <a href={p.url} className="pub-title" target="_blank" rel="noopener noreferrer">{p.title}</a>
                <div className="pub-journal">{p.journal}</div>
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#6b665e", marginTop: 32, fontStyle: "italic" }}>
            Full publication list and Google Scholar profile available upon request.
          </p>
        </FadeIn>
      </section>

      {/* Beyond the Lab */}
      <section style={{ background: "#0d0c0b", padding: "120px 0" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", padding: "0 32px" }}>
          <FadeIn>
            <div className="section-label">Beyond the Lab</div>
            <h2 className="section-title">A few things you won't find<br />on my resume.</h2>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div>
              {[
                { icon: "\u2192", text: "I'm a registered minister and have officiated four weddings — apparently people trust me with the important stuff." },
                { icon: "\u2192", text: "During COVID, with no races running, I organized my own solo marathon through the Rocky River Reservation, supported by my wife at water stops along the route. I've since run the Cleveland Marathon and two half marathons. Not fast, but finished." },
                { icon: "\u2192", text: "I've been hooked on science since middle school, when I was building model rockets and trebuchets. The curiosity hasn't faded, the scale of the projects just got bigger." },
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
            <div className="section-label">Contact</div>
            <h2 style={{
              fontFamily: "'Source Serif 4', serif", fontSize: "clamp(32px, 5vw, 52px)",
              fontWeight: 300, color: "#e8e4df", lineHeight: 1.15, marginBottom: 24,
            }}>
              Let's talk.
            </h2>
            <p style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: "#a09a93",
              lineHeight: 1.7, maxWidth: 500, margin: "0 auto 48px",
            }}>
              Looking for R&D leadership, exploring a collaboration,
              or just want to talk innovation strategy over coffee, I'd love to hear from you.
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
        borderTop: "1px solid #1a1917", padding: "32px", textAlign: "center",
        fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#3d3a36", letterSpacing: 0.5,
      }}>
        &copy; 2026 John P. Swanson &middot; Lakewood, Ohio
      </footer>
    </div>
  );
}
