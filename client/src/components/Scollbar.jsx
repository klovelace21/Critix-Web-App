
import Movie from "./Movie"
import PropTypes from "prop-types"

const Scrollbar = ({ media }) => {
  return (
    <>
    <div className="scroller">
      {
      media.map((media, index) => (
        <Movie key={index} imageSrc={media.backdrop_path} title={media.title}
          overview={media.overview} id={media.id}/>
      ))}
    </div>
    </>
  )
}

export default Scrollbar

Scrollbar.propTypes = {
  media: PropTypes.array
}