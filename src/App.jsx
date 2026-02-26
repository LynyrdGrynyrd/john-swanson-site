import { useState, useEffect, useRef } from "react";
import "./App.css";
import { themes } from "./theme";

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const useInView = (threshold = 0.12) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(() => prefersReducedMotion());
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, isVisible];
};

const TYPING_INTERVAL_MS = 38;

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
      }, TYPING_INTERVAL_MS);
    }, delay * 1000);
    return () => { clearTimeout(timeout); if (intervalId) clearInterval(intervalId); };
  }, [isVisible, delay, text]);
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

const PHILOSOPHY_ITEMS = [
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
];

const EXPERIENCE_ITEMS = [
  {
    company: "NeoGraf Solutions",
    role: "Director of R&D",
    date: "2024 \u2014 2026",
    desc: "Inherited a four-person R&D team and made three new hires to build out the function. Turned it into a stage-gate organization and grew the development pipeline to multimillion-dollar scale across thermal, flame retardant, fuel cell, and sealing applications. Wrote the IP policy from scratch (25 documents condensed to 4 people would actually read), deployed electronic lab notebooks, and built patent analytics and portfolio reviews. Helped manage a $2M DOE-funded program for fuel cell bipolar plate development. Presented innovation strategy quarterly to the Board. Zero safety incidents in 24 months.",
  },
  {
    company: "Avient Corporation",
    role: "Technology Manager \u2014 Specialty Engineered Materials",
    date: "2022 \u2014 2024",
    desc: "Led a team of 6 scientists delivering customized solutions across 22 engineered thermoplastic product lines. Generated $12M+ in new revenue through product launches and global technology transfers. Reduced R&D working capital by 93% through strategic inventory management. Doubled year-over-year invention records. Hosted R&D Leadership Development Program rotations, mentoring early-career scientists through structured product line and project assignments. Designed digital workflow systems that streamlined project management for a 25-person organization.",
  },
  {
    company: "Avient Corporation",
    role: "Lead R&D Engineer \u2014 Specialty Engineered Materials",
    date: "2018 \u2014 2022",
    desc: "Identified aliphatic polyketone as a compounding opportunity and developed patented blend families that grew into a $50M+ global sales pipeline across four international business units, earning three Technology Excellence Awards. Developed biodegradable packaging generating a $34.5M pipeline. Led rapid customer co-development for brands including Bose ($1.53M launch).",
  },
  {
    company: "PolyOne Corporation",
    role: "Senior R&D Engineer \u2014 Leadership Development Program",
    date: "2016 \u2014 2018",
    desc: "Selected for competitive corporate R&D leadership program with rotations across Lean Six Sigma, DOE, thermoplastic composite formulation, processing, and analytical methods. Learned how a $3B company actually moves products from lab to market.",
  },
  {
    company: "University of Akron",
    role: "Ph.D. Polymer Science \u2014 NSF Graduate Research Fellow",
    date: "2011 \u2014 2016",
    desc: "Designed and synthesized thermoresponsive biodegradable polyesters for biomedical applications. Published across Macromolecules, Polymer Chemistry, and ACS Macro Letters. Research became the foundation for D-Glue thermoresponsive adhesive technology. 3.73 GPA.",
  },
];

const IMPACT_METRICS = [
  { value: "$50M+", label: "Global sales pipeline built from aliphatic polyketone platform at Avient" },
  { value: "$12M+", label: "New product revenue across multiple launches and technology transfers" },
  { value: "12", label: "Patents in thermoplastic blends, composites & biodegradable materials" },
  { value: "9", label: "Peer-reviewed publications in Macromolecules, Polymer Chemistry & ACS Macro Letters" },
  { value: "22", label: "Product lines managed across global business units" },
  { value: "$18M+", label: "NPI pipeline developed as Director of R&D across thermal, FR, fuel cell & sealing applications" },
  { value: "25", label: "Documents in IP policy framework: invention disclosure triage, trade secret management, FTO analysis & role-specific training" },
  { value: "93%", label: "Reduction in R&D working capital through proactive management" },
];

const DIGITAL_RD_ITEMS = [
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
];

const EXPERTISE_CATEGORIES = [
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
];

const BEYOND_ITEMS = [
  { icon: "\u2192", text: "I'm a registered minister and have officiated four weddings \u2014 apparently people trust me with the important stuff." },
  { icon: "\u2192", text: "During COVID, with no races running, I organized my own solo marathon through the Rocky River Reservation, supported by my wife at water stops along the route. I've since run the Cleveland Marathon and two half marathons. Not fast, but finished." },
  { icon: "\u2192", text: "My phone number is 330-POLYMER (330-765-9637). Yes, really." },
  { icon: "\u2192", text: "Guest lecturer for Cal Poly's polymer chemistry course \u2014 bringing industry perspective back to where I started." },
  { icon: "\u2192", text: "Father and husband in Lakewood, Ohio. NSF Fellow. Clevelander by choice \u2014 Seattle born, Cal Poly educated, Akron trained." },
];

const PATENTS = [
  { title: "Continuous fiber reinforced tapes", subtitle: "WO/2024/243499, 2024", url: "https://patents.google.com/patent/WO2024243499A1/en" },
  { title: "Thermoset articles comprising nitrile butadiene rubber", subtitle: "WO/2023/278572, 2023", url: "https://patents.google.com/patent/WO2023278572A1/en" },
  { title: "Polymer blends of aliphatic polyketone and ABS", subtitle: "WO/2022/047030, 2022", url: "https://patents.google.com/patent/WO2022047030A1/en" },
  { title: "Polymer blends of polyamide and aliphatic polyketone", subtitle: "WO/2022/005896, 2022", url: "https://patents.google.com/patent/WO2022005896A1/en" },
  { title: "Thermoresponsive Polyesters", subtitle: "US Patent 10,106,514, 2018", url: "https://patents.google.com/patent/US10106514B2/en" },
  { title: "Vegetable oil based viscoelastic polymers with photoresponsive properties", subtitle: "US Patent 10,899,885, 2021", url: "https://patents.google.com/patent/US10899885B2/en" },
];

const JOURNAL_ARTICLES = [
  { title: "A Library of Thermoresponsive, Coacervate-Forming Biodegradable Polyesters", subtitle: "Macromolecules, 2015 \u2014 Most Read Article, June & July 2015", url: "https://doi.org/10.1021/acs.macromol.5b00585" },
  { title: "The Effect of Pendant Group Structure on the Thermoresponsive Properties of N-Substituted Polyesters", subtitle: "Polymer Chemistry, 2017", url: "https://doi.org/10.1039/C7PY01391D" },
  { title: "Efficient Protein Encapsulation within Thermoresponsive Coacervate-Forming Biodegradable Polyesters", subtitle: "ACS Macro Letters, 2018", url: "https://doi.org/10.1021/acsmacrolett.8b00118" },
  { title: "A Solvent and Initiator Free, Low-Modulus, Degradable Polyester Platform with Modular Functionality", subtitle: "Macromolecules, 2016", url: "https://doi.org/10.1021/acs.macromol.5b02399" },
  { title: "Development of Polymeric Phase Change Materials On the basis of Diels-Alder Chemistry", subtitle: "Macromolecules, 2010", url: "https://doi.org/10.1021/ma100836c" },
];

export default function PersonalSite() {
  const [navSolid, setNavSolid] = useState(false);
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [simpleMode, setSimpleMode] = useState(false);

  useEffect(() => {
    const theme = isDark ? themes.dark : themes.light;
    for (const [key, value] of Object.entries(theme)) {
      document.documentElement.style.setProperty(key, value);
    }
  }, [isDark]);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        setNavSolid(y > 60);
        setShowTopBtn(y > 400);
        document.documentElement.style.setProperty(
          '--scroll-progress',
          String(y / (document.documentElement.scrollHeight - window.innerHeight || 1))
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
      <div className="topo-overlay" />

      {/* Navigation */}
      <nav className="nav-fixed" style={{
        background: navSolid ? "var(--clr-nav-bg)" : "transparent",
        borderBottom: navSolid ? "1px solid var(--clr-border-subtle)" : "1px solid transparent",
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
                <button className="btn-primary" onClick={() => scrollTo("Contact")}>
                  Get in Touch
                </button>
                <button className="btn-outline" onClick={() => scrollTo("Experience")}>
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
            {PHILOSOPHY_ITEMS.map((item, i) => (
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
          {EXPERIENCE_ITEMS.map((item, i) => (
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
            {IMPACT_METRICS.map((m, i) => (
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
          {DIGITAL_RD_ITEMS.map((item, i) => (
            <FadeIn key={i} delay={i * 0.08} style={{ height: "100%" }}>
              <div className="digital-grid-card">
                <div className="card-label" style={{ marginBottom: 12 }}>
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
            {EXPERTISE_CATEGORIES.map((cat, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div>
                  <div className="card-label" style={{ marginBottom: 16 }}>
                    {cat.heading}
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap" }}>
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
          <PublicationList title="Patents (selected from 12)" items={PATENTS} />
        </FadeIn>

        <FadeIn delay={0.15}>
          <PublicationList title="Journal Articles (selected from 9)" items={JOURNAL_ARTICLES} />
        </FadeIn>

        <FadeIn delay={0.2}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "var(--clr-text-muted)", marginTop: 32, display: "flex", gap: 20, flexWrap: "wrap", alignItems: "center" }}>
            <span style={{ fontStyle: "italic" }}>Full publication list →</span>
            <a href="https://scholar.google.com/citations?user=A4L-xLoAAAAJ&hl=en" target="_blank" rel="noopener noreferrer" style={{ color: "var(--clr-accent)", textDecoration: "none", borderBottom: "1px solid transparent", transition: "border-color 0.2s" }} onMouseEnter={e => e.currentTarget.style.borderColor = "var(--clr-accent)"} onMouseLeave={e => e.currentTarget.style.borderColor = "transparent"}>Google Scholar</a>
            <a href="https://www.researchgate.net/profile/John-Swanson" target="_blank" rel="noopener noreferrer" style={{ color: "var(--clr-accent)", textDecoration: "none", borderBottom: "1px solid transparent", transition: "border-color 0.2s" }} onMouseEnter={e => e.currentTarget.style.borderColor = "var(--clr-accent)"} onMouseLeave={e => e.currentTarget.style.borderColor = "transparent"}>ResearchGate</a>
            <a href="https://orcid.org/0000-0001-8820-7273" target="_blank" rel="noopener noreferrer" style={{ color: "var(--clr-accent)", textDecoration: "none", borderBottom: "1px solid transparent", transition: "border-color 0.2s" }} onMouseEnter={e => e.currentTarget.style.borderColor = "var(--clr-accent)"} onMouseLeave={e => e.currentTarget.style.borderColor = "transparent"}>ORCID</a>
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
              {BEYOND_ITEMS.map((item, i) => (
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
        
        <div className="footer-note">
          <strong>About this site:</strong> This site was designed in conversation with Claude, Gemini, Codex, and VS Code/Windsurf, built with React and Vite, and deployed on Netlify. The background texture is inspired by USGS topographic maps of the Rocky River Reservation. Minimal frameworks were harmed in the making of this website.
        </div>
      </footer>

      {/* Back to Top */}
      <button
        className={`back-to-top ${showTopBtn ? "visible" : ""}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
      >
        &#8593;
      </button>
    </div>
  );
}
