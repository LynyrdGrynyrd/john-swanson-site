export const PublicationList = ({ title, items }) => (
  <div style={{ marginBottom: 40 }}>
    <div className="sub-label">{title}</div>
    {items.map((publication) => (
      <div key={publication.title} className="pub-item">
        <a href={publication.url} className="pub-title" target="_blank" rel="noopener noreferrer">
          {publication.title}
        </a>
        <div className="pub-journal">{publication.subtitle}</div>
      </div>
    ))}
  </div>
);
