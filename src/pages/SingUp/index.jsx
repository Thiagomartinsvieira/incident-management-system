import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'

import { AuthContext } from '../../contexts/Auth'

const SignUp = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState(null)

  const { signUp, loadingAuth } = useContext(AuthContext)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (
      name === '' ||
      email === '' ||
      password === '' ||
      confirmPassword === ''
    ) {
      setError('All fields are required.')
      return
    }

    if (password.length <= 5) {
      setError('your password needs 6 characters')
    }

    if (password !== confirmPassword) {
      setError('Password and password confirmation do not match.')
      return
    }

    try {
      await signUp(email, password, name)
    } catch (error) {
      setError(`an error has occurred ${error.message}`)
    }
  }

  return (
    <div className="container-center">
      <img src="src/assets/logo.jpeg" alt="help Desk" />
      <form onSubmit={handleSubmit}>
        <h1>New account</h1>
        <h3>Register to open and track your tickets</h3>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {error && <p className="error">{error}</p>}
        <span>
          Already have an account? <Link to="/">Click here</Link>
        </span>
        <input type="submit" value={loadingAuth ? 'Loading...' : 'Create'} />
      </form>
    </div>
  )
}

export default SignUp
