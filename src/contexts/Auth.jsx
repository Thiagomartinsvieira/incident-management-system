import { useState, createContext, useEffect } from 'react'
import { auth, db } from '../services/firebaseConnection'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
  deleteUser,
  reauthenticateWithCredential,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth'
import { doc, getDoc, updateDoc, setDoc } from 'firebase/firestore'
import { onSnapshot } from 'firebase/firestore'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

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
        const userData = JSON.parse(storageUser)
        setUser(userData)
        setLoading(false)

        const userDocRef = doc(db, 'users', userData.uid)
        const unsubscribe = onSnapshot(userDocRef, (doc) => {
          const updatedUserData = doc.data()
          setUser((prevUser) => ({ ...prevUser, ...updatedUserData }))
        })

        return () => unsubscribe()
      } else {
        setLoading(false)
      }
    }

    loadUser()
  }, [])

  const signIn = async (email, password) => {
    setLoadingAuth(true)

    try {
      const value = await signInWithEmailAndPassword(auth, email, password)
      const userEmail = value.user.email

      const docRef = doc(db, 'users', value.user.uid)
      const docSnap = await getDoc(docRef)

      const data = {
        uid: value.user.uid,
        nome: docSnap.data().nome,
        email: userEmail,
        avatarUrl: docSnap.data().avatarUrl,
      }

      setUser(data)
      storageUser(data)

      const firstName = data.nome.split(' ')[0]

      setLoadingAuth(false)
      toast.success(`Welcome back ${firstName}`)
      navigate('/dashboard')
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

    try {
      const value = await createUserWithEmailAndPassword(auth, email, password)
      const userEmail = value.user.email

      await setDoc(doc(db, 'users', value.user.uid), {
        nome: name,
        avatarUrl: null,
      })

      const data = {
        uid: value.user.uid,
        nome: name,
        email: userEmail,
        avatarUrl: null,
      }

      setUser(data)
      storageUser(data)
      setLoadingAuth(false)
      toast.success('Welcome to the incident system')
      navigate('/dashboard')
    } catch (error) {
      console.error(error)
      toast.error(
        'An error occurred. Please check your credentials and try again.'
      )
      setLoadingAuth(false)
    }
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
      console.error('Error Updating Name: ', error)
      toast.error('Failed to update name')
    }
  }

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider()

    try {
      const result = await signInWithPopup(auth, provider)

      const user = result.user

      console.log(user)

      const userData = {
        uid: user.uid,
        nome: user.displayName,
        email: user.email,
        avatarUrl: user.photoURL,
      }

      const firstName = userData.nome.split(' ')[0]

      setUser(userData)
      storageUser(userData)
      navigate('/dashboard')
      toast.success(`Welcome back ${firstName}`)
    } catch (error) {
      console.log(error)
      toast.error("Couldn't sign in with Google.")
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
        signInWithGoogle,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
