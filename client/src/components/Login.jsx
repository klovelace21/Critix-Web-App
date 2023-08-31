import { useState } from "react"

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')


  

  return (
    <form className="login">
      <label>Username</label>
      <input value={username}
        onChange={event => setUsername(event.target.value)}
        placeholder="Enter Username"/>
      <label>Password</label>
      <input value={password}
        onChange={event => setPassword(event.target.value)}
        placeholder="Enter Password"/>
      <button type="submit">Sign In</button>
    </form>
    
  )
}

export default Login