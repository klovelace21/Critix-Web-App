/* eslint-disable react/jsx-no-target-blank */
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import Landing from './components/Landing'
import RequiresAuth from './components/RequiresAuth'
import Home from './components/Home'
import UserReviews from './components/userReviews'

function App() {

  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route element={<RequiresAuth />}>
          <Route path="/home" element={<Home/>}/>
          <Route path="/reviews" element={<UserReviews/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
