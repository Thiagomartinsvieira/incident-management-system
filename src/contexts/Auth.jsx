import { useState, createContext, useEffect } from 'react'
import { auth, db } from '../services/firebaseConnection'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
  deleteUser,
} from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'

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

    await signInWithEmailAndPassword(auth, email, password)
      .then(async (value) => {
        let uid = value.user.uid

        const docRef = doc(db, 'users', uid)
        const docSnap = await getDoc(docRef)

        let data = {
          uid: uid,
          nome: docSnap.data().nome,
          email: value.user.email,
          avatarUrl: docSnap.data().avatarUrl,
        }

        const firstName = data.nome.split(' ')[0]

        setUser(data)
        storageUser(data)
        setLoadingAuth(false)
        toast.success(`Welcome back ${firstName}`)
        navigate('/dashboard')
      })
      .catch((error) => {
        console.log(error)
        setLoadingAuth(false)
        toast.error('Something went wrong')
      })
  }

  // Cadastrar um novo user
  const signUp = async (email, password, name) => {
    setLoadingAuth(true)

    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (value) => {
        let uid = value.user.uid

        await setDoc(doc(db, 'users', uid), {
          nome: name,
          avatarUrl: null,
        }).then(() => {
          let data = {
            uid: uid,
            nome: name,
            email: value.user.email,
            avatarUrl: null,
          }

          setUser(data)
          storageUser(data)
          setLoadingAuth(false)
          toast.success('welcome to the incident system')
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
      toast.success('Password updated successfully.')
      return
    } catch (error) {
      console.log(error)
      toast.error('Failed to update password.')
      return
    }
  }

  const deleteUserAccount = async () => {
    try {
      await deleteUser(auth.currentUser)
      localStorage.removeItem('@ticketsPRO')
      setUser(null)
      toast.success('Your account has been deleted successfully.')
      navigate('/')
    } catch (error) {
      console.log(error)
      toast.error('Failed to delete account.')
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
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
