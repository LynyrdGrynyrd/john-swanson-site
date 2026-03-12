import { EXPERIENCE_ITEMS, AWARDS, PROF_DEV } from "../../data";
import { isSafeUrl } from "../../utils/security";
import { FadeIn } from "../ui/FadeIn";
import { SectionHeading, SectionLabel } from "../ui/SectionHeader";

const linkStyle = { color: "var(--clr-accent)", textDecoration: "none", borderBottom: "1px solid transparent", transition: "border-color 0.2s" };

function renderDesc(desc, descLinks) {
  if (!descLinks) return desc;
  const parts = desc.split(/\{(\w+)\}/);
  return parts.map((part, i) => {
    if (descLinks[part]) {
      const href = descLinks[part].url;
      if (!isSafeUrl(href)) return descLinks[part].text;
      return <a key={i} href={href} target="_blank" rel="noopener noreferrer" style={linkStyle}>{descLinks[part].text}</a>;
    }
    return part;
  });
}

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
            <div className="timeline-desc">
              {item.labUrl && (
                isSafeUrl(item.labUrl) ? (
                  <><a href={item.labUrl} target="_blank" rel="noopener noreferrer" style={linkStyle}>{item.labName}</a>. </>
                ) : (
                  <>{item.labName}. </>
                )
              )}
              {renderDesc(item.desc, item.descLinks)}
            </div>
          </div>
        </FadeIn>
      ))}
    </div>

    <FadeIn delay={0.5}>
      <div style={{ marginTop: 64 }}>
        <div className="sub-label">Recognition</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 16 }}>
          {AWARDS.map((award) => (
            <div key={award.title} className="credential-row">
              <span className="credential-year">{award.year}</span>
              <span>{award.title} — {award.org}</span>
            </div>
          ))}
        </div>
      </div>
    </FadeIn>

    <FadeIn delay={0.55}>
      <div style={{ marginTop: 40 }}>
        <div className="sub-label">Professional Development</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 16 }}>
          {PROF_DEV.map((item) => (
            <div key={item.title} className="credential-row">
              <span className="credential-year">{item.year}</span>
              <span>{item.title} — {item.org}</span>
            </div>
          ))}
        </div>
      </div>
    </FadeIn>
  </section>
);
