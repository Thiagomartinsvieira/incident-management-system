import { useDarkMode } from '../../contexts/darkMode'
import { FiX } from 'react-icons/fi'
import './Modal.css'

const Modal = ({ content, close }) => {
  const { darkMode, setDarkMode } = useDarkMode()

  return (
    <div className={`modal ${darkMode ? 'dark-mode' : ''}`}>
      <div className="container modal-custom">
        <button className="close" onClick={close}>
          <FiX size={25} color="#FFF" />
        </button>

        <main>
          <h2>Detalhes do chamado</h2>

          <div className="row">
            <span>
              Client: <i>{content.client}</i>
            </span>
          </div>

          <div className="row">
            <span>
              Subject: <i>{content.subject}</i>
            </span>
            <span>
              Cadastrado em: <i>{content.createdFormat}</i>
            </span>
          </div>

          <div className="row">
            <span>
              Status:
              <i
                className="status-badge"
                style={{
                  color: '#FFF',
                  backgroundColor:
                    content.status === 'Aberto' ? '#5cb85c' : '#999',
                }}
              >
                {content.status}
              </i>
              <span>
                Location:{' '}
                <i>
                  {content.customerLocation && (
                    <i>{content.customerLocation}</i>
                  )}
                </i>
              </span>
            </span>
          </div>

          {content.complement !== '' && (
            <>
              <h3>Complement: </h3>
              <p>{content.complement}</p>
            </>
          )}
        </main>
      </div>
    </div>
  )
}

export default Modal
