import PropTypes from 'prop-types'
const baseImgUrl = 'https://image.tmdb.org/t/p/w300/'
const Movie = ({ imageSrc, title }) => {
  return (
    <div className="movie">
      <img src={baseImgUrl + imageSrc} alt="Image"/>
      <h3>{title}</h3>
    </div>
  )
}

export default Movie

Movie.propTypes = {
  imageSrc: PropTypes.string,
  title: PropTypes.string

}