import { useContext } from 'react'
import { AuthContext } from '../../contexts/Auth'
import Header from '../../components/Header'

export default function Dashboard() {
  const { logout } = useContext(AuthContext)

  async function handleLogout() {
    await logout()
  }

  return (
    <div>
      <Header />
      <h1>Dashboard Page</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}
