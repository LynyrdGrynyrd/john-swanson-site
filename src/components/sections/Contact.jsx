import { useEffect, useRef, useState } from "react";
import { PROFILE_LINKS, ASK_ME_ABOUT } from "../../data";
import { FadeIn } from "../ui/FadeIn";
import { SectionLabel } from "../ui/SectionHeader";
import { isSafeUrl } from "../../utils/security";

const EMAIL = "john@john-swanson.com";

// Lowercase only the first letter so proper nouns (PolyOne, AI, I'm) survive mid-sentence.
const lowerFirst = (text) => text.charAt(0).toLowerCase() + text.slice(1);

export const ContactSection = () => {
  const activeProfiles = PROFILE_LINKS.filter((profile) => profile.href && isSafeUrl(profile.href));
  const [copied, setCopied] = useState(false);
  const resetTimer = useRef(null);

  useEffect(() => () => clearTimeout(resetTimer.current), []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      clearTimeout(resetTimer.current);
      resetTimer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <section id="contact" style={{ padding: "120px 0" }}>
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 32px", textAlign: "center" }}>
        <FadeIn>
          <SectionLabel center>Contact</SectionLabel>
          <h2 style={{ fontFamily: "'Source Serif 4', serif", fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 300, color: "var(--clr-text)", lineHeight: 1.15, marginBottom: 24 }}>
            Let's talk.
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: "var(--clr-text-sec)", lineHeight: 1.7, maxWidth: 500, margin: "0 auto 48px" }}>
            If you're building, funding, or partnering in polymers, composites, or advanced materials anywhere in Polymer Valley, I'd like to hear about it. Same goes for anyone working on digital tools for R&D.
          </p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "var(--clr-text-muted)", lineHeight: 1.7, maxWidth: 500, margin: "0 auto 48px" }}>
            <em>Ask me about {lowerFirst(ASK_ME_ABOUT[0])}, or {lowerFirst(ASK_ME_ABOUT[1])}.</em>
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="contact-email-row">
            <a href={`mailto:${EMAIL}`} className="contact-email">{EMAIL}</a>
            <button className={`copy-btn${copied ? " copied" : ""}`} onClick={copyEmail} aria-label="Copy email address">
              <span aria-live="polite">{copied ? "Copied ✓" : "Copy"}</span>
            </button>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="profile-pills">
            {activeProfiles.map((profile) => (
              <a key={profile.label} href={profile.href} className="profile-pill" target="_blank" rel="noopener noreferrer">
                {profile.label}
                <span className="profile-pill-arrow" aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
