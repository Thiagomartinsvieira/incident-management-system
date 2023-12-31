import { useContext, useState, useEffect } from 'react'
import { useDarkMode } from '../../contexts/darkMode'
import { AuthContext } from '../../contexts/Auth'
import { FiSettings } from 'react-icons/fi'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import {
  getAuth,
  updatePassword,
  updateEmail,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../services/firebaseConnection'

import Header from '../../components/Header'
import Nav from '../../components/Nav'
import Title from '../../components/Title'
import Footer from '../../components/Footer'

import './Settings.css'

const Settings = () => {
  const {
    user,
    setUser,
    deleteUserAccount,
    updatePasswordFunction,
    updateName,
    storageUser,
    reauthenticateWithCredential,
  } = useContext(AuthContext)

  const { darkMode, toggleDarkMode } = useDarkMode()

  const [userName, setUserName] = useState(user ? user.nome : '')
  const [userEmail, setUserEmail] = useState(user ? user.email : '')
  const [userPhotoUrl, setUserPhotoUrl] = useState(null)
  const [deleteAccountConfirm, setDeleteAccountConfirm] = useState(false)
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  const [isUserInfoChanged, setIsUserInfoChanged] = useState(false)
  const [isPasswordChanged, setIsPasswordChanged] = useState(false)
  const [currentPassword, setCurrentPassword] = useState('')
  const [changeAlert, setChangeAlert] = useState(null)

  const navigate = useNavigate()

  const auth = getAuth()

  useEffect(() => {
    if (user) {
      setUserName(user.nome)
      setUserEmail(user.email)
      setIsUserInfoChanged(false)

      async function fetchUserPhoto() {
        const docRef = doc(db, 'users', user.uid)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          const userData = docSnap.data()
          setUserPhotoUrl(userData.avatarUrl)
        }
      }

      fetchUserPhoto()
    }
  }, [user])

  const handleDeleteAccount = () => {
    if (deleteAccountConfirm) {
      deleteUserAccount()
      navigate('/')
      toast.success('Your account has been deleted successfully.')
    } else {
      setDeleteAccountConfirm(true)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      if (isUserInfoChanged || isPasswordChanged) {
        if (isUserInfoChanged) {
          if (userName !== user.nome) {
            await updateName(userName)
            setIsUserInfoChanged(false)
          }

          if (userEmail !== user.email) {
            try {
              const credential = EmailAuthProvider.credential(
                user.email,
                currentPassword
              )
              await reauthenticateWithCredential(auth.currentUser, credential)

              await updateEmail(auth.currentUser, userEmail)

              const updatedUser = { ...user, email: userEmail }
              setUser(updatedUser)
              storageUser(updatedUser)
              setCurrentPassword('')
              toast.success('Email updated successfully.')
            } catch (error) {
              console.error('Error updating email:', error)
              setChangeAlert('email-error')
              toast.error(
                'Failed to update email. Please check your current password.'
              )
            }
          }
        }

        if (isPasswordChanged) {
          if (newPassword === confirmNewPassword && newPassword.trim() !== '') {
            try {
              const credential = EmailAuthProvider.credential(
                user.email,
                currentPassword
              )
              await reauthenticateWithCredential(auth.currentUser, credential)

              await updatePassword(auth.currentUser, newPassword)

              setIsPasswordChanged(false)
              setNewPassword('')
              setConfirmNewPassword('')
              setCurrentPassword('')
              setChangeAlert('password')
              toast.success('Password changed successfully.')
            } catch (error) {
              console.error('Error updating password:', error)
              setChangeAlert('password-error')
              toast.error(
                'Failed to update password. Please check the password criteria.'
              )
            }
          }
        }

        toast.success('Settings updated successfully.')
      }
    } catch (error) {
      console.error('Error in handleSubmit:', error)
    }
  }

  return (
    <div>
      <Nav />
      <Header />
      <div
        className={`content content-container ${darkMode ? 'dark-mode' : ''}`}
      >
        <Title name="Settings">
          <FiSettings size={25} />
        </Title>
        <div className="container container-settings">
          <form className="form-profile form-settings" onSubmit={handleSubmit}>
            <label>Name</label>
            <input
              type="text"
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value)
                setIsUserInfoChanged(true)
              }}
            />
            <label>Email</label>
            <input
              type="email"
              value={userEmail}
              onChange={(e) => {
                setUserEmail(e.target.value)
                setIsUserInfoChanged(true)
              }}
            />
            <label>{`${darkMode ? 'Disable dark mode' : 'Enable dark mode'
              }`}</label>
            <label className="toggle">
              <input
                type="checkbox"
                checked={darkMode}
                onChange={toggleDarkMode}
              />
              <span className="slider"></span>
            </label>
            <label>Current Password</label>
            <input
              type="password"
              placeholder="please enter the password to make changes"
              autoComplete="current-password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <label>Change Password</label>
            <input
              type="password"
              placeholder="New Password"
              autoComplete="new-password"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value)
                setIsPasswordChanged(true)
              }}
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              autoComplete="new-password"
              value={confirmNewPassword}
              onChange={(e) => {
                setConfirmNewPassword(e.target.value)
                setIsPasswordChanged(true)
              }}
            />
            <input type="submit" value="Submit" />
          </form>
          <div className="delete-account-container">
            {!deleteAccountConfirm && (
              <div className="delete-account">
                <p>
                  Need to delete your account? This action cannot be undone.
                </p>
                <button onClick={handleDeleteAccount}>Delete Account</button>
              </div>
            )}
            {deleteAccountConfirm && (
              <div className="delete-account-confirm">
                <p>Are you sure you want to delete your account?</p>
                <button onClick={handleDeleteAccount} className="btn-yes">
                  Yes
                </button>
                <button
                  onClick={() => setDeleteAccountConfirm(false)}
                  className="btn-no"
                >
                  No
                </button>
              </div>
            )}
          </div>
        </div>
        <div className={`toastify ${darkMode ? 'dark-mode' : ''}`} />
      </div>
      <Footer />
    </div>
  )
}

export default Settings
