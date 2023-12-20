import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
      fetch("https://czo-myflix-ccfb67c11465.herokuapp.com/movies")
          .then((response) => response.json())
          .then((data) => {
              console.log(data);
              const moviesFromApi = data.map((movie) => {
                  return {
                      _id: movie._id,
                      Title: movie.Title,
                      Description: movie.Description,
                      Genre: {
                          Name: movie.Genre.Name
                      },
                      Director: {
                          Name: movie.Director.Name
                      }
                  };
              });
              setMovies(moviesFromApi);
          });
  }, []);

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  };

  if (movies.length === 0) {
    return <div>No movies to show</div>
  }

    return (
    <div>
      {movies.map((movie) => (
          <MovieCard 
          key={movie._id} 
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }} 
          />
      ))}
    </div>
  );
};
