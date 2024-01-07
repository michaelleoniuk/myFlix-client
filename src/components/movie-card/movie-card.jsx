import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie, addFav, removeFav, isFavorite }) => {
    return (
        <Card className="h-100 mt-5 my-1 card-shadow">
            <Card.Img variant="top card-img" style={{ height: '400px' }} src={movie.ImagePath} />
            <Card.Body>
                <Card.Title>{movie.Title}</Card.Title>
                <Card.Text>Director: {movie.Director.Name}</Card.Text>
                <Card.Text>Genre: {movie.Genre.Name}</Card.Text>
                <Card.Text>Year: {movie.Year}</Card.Text>
                <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
                    <Button className="my-2 me-2">
                        Open
                    </Button>
                </Link>
                <div>
                    {isFavorite ? (
                        <Button className="my-2 me-2" onClick={() => removeFav(movie._id)}>Remove from Favorite</Button>
                    ) : (
                        <Button className="my-2 me-2" onClick={() => addFav(movie._id)}>Add to Favorite</Button>
                    )}
                </div>
            </Card.Body>
        </Card>
    );
};

MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string,
        Director: PropTypes.shape({
            Name: PropTypes.string,
        }),
        _id: PropTypes.string,
    }).isRequired,
    addFav: PropTypes.func.isRequired,
    removeFav: PropTypes.func.isRequired,
    isFavorite: PropTypes.bool.isRequired,
};