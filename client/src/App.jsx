/* eslint-disable react/jsx-no-target-blank */
import { BrowserRouter, Routes, Route} from 'react-router-dom'

import Landing from './components/Landing'
import RequiresAuth from './components/RequiresAuth'
import Home from './components/Home'

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route element={<RequiresAuth />}>
          <Route path="/home" element={<Home/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
