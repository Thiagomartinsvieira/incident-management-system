import Header from '../../components/Header'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import Title from '../../components/Title'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/Auth'
import { FiGithub, FiLinkedin } from 'react-icons/fi'
import './About.css'
import ProjectCard from '../../components/ProjectCard'
import { useDarkMode } from '../../contexts/darkMode'

const About = () => {
  const { darkMode, toggleDarkMode } = useDarkMode()

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
              Hello <span>{firstName}</span>, welcome to the platform I've
              created to apply my front-end and back-end knowledge. Here on this
              page, you can stay up to date and follow more projects carried out
              by me. Your opinion is very important and motivates me to create
              more future projects.
            </p>
            <br />
            <p>Connect with me on my main social networks 😉</p>
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
            <h2>My recent projects 🚀</h2>
            <br />
            <ProjectCard
              title="Portfolio"
              description="Hello, I'm Thiago Martins, a front-end developer passionate about technology, looking for opportunities to apply my knowledge and improve skills. Although I don't have experience in this field, I've been working for two years as a Service Desk Analyst in the IT market. Despite the lack of academic training, I seek knowledge on my own, take courses, and develop personal projects. I maintain a daily study routine and I am determined to face challenges and grow professionally. I am focused, dedicated, and eager to contribute to challenging projects."
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
              imageLink="https://movies-prime-flix.netlify.app/"
              imageSrc="src/assets/prime-flix.png"
            />
            <ProjectCard
              title="Password Generator"
              description="Password generator developed with HTML5, CSS3 and JavaScript. The tool allows you to generate personalized passwords with a variable length of characters. The user can adjust the password length using a slider and then generate a new password by clicking the corresponding button. The generated password is displayed on the screen and can be copied with a single click. A practical and secure solution for creating strong passwords."
              githubLink="https://github.com/Thiagomartinsvieira/Gerador_de_senha"
              imageLink="https://gerador-de-senha-theta-one.vercel.app/"
              imageSrc="src/assets/password-generator.png"
            />
          </div>
        </div>
      </div>
      <br />
      <Footer />
    </div>
  )
}

export default About
