import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

function CustomNavbar() {
  const location = useLocation();
  const isRegisterPage = location.pathname === '/register';

  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="/">Car Pooling Ride Sharing</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        {!isRegisterPage && (
          <Nav className="mr-auto">
            <Nav.Link href="/dashboard">Dashboard</Nav.Link>
            <Nav.Link href="/rides">Find Rides</Nav.Link>
            
            <Nav.Link href="/login">Log In</Nav.Link>
          </Nav>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
}

export default CustomNavbar;
