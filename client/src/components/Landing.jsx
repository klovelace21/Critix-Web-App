import SignUp from "./SignUp"
import Login from './Login'
import discover from '../assets/discover.jpg'
import theatre from '../assets/movie_theatre.jpg'
import keyboard from '../assets/keyboard.jpg'
import { useState } from "react"
const Landing = () => {
  const [hasAccount, setHasAccount] = useState(true)
  const [label, setLabel] = useState('Login')

  const handleToggle = () => {
    setHasAccount(!hasAccount)
    label === 'Login' ? setLabel('Sign Up') : setLabel('Login')
  }
  
  return (
    <div className="landing">
      <div className="split-left">
      <h1>critix</h1>
      <label>{label}</label>
      {hasAccount === true ? 
      <Login toggleAccount={handleToggle}/>
       : <SignUp toggleAccount={handleToggle}/>}
      
       </div>
      <div className="split-right">
        <img src={discover}/>
        <img src={theatre}/>
        <img src={keyboard}/>
      </div>
    </div> 
    
  )
}

export default Landing