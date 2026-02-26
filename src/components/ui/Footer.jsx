import React from "react";

export const Footer = () => (
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
);
