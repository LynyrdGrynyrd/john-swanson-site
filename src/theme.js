export const themes = {
  dark: {
    '--clr-bg': '#0a0a0a',
    '--clr-bg-section': '#0d0c0b',
    '--clr-bg-card': '#0f0e0d',
    '--clr-text': '#e8e4df',
    '--clr-text-sec': '#a09a93',
    '--clr-text-sec-light': '#d4cfc8',
    '--clr-text-muted': '#6b665e',
    '--clr-text-footer': '#3d3a36',
    '--clr-accent': '#c4956a',
    '--clr-accent-hover': '#d4a57a',
    '--clr-accent-muted': 'rgba(196,149,106,0.27)',
    '--clr-accent-subtle': 'rgba(196,149,106,0.2)',
    '--clr-accent-glow': 'rgba(196,149,106,0.14)',
    '--clr-sheen': '#f6e1c8',
    '--clr-border': '#1f1d1a',
    '--clr-border-subtle': '#1a1917',
    '--clr-border-faint': '#141311',
    '--clr-border-btn': '#2a2724',
    '--clr-nav-bg': 'rgba(10,10,10,0.85)',
    '--clr-mobile-menu': 'rgba(10,10,10,0.97)',
    '--clr-selection-bg': '#c4956a',
    '--clr-selection-color': '#0a0a0a',
    '--topo-opacity': '0.07',
    '--topo-filter': 'invert(1)',
  },
  light: {
    '--clr-bg': '#f0ede8',
    '--clr-bg-section': '#e8e4df',
    '--clr-bg-card': '#faf8f5',
    '--clr-text': '#1a1815',
    '--clr-text-sec': '#5a5550',
    '--clr-text-sec-light': '#3d3930',
    '--clr-text-muted': '#8a8480',
    '--clr-text-footer': '#b0aba4',
    '--clr-accent': '#9a6f3a',
    '--clr-accent-hover': '#b07f45',
    '--clr-accent-muted': 'rgba(154,111,58,0.27)',
    '--clr-accent-subtle': 'rgba(154,111,58,0.2)',
    '--clr-accent-glow': 'rgba(154,111,58,0.12)',
    '--clr-sheen': '#e3b57a',
    '--clr-border': '#d8d3cc',
    '--clr-border-subtle': '#ddd9d2',
    '--clr-border-faint': '#e5e2dc',
    '--clr-border-btn': '#c0bab2',
    '--clr-nav-bg': 'rgba(240,237,232,0.85)',
    '--clr-mobile-menu': 'rgba(240,237,232,0.97)',
    '--clr-selection-bg': '#9a6f3a',
    '--clr-selection-color': '#f0ede8',
    '--topo-opacity': '0.06',
    '--topo-filter': 'none',
  }
};

const STORAGE_KEY = 'theme';

export const getInitialIsDark = () => {
  try {
    return localStorage.getItem(STORAGE_KEY) !== 'light';
  } catch {
    return true;
  }
};

export const saveTheme = (isDark) => {
  try {
    localStorage.setItem(STORAGE_KEY, isDark ? 'dark' : 'light');
  } catch {
    // Storage blocked (private mode, etc.): theme just won't persist.
  }
};

export const applyTheme = (isDark) => {
  const theme = isDark ? themes.dark : themes.light;
  const root = document.documentElement;
  for (const [key, value] of Object.entries(theme)) {
    root.style.setProperty(key, value);
  }
  root.style.colorScheme = isDark ? 'dark' : 'light';
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme['--clr-bg']);
};
