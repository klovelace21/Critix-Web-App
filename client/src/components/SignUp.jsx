/* eslint-disable react-hooks/exhaustive-deps */
import { createUser } from '../services/users'
import { useEffect, useState, useRef } from 'react'
import { faCheck, faTimes, faInfoCircle} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types'



const SignUp = ({ toggleAccount }) => {
  const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

  

  const userRef = useRef()
  const errRef = useRef()

  const [newUsername, setUsername] = useState('')
  const [validName, setValidName] = useState(false) 
  const [userFocus, setUserFocus] = useState(false)

  const [newPassword, setPassword] = useState('')
  const [validPassword, setValidPassword] = useState(false)
  const [passwordFocus, setPasswordFocus] = useState(false)

  const [confirmPassword, setConfirmPassword] = useState('')
  const [confirmMatch, setConfirmMatch] = useState(false)
  const [confirmFocus, setConfirmFocus] = useState(false)
  
  const [success, setSuccess] = useState(false)

  const [errorMsg, setErrMsg] = useState('')

  useEffect(() => {
    userRef.current.focus()
  }, [])

  // Confirm valid username
  useEffect(() => {

    setValidName(USER_REGEX.test(newUsername))
  }, [newUsername])

  // Verify password is valid and that confirmPassword matches
  useEffect(() => {
    setValidPassword(PWD_REGEX.test(newPassword))

    const matches = newPassword == confirmPassword
    
    setConfirmMatch(matches)

  }, [newPassword, confirmPassword])

  useEffect(() => {
    setErrMsg('')
  }, [newUsername, newPassword, confirmPassword])



  const addUser = async (e) => {
    e.preventDefault()
    
    try{
    await createUser({ 
      username: newUsername, 
      password: newPassword, 
    })
    setSuccess(true)
    } catch (err) {
      if(!err.response) {
        setErrMsg('No response from server')
      } else if (err.response?.status === 409) {
        setErrMsg('Username Taken')
      } else {
        setErrMsg('Registration Failed')
      }
      errRef.current.focus()
    }
      
     

    setUsername('')
    setPassword('')
    setConfirmPassword('')
  }
  
  return (
    <>
    {success ? 
    <div className='success'>
    Account successfully created <a href="#" onClick={toggleAccount}>Login now</a>
    </div>
    :
    <form onSubmit={addUser} className='signUp'>
      <h1>Sign Up</h1>
      <label htmlFor='username'>
        Username:
        <span className={validName ? 'valid' : 'hide'}
        ><FontAwesomeIcon icon={faCheck}/>
        </span>
        <span className={validName || !newUsername ? 'hide' : 'invalid'}>
          <FontAwesomeIcon icon={faTimes} />
        </span>
        </label>
      <input value={newUsername} 
        type='text' 
        id='username'
        ref={userRef}
        autoComplete='off'
        placeholder='Username'
        onChange={e => setUsername(e.target.value)}
        required
        aria-invalid={validName ? 'false' : 'true'}
        aria-describedby='uidnote'
        onFocus={() => setUserFocus(true)}
        onBlur={() => setUserFocus(false)}
      />
      <p className={userFocus && newUsername && !validName ? 'instructions' : 'offscreen'}>
        <FontAwesomeIcon icon={faInfoCircle} className='icon'/>
        4 to 24 characters. <br />
        Must begin with a letter. <br />
        Letters, numbers, underscores, hyphens allowed.
      </p>
      <label htmlFor='password'>
        Password:
        <span className={validPassword ? 'valid' : 'hide'}>
          <FontAwesomeIcon icon={faCheck}/>
        </span>
        <span className={validPassword || !newPassword ? 'hide' : 'invalid'}>
          <FontAwesomeIcon icon={faTimes}/>
        </span>
        </label>
      <input value={newPassword}
      type='password'
      id='pasword'
      name='Password'
      placeholder='Password'
      onChange={e => setPassword(e.target.value)}
      required
      aria-invalid={validPassword ? 'false' : 'true'}
      aria-describedby='pwdnote'
      onFocus={() => setPasswordFocus(true)}
      onBlur={() => setPasswordFocus(false)}
      />
      <p id='pwdnote' className={passwordFocus && !validPassword && newPassword ? 'instructions' : 'offscreen'}>
        <FontAwesomeIcon icon={faInfoCircle}  className='icon'/>
        8 to 24 character. <br/>
        Must include uppercase and lowercase letters, a number and a special character.<br />
        Allowed special characters: ! @ # $ %
      </p>
      <label htmlFor='confirm_pwd'>Confirm Password:
        <span className={confirmMatch && confirmPassword ? 'valid' : 'hide'}>
          <FontAwesomeIcon icon={faCheck}/>
        </span>
        <span className={confirmMatch  || !confirmPassword ? 'hide' : 'invalid'}>
          <FontAwesomeIcon icon={faTimes} />
        </span>
        </label>
      <input value={confirmPassword}
        type='password'
        id='confirm_pwd'
        placeholder='Confirm Password'
        onChange={e => setConfirmPassword(e.target.value)}
        aria-invalid={confirmMatch ? 'false' : 'true'}
        aria-describedby='confirmnote'
        onFocus={() => setConfirmFocus(true)}
        onBlur={() => setConfirmFocus(false)}
        />
      <p id='confirmnote' className={confirmFocus && !confirmMatch ? 'instructions' : 'offscreen'}>
        <FontAwesomeIcon icon={faInfoCircle} className='icon' />
        Must match the first password input field.
      </p>
      <span className='error' ref={errRef}>{errorMsg}</span>
      <button disabled={!validName || !validPassword || !confirmMatch ? true : false}>Create Account</button>
     
      <a href='#' onClick={toggleAccount}>Already have an account?</a>
    </form>
    }
  </>
  )
}

SignUp.propTypes = {
  toggleAccount: PropTypes.func
}

export default SignUp