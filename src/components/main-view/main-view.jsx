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
import "./main-view.scss";

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

//Adding Favorite Movie
const addFav = (id) => {
  fetch(`https://czo-myflix-ccfb67c11465.herokuapp.com/users/${user.Username}/movies/${id}`, {
      method: "POST",
      headers: {
          Authorization: `Bearer ${token}`
      }
  }).then((response) => {
      if (response.ok) {
          return response.json();
      } else {
          alert("Failed to add")
      }
  }).then((user) => {
      if (user) {
          alert("Added successfully");
          localStorage.setItem('user', JSON.stringify(user));
          setUser(user);
      }
  }).catch(error => {
      console.error('Error: ', error);
  });
};
//Removing favorite Movie
const removeFav = (id) => {
  fetch(`https://czo-myflix-ccfb67c11465.herokuapp.com/users/${user.Username}/movies/${id}`, {
      method: "DELETE",
      headers: {
          Authorization: `Bearer ${token}`
      }
  }).then((response) => {
      if (response.ok) {
          return response.json();
      } else {
          alert("Failed to remove")
      }
  }).then((user) => {
      if (user) {
          alert("Removed successfully from favorite Movies");
          localStorage.setItem('user', JSON.stringify(user));
          setUser(user);
      }
  }).catch(error => {
      console.error('Error: ', error);
  });
};

  //display on page
  const filteredMovies = movies.filter(movie => {
    if (searchQuery) {
      return movie.Title.toLowerCase().includes(searchQuery.toLowerCase())
    }
  });
  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        onLoggedOut={() => {
          setUser(null);
          setToken(null);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
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
                            {user? (
                                <Navigate to="/" />
                            ) : (
                                <Col md={5}>
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
                                    <Col md={5}>
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
                                    <Col>There is no movie</Col>
                                ) : (
                                    <Col md={12}>
                                        <MovieView 
                                        movies={movies}
                                        removeFav={removeFav}
                                        addFav={addFav}
                                        />
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
                  <Col>Loading movies, this should just take a moment. If movies fail to load, check your connection and retry.</Col>
                ) : searchQuery ? (
                  <Row>
                    {filteredMovies.map((movie) => (
                      <Col className="mb-4" key={movie.id} lg={3} md={4} sm={6} xs={10}>
                        <MovieCard 
                          user={user}
                          setUser={setUser} 
                          movie={movie} 
                          removeFav={removeFav} 
                          addFav={addFav} 
                          isFavorite={user.FavoriteMovies.includes(movie._id)} 
                        />
                      </Col>
                    ))}
                  </Row>
                ) : (                
                  <Row>
                    {movies.map((movie) => (
                      <Col className="mb-4" key={movie.id} lg={3} md={4} sm={6} xs={10}>
                        <MovieCard 
                          user={user}
                          setUser={setUser}
                          movie={movie} 
                          removeFav={removeFav} 
                          addFav={addFav} 
                          isFavorite={user.FavoriteMovies.includes(movie._id)}  
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
                    removeFav={removeFav}
                    addFav={addFav}
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