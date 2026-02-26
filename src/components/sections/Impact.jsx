import { IMPACT_METRICS } from "../../data";
import { CountUpValue } from "../ui/CountUpValue";
import { FadeIn } from "../ui/FadeIn";
import { SectionHeading, SectionLabel } from "../ui/SectionHeader";

export const ImpactSection = () => (
  <section id="impact" style={{ background: "var(--clr-bg-section)", padding: "120px 0" }}>
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
      <FadeIn>
        <SectionLabel>Impact</SectionLabel>
        <SectionHeading>The numbers behind the <em>work</em>.</SectionHeading>
      </FadeIn>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 1 }}>
        {IMPACT_METRICS.map((metric, index) => (
          <FadeIn key={metric.label} delay={index * 0.06} style={{ height: "100%" }}>
            <div className="metric-card">
              <CountUpValue value={metric.value} />
              <div className="metric-label">{metric.label}</div>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  </section>
);
