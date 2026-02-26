import { useEffect, useState } from "react";
import "./App.css";
import { HeroSection } from "./components/sections/Hero";
import { AboutSection } from "./components/sections/About";
import { PhilosophySection } from "./components/sections/Philosophy";
import { ExperienceSection } from "./components/sections/Experience";
import { ImpactSection } from "./components/sections/Impact";
import { DigitalRDSection } from "./components/sections/DigitalRD";
import { ExpertiseSection } from "./components/sections/Expertise";
import { PublicationsSection } from "./components/sections/Publications";
import { BeyondSection } from "./components/sections/Beyond";
import { ContactSection } from "./components/sections/Contact";
import { NAV_LINKS, NAV_SLUGS, toSlug } from "./content/navigation";
import { themes } from "./theme";

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
          "--scroll-progress",
          String(y / (document.documentElement.scrollHeight - window.innerHeight || 1))
        );

        for (let i = NAV_SLUGS.length - 1; i >= 0; i -= 1) {
          const element = document.getElementById(NAV_SLUGS[i]);
          if (element && element.getBoundingClientRect().top < 200) {
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

      <nav
        className="nav-fixed"
        style={{
          background: navSolid ? "var(--clr-nav-bg)" : "transparent",
          borderBottom: navSolid ? "1px solid var(--clr-border-subtle)" : "1px solid transparent",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "16px 32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500, letterSpacing: 2, textTransform: "uppercase", color: "var(--clr-text)" }}>
            JPS
          </div>

          <div className="nav-links-desktop" style={{ display: "flex", gap: 28 }}>
            {NAV_LINKS.map((link, index) => (
              <button key={link} className={`nav-link ${activeSection === NAV_SLUGS[index] ? "active" : ""}`} onClick={() => scrollTo(link)}>
                {link}
              </button>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button
              onClick={() => setIsDark((state) => !state)}
              title={isDark ? "sp² — graphite" : "sp³ — diamond"}
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
              sp{isDark ? "²" : "³"}
            </button>

            <button className="hamburger" onClick={() => setMenuOpen(true)} aria-label="Open menu">
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </nav>

      <div className="scroll-progress" />

      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <button className="mobile-close" onClick={() => setMenuOpen(false)} aria-label="Close menu">
          &#10005;
        </button>
        {NAV_LINKS.map((link) => (
          <button key={link} onClick={() => scrollTo(link)}>
            {link}
          </button>
        ))}
      </div>

      <HeroSection scrollTo={scrollTo} />
      <AboutSection simpleMode={simpleMode} setSimpleMode={setSimpleMode} />
      <PhilosophySection />
      <ExperienceSection />
      <ImpactSection />
      <DigitalRDSection />
      <ExpertiseSection />
      <PublicationsSection />
      <BeyondSection />
      <ContactSection />

      <footer style={{ borderTop: "1px solid var(--clr-border-subtle)", padding: "48px 32px", textAlign: "center", fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "var(--clr-text-footer)", letterSpacing: 0.5 }}>
        <div style={{ marginBottom: 32 }}>&copy; 2026 John P. Swanson &middot; Lakewood, Ohio</div>
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

      <button className={`back-to-top ${showTopBtn ? "visible" : ""}`} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top">
        &#8593;
      </button>
    </div>
  );
}
