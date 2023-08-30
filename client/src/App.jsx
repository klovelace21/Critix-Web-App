/* eslint-disable react/jsx-no-target-blank */
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import About from './components/About'
import Landing from './components/Landing'


function App() {
  

  return (
    <BrowserRouter>
      <Landing/>
      <Routes>
        <Route path="about" element={<About/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
