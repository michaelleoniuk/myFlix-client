import { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");

  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  //importing data from API
  useEffect(() => {
    if (!token) {
        return;
    }
    fetch("https://czo-myflix-ccfb67c11465.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}`}
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            const moviesFromApi = data.map((movie) => {
                return {
                    _id: movie._id,
                    Title: movie.Title,
                    ImagePath: movie.ImagePath,
                    Year: movie.Year,
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

  const filteredMovies = movies.filter(movie => {
    if (searchQuery) {
      return movie.Title.toLowerCase().includes(searchQuery.toLowerCase())
    }
  });

  //display on page
  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        onLoggedOut={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
        movies={movies}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filteredMovies={filteredMovies}
      />
      <Row className="justify-content-center">
        <Routes>
          <Route 
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={6}>
                    <SignupView />
                  </Col>
                )}
              </>
            }
          />
          <Route 
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={6}>
                    <LoginView 
                      onLoggedIn={(user, token) => {
                      setUser(user);
                      setToken(token);
                      }}
                    />
                  </Col>
                )}
              </>
            }
          />
          <Route 
            path="/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>Loading movies.</Col>
                ) : (
                  <Col sm={8}>
                    <MovieView movies={movies} />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>Loading movies.</Col>
                ) : searchQuery ? (
                  <Row>
                    {filteredMovies.map((movie) => (
                      <Col className="mb-4" key={movie.id} lg={3} md={4} sm={6} xs={10}>
                        <MovieCard 
                          movie={movie}
                          user={user}
                          setUser={setUser} 
                        />
                      </Col>
                    ))}
                  </Row>
                ) : (                
                  <Row>
                    {movies.map((movie) => (
                      <Col className="mb-4" key={movie.id} lg={3} md={4} sm={6} xs={10}>
                        <MovieCard 
                          movie={movie}
                          user={user}
                          setUser={setUser} 
                        />
                      </Col>
                    ))}
                  </Row>                 
                )}
              </>
            }
          />
          <Route 
            path="/profile"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ): (
                  <ProfileView 
                    user={user}
                    setUser={setUser}
                    movies={movies}
                    onDelete={() => {
                      setUser(null);
                      setToken(null);
                      localStorage.clear();
                    }}
                  />
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};