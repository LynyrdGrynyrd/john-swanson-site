import { JOURNAL_ARTICLES, PATENTS, PUBLICATION_PROFILE_LINKS } from "../../data";
import { FadeIn } from "../ui/FadeIn";
import { PublicationList } from "../ui/PublicationList";
import { SectionHeading, SectionLabel } from "../ui/SectionHeader";

export const PublicationsSection = () => (
  <section id="publications" style={{ maxWidth: 900, margin: "0 auto", padding: "120px 32px" }}>
    <FadeIn>
      <SectionLabel>Selected Work</SectionLabel>
      <SectionHeading><em>Publications</em> & Patents</SectionHeading>
    </FadeIn>

    <FadeIn delay={0.1}>
      <PublicationList title="Patents (12)" items={PATENTS} />
    </FadeIn>

    <FadeIn delay={0.15}>
      <PublicationList title="Journal Articles (9)" items={JOURNAL_ARTICLES} />
    </FadeIn>

    <FadeIn delay={0.2}>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "var(--clr-text-muted)", marginTop: 32, display: "flex", gap: 20, flexWrap: "wrap", alignItems: "center" }}>
        <span style={{ fontStyle: "italic" }}>Full publication list →</span>
        {PUBLICATION_PROFILE_LINKS.map((profile) => (
          <a
            key={profile.label}
            href={profile.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--clr-accent)", textDecoration: "none", borderBottom: "1px solid transparent", transition: "border-color 0.2s" }}
          >
            {profile.label}
          </a>
        ))}
      </p>
    </FadeIn>
  </section>
);
