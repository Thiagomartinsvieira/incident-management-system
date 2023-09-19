import { useContext, useState } from 'react'
import './Nav.css'
import avatarImg from '../../assets/avatar.png'
import {
  FiArrowDownCircle,
  FiLogOut,
  FiSettings,
  FiStar,
  FiUser,
} from 'react-icons/fi'
import { AuthContext } from '../../contexts/Auth'
import { Link } from 'react-router-dom'

const Nav = () => {
  const { user, logout } = useContext(AuthContext)
  const [menuVisible, setMenuVisible] = useState(false)

  const toggleMenu = () => {
    setMenuVisible(!menuVisible)
  }

  return (
    <div className="nav nav-fixed">
      <Link to="/dashboard">
        <h2>Incident Management</h2>
      </Link>
      <div className="user-info" onClick={toggleMenu}>
        <img
          src={user.avatarUrl === null ? avatarImg : user.avatarUrl}
          alt="Imagem do usuário"
        />
        <div className="user-details">
          <h3>{user.nome}</h3>
          <FiArrowDownCircle size={20} />
        </div>
        {menuVisible && (
          <div className="user-menu">
            <ul>
              <Link to="/profile">
                <li>
                  <FiUser color="#fff" /> Profile
                </li>
              </Link>
              <Link to="/customers">
                <li>
                  <FiStar color="#fff" /> Customers
                </li>
              </Link>
              <Link to="/settings">
                <li>
                  <FiSettings color="#fff" /> Settings
                </li>
              </Link>
              <li onClick={logout}>
                <FiLogOut color="#fff" /> Logout
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default Nav
