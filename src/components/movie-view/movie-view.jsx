import PropTypes from "prop-types";
export const MovieView = ({ movie, onBackClick }) => {
  return (

 MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Director: PropTypes.string
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};

  <button onClick={onBackClick}>Back</button>

  );
};
