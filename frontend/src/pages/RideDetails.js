import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import { FaCar, FaUser, FaPhone, FaStar, FaKey } from 'react-icons/fa';

// Styled Components
const RideDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  min-height: 100vh;
  background: linear-gradient(135deg, #f3f4f6, #dfe9f3);
`;

const RideCard = styled.div`
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
  max-width: 400px;
  width: 100%;
  animation: fadeIn 0.5s ease-in-out;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const CarImage = styled.img`
  width: 120px;
  height: 80px;
  border-radius: 10px;
  margin-bottom: 15px;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;

const RideInfo = styled.p`
  font-size: 16px;
  color: #333;
  margin: 10px 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ContactButton = styled.a`
  background: #007bff;
  color: white;
  padding: 10px 15px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: bold;
  display: inline-block;
  margin-top: 15px;
  transition: background 0.3s ease-in-out;

  &:hover {
    background: #0056b3;
  }
`;

function RideDetails() {
  const location = useLocation();
  const ride = location.state.ride;

  return (
    <RideDetailsContainer>
      <Navbar />
      <RideCard>
        <CarImage 
          src={ride.car === 'Sedan' ? '/path/to/sedan.jpg' : '/path/to/swift.jpg'} 
          alt="Car" 
        />
        <h2>Ride Details</h2>

        <RideInfo><FaCar /> <strong>Car:</strong> {ride.car}</RideInfo>
        <RideInfo><FaKey /> <strong>Car Number:</strong> {ride.carNumber}</RideInfo>
        <RideInfo><FaUser /> <strong>Driver:</strong> {ride.driverName}</RideInfo>
        <RideInfo><FaStar style={{ color: '#f1c40f' }} /> <strong>Rating:</strong> {ride.driverRating} ⭐</RideInfo>
        <RideInfo><FaCar /> <strong>Seats Available:</strong> {ride.seatsAvailable}</RideInfo>
        <RideInfo><FaKey /> <strong>Share Code:</strong> {ride.shareCode}</RideInfo>

        <ContactButton href={`tel:${ride.driverContact}`}>
          <FaPhone /> Call Driver
        </ContactButton>
      </RideCard>
    </RideDetailsContainer>
  );
}

export default RideDetails;
