const KnowledgeBase = ({ links }) => {
  return (
    <div className="knowledge-base content-container">
      <h2>Knowledge base</h2>
      <ul>
        {links.map((link, index) => (
          <li key={index}>
            <a href={link.url} target="_blank" rel="noreferrer"></a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default KnowledgeBase
