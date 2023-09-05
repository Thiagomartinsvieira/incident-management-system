import { useContext } from 'react'
import { AuthContext } from '../../contexts/Auth'
import Header from '../../components/Header'
import Nav from '../../components/Nav'

import './Dashboard.css'

export default function Dashboard() {
  const { logout } = useContext(AuthContext)

  async function handleLogout() {
    await logout()
  }

  return (
    <div>
      <Nav />
      <Header />
      <h1>Dashboard Page</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}
