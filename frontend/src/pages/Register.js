// src/pages/Register.js
import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import api from '../services/api';
import { useHistory } from 'react-router-dom';
import backgroundImage from '../assets/register.jpg';

// Keyframe Animation for Floating Particles
const float = keyframes`
  0% { transform: translateY(0px); opacity: 0.6; }
  50% { transform: translateY(-20px); opacity: 1; }
  100% { transform: translateY(0px); opacity: 0.6; }
`;

// Fullscreen Background with Animated Overlay
const FullPageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  background: url(${backgroundImage}) no-repeat center center/cover;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  
  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(0, 0, 0, 0.7), rgba(255, 215, 0, 0.3));
    z-index: 1;
  }
`;

// Floating Particles for a Futuristic Look
const FloatingParticle = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  background: rgba(255, 215, 0, 0.5);
  border-radius: 50%;
  opacity: 0.6;
  animation: ${float} 4s infinite ease-in-out;
  z-index: 0;
  
  ${({ top, left, duration }) => `
    top: ${top};
    left: ${left};
    animation-duration: ${duration}s;
  `}
`;

const NavbarContainer = styled.nav`
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 20px;
  z-index: 2;
`;

const NavbarButton = styled.button`
  background: transparent;
  border: 2px solid #ffd700;
  color: #ffd700;
  padding: 12px 24px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.3s ease-in-out;
  font-weight: bold;

  &:hover {
    background: rgba(255, 215, 0, 0.2);
    transform: scale(1.1);
  }
`;

const RegisterContainer = styled.div`
  padding: 40px;
  border-radius: 15px;
  max-width: 450px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  z-index: 2;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const StyledInput = styled.input`
  margin-bottom: 20px;
  width: 100%;
  padding: 14px;
  font-size: 16px;
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: #fff;
  border-radius: 8px;
  transition: all 0.3s ease-in-out;
  font-weight: bold;

  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }

  &:focus {
    outline: none;
    border-color: #ffd700;
    box-shadow: 0 0 15px rgba(255, 215, 0, 0.5);
  }
`;

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
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(255, 215, 0, 0.5);
  }
`;

const StyledHeading = styled.h2`
  color: #fff;
  font-size: 28px;
  margin-bottom: 25px;
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 1.5px;
`;

export function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  useEffect(() => {
    setName('');
    setEmail('');
    setPassword('');
  }, []);

  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      alert('Invalid email format!');
      return;
    }

    try {
      await api.post('/auth/register', { name, email, password });
      alert('Registration successful');
      setName('');
      setEmail('');
      setPassword('');
      history.push('/login');
    } catch (err) {
      console.error('Registration failed', err);
      alert('Registration failed');
    }
  };

  const goToHome = () => history.push('/');
  const goToDashboard = () => history.push('/dashboard');

  return (
    <FullPageContainer>
      <NavbarContainer>
        <NavbarButton onClick={goToHome}>Home</NavbarButton>
        <NavbarButton onClick={goToDashboard}>Dashboard</NavbarButton>
      </NavbarContainer>

      {/* Floating Particles */}
      {[...Array(10)].map((_, i) => (
        <FloatingParticle
          key={i}
          top={`${Math.random() * 100}%`}
          left={`${Math.random() * 100}%`}
          duration={Math.random() * 3 + 3}
        />
      ))}

      <RegisterContainer>
        <StyledForm onSubmit={handleSubmit}>
          <StyledHeading>Sign Up</StyledHeading>
          <StyledInput
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <StyledInput
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <StyledInput
            type="password"
            placeholder="Create Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <StyledButton type="submit">Register</StyledButton>
        </StyledForm>
      </RegisterContainer>
    </FullPageContainer>
  );
}
