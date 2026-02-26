import React from "react";
import { FOOTER_CONTENT } from "../../data";

export const Footer = () => (
  <footer className="site-footer">
    <div className="footer-copyright">
      &copy; 2026 {FOOTER_CONTENT.COPYRIGHT_TEXT}
    </div>

    <div className="footer-note">
      <strong>About this site:</strong> {FOOTER_CONTENT.NOTE_TEXT}
    </div>
  </footer>
);
