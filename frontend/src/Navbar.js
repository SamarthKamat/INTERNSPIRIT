import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { useLocation, Link } from 'react-router-dom';

function CustomNavbar() {
  const location = useLocation();
  const isRegisterPage = location.pathname === '/register';

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand as={Link} to="/">Car Pooling Ride Sharing</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
        {/* {!isRegisterPage && ( */}
          <Nav>
            <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
            {/* <Nav.Link as={Link} to="/ride/create">Create Ride</Nav.Link> */}
            <Nav.Link as={Link} to="/rides">Find Rides</Nav.Link>
            <Nav.Link as={Link} to="/login">Log In</Nav.Link>
          </Nav>
        {/* )} */}
      </Navbar.Collapse>
    </Navbar>
  );
}

export default CustomNavbar;
