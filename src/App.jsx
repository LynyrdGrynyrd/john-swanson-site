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
import { NAV_LINKS, NAV_SLUGS, toSlug, FOOTER_CONTENT } from "./data";
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

      <nav className={`nav-fixed ${navSolid ? "nav-solid" : ""}`}>
        <div className="nav-container">
          <div className="nav-logo">
            JPS
          </div>

          <div className="nav-links-desktop">
            {NAV_LINKS.map((link, index) => (
              <button key={link} className={`nav-link ${activeSection === NAV_SLUGS[index] ? "active" : ""}`} onClick={() => scrollTo(link)}>
                {link}
              </button>
            ))}
          </div>

          <div className="nav-actions">
            <button
              onClick={() => setIsDark((state) => !state)}
              title={isDark ? "sp² — graphite" : "sp³ — diamond"}
              aria-label="Toggle hybridization theme"
              className="theme-toggle"
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
      <footer className="site-footer">
        <div className="footer-copyright">
          &copy; 2026 {FOOTER_CONTENT.COPYRIGHT_TEXT}
        </div>
        
        <div className="footer-note">
          <strong>About this site:</strong> {FOOTER_CONTENT.NOTE_TEXT}
        </div>
      </footer>

      <button className={`back-to-top ${showTopBtn ? "visible" : ""}`} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top">
        &#8593;
      </button>
    </div>
  );
}
