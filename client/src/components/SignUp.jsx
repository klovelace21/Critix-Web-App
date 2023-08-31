import createUser from '../services/users'
import { useState } from 'react'
import Select from 'react-select'
import explosion from '../assets/icons/explosion.png'
import hat from '../assets/icons/hat.png'
import magicWand from '../assets/icons/magic_wand.png'
import laughing from '../assets/icons/laughing.png'
import handCuffs from '../assets/icons/handCuffs.png'
import camera from '../assets/icons/camera.png'
import theatre from '../assets/icons/theatre.png'
import dragon from '../assets/icons/dragon.png'
import hourGlass from '../assets/icons/hourglass.png'
import ghost from '../assets/icons/ghost.png'
import magnifyingGlass from '../assets/icons/magnifyingGlass.png'
import heart from '../assets/icons/heart.png'
import alien from '../assets/icons/alien.png'
import knife from '../assets/icons/knife.png'
import tank from '../assets/icons/tank.png'
import cactus from '../assets/icons/cactus.png'
const SignUp = () => {
  const genres = [
    { value: "action", label: <div><img src={explosion} height="15px" width="15px"/>Action</div> },
    { value: 'adventure', label: <div><img src={hat} height="15px" width="15px"/>Adventure</div> },
    { value: 'animation', label: <div><img src={magicWand} height="15px" width="15px"/>Animation</div> },
    { value: 'comedy', label: <div><img src={laughing} height="15px" width="15px"/>Comedy</div> },
    { value: 'crime', label: <div><img src={handCuffs} height="15px" width="15px"/>Crime</div> },
    { value: 'documentary', label: <div><img src={camera} height="15px" width="15px"/>Documentary</div> },
    { value: 'drama', label: <div><img src={theatre} height="15px" width="15px"/>Drama</div> },
    { value: 'fantasy', label: <div><img src={dragon} height="15px" width="15px"/>Fantasy</div> },
    { value: 'history', label: <div><img src={hourGlass} height="15px" width="15px"/>History</div> },
    { value: 'horror', label: <div><img src={ghost} height="15px" width="15px"/>Horror</div> },
    { value: 'mystery', label: <div><img src={magnifyingGlass} height="15px" width="15px"/>Mystery</div> },
    { value: 'romance', label: <div><img src={heart} height="15px" width="15px"/>Romance</div> },
    { value: 'science fiction', label: <div><img src={alien} height="15px" width="15px"/>Science Fiction</div> },
    { value: 'thriller', label: <div><img src={knife} height="15px" width="15px"/>Thriller</div> },
    { value: 'war', label: <div><img src={tank} height="15px" width="15px"/>War</div> },
    { value: 'western', label: <div><img src={cactus} height="15px" width="15px"/>Western</div> }
  ]
  const [newUsername, setUsername] = useState('')
  const [newPassword, setPassword] = useState('')
  const [selectedOption, selectSelectedOption] = useState('')

  const addUser = (event) => {
    event.preventDefault()
    
    createUser({ 
      username: newUsername, 
      password: newPassword, 
      favoriteGenre: selectedOption.value
    })
      
     

    setUsername('')
    setPassword('')
    selectSelectedOption('')
  }
  
  return (
    <form onSubmit={addUser} className='signUp'>
      <label>Username</label>
      <input value={newUsername} 
      type='text' 
      name='Username'
      placeholder='Username'
      onChange={event => setUsername(event.target.value)}
      />
      <label>Password</label>
      <input value={newPassword}
      type='password'
      name='Password'
      placeholder='Password'
      onChange={event => setPassword(event.target.value)}/>
      <label>Select your favorite genre</label>
      <Select className="genres" options={genres} onChange={(choice) => selectSelectedOption(choice)}/>
      <button type='submit'>create</button>
    </form>
  )
}

export default SignUp