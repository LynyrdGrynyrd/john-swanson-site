
export const ThemeToggle = ({ isDark, setIsDark }) => (
  <button
    onClick={() => setIsDark((state) => !state)}
    title={isDark ? "sp² — graphite" : "sp³ — diamond"}
    aria-label="Toggle hybridization theme"
    className="theme-toggle"
  >
    {isDark ? (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12,2 20.5,7 20.5,17 12,22 3.5,17 3.5,7" />
        <line x1="12" y1="2" x2="12" y2="22" />
        <line x1="3.5" y1="7" x2="20.5" y2="17" />
        <line x1="20.5" y1="7" x2="3.5" y2="17" />
      </svg>
    ) : (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12,1 23,9 12,23 1,9" />
        <polyline points="1,9 7,9 12,1 17,9 23,9" />
        <line x1="7" y1="9" x2="12" y2="23" />
        <line x1="17" y1="9" x2="12" y2="23" />
      </svg>
    )}
    sp{isDark ? "²" : "³"}
  </button>
);
