import { EXPERIENCE_ITEMS } from "../../content/siteContent";
import { FadeIn } from "../ui/FadeIn";
import { SectionHeading, SectionLabel } from "../ui/SectionHeader";

export const ExperienceSection = () => (
  <section id="experience" style={{ maxWidth: 800, margin: "0 auto", padding: "120px 32px" }}>
    <FadeIn>
      <SectionLabel>Experience</SectionLabel>
      <SectionHeading>Where I've done the <em>work</em>.</SectionHeading>
    </FadeIn>

    <div style={{ marginTop: 24 }}>
      {EXPERIENCE_ITEMS.map((item, index) => (
        <FadeIn key={`${item.company}-${item.role}`} delay={index * 0.07}>
          <div className="timeline-item">
            <div className="timeline-company">{item.company}</div>
            <div className="timeline-role">{item.role}</div>
            <div className="timeline-date">{item.date}</div>
            <div className="timeline-desc">{item.desc}</div>
          </div>
        </FadeIn>
      ))}
    </div>
  </section>
);
