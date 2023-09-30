import './ProjectCard.css'
import { FiGithub } from 'react-icons/fi'
import { useDarkMode } from '../../contexts/darkMode'

const ProjectCard = ({
  title,
  description,
  githubLink,
  imageLink,
  imageSrc,
}) => {
  const { darkMode } = useDarkMode()
  return (
    <div className="project-card">
      <a href={imageLink} target="_blank" rel="noreferrer">
        <img src={imageSrc} alt={title} />
      </a>
      <h3>{title}</h3>
      <p>{description}</p>
      <div className={`project-links ${darkMode ? 'dark-mode' : ''}`}>
        <a href={githubLink} target="_blank" rel="noopener noreferrer">
          <FiGithub size={25} color={darkMode ? '#fff' : '#000'} />
        </a>
      </div>
    </div>
  )
}

export default ProjectCard
