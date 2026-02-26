import { DIGITAL_RD_ITEMS } from "../../data";
import { FadeIn } from "../ui/FadeIn";
import { SectionHeading, SectionLabel } from "../ui/SectionHeader";
import { TypingText } from "../ui/TypingText";

export const DigitalRDSection = () => (
  <section id="digital-randd" style={{ maxWidth: 1000, margin: "0 auto", padding: "120px 32px" }}>
    <FadeIn>
      <SectionLabel>Point of View</SectionLabel>
      <SectionHeading>The next generation of R&D is <em>digital</em>.</SectionHeading>
    </FadeIn>

    <FadeIn delay={0.1}>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, lineHeight: 1.8, color: "var(--clr-text-sec)", maxWidth: 700, marginBottom: 48 }}>
        Every team I've led, I've built digital systems to make the science faster and the decisions sharper. Not because I read an article about digital transformation, but because I got tired of watching scientists spend their time on work a machine should do.
      </p>
    </FadeIn>

    <div className="digital-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 1 }}>
      {DIGITAL_RD_ITEMS.map((item, index) => (
        <FadeIn key={item.label} delay={index * 0.08} style={{ height: "100%" }}>
          <div className="digital-grid-card">
            <div className="card-label" style={{ marginBottom: 12 }}>{item.label}</div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, lineHeight: 1.7, color: "var(--clr-text-sec)" }}>{item.desc}</div>
          </div>
        </FadeIn>
      ))}
    </div>

    <TypingText
      text="Full disclosure: this website was built with AI too."
      delay={0.3}
      style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: "var(--clr-text-muted)", marginTop: 32, fontStyle: "normal", minHeight: "1.6em" }}
    />
  </section>
);
