import { useState, useEffect, useContext } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Nav from '../../components/Nav'
import Title from '../../components/Title'
import { FiPlusCircle } from 'react-icons/fi'
import { AuthContext } from '../../contexts/Auth'
import { db } from '../../services/firebaseConnection'
import {
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  updateDoc,
} from 'firebase/firestore'
import { useParams, useNavigate } from 'react-router-dom'

import './NewTicket.css'
import { toast } from 'react-toastify'
import { useDarkMode } from '../../contexts/darkMode'

const listRef = collection(db, 'customers')

const NewTicket = () => {
  const { user } = useContext(AuthContext)
  const { id } = useParams()

  const [customers, setCustomers] = useState([])
  const [loadCustomer, setLoadCustomer] = useState(true)
  const [customerSelected, setCustomerSelected] = useState(0)

  const [complement, setComplement] = useState('')
  const [customerLocation, setCustomerLocation] = useState('')
  const [subject, setSubject] = useState('Support')
  const [status, setStatus] = useState('Open')
  const [idCustomer, setIdCustomer] = useState(false)

  const { darkMode, toggleDarkMode } = useDarkMode()

  const navigate = useNavigate()

  useEffect(() => {
    const loadCustomers = async () => {
      const querySnapshot = await getDocs(listRef)
        .then((snapshot) => {
          let list = []

          snapshot.forEach((doc) => {
            list.push({
              id: doc.id,
              nameFantasy: doc.data().nameFantasy,
            })
          })

          if (snapshot.docs.size === 0) {
            console.log('No companies found')
            setCustomers([{ id: '1', nameFantasy: 'FREELA' }])
            setLoadCustomer(false)
            return
          }

          setCustomers(list)
          setLoadCustomer(false)

          if (id) {
            loadId(list)
          }
        })
        .catch((error) => {
          console.log('error when searching for customers', error)
          setLoadCustomer(false)
          setCustomers([{ id: '1', nameFantasy: 'FREELA' }])
        })
    }

    loadCustomers()
  }, [id])

  const loadId = async (list) => {
    const docRef = doc(db, 'tickets', id)
    await getDoc(docRef)
      .then((snapshot) => {
        setSubject(snapshot.data().subject)
        setStatus(snapshot.data().status)
        setComplement(snapshot.data().complement)

        let index = list.findIndex(
          (item) => item.id === snapshot.data().clientId
        )
        setCustomerSelected(index)
        setIdCustomer(true)
      })
      .catch((error) => {
        console.log(error)
        setIdCustomer(false)
      })
  }

  const handleOptionChange = (e) => {
    setStatus(e.target.value)
    console.log(e.target.value)
  }

  const handleChangeSelect = (e) => {
    setSubject(e.target.value)
  }

  const handleChangeCustomer = (e) => {
    setCustomerSelected(e.target.value)
    console.log(customers[e.target.value].nameFantasy)
  }

  const handleLocationSelect = (e) => {
    setCustomerLocation(e.target.value)
    console.log(e.target.value)
  }

  const handleRegister = async (e) => {
    e.preventDefault()

    if (idCustomer) {
      // update ticket
      const docRef = doc(db, 'tickets', id)
      await updateDoc(docRef, {
        client: customers[customerSelected].nameFantasy,
        clientId: customers[customerSelected].id,
        subject: subject,
        complement: complement,
        status: status,
        userId: user.uid,
        customerLocation: customerLocation, // Locacation send here
      })
        .then(() => {
          toast.info('ticket Updated!')
          setCustomerSelected(0)
          navigate('/dashboard')
        })
        .catch((error) => {
          toast.error('There was a problem updating this ticket')
          console.log(error)
        })

      return
    }

    // Register ticket
    await addDoc(collection(db, 'tickets'), {
      created: new Date(),
      client: customers[customerSelected].nameFantasy,
      clientId: customers[customerSelected].id,
      subject: subject,
      complement: complement,
      status: status,
      userId: user.uid,
      customerLocation: customerLocation,
    })
      .then(() => {
        toast.success('Registered ticket!')
        setComplement('')
        setCustomerSelected(0)
        setLoadCustomer(false)
        navigate('/dashboard')
      })
      .catch((error) => {
        console.log(error)
        toast.error('Oops, error registering ticket')
      })
  }

  return (
    <div>
      <Nav />
      <Header />
      <div
        className={`content content-container ${darkMode ? 'dark-mode' : ''}`}
      >
        <Title name={id ? 'Edit ticket' : 'New Ticket'}>
          <FiPlusCircle size={25} />
        </Title>
        <div className="container">
          <form className="form-profile" onSubmit={handleRegister}>
            <label>Clients</label>
            {loadCustomer ? (
              <input type="text" disabled value="Loading..." />
            ) : (
              <select value={customerSelected} onChange={handleChangeCustomer}>
                {customers.map((item, index) => {
                  return (
                    <option key={index} value={index}>
                      {item.nameFantasy}
                    </option>
                  )
                })}
              </select>
            )}

            <label>subject</label>
            <select value={subject} onChange={handleChangeSelect}>
              <option value="equipment change">Equipment change</option>
              <option value="remote support">Remote support</option>
              <option value="technical visit">Technical visit</option>
              <option value="network issues">Network issues</option>
              <option value="software problems">Software problems</option>
              <option value="hardware failure">Hardware failure</option>
              <option value="security issues">Security issues</option>
              <option value="training request">Training request</option>
              <option value="system error">System error</option>
              <option value="login issue">Login issue</option>
              <option value="email problem">Email problem</option>
              <option value="software request">Software request</option>
              <option value="hardware request">Hardware request</option>
              <option value="printing problems">Printing problems</option>
              <option value="application issues">Application issues</option>
              <option value="data loss">Data loss</option>
              <option value="data access issue">Data access issue</option>
              <option value="connectivity problems">
                Connectivity problems
              </option>
              <option value="software update">Software update</option>
              <option value="permission request">Permission request</option>
              <option value="performance issues">Performance issues</option>
              <option value="configuration request">
                Configuration request
              </option>
              <option value="other">Other</option>
            </select>

            <label>Location</label>
            <select value={customerLocation} onChange={handleLocationSelect}>
              <option value="undefined">undefined</option>
              <option value="Sao Paulo">São Paulo - SP (Brazil)</option>
              <option value="Rio de janeiro">
                Rio de Janeiro - RJ (Brazil)
              </option>
              <option value="New York">New York - NY (USA)</option>
              <option value="London">London (UK)</option>
              <option value="Tokyo">Tokyo (Japan)</option>
            </select>

            <label>Status</label>
            <div className="status">
              <input
                type="radio"
                name="radio"
                value="Open"
                onChange={handleOptionChange}
                checked={status === 'Open'}
              />
              <span>Opened</span>
              <input
                type="radio"
                name="radio"
                value="Progress"
                onChange={handleOptionChange}
                checked={status === 'Progress'}
              />
              <span>in Progress</span>
              <input
                type="radio"
                name="radio"
                value="Hold"
                onChange={handleOptionChange}
                checked={status === 'Hold'}
              />
              <span>on Hold</span>
              <input
                type="radio"
                name="radio"
                value="Closed"
                onChange={handleOptionChange}
                checked={status === 'Closed'}
              />
              <span>Closed</span>
            </div>

            <label>incident description</label>
            <textarea
              placeholder="describe this incident (optional)."
              rows={10}
              cols={10}
              value={complement}
              onChange={(e) => setComplement(e.target.value)}
            />

            <input type="submit" value="Register" />
          </form>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default NewTicket
