import { useState } from 'react'
import Header from '../../components/Header'
import Nav from '../../components/Nav'
import Title from '../../components/Title'

import { FiStar } from 'react-icons/fi'

import { db } from '../../services/firebaseConnection'
import { addDoc, collection } from 'firebase/firestore'

import { toast } from 'react-toastify'

const Customers = () => {
  const [name, setName] = useState('')
  const [cnpj, setCnpj] = useState('')
  const [address, setAddress] = useState('')

  const handleRegister = async (e) => {
    e.preventDefault()

    if (name !== '' && cnpj !== '' && address !== '') {
      await addDoc(collection(db, 'customers'), {
        nameFantasy: name,
        cnpj: cnpj,
        address: address,
      })
        .then(() => {
          setName('')
          setCnpj('')
          setAddress('')
          toast.success('registered company!')
        })
        .catch((error) => {
          console.log(error)
          toast.error('Error when registering')
        })
    } else {
      toast.error('Fill in all fields')
    }
  }

  return (
    <div>
      <Nav />
      <Header />

      <div className="content">
        <Title name="Customers">
          <FiStar size={25} />
        </Title>

        <div className="container">
          <form className="form-profile" onSubmit={handleRegister}>
            <label>Name Fantasy</label>
            <input
              type="text"
              placeholder="Company Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label>CNPJ</label>
            <input
              type="text"
              placeholder="type your cnpj"
              value={cnpj}
              onChange={(e) => setCnpj(e.target.value)}
            />
            <label>Adress</label>
            <input
              type="text"
              placeholder="Company Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <input type="submit" value="Save" />
          </form>
        </div>
      </div>
    </div>
  )
}

export default Customers
