import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export const MovieCard = ({ movie, onMovieClick }) => {
    return (
        <Card>
            <Card.Img variant="top"  height={300} src="https://cache.pressmailing.net/thumbnail/story_hires/c3822451-8a37-4c19-a495-fd3fc0edeb33/image.jpg" />
            <Card.Body>
                <Card.Title>{movie.Title}</Card.Title>
                <Card.Text>{movie.Director.Name}</Card.Text>
                <Button onClick={() => onMovieClick(movie)} variant="link">
                    Open
                </Button>
            </Card.Body>
        </Card>
    );
};

MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string,        
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
};