// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NavbarContainer = styled.nav`
  background-color: #333;
  padding: 10px;
  display: flex;
  justify-content: center; /* Center the buttons */
`;

const NavButton = styled(Link)`
  color: #fff;
  text-decoration: none;
  padding: 10px 20px;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin: 0 10px; /* Add margin between buttons */

  &:hover {
    background-color: #0056b3;
  }
`;

function Navbar() {
  return (
    <NavbarContainer>
      <NavButton to="/">Home</NavButton>
      
      <NavButton to="/login">Log In</NavButton>
      <NavButton to="/register">Register</NavButton>
      <NavButton to="/rides">Find Rides</NavButton>
      <NavButton to="/dashboard">Dashboard</NavButton>
    </NavbarContainer>
  );
}

export default Navbar;
