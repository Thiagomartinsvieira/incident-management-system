import Header from '../../components/Header'
import Nav from '../../components/Nav'
import Title from '../../components/Title'

import { FiSettings, FiUpload } from 'react-icons/fi'
import avatar from '../../assets/avatar.png'
import { AuthContext } from '../../contexts/Auth'
import { useContext, useState } from 'react'

import './Profile.css'

const Profile = () => {
  const { user } = useContext(AuthContext)

  const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl)

  return (
    <div>
      <Nav />
      <Header />

      <div className="content">
        <Title name="My Profile">
          <FiSettings size={25} />
        </Title>

        <div className="container">
          <form className="form-profile">
            <label className="label-avatar">
              <span>
                <FiUpload color="#fff" size={25} />
              </span>
              <input type="file" accept="image/*" /> <br />
              {avatarUrl === null ? (
                <img
                  src={avatar}
                  alt="Profile image"
                  width={250}
                  height={250}
                />
              ) : (
                <img
                  src={avatarUrl}
                  alt="Profile image"
                  width={250}
                  height={250}
                />
              )}
            </label>

            <label>Name</label>
            <input type="text" placeholder="Your Name" />

            <label>Email</label>
            <input type="email" placeholder="email@email.com" disabled />

            <input type="submit" value="Save" />
          </form>
        </div>

        <div className="container">
          <button className="logout-btn">Logout</button>
        </div>
      </div>
    </div>
  )
}

export default Profile
