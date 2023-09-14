import Header from '../../components/Header'
import Nav from '../../components/Nav'
import Title from '../../components/Title'
import { useContext, useState } from 'react'
import { AuthContext } from '../../contexts/Auth'
import { FiSettings } from 'react-icons/fi'
import { toast } from 'react-toastify'

import './Settings.css'

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false)

  const { user } = useContext(AuthContext)

  const handleSubmit = (e) => {
    e.preventDefault()
    toast.success('Your message was sent successfully!')
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  return (
    <div>
      <Nav />
      <Header />

      <div className={`content ${darkMode ? 'dark-mode' : ''}`}>
        <Title name="Settings">
          <FiSettings size={25} />
        </Title>

        <div className="container">
          <div className="contact-container">
            <form
              className="form-profile form-settings"
              onSubmit={handleSubmit}
            >
              <label>Your Name</label>
              <input type="text" value={user.nome} readOnly />
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
              <input type="password" placeholder="New Password" />
              <input type="password" placeholder="Confirm New Password" />
              <input type="submit" value="Submit" />
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
