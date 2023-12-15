import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
      fetch("https://czo-myflix-ccfb67c11465.herokuapp.com/")
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

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  };

  if (movies.length === 0) {

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
}};
