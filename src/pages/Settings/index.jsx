import React, { useContext, useState, useEffect } from 'react'
import { useDarkMode } from '../../contexts/darkMode'
import { AuthContext } from '../../contexts/Auth'
import { FiSettings } from 'react-icons/fi'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import {
  getAuth,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from 'firebase/auth'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '../../services/firebaseConnection'

import Header from '../../components/Header'
import Nav from '../../components/Nav'
import Title from '../../components/Title'
import Footer from '../../components/Footer'

import './Settings.css'

const Settings = () => {
  const {
    user,
    deleteUserAccount,
    updatePasswordFunction,
    updateName,
    reauthenticateWithCredential,
  } = useContext(AuthContext)

  const { darkMode, toggleDarkMode } = useDarkMode()

  const [userName, setUserName] = useState(user ? user.nome : '')
  const [userEmail, setUserEmail] = useState(user ? user.email : '')
  const [userPhotoUrl, setUserPhotoUrl] = useState(null) // Defina setUserPhotoUrl aqui
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
      let isChangesDetected = false

      if (isUserInfoChanged) {
        if (userName !== user.nome) {
          await updateName(userName)
          isChangesDetected = true
        }

        if (userEmail !== user.email) {
          const isReauthenticated =
            await reauthenticateWithCredential(currentPassword)

          if (isReauthenticated) {
            try {
              await updateEmail(auth.currentUser, userEmail)
              isChangesDetected = true
              setIsUserInfoChanged(false)
              toast.success('Email updated successfully.')
            } catch (error) {
              setChangeAlert('email-error')
              toast.error('Failed to update email. Please check your email.')
            }
          } else {
            setChangeAlert('reauthentication-error')
            toast.error(
              'Failed to reauthenticate. Please check your current password.'
            )
          }
        }
      }

      if (currentPassword || newPassword || confirmNewPassword) {
        if (newPassword === confirmNewPassword && newPassword.trim() !== '') {
          const email = user.email
          const credential = EmailAuthProvider.credential(
            email,
            currentPassword
          )

          const isReauthenticated =
            await reauthenticateWithCredential(credential)

          if (isReauthenticated) {
            try {
              await updatePassword(auth.currentUser, newPassword)
              setIsPasswordChanged(false)
              setNewPassword('')
              setConfirmNewPassword('')
              setCurrentPassword('')
              isChangesDetected = true
              setChangeAlert('password')
              toast.success('Password changed successfully.')
            } catch (error) {
              setChangeAlert('password-error')
              toast.error(
                'Failed to update password. Please check the password criteria.'
              )
            }
          } else {
            setChangeAlert('reauthentication-error')
            toast.error(
              'Failed to reauthenticate. Please check your current password.'
            )
          }
        }
      }

      if (isChangesDetected) {
        toast.success('Settings updated successfully.')
      }
    } catch (error) {
      toast.error(
        'An error occurred while updating settings. Please try again.'
      )
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
            <label>Change Password</label>
            <input
              type="password"
              placeholder="Current Password"
              autoComplete="current-password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
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
