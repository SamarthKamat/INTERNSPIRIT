// components/AddCarForm.js
import React, { useState } from 'react';
import api from '../services/api';
import styled from 'styled-components';

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 400px;
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

const AddCarForm = () => {
  const [carData, setCarData] = useState({
    make: '',
    model: '',
    year: '',
    licensePlate: '', // Add licensePlate
  });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleChange = (e) => {
    setCarData({ ...carData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await api.post('cars/add', carData); // Correct Endpoint
      setSuccessMessage('Car added successfully!');
      setCarData({
        make: '',
        model: '',
        year: '',
        licensePlate: '',
      });
    } catch (err) {
      setError(err.response?.data.message || 'Error adding car.');
      console.error("Error adding car:", err);
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}

      <Label htmlFor="make">Make:</Label>
      <Input type="text" id="make" name="make" value={carData.make} onChange={handleChange} required />

      <Label htmlFor="model">Model:</Label>
      <Input type="text" id="model" name="model" value={carData.model} onChange={handleChange} required />

      <Label htmlFor="year">Year:</Label>
      <Input type="number" id="year" name="year" value={carData.year} onChange={handleChange} required />

      <Label htmlFor="licensePlate">License Plate:</Label>
      <Input type="text" id="licensePlate" name="licensePlate" value={carData.licensePlate} onChange={handleChange} required />

      <Button type="submit">Add Car</Button>
    </FormContainer>
  );
};

export default AddCarForm;