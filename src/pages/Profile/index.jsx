import Header from '../../components/Header'
import Nav from '../../components/Nav'
import Title from '../../components/Title'

import { FiSettings, FiUpload } from 'react-icons/fi'
import avatar from '../../assets/avatar.png'
import { AuthContext } from '../../contexts/Auth'
import { useContext, useState } from 'react'

import './Profile.css'
import { toast } from 'react-toastify'

const Profile = () => {
  const { user, setUser, storageUser, logout } = useContext(AuthContext)

  const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl)
  const [imageAvatar, setImageAvatar] = useState(null)

  const [name, setName] = useState(user && user.nome)
  const [email, setEmail] = useState(user && user.email)

  const handleFile = (e) => {
    if (e.target.files[0]) {
      const image = e.target.files[0]

      if (
        image.type === 'image/jpeg' ||
        image.type === 'image/png' ||
        image.type === 'image/webp'
      ) {
        setImageAvatar(image)
        setAvatarUrl(URL.createObjectURL(image))
      } else {
        toast.error('upload a png, jpeg or webp image')
        setImageAvatar(null)
        return
      }
    }
  }

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
              <input type="file" accept="image/*" onChange={handleFile} />{' '}
              <br />
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
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label>Email</label>
            <input type="email" value={email} disabled />

            <input type="submit" value="Save" />
          </form>
        </div>

        <div className="container">
          <button className="logout-btn" onClick={() => logout()}>
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}

export default Profile
