import SignUp from "./SignUp"
import Login from './Login'
import discover from '../assets/discover.jpg'
import theatre from '../assets/movie_theatre.jpg'
import keyboard from '../assets/keyboard.jpg'

const Landing = () => {
  return (
    <>
    <div className="landing">
      <div className="split-left">
      <h1>critix</h1>
      <Login/>
       </div>
      <div className="split-right">
        <img src={discover}/>
        <img src={theatre}/>
        <img src={keyboard}/>
      </div>
    </div> 
    </>
  )
}

export default Landing