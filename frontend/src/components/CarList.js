import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import api from '../services/api';
import CarCard from './CarCard';

const CarListContainer = styled.div`
  // Add styling for the container if needed
`;

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await api.get('/cars/mycars');
        setCars(response.data);
      } catch (err) {
        setError(err.message || 'Failed to fetch cars.');
        console.error('Error fetching cars:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  if (loading) {
    return <p>Loading cars...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  if (cars.length === 0) {
    return <p>No cars found.</p>;
  }

  return (
    <CarListContainer>
      {cars.map((car) => (
        <CarCard key={car._id} car={car} />
      ))}
    </CarListContainer>
  );
};

export default CarList;