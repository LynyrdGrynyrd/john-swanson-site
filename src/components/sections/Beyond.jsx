import { BEYOND_ITEMS } from "../../content/siteContent";
import { FadeIn } from "../ui/FadeIn";
import { SectionHeading, SectionLabel } from "../ui/SectionHeader";

export const BeyondSection = () => (
  <section style={{ background: "var(--clr-bg-section)", padding: "120px 0" }}>
    <div style={{ maxWidth: 700, margin: "0 auto", padding: "0 32px" }}>
      <FadeIn>
        <SectionLabel>Beyond the Lab</SectionLabel>
        <SectionHeading>A few things you won't find<br />on my <em>resume</em>.</SectionHeading>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div>
          {BEYOND_ITEMS.map((item) => (
            <div key={item.text} className="beyond-item">
              <div className="beyond-icon">{item.icon}</div>
              <div className="beyond-text">{item.text}</div>
            </div>
          ))}
        </div>
      </FadeIn>
    </div>
  </section>
);
