/* eslint-disable react-hooks/exhaustive-deps */
import '../styles/userReviews.css'
import { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth'
import { getAllReviews}  from '../services/reviews.jsx'

const UserReviews = () => {
  
  const [allReviews, setAllReviews] = useState([])

  const { auth } = useAuth()

  useEffect(() => {
    const retrieveAllReviews = async () => {
      const retrievedReviews = await getAllReviews(auth)
      setAllReviews(retrievedReviews)
    }
     retrieveAllReviews()
  }, [])

  return (
    <div className="userReviews">userReviews</div>
  )
}

export default UserReviews