import PropTypes from 'prop-types'
import MovieReviewForm from './MovieReviewForm'
const baseImgUrl = 'https://image.tmdb.org/t/p/w300/'
import { useState } from 'react'


const Movie = ({ imageSrc, title, overview, id }) => {
  const [show, setShow] = useState(false)


  const handleClick = () => {
    setShow(!show)
  }
  return (
    <>
      <div className="movie" onClick={handleClick}>
        <img src={baseImgUrl + imageSrc} alt="Image"/>
        <h3>{title}</h3>
      </div>
      {show ?
       <MovieReviewForm 
      title={title}
      imageSrc={imageSrc}
      overview={overview}
      id={id}
      handleExit={handleClick}
      /> : ''}
      
    </>
  )
}

export default Movie

Movie.propTypes = {
  imageSrc: PropTypes.string,
  title: PropTypes.string,
  overview: PropTypes.string,
  id: PropTypes.number
}