export const SectionLabel = ({ children, center }) => (
  <div className={`section-label${center ? " section-label-center" : ""}`}>{children}</div>
);

export const SectionHeading = ({ children }) => <h2 className="section-title">{children}</h2>;
