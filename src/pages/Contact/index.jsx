import Header from '../../components/Header'
import Nav from '../../components/Nav'
import Title from '../../components/Title'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/Auth'
import { FiPhoneCall } from 'react-icons/fi'
import { toast } from 'react-toastify'
import './Contact.css'

const Contact = () => {
  const { user } = useContext(AuthContext)

  const handleEmailClick = async (e) => {
    const emailText = 'thiago@email.com'

    try {
      await navigator.clipboard.writeText(emailText)
      toast.success('Email copiado!')
    } catch (err) {
      console.log('Failed to copy email: ', err)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    toast.success('Your message was sent successfully!')
  }

  return (
    <div>
      <Nav />
      <Header />

      <div className="content content-container">
        <Title name="Contact">
          <FiPhoneCall size={25} />
        </Title>

        <div className="container">
          <div className="contact-container">
            <form className="form-profile" onSubmit={handleSubmit}>
              <label>Your Name</label>
              <input
                type="text"
                placeholder="Company Name"
                value={user.nome}
                disabled
                readOnly
              />
              <label>Subject</label>
              <input
                type="text"
                placeholder="State the subject of your message or suggestion"
                required
              />
              <label>Enter your message or feedback</label>
              <textarea
                name=""
                id=""
                cols="30"
                rows="10"
                placeholder="Enter here how we can help improve your experience."
                required
              ></textarea>
              <input type="submit" value="Submit" />
            </form>
            <div className="vertical-line"></div>
            <div className="additional-info">
              <h2>Additional Information</h2>
              <h4>If necessary, you can also contact us via</h4>
              <br />
              <p>
                Email:{' '}
                <a id="contact-email" href="#" onClick={handleEmailClick}>
                  thiago@email.com
                </a>
              </p>
              <br />
              <p>Phone: (11) 96290-3104</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
