/* eslint-disable react/prop-types */
const baseImgUrl = 'https://image.tmdb.org/t/p/w300/'
const ReviewForm = ({title, imageSrc, overview}) => {
  return (
    <div className="reviewContainer">
      <form className='reviewForm'>
        <h1>{title}</h1>
        <img src={baseImgUrl + imageSrc}/>
        <div className="overview">
        <h2>Overview</h2>
        <span>{overview}</span>
        
        </div>
      </form>
    </div>
  )
}

export default ReviewForm

