import { useState, createContext, useEffect } from 'react'
import { auth, db } from '../services/firebaseConnection'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'

import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export const AuthContext = createContext({})

function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loadingAuth, setLoadingAuth] = useState(false)

  const navigate = useNavigate()

  const signIn = (email, password) => {
    console.log(email)
    console.log(password)
    alert('LOGADO COM SUCESSO')
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
