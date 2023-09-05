import './Nav.css'
import { FiUser, FiArrowDownCircle } from 'react-icons/fi'

const Nav = () => {
  return (
    <div className="nav">
      <h2>Help Desk</h2>
      <div className="user-info">
        <FiUser />
        <h3>logged in user</h3>
        <FiArrowDownCircle size={20} />
      </div>
    </div>
  )
}

export default Nav
