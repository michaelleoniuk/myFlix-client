import { Navbar, Container, Nav, Form, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export const NavigationBar = ({ user, onLoggedOut, searchQuery, setSearchQuery }) => {

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <Navbar bg="light" expand="md">
      <Container>
        <Navbar.Brand as={Link} to="/">
          myFlix
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!user && (
              <>
                <Nav.Link as={Link} to="/login">
                  Sign In
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  Create Account
                </Nav.Link>
              </>
            )}
            {user && (
              <>
                <Form inline>
                  <Row>
                    <Col xs="auto">
                      <Form.Control
                        type="text"
                        placeholder="Search"
                        className="ms-md-3 me-3 w-75"
                        value={searchQuery}
                        onChange={handleSearch}
                      />
                    </Col>
                  </Row>
                </Form>
                <Nav.Link as={Link} to="/" className="ms-md-3">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/profile" className="ms-md-3">
                  Profile
                </Nav.Link>         
                <Nav.Link onClick={onLoggedOut} className="ms-md-3">Logout</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};