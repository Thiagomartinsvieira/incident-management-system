import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/Auth'

const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { signIn, loadingAuth, signInWithGoogle } = useContext(AuthContext)

  const handleSignIn = async (e) => {
    e.preventDefault()

    if (email !== '' && password !== '') {
      await signIn(email, password)
    }
  }

  return (
    <div className="container-center">
      <img className="img-logo" src="src/assets/logo.jpeg" alt="help Desk" />
      <form onSubmit={handleSignIn}>
        <h1>Welcome</h1>
        <h3>Login to follow and open your tickets</h3>
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
        <span>
          do not have an account? <Link to="/register">Click here</Link>
        </span>
        <input type="submit" value={loadingAuth ? 'Loading...' : 'Acess'} />

        <div className="google-sign-in">
          <button type="button" onClick={signInWithGoogle}>
            <img
              src="/src/assets/google-logo.png"
              alt="Google sign-in"
              className="logo-google"
            />
            <p>Sign in with Google</p>
          </button>
        </div>
      </form>
    </div>
  )
}

export default SignIn
