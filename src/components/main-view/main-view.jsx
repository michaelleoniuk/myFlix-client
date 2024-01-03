import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";
import "./main-view.scss";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser? storedUser: null);
    const [token, setToken] = useState(storedToken? storedToken: null);
    const [movies, setMovies] = useState([]);

    
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

    return (
        <BrowserRouter>
            <NavigationBar
                user={user}
                onLoggedOut={() => {
                    setUser(null);
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                }}
            />
            <Row className="justify-content-center my-5">
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
                                <Col>The list is empty</Col>
                            ) : (
                                <>
                                    {movies.map((movie) => (
                                        <Col md={6} lg={4} xl={3} className="mb-5 col-8" key={movie._id}>
                                            <MovieCard
                                            movie={movie} 
                                            removeFav={removeFav} 
                                            addFav={addFav} 
                                            isFavorite={user.FavoriteMovies.includes(movie._id)} 
                                            />
                                        </Col>
                                    ))}
                                </>
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
                            ) : (
                                <Col>
                                    <ProfileView 
                                    user={user}
                                    movies={movies}
                                    removeFav={removeFav}
                                    addFav={addFav}
                                    setUser={setUser}
                                    />
                                </Col>
                            )}
                        </>
                    }
                    />
                </Routes>
            </Row>
        </BrowserRouter>
    );
};