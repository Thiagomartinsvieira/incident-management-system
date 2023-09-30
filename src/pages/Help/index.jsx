import './Help.css'
import Nav from '../../components/Nav'
import Header from '../../components/Header'
import Title from '../../components/Title'
import Footer from '../../components/Footer'
import { FiHelpCircle, FiSearch } from 'react-icons/fi'
import { useDarkMode } from '../../contexts/darkMode'
import KnowledgeBase from '../../components/KnowledgeBase'

const Help = () => {
  const { darkMode, toggleDarkMode } = useDarkMode()

  const knowledgeBaseLinks = [
    {
      title: 'How to Open a Ticket',
      url: 'https://example.com/',
    },
    {
      title: 'Solving Common Problems',
      url: 'https://example.com/',
    },
    {
      title: 'Contacting Support',
      url: 'https://example.com/',
    },
  ]

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
            <input type="text" placeholder="Digite sua Dúvida" />
            <button type="submit">
              Buscar <FiSearch />
            </button>
          </div>
        </div>

        <div className="useful-info content-container">
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
            <a href="/contact">formulário de contato</a> ou pelo telefone (123)
            456-7890.
          </p>
        </div>

        <KnowledgeBase links={knowledgeBaseLinks} />
      </div>
      <Footer />
    </div>
  )
}

export default Help
