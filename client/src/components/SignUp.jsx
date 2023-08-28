import createUser from '../services/users'
import { useState } from 'react'
const SignUp = () => {
  const [newUsername, setUsername] = useState('')
  const [newPassword, setPassword] = useState('')
  const [newFavoriteGenre, setFavoriteGenre] = useState('')

  const addUser = (event) => {
    event.preventDefault()
    createUser({ 
      username: newUsername, 
      password: newPassword, 
      favoriteGenre: newFavoriteGenre})

    setUsername('')
    setPassword('')
    setFavoriteGenre('')
  }
  return (
    <form onSubmit={addUser}>
      <input value={newUsername} 
      type='text' 
      name='Username'
      onChange={event => setUsername(event.target.value)}
      />
      <input value={newPassword}
      type='text'
      name='Password'
      onChange={event => setPassword(event.target.value)}/>
      <input value={newFavoriteGenre}
      type='text'
      name='Favorite Genre'
      onChange={event => setFavoriteGenre(event.target.value)}/>
      <button type='submit'>create</button>
    </form>
  )
}

export default SignUp