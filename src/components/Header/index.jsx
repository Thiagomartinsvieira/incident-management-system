import avatarImg from '../../assets/avatar.png'

import { useContext } from 'react'
import { Link } from 'react-router-dom'

import { AuthContext } from '../../contexts/Auth'
import { FiHome, FiUser, FiSettings } from 'react-icons/fi'
import './Header.css'

const Header = () => {
  const { user } = useContext(AuthContext)

  return (
    <div className="sidebar">
      <div>
        <img
          src={user.avatarUrl === null ? avatarImg : user.avatarUrl}
          alt="image user"
        />
      </div>

      <Link to="/dashboard">
        <FiHome color="#fff" size={24} />
        Tickets
      </Link>

      <Link to="/customers">
        <FiUser color="#fff" size={24} />
        Customers
      </Link>

      <Link to="/profile">
        <FiSettings color="#fff" size={24} />
        Profile
      </Link>
    </div>
  )
}

export default Header
