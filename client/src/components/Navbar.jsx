
import { useLocation, NavLink } from "react-router-dom"
import { useEffect, useState } from "react"
import '../styles/navbar.css'
const Navbar = () => {
  const location = useLocation()
  const [login, setLogin] = useState(true)

  useEffect(() => {
    location.pathname == '/' ? setLogin(true) : setLogin(false)

  }, [location])
  return (
    <header className={login ? 'none' : 'header'}>
       <h1 className="logo">
          CRITIX
        </h1>
      <nav className="navbar">
        <NavLink className="navlink" to="/home">Home</NavLink>
        <NavLink className="navlink" to="/search">Search</NavLink>
        <NavLink className="navlink" to="about">About</NavLink>
      </nav>
    </header>
  )
}

export default Navbar