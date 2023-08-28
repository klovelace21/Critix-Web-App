/* eslint-disable react/jsx-no-target-blank */
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home  from './components/Home'
import About from './components/About'
import Navbar from './components/Navbar'
import SignUp from './components/SignUp'


function App() {
  

  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<SignUp/>} />
        <Route path="about" element={<About/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
