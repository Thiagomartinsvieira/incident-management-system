import { useState, useEffect, useContext } from 'react'
import Header from '../../components/Header'
import Nav from '../../components/Nav'
import Title from '../../components/Title'
import { FiPlusCircle } from 'react-icons/fi'
import { AuthContext } from '../../contexts/Auth'
import { db } from '../../services/firebaseConnection'
import { collection, getDocs, getDoc, doc } from 'firebase/firestore'


import './NewTicket.css'

const listRef = collection(db, 'customers')

const NewTicket = () => {
  const { user } = useContext(AuthContext)

  const [customers, setCustomers] = useState([])
  const [loadCustomer, setLoadCustomer] = useState(true)

  const [complement, setComplement] = useState('')
  const [subject, setSubject] = useState('Support')
  const [status, setStatus] = useState('Open')

  useEffect(() => {
    const loadCustomers = async() => {
      const querySnapshot = await getDocs(listRef)
      .then(() => {

      })
      .catch((error) => {
        console.log(error)
      })
    } 

    loadCustomers()
  }, [])

  const handleOptionChange = (e) => {
    setStatus(e.target.value)
    console.log(e.target.value)
  }

  const handleChangeSelect = (e) => {
    setSubject(e.target.value)
    
  }

  return (
    <div>
      <Nav />
      <Header />
      <div className="content">
        <Title name="new tickeet">
          <FiPlusCircle size={25} />
        </Title>
        <div className="container">
          <form className="form-profile">
            <label>Clients</label>
            <select>
              <option key={1} value={1}>
                Supermake good mornig
              </option>
              <option key={2} value={2}>
                auto parts
              </option>
            </select>

            <label>subject</label>
            <select value={subject} onChange={handleChangeSelect}>
              <option value="equipment change">Access</option>
              <option value="equipment change">equipment change</option>
              <option value="remote support">remote support</option>
              <option value="technical visit">technical visit</option>
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
    </div>
  )
}

export default NewTicket
