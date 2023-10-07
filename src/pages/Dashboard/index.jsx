import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/Auth'
import Nav from '../../components/Nav'
import Header from '../../components/Header'
import Title from '../../components/Title'
import {
  FiPlus,
  FiMessageSquare,
  FiSearch,
  FiEdit2,
  FiTrash,
} from 'react-icons/fi'

import { Link } from 'react-router-dom'
import {
  collection,
  getDocs,
  orderBy,
  limit,
  startAfter,
  query,
  deleteDoc,
  doc,
} from 'firebase/firestore'
import { db } from '../../services/firebaseConnection'

import { format } from 'date-fns'
import Footer from '../../components/Footer'
import Modal from '../../components/Modal'

import './Dashboard.css'
import { toast } from 'react-toastify'
import { useDarkMode } from '../../contexts/darkMode'

const listRef = collection(db, 'tickets')

const Dashboard = () => {
  const { darkMode, toggleDarkMode } = useDarkMode()

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
          customerLocation: doc.data().customerLocation || '',
        })
      })

      const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1]

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
    setLoadingMore(false)
  }

  const toggleModal = (item) => {
    setShowPostModal(!showPostModal)
    setDetails({ ...item })
  }

  const handleDeleteTicket = async (ticketId) => {
    try {
      await deleteDoc(doc(db, 'tickets', ticketId))

      setTickets((prevTickets) =>
        prevTickets.filter((ticket) => ticket.id !== ticketId)
      )

      toast.success('Ticket excluído com sucesso!')
    } catch (error) {
      console.error('Erro ao excluir o ticket:', error)
      toast.error('Erro ao excluir o ticket')
    }
  }

  if (loading) {
    return (
      <div>
        <Header />

        <div className={`content ${darkMode ? 'dark-mode' : ''}`}>
          <Title name="Tickets">
            <FiMessageSquare size={25} />
          </Title>

          <div className={`container dashboard ${darkMode ? 'dark-mode' : ''}`}>
            <span>Procurando por tickets...</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Nav />
      <Header />

      <div
        className={`content content-container ${darkMode ? 'dark-mode' : ''}`}
      >
        <Title name="Tickets">
          <FiMessageSquare size={25} />
        </Title>

        <>
          {tickets.length === 0 ? (
            <div
              className={`container dashboard ${darkMode ? 'dark-mode' : ''}`}
            >
              <span>Nenhum ticket encontrado...</span>
              <Link to="/newticket" className="new">
                <FiPlus color="#FFF" size={25} />
                Novo Ticket
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
                    <th scope="col">Cliente</th>
                    <th scope="col">Assunto</th>
                    <th scope="col">Status</th>
                    <th scope="col">Registrado em</th>
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
                                item.status === 'Open'
                                  ? '#5cb85c'
                                  : item.status === 'Closed'
                                    ? '#337ab7'
                                    : item.status === 'Progress'
                                      ? '#f0ad4e'
                                      : '#d9534f',
                            }}
                          >
                            {item.status}
                          </span>
                        </td>
                        <td data-label="Registrado em">{item.createdFormat}</td>
                        <td data-label="#">
                          <button
                            className="action"
                            style={{ backgroundColor: '#3583f6' }}
                            onClick={() => toggleModal(item)}
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
                          <button
                            className="action"
                            style={{ backgroundColor: 'red' }}
                            onClick={() => handleDeleteTicket(item.id)}
                          >
                            <FiTrash color="#FFF" size={17} />
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>

              {!loadingMore && !isEmpty && (
                <button className="btn-more" onClick={handleMore}>
                  Buscar mais
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

export default Dashboard
