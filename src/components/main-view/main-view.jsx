import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    if (!token) {
      return;
    }

      fetch("https://czo-myflix-ccfb67c11465.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` }
      })
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
    }, [token]);  
  

  if (!user) {
    if (!user) {
      return (
          <>
              <LoginView 
                  onLoggedIn={(user, token) => {
                      setUser(user);
                      setToken(token);
                  }}
              />
              or
              <SignupView />
          </>
      );
  }
  }

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  };

  if (movies.length === 0) {
  
    return <div>
        <p>The list is empty!</p>
        <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
    </div>;
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
        <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
    </div>
);
};