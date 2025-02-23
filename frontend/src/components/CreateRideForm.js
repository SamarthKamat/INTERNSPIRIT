import React, { useState, useEffect } from 'react';
import api from '../services/api';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext'; // Import useAuth

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 400px; // Adjust as needed
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f8f8f8;
`;

const Label = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  margin-bottom: 10px;
`;

const SuccessMessage = styled.p`
  color: green;
  margin-bottom: 10px;
`;

const CreateRideForm = () => {
  const { user } = useAuth(); // Access the user object
  const [rideData, setRideData] = useState({
    startLocation: '',
    endLocation: '',
    startTime: '',
    price: '',
    carId: '', // Add carId field
  });
  const [cars, setCars] = useState([]); // Store user's cars
  const [loadingCars, setLoadingCars] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await api.get('/cars/mycars'); // Fetch user's cars
        setCars(response.data);
      } catch (err) {
        console.error("Error fetching cars:", err);
      } finally {
        setLoadingCars(false);
      }
    };

    if (user) { // Only fetch cars if the user is logged in
      fetchCars();
    }
  }, [user]);

  const handleChange = (e) => {
    setRideData({ ...rideData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await api.post('/rides/create', rideData); // Updated endpoint
      setSuccessMessage('Ride created successfully!');
      setRideData({ // Clear the form (including carId)
        startLocation: '',
        endLocation: '',
        startTime: '',
        price: '',
        carId: '',
      });
    } catch (err) {
      setError(err.response?.data.message || 'Error creating ride.');
      console.error("Error creating ride:", err);
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}

      <Label htmlFor="startLocation">Start Location:</Label>
      <Input type="text" id="startLocation" name="startLocation" value={rideData.startLocation} onChange={handleChange} required />

      <Label htmlFor="endLocation">End Location:</Label>
      <Input type="text" id="endLocation" name="endLocation" value={rideData.endLocation} onChange={handleChange} required />

      <Label htmlFor="startTime">Start Time:</Label>
      <Input type="datetime-local" id="startTime" name="startTime" value={rideData.startTime} onChange={handleChange} required />

      <Label htmlFor="price">Price:</Label>
      <Input type="number" id="price" name="price" value={rideData.price} onChange={handleChange} required />

      <Label htmlFor="carId">Car:</Label>
      {loadingCars ? (
        <p>Loading cars...</p>
      ) : (
        <select id="carId" name="carId" value={rideData.carId} onChange={handleChange} required>
          <option value="">Select a car</option>
          {cars.map((car) => (
            <option key={car._id} value={car._id}>
              {car.make} {car.model} ({car.year})
            </option>
          ))}
        </select>
      )}

      <Button type="submit">Create Ride</Button>
    </FormContainer>
  );
};

export default CreateRideForm;