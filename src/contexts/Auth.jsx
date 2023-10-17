import { useState, createContext, useEffect } from 'react'
import { auth, db } from '../services/firebaseConnection'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
  EmailAuthProvider,
  deleteUser,
  updateEmail,
  reauthenticateWithCredential,
} from 'firebase/auth'
import { doc, getDoc, updateDoc, setDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export const AuthContext = createContext({})

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loadingAuth, setLoadingAuth] = useState(false)
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()

  useEffect(() => {
    async function loadUser() {
      const storageUser = localStorage.getItem('@ticketsPRO')

      if (storageUser) {
        setUser(JSON.parse(storageUser))
        setLoading(false)
      }

      setLoading(false)
    }

    loadUser()
  }, [])

  const signIn = async (email, password) => {
    setLoadingAuth(true)

    try {
      await signInWithEmailAndPassword(auth, email, password).then(
        async (value) => {
          const email = value.user.email

          const docRef = doc(db, 'users', value.user.uid)
          const docSnap = await getDoc(docRef)

          const data = {
            uid: value.user.uid,
            nome: docSnap.data().nome,
            email: email,
            avatarUrl: docSnap.data().avatarUrl,
          }

          const firstName = data.nome.split(' ')[0]

          setUser(data)
          storageUser(data)
          setLoadingAuth(false)
          toast.success(`Welcome back ${firstName}`)
          navigate('/dashboard')
        }
      )
    } catch (error) {
      console.error('Error signing in:', error)
      toast.error(
        'An error occurred. Please check your credentials and try again.'
      )
      setLoadingAuth(false)
    }
  }

  const signUp = async (email, password, name) => {
    setLoadingAuth(true)

    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (value) => {
        const email = value.user.email

        await setDoc(doc(db, 'users', value.user.uid), {
          nome: name,
          avatarUrl: null,
        }).then(() => {
          const data = {
            uid: value.user.uid,
            nome: name,
            email: email,
            avatarUrl: null,
          }

          setUser(data)
          storageUser(data)
          setLoadingAuth(false)
          toast.success('Welcome to the incident system')
          navigate('/dashboard')
        })
      })
      .catch((error) => {
        console.log(error)
        setLoadingAuth(false)
      })
  }

  const storageUser = (data) => {
    localStorage.setItem('@ticketsPRO', JSON.stringify(data))
  }

  const logout = async () => {
    await signOut(auth)
    localStorage.removeItem('@ticketsPRO')
    setUser(null)
  }

  const updatePasswordFunction = async (newPassword) => {
    try {
      await updatePassword(auth.currentUser, newPassword)
      toast.success('Password updated successfully')
      return
    } catch (error) {
      console.log(error)
      toast.error('Failed to update password')
      return
    }
  }

  const deleteUserAccount = async () => {
    try {
      await deleteUser(auth.currentUser)
      localStorage.removeItem('@ticketsPRO')
      setUser(null)
      toast.success('Your account has been deleted successfully')
      navigate('/')
    } catch (error) {
      console.log(error)
      toast.error('Failed to delete account')
    }
  }

  const updateName = async (newName) => {
    try {
      const docRef = doc(db, 'users', user.uid)
      await updateDoc(docRef, { nome: newName })

      setUser({ ...user, nome: newName })

      storageUser({ ...user, nome: newName })

      toast.success('Name Updated Successfully')
    } catch (error) {
      console.log('Error Updating Name: ', error)
      toast.error('Failed to update name')
    }
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        signIn,
        signUp,
        logout,
        loadingAuth,
        loading,
        storageUser,
        setUser,
        updatePasswordFunction,
        deleteUserAccount,
        updateName,
        reauthenticateWithCredential,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
