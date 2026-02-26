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
import { NAV_LINKS, NAV_SLUGS, toSlug } from "./data";
import { themes } from "./theme";
import { SCROLL_THRESHOLDS } from "./constants";
import { ThemeToggle } from "./components/ui/ThemeToggle";
import { MobileMenu } from "./components/ui/MobileMenu";
import { Footer } from "./components/ui/Footer";
import { BackToTop } from "./components/ui/BackToTop";

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
            <ThemeToggle isDark={isDark} setIsDark={setIsDark} />

            <button className="hamburger" onClick={() => setMenuOpen(true)} aria-label="Open menu">
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </nav>

      <div className="scroll-progress" />

      <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} scrollTo={scrollTo} />

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

      <Footer />

      <BackToTop showTopBtn={showTopBtn} />
    </div>
  );
}
