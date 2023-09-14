import './Help.css'
import Nav from '../../components/Nav'
import Header from '../../components/Header'
import Title from '../../components/Title'
import { FiHelpCircle, FiSearch } from 'react-icons/fi'

const Help = () => {
  return (
    <div>
      <Nav />
      <Header />

      <div className="content">
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

        {/* Informações úteis sobre a plataforma de sistema de chamados */}
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
            <a href="/contato">formulário de contato</a> ou pelo telefone (123)
            456-7890.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Help
