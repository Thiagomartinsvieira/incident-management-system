import React from 'react'
import Header from '../../components/Header'
import Nav from '../../components/Nav'
import Title from '../../components/Title'

import { FiUser } from 'react-icons/fi'

const Customers = () => {
  return (
    <div>
      <Nav />
      <Header />

      <div className="content">
        <Title name="Customers">
          <FiUser size={25} />
        </Title>
      </div>
    </div>
  )
}

export default Customers
