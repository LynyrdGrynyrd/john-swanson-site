import { JOURNAL_ARTICLES, PATENTS } from "../../data";
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
  </section>
);
