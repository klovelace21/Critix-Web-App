/* eslint-disable react/jsx-no-target-blank */
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'

import Home from './components/Home'
import About from './components/About'
import './App.css'

function App() {
  

  return (
    <BrowserRouter>
      <header>
        <nav>
          <h1>Hello</h1>
          <NavLink to="/">Home</NavLink>
          <NavLink to="about">About</NavLink>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
