

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