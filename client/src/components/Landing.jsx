import SignUp from "./SignUp"
import Login from './Login'
import discover from '../assets/discover.jpg'
import theatre from '../assets/movie_theatre.jpg'
import keyboard from '../assets/keyboard.jpg'
import { useState } from "react"
const Landing = () => {
  const [hasAccount, setHasAccount] = useState(true)

  const handleToggle = () => {
    setHasAccount(!hasAccount)
  }

  return (
    <div className="landing">
      <div className="split-left">
      <h1>critix</h1>
      {hasAccount === true ? 
      <Login toggleAccount={handleToggle}/>
       : <SignUp toggleAccount={handleToggle}/>}
      
       </div>
      <div className="split-right">
        <div className="text">
        <span>DISCOVER</span>
        <span>WATCH</span>
        <span>REVIEW</span>
        </div>
        <img src={discover}/>
        
        <img src={theatre}/>
        
        <img src={keyboard}/>
      </div>
    </div> 
    
  )
}

export default Landing