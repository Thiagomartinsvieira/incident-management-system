import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/Auth'
import Nav from '../../components/Nav'
import Header from '../../components/Header'
import Title from '../../components/Title'
import { FiPlus, FiMessageSquare, FiSearch, FiEdit2 } from 'react-icons/fi'

import { Link } from 'react-router-dom'
import {
  collection,
  getDocs,
  orderBy,
  limit,
  startAfter,
  query,
} from 'firebase/firestore'
import { db } from '../../services/firebaseConnection'

import { format } from 'date-fns'
import Footer from '../../components/Footer'
import Modal from '../../components/Modal'

import './Dashboard.css'

const listRef = collection(db, 'tickets')

export default function Dashboard() {
  const { logout } = useContext(AuthContext)

  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(true)

  const [isEmpty, setIsEmpty] = useState(false)
  const [lastDocs, setLastDocs] = useState()
  const [loadingMore, setLoadingMore] = useState(false)

  const [showPostModal, setShowPostModal] = useState(false)
  const [details, setDetails] = useState()

  useEffect(() => {
    async function loadTickets() {
      const q = query(listRef, orderBy('created', 'desc'), limit(5))

      const querySnapshot = await getDocs(q)
      setTickets([])

      await updateState(querySnapshot)

      setLoading(false)
    }

    loadTickets()

    return () => { }
  }, [])

  async function updateState(querySnapshot) {
    const isCollectionEmpty = querySnapshot.size === 0

    if (!isCollectionEmpty) {
      let list = []

      querySnapshot.forEach((doc) => {
        list.push({
          id: doc.id,
          subject: doc.data().subject,
          client: doc.data().client,
          clienteId: doc.data().clientId,
          created: doc.data().created,
          createdFormat: format(doc.data().created.toDate(), 'dd/MM/yyyy'),
          status: doc.data().status,
          complement: doc.data().complement,
        })
      })

      const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1] // last

      setTickets((tickets) => [...tickets, ...list])
      setLastDocs(lastDoc)
    } else {
      setIsEmpty(true)
    }

    setLoading(false)
  }

  const handleMore = async () => {
    setLoadingMore(true)

    const q = query(
      listRef,
      orderBy('created', 'desc'),
      startAfter(lastDocs),
      limit(5)
    )
    const querySnapshot = await getDocs(q)
    await updateState(querySnapshot)
  }

  const toogleModal = (item) => {
    setShowPostModal(!showPostModal)
    setDetails(item)
  }

  if (loading) {
    return (
      <div>
        <Header />

        <div className="content">
          <Title name="Tickets">
            <FiMessageSquare size={25} />
          </Title>

          <div className="container dashboard">
            <span>searching for tickets...</span>
          </div>
        </div>
      </div>
    )
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
          {tickets.length === 0 ? (
            <div className="container dashboard">
              <span>No tickets found...</span>
              <Link to="/new" className="new">
                <FiPlus color="#FFF" size={25} />
                New Ticket
              </Link>
            </div>
          ) : (
            <>
              <Link to="/newticket" className="newticket">
                <FiPlus color="#FFF" size={25} />
                New Ticket
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
                  {tickets.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td data-label="Cliente">{item.client}</td>
                        <td data-label="Assunto">{item.subject}</td>
                        <td data-label="Status">
                          <span
                            className="badge"
                            style={{
                              backgroundColor:
                                item.status === 'Open' ? '#5cb85c' : '#999',
                            }}
                          >
                            {item.status}
                          </span>
                        </td>
                        <td data-label="Cadastrado">{item.createdFormat}</td>
                        <td data-label="#">
                          <button
                            className="action"
                            style={{ backgroundColor: '#3583f6' }}
                            onClick={() => toogleModal(item)}
                          >
                            <FiSearch color="#FFF" size={17} />
                          </button>
                          <Link
                            to={`/newticket/${item.id}`}
                            className="action"
                            style={{ backgroundColor: '#f6a935' }}
                          >
                            <FiEdit2 color="#FFF" size={17} />
                          </Link>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>

              {loadingMore && <h3>looking for more tickets...</h3>}
              {!loadingMore && !isEmpty && (
                <button className="btn-more" onClick={handleMore}>
                  search for more
                </button>
              )}
            </>
          )}
        </>
      </div>
      <Footer />

      {showPostModal && (
        <Modal
          content={details}
          close={() => setShowPostModal(!showPostModal)}
        />
      )}
    </div>
  )
}
