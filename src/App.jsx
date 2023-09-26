import { BrowserRouter } from 'react-router-dom'
import RoutesApp from './routes/routes'
import AuthProvider from './contexts/Auth'
import { DarkModeProvider } from './contexts/darkMode'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import './App.css'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <DarkModeProvider>
          <ToastContainer autoClose={4000} />
          <RoutesApp />
        </DarkModeProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
