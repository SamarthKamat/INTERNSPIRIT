// NavigationHelp.js

import React, { useState } from 'react';
import styled from 'styled-components';

const NavigationHelpContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000; /* Ensure the NavigationHelpContainer is above other elements */
`;

const Button = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #ff69b4; /* Reddish pink color */
  color: white;
  border: none;
  cursor: pointer;
  font-size: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.3s ease; /* Add transition for smooth zoom effect */

  &:hover {
    transform: scale(1.1); /* Zoom effect on hover */
  }
`;

const NavigationOptions = styled.div`
  position: absolute;
  bottom: 70px; /* Adjusted to provide space below the button */
  right: 0;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  padding: 10px;
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  z-index: 1000; /* Ensure the NavigationOptions is above other elements */
`;

const Option = styled.div`
  margin-bottom: 10px;
`;

function NavigationHelp() {
  const [isOpen, setIsOpen] = useState(true); // Set isOpen to true initially

  const toggleNavigation = () => {
    setIsOpen(!isOpen);
  };

  return (
    <NavigationHelpContainer>
      <Button onClick={toggleNavigation}>?</Button>
      <NavigationOptions isOpen={isOpen}>
        <Option>Home</Option>
        <Option>Sign Up</Option>
        <Option>Log In</Option>
        <Option>Find Rides</Option>
        <Option>Dashboard</Option>
        <Option>Register</Option>
      </NavigationOptions>
    </NavigationHelpContainer>
  );
}

export default NavigationHelp;
