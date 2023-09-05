import '../styles/home.css'
import Scrollbar from './Scollbar'
import { useState, useEffect } from 'react'
import getTrending from '../services/movies'

const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState([])

  useEffect(() => {
    const setTrending = async () => {
      const movies = await getTrending()
      setTrendingMovies(movies)
    }
    setTrending()
  }, [])
  return (
    <div className='home'>
      <h2>Trending Today</h2>
      <Scrollbar media={trendingMovies} />
      <h2>Recommended For You</h2>
      <Scrollbar media={trendingMovies} />
    </div>
  )
}

export default Home