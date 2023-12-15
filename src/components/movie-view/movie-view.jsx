import PropTypes from "prop-types";
export const MovieCard = ({ movie, onMovieClick }) => {
  return (
      <div
          onClick={() => {
              onMovieClick(movie);
          }}
      >
        {movie.Title}
        </div>

);
};

MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string,        
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
};

export const MovieView = ({ movie, onBackClick }) => {
    return (
        <div>
            <div>
            <span>{movie.Title}</span>
            </div>
            <div>
            <span>{movie.Description}</span>
            </div>
            <div>
            <span>{movie.Director.Name}</span>
            </div>
            <div>
            <span>{movie.Genre.Name}</span>
            </div>
            <button onClick={onBackClick}>Back</button>
            </div>
                );
            };