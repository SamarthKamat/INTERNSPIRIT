// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

// 🎨 Background Gradient Animation
const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// 🌟 Floating Particles Animation
const moveParticles = keyframes`
  0% { transform: translateY(0px); opacity: 0.6; }
  50% { transform: translateY(-15px); opacity: 1; }
  100% { transform: translateY(0px); opacity: 0.6; }
`;

// 💎 Glowing Text Animation
const glowText = keyframes`
  0% { text-shadow: 0 0 5px #fff, 0 0 10px #00f2ff; }
  50% { text-shadow: 0 0 15px #fff, 0 0 30px #00f2ff; }
  100% { text-shadow: 0 0 5px #fff, 0 0 10px #00f2ff; }
`;

// 🌌 Animated Background
const HomeContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background: linear-gradient(-45deg,rgb(0, 255, 17),rgb(255, 0, 0),rgb(255, 0, 212),rgb(4, 0, 255));
  background-size: 300% 300%;
  animation: ${gradientAnimation} 8s infinite ease-in-out;
  position: relative;
`;

// ✨ Floating Particles
const Particle = styled.div`
  position: absolute;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  background: rgb(255, 247, 247);
  backdrop-filter: blur(3px);
  border-radius: 50%;
  top: ${({ top }) => top}%;
  left: ${({ left }) => left}%;
  animation: ${moveParticles} 4s ease-in-out infinite;
`;

// 🟡 Glassmorphic Effect Box
const ContentBox = styled.div`
  background: rgb(0, 0, 0);
  backdrop-filter: blur(10px);
  padding: 40px;
  border-radius: 15px;
  max-width: 1000px;
  text-align: center;
  box-shadow: 0 0 30px rgb(255, 0, 0);
  z-index: 2;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 50px rgb(238, 0, 255);
  }
`;

// 🚀 Glowing Heading & Text
const Heading = styled.h1`
  font-size: 36px;
  color: #fff;
  margin-bottom: 15px;
  animation: ${glowText} 2s infinite alternate;
`;

const Paragraph = styled.p`
  font-size: 18px;
  color: #ffffff;
  line-height: 1.6;
  font-weight: bold;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
`;

// 💡 Neon Button Animation
const neonGlow = keyframes`
  0% { box-shadow: 0 0 10px #00f2ff; }
  50% { box-shadow: 0 0 20px #00f2ff, 0 0 30px #00f2ff; }
  100% { box-shadow: 0 0 10px #00f2ff; }
`;

const Button = styled(Link)`
  display: inline-block;
  margin: 10px;
  padding: 12px 25px;
  color: #fff;
  background: linear-gradient(90deg, #007bff, #00f2ff);
  border: none;
  border-radius: 8px;
  text-decoration: none;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.3s ease, background 0.3s ease;
  box-shadow: 0 0 15px #00f2ff;
  animation: ${neonGlow} 2s infinite alternate;

  &:hover {
    transform: scale(1.1);
    background: linear-gradient(90deg, #00f2ff, #007bff);
  }
`;

function Home() {
  return (
    <HomeContainer>
      {/* 🌟 Floating Particles */}
      {[...Array(15)].map((_, i) => (
        <Particle
          key={i}
          size={Math.random() * 20 + 10}
          top={Math.random() * 100}
          left={Math.random() * 100}
        />
      ))}

      {/* 🌌 Content Card */}
      <ContentBox>
        <Heading>🚗 Welcome to Car Pooling Ride Sharing 🚀</Heading>
        <Paragraph>
          Reduce traffic, save money, and make new friends! Join our ride-sharing community and
          experience hassle-free travel. Whether you're a <strong>DRIVER</strong> or a <strong>PASSENGER</strong>,
          we’ve got you covered.
        </Paragraph>
        <div>
          <Button to="/login">Log In</Button>
          <Button to="/rides">Find Rides</Button>
          <Button to="/dashboard">Dashboard</Button>
          <Button to="/register">Register</Button>
        </div>
      </ContentBox>
    </HomeContainer>
  );
}

export default Home;
