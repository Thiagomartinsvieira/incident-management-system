import './Nav.css'
import avatarImg from '../../assets/avatar.png'
import { FiArrowDownCircle } from 'react-icons/fi'
import { AuthContext } from '../../contexts/Auth'
import { useContext } from 'react'

const Nav = () => {
  const { user } = useContext(AuthContext)

  return (
    <div className="nav">
      <h2>Help Desk</h2>
      <div className="user-info">
        <img
          src={user.avatarUrl === null ? avatarImg : user.avatarUrl}
          alt="image user"
        />
        <h3>logged in user</h3>
        <FiArrowDownCircle size={20} />
      </div>
    </div>
  )
}

export default Nav
