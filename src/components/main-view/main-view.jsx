import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    { 
    id: 1,
    title: "Power",
    description: "After a close friend drops out of politics, a political consultant hel…",
    genre: "Drama",
    director: "Sidney Lumet",
    imagePath: "https://www.briansmoviestars.com/wp-content/uploads/2014/02/Denzel-Washington-31-300x210.jpg"
    },

    { 
      id: 2,
      title: "Carbon Copy",
      description: "When a rich white corporate executive finds out that he has an illegit…",
      genre: "Comedy",
      director: "Michael Schultz",
      imagePath: "https://www.briansmoviestars.com/wp-content/uploads/2014/02/Denzel-Washington-31-300x210.jpg"
      },

      { 
        id: 3,
        title: "Coriolanus",
        description: "Films that either provide more-or-less accurate representations of his…",
        genre: "Historical",
        director: "Wilford Leach",
        imagePath: "https://www.briansmoviestars.com/wp-content/uploads/2014/02/Denzel-Washington-31-300x210.jpg"
        },
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  };

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
          <MovieCard 
          key={movie.id} 
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }} 
          />
      ))}
    </div>
  );
};

