import { useEffect, useLayoutEffect, useState } from "react";
import { flushSync } from "react-dom";
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
import { applyTheme, getInitialIsDark, saveTheme } from "./theme";
import { SCROLL_THRESHOLDS } from "./constants";
import { ThemeToggle } from "./components/ui/ThemeToggle";
import { MobileMenu } from "./components/ui/MobileMenu";
import { Footer } from "./components/ui/Footer";
import { BackToTop } from "./components/ui/BackToTop";
import { prefersReducedMotion } from "./hooks/useInView";
import { useSpotlight } from "./hooks/useSpotlight";

export default function PersonalSite() {
  const [navSolid, setNavSolid] = useState(false);
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(getInitialIsDark);
  const [simpleMode, setSimpleMode] = useState(false);

  useSpotlight();

  // Layout effect so the palette lands before paint, including inside a view transition.
  useLayoutEffect(() => {
    applyTheme(isDark);
  }, [isDark]);

  // Swap themes with a circular reveal that grows out of the toggle button.
  const toggleTheme = (event) => {
    const next = !isDark;
    const commit = () => {
      flushSync(() => setIsDark(next));
      saveTheme(next);
    };

    if (!document.startViewTransition || prefersReducedMotion()) {
      commit();
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

    document.startViewTransition(commit).ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 700, easing: "cubic-bezier(0.4, 0, 0.2, 1)", pseudoElement: "::view-transition-new(root)" }
      );
    });
  };

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

        let current = "";
        for (let i = NAV_SLUGS.length - 1; i >= 0; i -= 1) {
          const element = document.getElementById(NAV_SLUGS[i]);
          if (element && element.getBoundingClientRect().top < SCROLL_THRESHOLDS.SECTION_ACTIVE) {
            current = NAV_SLUGS[i];
            break;
          }
        }
        setActiveSection(current);

        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    setMenuOpen(false);
    // Wait a frame so the mobile menu's scroll lock is released before scrolling.
    requestAnimationFrame(() => {
      document.getElementById(toSlug(id))?.scrollIntoView({ behavior: "smooth" });
    });
  };

  return (
    <div className="app-container">
      <div className="topo-overlay" />

      <nav className={`nav-fixed ${navSolid ? "nav-solid" : ""}`}>
        <div className="nav-container">
          <button className="nav-logo" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top">
            JPS
          </button>

          <div className="nav-links-desktop">
            {NAV_LINKS.map((link, index) => (
              <button key={link} className={`nav-link ${activeSection === NAV_SLUGS[index] ? "active" : ""}`} onClick={() => scrollTo(link)}>
                {link}
              </button>
            ))}
          </div>

          <div className="nav-actions">
            <ThemeToggle isDark={isDark} onToggle={toggleTheme} />

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

      <HeroSection scrollTo={scrollTo} isDark={isDark} />
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
