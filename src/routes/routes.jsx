import { Routes, Route } from 'react-router-dom'

import SignIn from '../pages/SignIn'
import SignUp from '../pages/SingUp'
import Dashboard from '../pages/Dashboard'
import Profile from '../pages/Profile'

import Private from './Private'
import Customers from '../pages/Customers'
import NewTicket from '../pages/NewTicket'

function RoutesApp() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/register" element={<SignUp />} />

      <Route
        path="/dashboard"
        element={
          <Private>
            <Dashboard />
          </Private>
        }
      />
      <Route
        path="/profile"
        element={
          <Private>
            <Profile />
          </Private>
        }
      />
      <Route
        path="/customers"
        element={
          <Private>
            <Customers />
          </Private>
        }
      />
      <Route
        path="/newticket"
        element={
          <Private>
            <NewTicket />
          </Private>
        }
      />

      <Route
        path="/newticket/:id"
        element={
          <Private>
            <NewTicket />
          </Private>
        }
      />
    </Routes>
  )
}

export default RoutesApp
