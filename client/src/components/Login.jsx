import { useEffect, useState, useRef } from "react"
import PropTypes from 'prop-types'
import useAuth from "../hooks/useAuth"
import { loginUser } from '../services/users'
import { useNavigate } from "react-router-dom"

const Login = ({ toggleAccount }) => {
  const { setAuth } = useAuth()
  const usernameRef = useRef()
  const errRef = useRef()
  const navigate = useNavigate()
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

      const response = await loginUser({
        username: username,
        password: password,
        })
      
      const { accessToken } = response

      setAuth({ username, accessToken })

      setUsername('')
      setPassword('')

      navigate('/home')

      } catch (err) {
      
      if (!err.response) {
        console.log('No response') 
      } else if (err.response?.status === 401) {
        setErrMsg('Invalid username or password')
      }
      errRef.current.focus()
    }

    
  }

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h1>Login</h1>
        <p ref={errRef} className={errMsg ? "errMsg" :
        "offscreen"} aria-live="assertive">
          {errMsg}
        </p>
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