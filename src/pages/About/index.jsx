import Header from '../../components/Header'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import Title from '../../components/Title'
import { useContext, useState } from 'react'
import { AuthContext } from '../../contexts/Auth'
import { FiGithub } from 'react-icons/fi'
import './About.css'
import ProjectCard from '../../components/ProjectCard'

const About = () => {
  const [darkMode, setDarkMode] = useState(false)

  const { user } = useContext(AuthContext)

  const firstName = user.nome.split(' ')[0]

  return (
    <div>
      <Nav />
      <Header />
      <div
        className={`content content-container ${darkMode ? 'dark-mode' : ''}`}
      >
        <Title name="About">
          <FiGithub size={25} />
        </Title>
        <div className="container">
          <div className="about">
            <h1>About me</h1>
            <p>
              Olá <span>{firstName}</span> seja bem vindo a plataforma de
              chamados feita para aplicar meus conhecimentos como front e backed
              aqui nesta pagina voce pode ficar por dentro e acompanhar mais
              projetos realizaos por mim, sua pínião é bastante importante e me
              deixa motivado para que mais projetos futuros possam surgir
            </p>
            <br />
            <h2>Para mais projetos como este</h2>
            <br />
            <p>Me acompanhe em minhas pricipais redes 😉</p>
            <br />
            <ProjectCard
              title="Project 1"
              description="Description"
              githubLink="Link to gitHub"
              linkedinLink="Linkedin link"
            />
            <ProjectCard
              title="Project 2"
              description="Description"
              githubLink="Link to gitHub"
              linkedinLink="Linkedin link"
            />
            <ProjectCard
              title="Project 3"
              description="Description"
              githubLink="Link to gitHub"
              linkedinLink="Linkedin link"
            />
            <ProjectCard
              title="Project 4"
              description="Description"
              githubLink="Link to gitHub"
              linkedinLink="Linkedin link"
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default About
