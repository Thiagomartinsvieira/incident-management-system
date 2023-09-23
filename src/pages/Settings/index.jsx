import Header from '../../components/Header'
import Nav from '../../components/Nav'
import Title from '../../components/Title'
import Footer from '../../components/Footer'
import { useContext, useState } from 'react'
import { AuthContext } from '../../contexts/Auth'
import { FiSettings } from 'react-icons/fi'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import './Settings.css'

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false)
  const [deleteAccountConfirm, setDeleteAccountConfirm] = useState(false)
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')

  const navigate = useNavigate()
  const { user, deleteUserAccount, updatePasswordFunction } =
    useContext(AuthContext)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  const handleDeleteAccount = () => {
    if (deleteAccountConfirm) {
      navigate('/')
      toast.success('Your account has been deleted successfully.')
    } else {
      setDeleteAccountConfirm(true)
    }
  }

  console.log('user:', user)
  console.log('darkMode:', darkMode)
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
          <form
            className="form-profile form-settings"
            onSubmit={(e) => {
              e.preventDefault()
              if (newPassword === confirmNewPassword) {
                console.log('Submitting password update')
                updatePasswordFunction(newPassword)
              } else {
                toast.error('Passwords do not match')
              }
            }}
          >
            <label>Your Name</label>
            <input
              type="text"
              defaultValue={user.nome}
              autoComplete="username"
            />
            <label>Enable dark mode</label>
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
              autoComplete="new-password" // Adicionado o atributo autoComplete
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
                <button onClick={handleDeleteAccount}>Yes</button>
                <button onClick={() => setDeleteAccountConfirm(false)}>
                  No
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Settings
