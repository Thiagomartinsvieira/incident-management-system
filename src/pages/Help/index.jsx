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
  const [searchResults, setSearchResults] = useState([])

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
              placeholder="Enter your Query"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="button" onClick={handleSearch}>
              Search <FiSearch />
            </button>
          </div>
        </div>

        <div className="useful-info">
          <h2>Ticketing System Platform</h2>
          <br />
          <p>
            Welcome to our ticketing system platform. Here, you can create,
            track, and resolve issues and queries efficiently. We offer a wide
            range of features to help you manage your support requests in a
            simple and effective way.
          </p>
          <br />
          <p>
            If you have any questions or need assistance, please don't hesitate
            to contact our support team through the{' '}
            <a href="/contact">contact form</a> or by phone at (11) 96290-3104.
          </p>
        </div>

        <KnowledgeBase links={knowledgeBaseLinks} />

        <div className="search-results">
          {searchResults.length === 0 ? (
            <p>No results found</p>
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
