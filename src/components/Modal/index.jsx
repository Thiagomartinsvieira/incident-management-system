import './Modal.css'
import { FiX } from 'react-icons/fi'

const Modal = () => {
  return (
    <div className="modal">
      <div className="container">
        <button className="close">
          <FiX size={25} color="#fff" />
        </button>

        <main>
          <h2>Tickets Details</h2>

          <div className="row">
            <span>
              Client: <i>Mercado</i>
            </span>
          </div>

          <div className="row">
            <span>
              Subject: <i>Suport</i>
            </span>
            <span>
              Registered in: <i>11/09/2023</i>
            </span>
          </div>

          <div className="row">
            <span>
              Status: <i>Opened</i>
            </span>
          </div>
          <>
            <h3>Complement</h3>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Repellendus nobis facere necessitatibus sapiente odio, pariatur
              deleniti tempora assumenda ratione dignissimos dolorum eos sed
              dolor eveniet cum. Quasi illum ab nostrum?
            </p>
          </>
        </main>
      </div>
    </div>
  )
}

export default Modal
