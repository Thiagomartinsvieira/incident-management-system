import { useState, createContext, useEffect } from 'react'

export const authContext = createContext({})

function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  const signIn = (email, password) => {
    console.log(email)
    console.log(password)
    alert('logado com sucess')
  }

  return (
    <authContext.Provider
      value={{
        signed: !!user,
        user,
        signIn,
      }}
    >
      {children}
    </authContext.Provider>
  )
}

export default AuthProvider
