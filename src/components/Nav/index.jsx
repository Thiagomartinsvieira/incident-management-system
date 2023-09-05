import './Nav.css'
import { FaUser, FaArrowCircleDown } from 'react-icons/fa'

const Nav = () => {
  return (
    <div className="nav">
      <h2>Help Desk</h2>
      <div className="user-info">
        <FaUser />
        <h3>logged in user</h3>
        <FaArrowCircleDown size={10}/>
      </div>
    </div>
  )
}

export default Nav
