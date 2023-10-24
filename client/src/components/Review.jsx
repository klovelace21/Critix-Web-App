
import PropTypes from "prop-types"

const Review = ({ title }) => { 
  return (
    <div className="review">{title}</div>
  )
}

export default Review

Review.propTypes = {
  title: PropTypes.string
}