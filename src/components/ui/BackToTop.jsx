
export const BackToTop = ({ showTopBtn }) => (
  <button
    className={`back-to-top ${showTopBtn ? "visible" : ""}`}
    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    aria-label="Back to top"
  >
    &#8593;
  </button>
);
