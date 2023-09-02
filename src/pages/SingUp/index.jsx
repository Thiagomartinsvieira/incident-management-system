import { Link } from 'react-router-dom'

const SingUp = () => {
  return (
    <div className="container-center">
      <img
        src="https://www.milldesk.com.br/wp-content/uploads/2019/03/helpdesk.jpeg"
        alt="help Desk"
      />
      <form>
        <h1>Registration page</h1>
        <h3>Register to open and track your tickets</h3>
        <input type="text" placeholder="your email" />
        <input type="password" placeholder="Password" />
        <input type="password" placeholder="confirm Password" />
        <span>
          Already have an account? <Link to="/">Click here</Link>
        </span>
        <input type="submit" value="Entrar" />
      </form>
    </div>
  )
}

export default SingUp
