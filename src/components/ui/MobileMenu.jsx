import { NAV_LINKS } from "../../data";

export const MobileMenu = ({ menuOpen, setMenuOpen, scrollTo }) => (
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
);
