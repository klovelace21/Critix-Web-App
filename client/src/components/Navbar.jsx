import { NavLink } from "react-router-dom"

const Navbar = () => {
  return (
    <header className="header">
       <h1 className="logo">
          CRITIX
        </h1>
      <nav className="navbar">
        <NavLink to="/">Home</NavLink>
        <NavLink to="about">About</NavLink>
      </nav>
    </header>
  )
}

export default Navbar