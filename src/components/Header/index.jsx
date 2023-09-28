import { useContext } from 'react'
import { Link } from 'react-router-dom'

import { AuthContext } from '../../contexts/Auth'
import { useDarkMode } from '../../contexts/darkMode'
import {
  FiUser,
  FiSettings,
  FiLogOut,
  FiStar,
  FiHelpCircle,
  FiFileText,
  FiPlusCircle,
  FiPhoneCall,
  FiGithub,
} from 'react-icons/fi'
import './Header.css'

const Header = () => {
  const { logout } = useContext(AuthContext)
  const { darkMode } = useDarkMode()

  return (
    <div className={`sidebar ${darkMode ? 'dark-mode' : ''}`}>
      <div></div>

      <Link to="/dashboard">
        <FiFileText color="#fff" size={24} />
        Tickets
      </Link>
      <Link to="/newticket">
        <FiPlusCircle color="#fff" size={24} />
        New Ticket
      </Link>

      <Link to="/customers">
        <FiStar color="#fff" size={24} />
        Customers
      </Link>

      <Link to="/profile">
        <FiUser color="#fff" size={24} />
        Profile
      </Link>
      <Link to="/help">
        <FiHelpCircle color="#fff" size={24} />
        Help
      </Link>
      <Link to="/about">
        <FiGithub color="#fff" size={24} />
        About
      </Link>
      <Link to="/contact">
        <FiPhoneCall color="#fff" size={24} />
        Contact
      </Link>
      <Link to="/settings">
        <FiSettings color="#fff" size={24} />
        Settings
      </Link>
      <button
        className="logout-btn logout-btn-sidebar"
        onClick={() => logout()}
      >
        <span title="Logout">
          <FiLogOut size={25} />
        </span>
      </button>
    </div>
  )
}

export default Header
