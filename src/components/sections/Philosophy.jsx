import { PHILOSOPHY_ITEMS } from "../../content/siteContent";
import { FadeIn } from "../ui/FadeIn";
import { SectionHeading, SectionLabel } from "../ui/SectionHeader";

export const PhilosophySection = () => (
  <section id="philosophy" style={{ background: "var(--clr-bg-section)", padding: "120px 0" }}>
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 32px" }}>
      <FadeIn>
        <SectionLabel>How I Work</SectionLabel>
        <SectionHeading>Principles, not <em>platitudes</em>.</SectionHeading>
      </FadeIn>

      <div className="philosophy-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 1 }}>
        {PHILOSOPHY_ITEMS.map((item, index) => (
          <FadeIn key={item.heading} delay={index * 0.1} style={{ height: "100%" }}>
            <div className="philosophy-card">
              <div className="philosophy-num">{item.num}</div>
              <div className="philosophy-heading">{item.heading}</div>
              <div className="philosophy-text">{item.text}</div>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  </section>
);
