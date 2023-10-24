/* eslint-disable react/prop-types */
import Review from "./Review"

const ReviewContainer = ({ reviews }) => {
  return (
    <>
    <div className="reviewContainer">
      {
        reviews.map((review, index) => (
          <Review key={index} title={review.title} 
          rating={review.rating}
          content={review.content}/>
        ))
      }
    </div>
    </>
  )
}

export default ReviewContainer

