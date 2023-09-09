import { useContext } from 'react'
import { AuthContext } from '../../contexts/Auth'
import Header from '../../components/Header'
import Title from '../../components/Title'
import Nav from '../../components/Nav'
import { FiPlus, FiMessageSquare, FiSearch, FiEdit2 } from 'react-icons/fi'
import { Link } from 'react-router-dom'

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

      <div className="content">
        <Title name="Tickets">
          <FiMessageSquare size={25} />
        </Title>
        <>
          <Link to="/newTicket" className="new">
            <FiPlus color="#fff" size={25} />
            Open New Ticket
          </Link>
          <table>
            <thead>
              <tr>
                <th scope="col">Client</th>
                <th scope="col">Subject</th>
                <th scope="col">status</th>
                <th scope="col">registered in</th>
                <th scope="col">#</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td data-label="client">Siri Cascudo</td>
                <td data-label="Subject">suport</td>
                <td data-label="status">
                  <span className="badge" style={{ backgroundColor: '#999' }}>
                    open
                  </span>
                </td>
                <td data-label="registered in">08/05/2023</td>
                <td data-label="#">
                  <button
                    className="action"
                    style={{ backgroundColor: '#3583f6' }}
                  >
                    <FiSearch color="#ffff" size={17} />
                  </button>
                  <button
                    className="action"
                    style={{ backgroundColor: '#f6a935' }}
                  >
                    <FiEdit2 color="#FFF" size={17} />
                  </button>
                </td>
              </tr>

              <tr>
                <td data-label="client">Siri Cascudo</td>
                <td data-label="Subject">suport</td>
                <td data-label="status">
                  <span className="badge" style={{ backgroundColor: '#999' }}>
                    open
                  </span>
                </td>
                <td data-label="registered in">08/05/2023</td>
                <td data-label="#">
                  <button
                    className="action"
                    style={{ backgroundColor: '#3583f6' }}
                  >
                    <FiSearch color="#ffff" size={17} />
                  </button>
                  <button
                    className="action"
                    style={{ backgroundColor: '#f6a935' }}
                  >
                    <FiEdit2 color="#FFF" size={17} />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </>
      </div>
    </div>
  )
}
