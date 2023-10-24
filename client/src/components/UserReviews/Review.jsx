
import PropTypes from "prop-types"
import { useState } from "react"
const Review = ({ title }) => { 
  const [show, setShow] = useState(false)

  const handleClick = () => {
    setShow(!show)

  }
  return (
  <>
    <div className="review" onClick={handleClick}>{title}</div>
    </>
  )
}

export default Review

Review.propTypes = {
  title: PropTypes.string
}