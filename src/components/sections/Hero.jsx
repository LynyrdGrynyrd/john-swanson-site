export const HeroSection = ({ scrollTo }) => (
  <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden", paddingTop: 80 }}>
    <div className="hero-line" style={{ width: 1, height: "40%", top: 0, left: "12%", opacity: 0.4 }} />
    <div className="hero-line" style={{ width: 1, height: "25%", bottom: 0, right: "18%", opacity: 0.25 }} />
    <div className="hero-line" style={{ width: "20%", height: 1, top: "25%", right: 0, opacity: 0.25 }} />

    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 32px", width: "100%" }}>
      <div className="hero-grid" style={{ display: "flex", alignItems: "center", gap: "clamp(40px, 6vw, 80px)" }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 20, padding: "6px 12px", border: "1px solid var(--clr-border)", borderRadius: 999, fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "var(--clr-text-muted)", letterSpacing: 0.5 }}>
            <span className="status-dot" />
            Director of Innovation Portfolio · Polymer Industry Cluster
          </div>

          <h1 style={{ fontFamily: "'Source Serif 4', serif", fontSize: "clamp(48px, 9vw, 108px)", fontWeight: 300, lineHeight: 0.95, letterSpacing: "-0.02em", color: "var(--clr-text)", marginBottom: 24 }}>
            John<br /><em style={{ color: "var(--clr-accent)" }}>Swanson</em>
          </h1>

          <p className="motto-text" style={{ marginBottom: 28 }}>Built in the lab. Proven in the boardroom.</p>

          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(17px, 2.1vw, 21px)", lineHeight: 1.6, color: "var(--clr-text-sec)", maxWidth: 560 }}>
            Polymers brought me to Akron when I was 22. Fifteen years later, I'm back to help build the polymer innovation ecosystem here.
          </p>

          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, lineHeight: 1.8, color: "var(--clr-text-muted)", marginTop: 16, maxWidth: 580 }}>
            Director of Innovation Portfolio at the Polymer Industry Cluster (Greater Akron Chamber), the EDA-designated Sustainable Polymers Tech Hub for Northeast Ohio. Also a registered minister who has officiated four weddings. Both callings require understanding what people need.
          </p>

          <div className="hero-buttons" style={{ marginTop: 40, display: "flex", gap: 20, flexWrap: "wrap" }}>
            <button className="btn-primary" onClick={() => scrollTo("Contact")}>Get in Touch</button>
            <button className="btn-outline" onClick={() => scrollTo("Experience")}>View Experience</button>
          </div>
        </div>

        <div className="headshot-wrapper">
          <picture>
            <source srcSet="/headshot.webp" type="image/webp" />
            <img src="/headshot.jpg" alt="John P. Swanson" />
          </picture>
        </div>
      </div>
    </div>

    <div style={{ position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)" }}>
      <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom, transparent, var(--clr-accent))" }} />
    </div>
  </section>
);
