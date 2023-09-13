import './Nav.css'
import avatarImg from '../../assets/avatar.png'
import { FiArrowDownCircle } from 'react-icons/fi'
import { AuthContext } from '../../contexts/Auth'
import { useContext } from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {
  const { user } = useContext(AuthContext)

  return (
    <div className="nav">
      <Link to="/dashboard">
        <h2>Help Desk</h2>
      </Link>
      <div className="user-info">
        <img
          src={user.avatarUrl === null ? avatarImg : user.avatarUrl}
          alt="image user"
        />
        <h3>{user.nome}</h3>
        <FiArrowDownCircle size={20} />
      </div>
    </div>
  )
}

export default Nav
