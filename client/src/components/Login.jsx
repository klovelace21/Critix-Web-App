import { useState } from "react"
import PropTypes from 'prop-types'

const Login = ({ toggleAccount }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')


  

  return (
    <form className="login">
      <h1>Login</h1>
      <label>Username</label>
      <input value={username}
        onChange={e => setUsername(e.target.value)}
        placeholder="Enter Username"/>
      <label>Password</label>
      <input value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Enter Password"/>
      <button type="submit">Sign In</button>
      <a href='#' onClick={toggleAccount}>Dont have an account?</a>
    </form>
    
  )
}

Login.propTypes = {
  toggleAccount: PropTypes.func
}

export default Login