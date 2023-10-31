/* eslint-disable react-hooks/exhaustive-deps */
import '../../styles/userReviews.css'
import { useEffect, useState } from 'react'
import useAuth from '../../hooks/useAuth'
import { getAllReviews}  from '../../services/reviews.jsx'
import ReviewContainer from './ReviewContainer'


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
    <div className="userReviews">
      <h2>My Reviews</h2>
      <ReviewContainer reviews={allReviews}/>
    </div>
  )
}

export default UserReviews