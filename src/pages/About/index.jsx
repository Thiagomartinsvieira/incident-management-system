import Header from '../../components/Header'
import Nav from '../../components/Nav'
import Title from '../../components/Title'
import { useContext, useState } from 'react'
import { AuthContext } from '../../contexts/Auth'
import { FiGithub, FiLinkedin } from 'react-icons/fi'
import './About.css'

const About = () => {
  const [darkMode, setDarkMode] = useState(false)

  const { user } = useContext(AuthContext)

  const firstName = user.nome.split(' ')[0]

  return (
    <div>
      <Nav />
      <Header />
      <div className={`content ${darkMode ? 'dark-mode' : ''}`}>
        <Title name="About">
          <FiGithub size={25} />
        </Title>
        <div className="container">
          <div className="about">
            <h1>About me</h1>
            <p>
              Hello <span>{firstName}</span> seja muito bem vindo ao meu projeto
              amet consectetur adipisicing elit. Perferendis optio fugiat, quod
              aperiam deleniti eaque culpa eius aut reprehenderit? Est minima
              odio assumenda. Quisquam nobis sunt porro aliquam fugit laborum.
            </p>
            <br />
            <h2>Para mais projetos como este</h2>
            <FiGithub />
            <FiLinkedin />
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
