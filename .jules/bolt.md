## 2024-05-22 - Inline Style Tags with JS Interpolation
**Learning:** The application was using a `<style>` tag inside the main `App` component with JS string interpolation for theme variables. This forces the browser to re-parse the stylesheet on every render of `App`, and prevents caching of the CSS.
**Action:** Extract static CSS to a `.css` file and use CSS variables (updated via JS) for dynamic values. This separates concerns and improves render performance.
