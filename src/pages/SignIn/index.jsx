import { Link } from 'react-router-dom'

const SignIn = () => {
  return (
    <div className="container-center">
      <img
        src="https://www.milldesk.com.br/wp-content/uploads/2019/03/helpdesk.jpeg"
        alt="help Desk"
      />
      <form className="form">
        <h1>Welcome</h1>
        <h3>Login to follow and open your tickets</h3>
        <input type="text" placeholder="your email" />
        <input type="password" placeholder="Password" />
        <span>
          don't have an account? <Link to="/register">Click here</Link>
        </span>
        <input type="submit" value="Entrar" />
      </form>
    </div>
  )
}

export default SignIn
