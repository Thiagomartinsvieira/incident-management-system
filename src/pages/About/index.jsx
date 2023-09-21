import Header from '../../components/Header'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import Title from '../../components/Title'
import { useContext, useState } from 'react'
import { AuthContext } from '../../contexts/Auth'
import { FiGithub, FiLinkedin } from 'react-icons/fi'
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
            <p>Me acompanhe em minhas pricipais redes 😉</p>
            <br />
            <a
              href="https://www.linkedin.com/in/thiago-martins-vieira-074550192/"
              target="_blank"
              rel="noreferrer"
            >
              <FiLinkedin size={25} />
            </a>{' '}
            <a
              href="https://github.com/Thiagomartinsvieira"
              target="_blank"
              rel="noreferrer"
            >
              <FiGithub size={25} />
            </a>
            <br />
            <h2>Meus projetos recentes</h2>
            <br />
            <ProjectCard
              title="Portifolio"
              description="Description"
              githubLink="https://github.com/Thiagomartinsvieira/portfolio"
              imageLink="https://portfolio-plum-rho-75.vercel.app/"
              imageSrc="src/assets/portifolio.png"
            />
            <ProjectCard
              title="Auto Vieira"
              description="Version 2 of the Auto Viação Vieira Website: Fictitious project developed with React and TypeScript. Intuitive interface, improved navigation, online ticket purchase, attractive promotions and emphasis on safety and comfort. Demonstration of skills in front-end development and creation of responsive interfaces."
              githubLink="https://github.com/Thiagomartinsvieira/siteDePassagens"
              imageLink="https://site-de-passagens.vercel.app/"
              imageSrc="src/assets/auto-vieira.png"
            />
            <ProjectCard
              title="Prime Flix"
              description="Prime-Flix: My first project using an API. A React application that uses The Movie Database (TMDb) API to explore movies and series. Search detailed information, ratings, cast and genres. Personalized recommendations, playlists and viewing progress tracking. An intuitive and user-friendly navigation experience for movie and series enthusiasts."
              githubLink="https://github.com/Thiagomartinsvieira/projeto-filmes"
              linkedinLink="Linkedin link"
              imageSrc="src/assets/prime-flix.png"
            />
            <a href="">
              <ProjectCard
                title="Password Generator"
                description="Password generator developed with HTML5, CSS3 and JavaScript. The tool allows you to generate personalized passwords with a variable length of characters. The user can adjust the password length using a slider and then generate a new password by clicking the corresponding button. The generated password is displayed on the screen and can be copied with a single click. A practical and secure solution for creating strong passwords."
                githubLink="https://github.com/Thiagomartinsvieira/Gerador_de_senha"
                linkedinLink="Linkedin link"
                imageSrc="src/assets/password-generator.png"
              />
            </a>
          </div>
        </div>
      </div>
      <br />
      <Footer />
    </div>
  )
}

export default About
