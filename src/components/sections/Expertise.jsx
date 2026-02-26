import { EXPERTISE_CATEGORIES } from "../../data";
import { FadeIn } from "../ui/FadeIn";
import { SectionHeading, SectionLabel } from "../ui/SectionHeader";

export const ExpertiseSection = () => (
  <section style={{ background: "var(--clr-bg-section)", padding: "120px 0" }}>
    <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 32px" }}>
      <FadeIn>
        <SectionLabel>Technical Expertise</SectionLabel>
        <SectionHeading>What I <em>work</em> with.</SectionHeading>
      </FadeIn>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 48 }}>
        {EXPERTISE_CATEGORIES.map((category, index) => (
          <FadeIn key={category.heading} delay={index * 0.1}>
            <div>
              <div className="card-label" style={{ marginBottom: 16 }}>{category.heading}</div>
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                {category.tags.map((tag) => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  </section>
);
