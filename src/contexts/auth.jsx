import { useState, createContext, useEffect } from 'react'
import { auth, db } from '../services/firebaseConnection'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'

export const AuthContext = createContext({})

function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loadingAuth, setLoadingAuth] = useState(false)

  const signIn = (email, password) => {
    console.log(email)
    console.log(password)
    alert('logado com sucess')
  }

  async function signUp(email, password, name) {
    setLoadingAuth(true)

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      const user = userCredential.user
      const uid = user.uid

      await setDoc(doc(db, 'users', uid), {
        nome: name,
        avatarUrl: null,
      })

      let data = {
        uid: uid,
        nome: name,
        email: user.email,
        avatarUrl: null,
      }

      setUser(data)
      setLoadingAuth(false)
    } catch (error) {
      console.error('Error signing up:', error)
      setLoadingAuth(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        signIn,
        signUp,
        loadingAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
