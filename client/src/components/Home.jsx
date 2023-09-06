import '../styles/home.css'
import Scrollbar from './Scollbar'
import { useState, useEffect } from 'react'
import getTrending from '../services/movies'

const Home = () => {
  const [trendingToday, setTrendingToday] = useState([])
  const [trendingWeek, setTrendingThisWeek] = useState([])

  useEffect(() => {
    const setTrending = async () => {
      const moviesDay = await getTrending({ period: "day" })
      const moviesWeek = await getTrending({ period: "week" })

      setTrendingToday(moviesDay)
      setTrendingThisWeek(moviesWeek)
    }
    setTrending()
  }, [])
  return (
    <div className='home'>
      <h2>Trending Today</h2>
      <Scrollbar media={trendingToday} />
      <h2>Trending This Week</h2>
      <Scrollbar media={trendingWeek} />
    </div>
  )
}

export default Home