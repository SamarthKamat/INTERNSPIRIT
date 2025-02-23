import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import api from '../services/api';
import { useHistory } from 'react-router-dom';
import backgroundImage from '../assets/register.jpg';
import { useAuth } from '../context/AuthContext'; 


// Background Gradient Animation
const backgroundAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Car Animation
const drive = keyframes`
  0% { transform: translateX(-100px) scale(1); }
  50% { transform: translateX(100px) scale(1.1); }
  100% { transform: translateX(-100px) scale(1); }
`;

// Glowing Effect
const glow = keyframes`
  0%, 100% { text-shadow: 0 0 10px #ffd700, 0 0 20px #ff9100; }
  50% { text-shadow: 0 0 20px #ff5700, 0 0 30px #ffd700; }
`;

// Fullscreen Animated Background
const FullPageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  background: linear-gradient(270deg,rgb(72, 255, 0),rgb(0, 4, 255),rgb(255, 0, 0));
  background-size: 400% 400%;
  animation: ${backgroundAnimation} 6s infinite alternate ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

// Floating Car
const AnimatedCar = styled.div`
  position: absolute;
  bottom: 20px;
  width: 100px;
  height: 50px;
  background: #ffd700;
  border-radius: 10px;
  animation: ${drive} 5s infinite ease-in-out;
  box-shadow: 0px 0px 20px #ff9100;

  &::before {
    content: '';
    position: absolute;
    width: 35px;
    height: 35px;
    background: black;
    border-radius: 50%;
    bottom: -10px;
    left: 10px;
    box-shadow: 50px 0 black;
  }
`;

// Glowing Form Container
const RegisterContainer = styled.div`
  padding: 40px;
  border-radius: 15px;
  max-width: 450px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: rgba(0, 0, 0, 0.4);
  box-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
  backdrop-filter: blur(12px);
  border: 2px solid rgba(255, 215, 0, 0.5);
  z-index: 2;
`;

// Styled Input
const StyledInput = styled.input`
  margin-bottom: 20px;
  width: 100%;
  padding: 14px;
  font-size: 16px;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: #ffd700;
  border-radius: 8px;
  transition: all 0.3s ease-in-out;
  font-weight: bold;

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }

  &:focus {
    outline: none;
    border: 2px solid #ffd700;
    box-shadow: 0 0 10px rgba(255, 215, 0, 0.8);
  }
`;

// Styled Button
const StyledButton = styled.button`
  margin-top: 20px;
  width: 100%;
  padding: 14px;
  font-size: 18px;
  font-weight: bold;
  background: linear-gradient(135deg, #ffd700, #ffb400);
  border: none;
  color: #000;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 15px rgba(255, 215, 0, 0.8);
  }
`;

// Heading
const StyledHeading = styled.h2`
  color: #ffd700;
  font-size: 28px;
  margin-bottom: 25px;
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 1.5px;
  animation: ${glow} 2s infinite alternate ease-in-out;
`;

export function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState(''); // New state for phone number
  const history = useHistory();
  const { login } = useAuth(); // Get the login function

  useEffect(() => {
    setName('');
    setEmail('');
    setPassword('');
    setPhone(''); // Clear phone number on mount
  }, []);

  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const isValidPhone = (phone) => {
    // Basic phone number validation (you might need a more robust regex)
    const regex = /^[0-9]{10}$/; // Assumes 10-digit number
    return regex.test(phone);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      alert('Invalid email format!');
      return;
    }

    if (!isValidPhone(phone)) {
      alert('Invalid phone number format!');
      return;
    }


    try {
      const response = await api.post('/auth/register', { name, email, password, phone });
      const userData = response.data.user; // Get the user object
      const token = response.data.token;

      userData.token = token; // Add the token to the user object

      login(userData); // Use the login function from the context
      alert('Registration successful');
      history.push('/login');
    } catch (err) {
      console.error('Registration failed', err);
      alert('Registration failed: ' + err.response.data.message); // Display error message from the server
    }
  };

  return (
    <FullPageContainer>
      {/* Floating Car Animation */}
      <AnimatedCar />

      {/* Register Form */}
      <RegisterContainer>
        <StyledHeading>Sign Up</StyledHeading>
        <form onSubmit={handleSubmit}>
          <StyledInput type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
          <StyledInput type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
          <StyledInput type="password" placeholder="Create Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <StyledButton type="submit">Register</StyledButton>
        </form>
      </RegisterContainer>
    </FullPageContainer>
  );
}


