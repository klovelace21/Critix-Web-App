import { useContext, useEffect, useState } from "react"
import PropTypes from 'prop-types'
import { useRef } from "react"
import AuthContext from "../context/AuthProvider"
import { loginUser } from '../services/users'

const Login = ({ toggleAccount }) => {
  const { setAuth } = useContext(AuthContext)
  const usernameRef = useRef()
  const errRef = useRef()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errMsg, setErrMsg] = useState('')
  
  useEffect(() => {
    usernameRef.current.focus()
  }, [])

  useEffect(() => {
    setErrMsg('')
  }, [username, password])

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
       await loginUser({
        username: username,
        password: password,
      })
    } catch (err) {
      
      if (!err.response) {
        console.log('No response') 
      } else if (err.response?.status === 401) {
        console.log('invalid username or password')
      }
    }

    
  }

  return (
    <form className="login" onSubmit={handleSubmit}>
      <p ref={errRef} className={errMsg ? "errMsg" :
        "offscreen"} aria-live="assertive"></p>
      <h1>Login</h1>
      <label htmlFor="username">Username</label>
      <input value={username}
        onChange={e => setUsername(e.target.value)}
        placeholder="Enter Username"
        type="text"
        id="username"
        ref={usernameRef}
        autoComplete="off"
        required
        />
      <label htmlFor="password">Password</label>
      <input value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Enter Password"
        type="password"
        id="password"
        name="password"
        required/>
      <button type="submit">Login</button>
      <a href="#" onClick={toggleAccount}>Dont have an account?</a>
    </form>
    
  )
}

Login.propTypes = {
  toggleAccount: PropTypes.func
}

export default Login