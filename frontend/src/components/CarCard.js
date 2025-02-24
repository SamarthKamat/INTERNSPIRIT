import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
  background-color: #fff;
`;

const CarTitle = styled.h3`
  margin-bottom: 10px;
  color: #333;
`;

const CarDetail = styled.p`
  margin-bottom: 5px;
`;

const CarCard = ({ car }) => {
  return (
    <Card>
      <CarTitle>{car.make} {car.model}</CarTitle>
      <CarDetail>Year: {car.year}</CarDetail>
      <CarDetail>License Plate: {car.licensePlate}</CarDetail> {/* Add license plate */}
      {/* ... other car details */}
    </Card>
  );
};

export default CarCard;