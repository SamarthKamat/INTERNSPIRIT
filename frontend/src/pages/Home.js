import React from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { Car, DollarSign, Users, Route } from 'lucide-react';

// 🌌 Dynamic Background Animation
const moveBackground = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// ✨ Glow Effect
const glow = keyframes`
  0% { text-shadow: 0 0 10px #0ea5e9, 0 0 20px #059669; }
  50% { text-shadow: 0 0 20px #0ea5e9, 0 0 30px #059669; }
  100% { text-shadow: 0 0 10px #0ea5e9, 0 0 20px #059669; }
`;

// 🚗 Floating Animation (Mimics Road Vibes)
const floating = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

// 🚀 Hero Section Entry Animation
const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

// 🌌 Home Page Container
const HomeContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #111827, #1e293b);
  animation: ${moveBackground} 10s ease-in-out infinite;
`;

// 🚗 Navigation Bar
const Navbar = styled.nav`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
`;

const NavLogo = styled.div`
  display: flex;
  align-items: center;
  font-size: 22px;
  font-weight: bold;
  color: white;
  gap: 10px;
`;

const NavButtons = styled.div`
  display: flex;
  gap: 15px;
`;

const Button = styled(Link)`
  padding: 12px 18px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: bold;
  font-size: 14px;
  transition: all 0.3s ease-in-out;
  background: ${({ primary }) => (primary ? '#059669' : 'transparent')};
  color: ${({ primary }) => (primary ? 'white' : '#e5e7eb')};
  border: ${({ primary }) => (primary ? 'none' : '2px solid #e5e7eb')};
  
  &:hover {
    background: #047857;
    transform: scale(1.05);
  }
`;

// 🎯 Hero Section
const HeroSection = styled.div`
  text-align: center;
  padding: 80px 20px;
  animation: ${fadeInUp} 1s ease-in-out;
  position: relative;
`;

const HeroTitle = styled.h1`
  font-size: 50px;
  font-weight: bold;
  color: white;
  text-transform: uppercase;
  letter-spacing: 2px;
  animation: ${glow} 2s infinite alternate;
`;

const HeroText = styled.p`
  font-size: 20px;
  color: #cbd5e0;
  max-width: 700px;
  margin: 0 auto;
`;

// 🌟 Features Section
const FeaturesWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 50px;
  gap: 20px;
  padding: 20px;
`;

const FeatureBox = styled.div`
  text-align: center;
  flex: 1;
  padding: 25px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 255, 200, 0.2);
  transition: all 0.3s ease-in-out;
  animation: ${floating} 3s ease-in-out infinite;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 20px rgba(0, 255, 200, 0.3);
  }
`;

const FeatureTitle = styled.h3`
  font-size: 22px;
  font-weight: bold;
  margin-top: 10px;
  color: white;
`;

const FeatureText = styled.p`
  font-size: 16px;
  color: #cbd5e0;
`;

// 🔥 Find Ride Button
const ActionButton = styled.button`
  width: 250px;
  padding: 15px;
  margin-top: 30px;
  background: linear-gradient(45deg, #0ea5e9, #059669);
  color: white;
  font-weight: bold;
  font-size: 18px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  animation: ${glow} 1.5s infinite alternate;
  
  &:hover {
    transform: scale(1.1);
  }
`;

// ⚡ Footer
const Footer = styled.footer`
  background: #111827;
  color: white;
  padding: 20px;
  text-align: center;
  margin-top: 50px;
`;

function Home() {
  return (
    <HomeContainer>
      {/* 🚗 Navbar */}
      <Navbar>
        <NavLogo>
          <Car size={28} color="#0ea5e9" />
          RideShare
        </NavLogo>
        <NavButtons>
          <Button to="/login">Sign In</Button>
          <Button to="/register" primary>Sign Up</Button>
        </NavButtons>
      </Navbar>

      {/* 🎯 Hero Section */}
      <HeroSection>
        <HeroTitle>Seamless Carpooling Experience</HeroTitle>
        <HeroText>Connect with travelers on the move and reduce your travel costs while making a positive impact.</HeroText>
      </HeroSection>

      {/* ⭐ Features */}
      <FeaturesWrapper>
        <FeatureBox>
          <Route size={40} color="#0ea5e9" />
          <FeatureTitle>Smart Matching</FeatureTitle>
          <FeatureText>Find the best ride options instantly.</FeatureText>
        </FeatureBox>
        <FeatureBox>
          <DollarSign size={40} color="#0ea5e9" />
          <FeatureTitle>Fair Pricing</FeatureTitle>
          <FeatureText>Automatic cost-sharing ensures transparency.</FeatureText>
        </FeatureBox>
        <FeatureBox>
          <Users size={40} color="#0ea5e9" />
          <FeatureTitle>Community Driven</FeatureTitle>
          <FeatureText>Join eco-conscious commuters today.</FeatureText>
        </FeatureBox>
      </FeaturesWrapper>

      {/* ⚡ Footer */}
      <Footer>© 2025 RideShare. All rights reserved.</Footer>
    </HomeContainer>
  );
}

export default Home;