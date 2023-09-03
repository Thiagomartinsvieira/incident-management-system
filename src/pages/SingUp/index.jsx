import { useState } from 'react'
import { Link } from 'react-router-dom'

const SingUp = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    if (
      name !== '' &&
      email !== '' &&
      password !== '' &&
      confirmPassword !== ''
    ) {
      alert('Realized')
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
          placeholder="your email"
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
          placeholder="confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <span>
          Already have an account? <Link to="/">Click here</Link>
        </span>
        <input type="submit" value="Create account" />
      </form>
    </div>
  )
}

export default SingUp
