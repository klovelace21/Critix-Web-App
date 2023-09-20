/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
const baseImgUrl = 'https://image.tmdb.org/t/p/w300/'
import useAuth from "../hooks/useAuth"
import { useState } from "react"
import { useEffect } from "react"
import createReview from "../services/reviews"

const MovieReviewForm = ({title, imageSrc, overview, id, handleExit}) => {
  const RATING_REGEX = /^(10|[0-9])$/

  const [rating, setRating] = useState('')
  const [validRating, setValidRating] = useState(false)

  const [review, setReview] = useState('')
  const { auth } = useAuth()

  useEffect(() => {
    setValidRating(RATING_REGEX.test(rating))
  }, [rating])


  const submitReview = async (e) => {
    e.preventDefault()
    const content = {
      title: title,
      id: id,
      rating: rating,
      review: review,
      type: "Movie"
    }
    console.log(content)
    await createReview(
      auth,
      content
    )
  
  }
  return (
    <div className="reviewContainer">
      <form className='reviewForm' onSubmit={submitReview}>
        <h1>{title}</h1>
        <img src={baseImgUrl + imageSrc}/>
        <div className="overview">
        <h2>Overview</h2>
        <span>{overview}</span>
        </div>
        <label htmlFor="review">My Review: 
        <input onChange={e => setRating(e.target.value)}></input>
        /10
        <span className={validRating ? "offscreen" : "error"}>
          rating must be whole number 0-10
        </span>
        </label>
        
        <textarea id="review" 
        onChange={e => setReview(e.target.value)}>
        </textarea>
        <button id="exit" onClick={handleExit}>X</button>
        <button type="submit">Save Review</button>
      </form>
    </div>
  )
}

export default MovieReviewForm

