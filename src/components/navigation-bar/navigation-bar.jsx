import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";

export const NavigationBar = ({ user, onLoggedOut }) => {
    return(
        <Navbar bg="primary" expand="lg" fixed="top"> 
            <Container>
                <Navbar.Brand as={Link} to="/">
                <div class="text-white">MyFlix</div>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                       <Nav className="me-auto">
                        {!user && (
                            <>
                                <Nav.Link as={Link} to="/login">
                                <div class="text-white">Login</div>
                                </Nav.Link>
                                <Nav.Link as={Link} to="/signup">
                                <div class="text-white">Signup</div>
                                </Nav.Link>
                            </>
                        )}
                        {user && (
                            <>
                                <Nav.Link as={Link} to="/">
                                <div class="text-white">Home</div>
                                </Nav.Link>
                                <Nav.Link as={Link} to="/profile">
                                <div class="text-white">Profile</div>
                                </Nav.Link>
                                <Nav.Link onClick={onLoggedOut}>
                                <div class="text-white">Logout</div>
                                </Nav.Link>
                            </>
                        )}
                     </Nav>
                    </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}