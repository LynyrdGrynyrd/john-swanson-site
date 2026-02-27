export const PublicationList = ({ title, items }) => (
  <div style={{ marginBottom: 40 }}>
    <div className="sub-label">{title}</div>
    {items.map((publication) => (
      <div key={publication.title} className="pub-item">
        {publication.url ? (
          <a href={publication.url} className="pub-title" target="_blank" rel="noopener noreferrer">
            {publication.title}
          </a>
        ) : (
          <span className="pub-title">
            {publication.title}
          </span>
        )}
        <div className="pub-journal">{publication.subtitle}</div>
      </div>
    ))}
  </div>
);
