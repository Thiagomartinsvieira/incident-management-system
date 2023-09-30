const KnowledgeBase = ({ links }) => {
  return (
    <div className="knowledge-base content-container">
      <h2>Base de Conhecimento</h2>
      <ul>
        {links.map((link, index) => (
          <li key={index}>
            <a href={link.url} target="_blank" rel="noopener noreferrer">
              <br />
              {link.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default KnowledgeBase
