import { useEffect, useRef } from "react";
import { NAV_LINKS } from "../../data";

export const MobileMenu = ({ menuOpen, setMenuOpen, scrollTo }) => {
  const closeRef = useRef(null);

  // While open: lock page scroll, close on Escape, and move focus into the menu.
  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen, setMenuOpen]);

  return (
    <div className={`mobile-menu ${menuOpen ? "open" : ""}`} role="dialog" aria-modal="true" aria-label="Site navigation">
      <button ref={closeRef} className="mobile-close" onClick={() => setMenuOpen(false)} aria-label="Close menu">
        &#10005;
      </button>
      {NAV_LINKS.map((link, index) => (
        <button key={link} style={{ "--i": index }} onClick={() => scrollTo(link)}>
          {link}
        </button>
      ))}
    </div>
  );
};
