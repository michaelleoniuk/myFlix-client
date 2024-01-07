import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Col, Row } from "react-bootstrap";

export const MovieView = ({ movies, removeFav, addFav}) => {

    const { movieId } = useParams();
    const movie = movies.find((movie) => movie._id === movieId);
    const user = JSON.parse(localStorage.getItem('user'));

    return (
        <>
            <Row className="my-5 justify-content-md-center">
                <Col md={7} className="col-12">
                    <img src={movie.ImagePath} alt="movie cover" style={{ height: '500px' }} />
                </Col>
                <Col md={5} className="col-12">
                    <div className="my-1">
                        <span className="h1">{movie.Title}</span>
                    </div>
                    <div className="my-1">
                        <span className="h6">Description: </span>
                        <span>{movie.Description}</span>
                    </div>
                    <div className="my-1">
                        <span className="h6">Director: </span>
                        <span>{movie.Director.Name}</span>
                    </div>
                    <div className="my-1">
                        <span className="h6">Genre: </span>
                        <span>{movie.Genre.Name}</span>
                    </div>
                    <div>
                        {user.FavoriteMovies.includes(movie._id) ? (
                            <Button className="my-2 me-2"on onClick={() => removeFav(movie._id)}>Remove from Favorite</Button>
                        ) : (
                            <Button className="my-2 me-2" onClick={() => addFav(movie._id)}>Add to Favorite</Button>
                        )}
                        </div>
                    <Link to={`/`}>
                        <Button className="my-2">Back</Button>
                    </Link>
                </Col>
            </Row>
        </>
    );
};