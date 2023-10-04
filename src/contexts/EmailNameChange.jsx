import { createContext, useState } from 'react'
import { toast } from 'react-toastify'
import { updateProfile, updateEmail } from 'firebase/auth'
import { auth } from '../services/firebaseConnection'

const EmailNameChange = createContext({})

export const EmailNameChangeProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  const storageUser = (userData) => {
    localStorage.setItem('@ticketsPRO', JSON.stringify(userData))
  }

  const updateName = async (newName) => {
    try {
      await updateProfile(auth.currentUser, { displayName: newName })
      setUser({ ...user, displayName: newName })
      storageUser({ ...user, displayName: newName })
      toast.success('Name Updated Successfully')
    } catch (error) {
      console.log(error)
      toast.error('Failed to update name.')
    }
  }

  const updateEmailAddress = async (newEmail) => {
    try {
      await updateEmail(auth.currentUser, newEmail)
      setUser({ ...user, email: newEmail })
      storageUser({ ...user, email: newEmail })
      toast.success('Email Updated Successfully')
    } catch (error) {
      console.log(error)
      toast.error('Failed to update email.')
    }
  }

  return (
    <EmailNameChange.Provider value={{ updateName, updateEmailAddress }}>
      {children}
    </EmailNameChange.Provider>
  )
}
