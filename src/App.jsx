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
import { SCROLL_THRESHOLDS } from "./constants";

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
        setNavSolid(y > SCROLL_THRESHOLDS.NAV_SOLID);
        setShowTopBtn(y > SCROLL_THRESHOLDS.SHOW_TOP_BTN);

        document.documentElement.style.setProperty(
          "--scroll-progress",
          String(y / (document.documentElement.scrollHeight - window.innerHeight || 1))
        );

        for (let i = NAV_SLUGS.length - 1; i >= 0; i -= 1) {
          const element = document.getElementById(NAV_SLUGS[i]);
          if (element && element.getBoundingClientRect().top < SCROLL_THRESHOLDS.SECTION_ACTIVE) {
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
    <div className="app-container">
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
