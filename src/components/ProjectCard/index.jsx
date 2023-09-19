import './ProjectCard.css'
import { FiGithub, FiLinkedin } from 'react-icons/fi'

const ProjectCard = ({ title, description, githubLink, linkedinLink }) => {
  return (
    <div className="project-card">
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="project-links">
        <a href={githubLink} target="_blank" rel="noopener noreferrer">
          <FiGithub size={25} color="#000" />
        </a>
        <a href={linkedinLink} target="_blank" rel="noopener noreferrer">
          <FiLinkedin size={25} color="#000" />
        </a>
      </div>
    </div>
  )
}

export default ProjectCard
