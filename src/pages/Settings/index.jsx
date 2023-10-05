import Header from '../../components/Header'
import Nav from '../../components/Nav'
import Title from '../../components/Title'
import Footer from '../../components/Footer'
import { useContext, useState, useEffect } from 'react'
import { useDarkMode } from '../../contexts/darkMode'
import { AuthContext } from '../../contexts/Auth'
import { FiSettings } from 'react-icons/fi'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import './Settings.css'

const Settings = () => {
  const {
    user,
    deleteUserAccount,
    updatePasswordFunction,
    updateName,
    updateEmailAddress,
  } = useContext(AuthContext)

  const { darkMode, toggleDarkMode } = useDarkMode()

  const [userName, setUserName] = useState(user ? user.nome : '')
  const [userEmail, setUserEmail] = useState(user ? user.email : '')
  const [deleteAccountConfirm, setDeleteAccountConfirm] = useState(false)
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')

  useEffect(() => {
    if (user) {
      setUserName(user.nome)
      setUserEmail(user.email)
    }
  }, [user])

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    console.log('Before updating name and email')

    if (userName !== user.displayName) {
      await updateName(userName)
      setUserName(userName)
    }

    if (userEmail !== user.email) {
      await updateEmailAddress(userEmail)
      toast.success('Email Updated Successfully')
      setUserEmail(userEmail)
    }

    console.log('After updating name and email')

    if (newPassword === confirmNewPassword) {
      if (newPassword.trim() !== '') {
        console.log('Submitting password update')
        updatePasswordFunction(newPassword)
      } else {
        toast.error('Password cannot be empty.')
      }
    } else {
      toast.error('Passwords do not match')
    }
  }

  const handleDeleteAccount = () => {
    if (deleteAccountConfirm) {
      deleteUserAccount()

      navigate('/')
      toast.success('Your account has been deleted successfully.')
    } else {
      setDeleteAccountConfirm(true)
    }
  }

  console.log('user:', userName)
  console.log('newPassword:', newPassword)
  console.log('confirmNewPassword:', confirmNewPassword)

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
              onChange={(e) => setUserName(e.target.value)}
            />
            <label>Email</label>
            <input
              type="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
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
            <label>Change Password</label>
            <input
              type="password"
              placeholder="New Password"
              autoComplete="new-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              autoComplete="new-password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
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
                <button onClick={() => setDeleteAccountConfirm(false)}>
                  No
                </button>
              </div>
            )}
            {console.log(
              'Rendered delete account confirm:',
              deleteAccountConfirm
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Settings
