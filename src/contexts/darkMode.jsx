import { createContext, useState, useContext } from 'react'

const DarkMode = createContext()

export const darkModeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false)

  const toogleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  return (
    <darkMode.Provider value={{ darkMode, toogleDarkMode }}>
      {children}
    </darkMode.Provider>
  )
}

export const useDarkMode = () => {
  return useContext(DarkMode)
}
