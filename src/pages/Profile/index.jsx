import Header from '../../components/Header'
import Nav from '../../components/Nav'
import Title from '../../components/Title'
import avatar from '../../assets/avatar.png'

import { FiSettings, FiUpload } from 'react-icons/fi'
import { AuthContext } from '../../contexts/Auth'
import { useContext, useState } from 'react'

import './Profile.css'
import { toast } from 'react-toastify'

import { db, storage } from '../../services/firebaseConnection'
import { doc, updateDoc } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

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

  const handleUpload = async () => {
    const currentUid = user.uid

    const uploadRef = ref(storage, `images/${currentUid}/${imageAvatar.name}`)

    const uploadTask = uploadBytes(uploadRef, imageAvatar).then((snapshot) => {
      getDownloadURL(snapshot.ref).then(async (downloadUrl) => {
        let urlPhoto = downloadUrl

        const docRef = doc(db, 'users', user.uid)
        await updateDoc(docRef, {
          avatarUrl: urlPhoto,
          nome: name,
        }).then(() => {
          let data = {
            ...user,
            nome: name,
            avatarUrl: urlPhoto,
          }
          setUser(data)
          storageUser(data)
          toast.success('updated with!')
        })
      })
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (imageAvatar === null && name !== '') {
      // change just name
      const docRef = doc(db, 'users', user.uid)
      await updateDoc(docRef, {
        nome: name,
      }).then(() => {
        let data = {
          ...user,
          nome: name,
        }
        setUser(data)
        storageUser(data)
        toast.success('updated name!')
      })
    } else if (name !== '' && imageAvatar !== null) {
      // update name and photo
      handleUpload()
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
          <form className="form-profile" onSubmit={handleSubmit}>
            <label className="label-avatar">
              <span>
                <FiUpload color="#fff" size={25} />
              </span>
              <input type="file" accept="image/*" onChange={handleFile} />
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
