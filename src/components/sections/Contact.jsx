import { PROFILE_LINKS, ASK_ME_ABOUT } from "../../data";
import { FadeIn } from "../ui/FadeIn";
import { SectionLabel } from "../ui/SectionHeader";

const ACTIVE_PROFILES = PROFILE_LINKS.filter((profile) => profile.href);

export const ContactSection = () => {
  return (
    <section id="contact" style={{ padding: "120px 0" }}>
      <div style={{ maxWidth: 700, margin: "0 auto", padding: "0 32px", textAlign: "center" }}>
        <FadeIn>
          <SectionLabel center>Contact</SectionLabel>
          <h2 style={{ fontFamily: "'Source Serif 4', serif", fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 300, color: "var(--clr-text)", lineHeight: 1.15, marginBottom: 24 }}>
            Let's talk.
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: "var(--clr-text-sec)", lineHeight: 1.7, maxWidth: 500, margin: "0 auto 48px" }}>
            Whether you're hiring, building an innovation team, or exploring how digital tools are changing R&D — I'd love to hear from you.
          </p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "var(--clr-text-muted)", lineHeight: 1.7, maxWidth: 500, margin: "0 auto 48px" }}>
            <em>Ask me about {ASK_ME_ABOUT[0].toLowerCase()} — or {ASK_ME_ABOUT[1].toLowerCase()}.</em>
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
            <a href="mailto:john@john-swanson.com" className="contact-link">john@john-swanson.com</a>
            {ACTIVE_PROFILES.map((profile) => (
              <a key={profile.label} href={profile.href} className="contact-link" target="_blank" rel="noopener noreferrer">
                {profile.display}
              </a>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
