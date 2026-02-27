import { FadeIn } from "../ui/FadeIn";
import { SectionHeading, SectionLabel } from "../ui/SectionHeader";

export const AboutSection = ({ simpleMode, setSimpleMode }) => (
  <section id="about" style={{ maxWidth: 900, margin: "0 auto", padding: "120px 32px" }}>
    <FadeIn>
      <SectionLabel>About</SectionLabel>
      <SectionHeading>I connect research<br />to <em>results</em>.</SectionHeading>
    </FadeIn>
    <FadeIn delay={0.15}>
      {simpleMode ? (
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 17, lineHeight: 1.9, color: "var(--clr-text-sec)", maxWidth: 600 }}>
          <p>You know how some stuff melts when it gets hot and some stuff breaks when you bend it? I figure out how to make stuff that doesn't do either of those things. Scientists and business people speak different languages. I speak both. But mostly I write emails about it.</p>
        </div>
      ) : (
        <div className="about-columns" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, fontFamily: "'DM Sans', sans-serif", fontSize: 15, lineHeight: 1.8, color: "var(--clr-text-sec)" }}>
          <div>
            <p>Every role follows one pattern: I build things that didn't exist before. Platforms, pipelines, teams, processes. Then I make sure they ship. I work across the table from sales, manufacturing, executives, and external partners, and I'm as fluent in the lab as I am in the boardroom. I connect those worlds.</p>
            <p style={{ marginTop: 16 }}>I'm a polymer scientist by training, but the pattern is always the same: understand the real need, build the solution, make the business case, and drive it to revenue.</p>
          </div>
          <div>
            <p>At NeoGraf I inherited a four-person R&D team, grew it from four to eight at its peak. At Avient I designed LDP rotation assignments that added capacity at zero cost, and mentored every associate through real projects, not busywork. I care about structure: stage-gates, clear ownership, documented processes. Good systems let good scientists focus on science instead of fighting the organization.</p>
            <p style={{ marginTop: 16 }}>I've loved science since I was a kid building model rockets and trebuchets in middle school. That curiosity hasn't changed. I still love asking questions, understanding how things work, and figuring out how to make them better. I just get to do it at a bigger scale now.</p>
          </div>
        </div>
      )}
      <button className="toggle-simple" onClick={() => setSimpleMode((state) => !state)}>
        {simpleMode ? "← Back to the real version" : "Explain it to a five-year-old →"}
      </button>
    </FadeIn>
  </section>
);
