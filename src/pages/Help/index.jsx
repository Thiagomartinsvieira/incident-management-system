import './Help.css'
import Nav from '../../components/Nav'
import Header from '../../components/Header'
import Title from '../../components/Title'
import Footer from '../../components/Footer'
import { FiHelpCircle, FiSearch } from 'react-icons/fi'
import { useDarkMode } from '../../contexts/darkMode'
import KnowledgeBase from '../../components/KnowledgeBase'
import { useState } from 'react'

const Help = () => {
  const { darkMode, toggleDarkMode } = useDarkMode()

  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([]) // Adicione o estado para os resultados da pesquisa

  const knowledgeBaseLinks = [
    {
      title: 'How to Open a Ticket',
      url: 'https://example.com/how-to-open-ticket',
    },
    {
      title: 'Solving Common Problems',
      url: 'https://example.com/solving-common-problems',
    },
    {
      title: 'Contacting Support',
      url: 'https://example.com/contact-support',
    },
    {
      title: 'FAQs',
      url: 'https://example.com/faqs',
    },
    {
      title: 'Getting Started Guide',
      url: 'https://example.com/getting-started',
    },
    {
      title: 'Troubleshooting Tips',
      url: 'https://example.com/troubleshooting',
    },
  ]

  const handleSearch = () => {
    const results = knowledgeBaseLinks.filter((link) => {
      const query = searchQuery.toLowerCase()
      return (
        link.title.toLowerCase().includes(query) ||
        link.url.toLowerCase().includes(query)
      )
    })

    setSearchResults(results)
  }

  return (
    <div>
      <Nav />
      <Header />

      <div
        className={`content content-container ${darkMode ? 'dark-mode' : ''}`}
      >
        <div className="help">
          <Title name="Help">
            <FiHelpCircle size={25} />
          </Title>
          <div className="container">
            <input
              type="text"
              placeholder="Digite sua Dúvida"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="button" onClick={handleSearch}>
              Buscar <FiSearch />
            </button>
          </div>
        </div>

        <div className="useful-info">
          <h2>Plataforma de Sistema de Chamados</h2>
          <br />
          <p>
            Bem-vindo à nossa plataforma de sistema de chamados. Aqui, você pode
            criar, acompanhar e resolver problemas e consultas de forma
            eficiente. Oferecemos uma ampla gama de recursos para ajudá-lo a
            gerenciar suas solicitações de suporte de maneira simples e eficaz.
          </p>
          <br />
          <p>
            Se você tiver alguma dúvida ou precisar de assistência, não hesite
            em entrar em contato com nossa equipe de suporte pelo{' '}
            <a href="/contact">formulário de contato</a> ou pelo telefone (11)
            962903104.
          </p>
        </div>

        <KnowledgeBase links={knowledgeBaseLinks} />

        <div className="search-results">
          {searchResults.length === 0 ? (
            <p>Nenhum resultado encontrado</p>
          ) : (
            searchResults.map((result) => (
              <a key={result.title} href={result.url}>
                {result.title}
              </a>
            ))
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Help
