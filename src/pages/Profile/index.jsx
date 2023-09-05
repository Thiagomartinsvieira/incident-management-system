import Header from '../../components/Header'
import Nav from '../../components/Nav'
import Title from '../../components/Title'

import { FiSettings } from 'react-icons/fi'

const Profile = () => {
  return (
    <div>
      <Nav />
      <Header />

      <div className="content">
        <Title name="My Profile">
          <FiSettings size={25} />
        </Title>
      </div>
      <h1>Profile</h1>
    </div>
  )
}

export default Profile
