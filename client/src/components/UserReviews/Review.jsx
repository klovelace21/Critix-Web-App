
import PropTypes from "prop-types"

const Review = ({ title, rating, content}) => { 


  return (
  <>
  <div className="review"> 
  <h1><span className="title">{title}</span><span className="rating">{rating}/10</span></h1>
  <p>{content}</p>
    </div>
   
    


    
    </>
  )
}

export default Review

Review.propTypes = {
  title: PropTypes.string,
  rating: PropTypes.string,
  content: PropTypes.string
}