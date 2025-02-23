// import React, { useState, useEffect, useRef } from 'react';
// import { useAuth } from '../context/AuthContext';
// import api from '../services/api';
// import styled from 'styled-components';
// import {
//   GoogleMap,
//   DirectionsRenderer,
//   Marker,
//   LoadScript,
// } from '@react-google-maps/api';

// // Styled Components (Customize as needed)
// const FormContainer = styled.form`
//   display: flex;
//   flex-direction: column;
//   width: 400px;
//   padding: 20px;
//   border: 1px solid #ccc;
//   border-radius: 8px;
//   background-color: #f8f8f8;
// `;

// const Label = styled.label`
//   margin-bottom: 5px;
//   font-weight: bold;
// `;

// const Input = styled.input`
//   padding: 10px;
//   margin-bottom: 10px;
//   border: 1px solid #ccc;
//   border-radius: 4px;
// `;

// const Button = styled.button`
//   background-color: #007bff;
//   color: white;
//   padding: 10px 15px;
//   border: none;
//   border-radius: 4px;
//   cursor: pointer;

//   &:hover {
//     background-color: #0056b3;
//   }
// `;

// const ErrorMessage = styled.p`
//   color: red;
//   margin-bottom: 10px;
// `;

// const SuccessMessage = styled.p`
//   color: green;
//   margin-bottom: 10px;
// `;

// const MapContainer = styled.div`
//   width: 100%;
//   height: 400px;
//   margin-bottom: 20px;
// `;

// const CreateRide = () => {
//   const { user } = useAuth();
//   const [map, setMap] = useState(null);
//   const [directions, setDirections] = useState(null);
//   const [cars, setCars] = useState([]);
//   const [loadingCars, setLoadingCars] = useState(true);
//   const [error, setError] = useState(null);
//   const [successMessage, setSuccessMessage] = useState(null);
//   const [rideData, setRideData] = useState({
//     startLocation: '',
//     endLocation: '',
//     startTime: '',
//     price: '',
//     carId: '',
//   });

//   const originRef = useRef();
//   const destinationRef = useRef();
//   const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

//   useEffect(() => {
//     const fetchCars = async () => {
//       try {
//         const response = await api.get('cars/mycars');
//         setCars(response.data);
//       } catch (err) {
//         console.error('Error fetching cars:', err);
//         setError('Failed to load cars.'); // Set an error message
//       } finally {
//         setLoadingCars(false);
//       }
//     };

//     if (user) {
//       fetchCars();
//     }
//   }, [user]);

//   const calculateRoute = () => {
//     if (originRef.current.value === '' || destinationRef.current.value === '') {
//       return;
//     }

//     const directionsService = new window.google.maps.DirectionsService();

//     directionsService.route(
//       {
//         origin: originRef.current.value,
//         destination: destinationRef.current.value,
//         travelMode: window.google.maps.TravelMode.DRIVING,
//       },
//       (result, status) => {
//         if (status === window.google.maps.DirectionsStatus.OK) {
//           setDirections(result);
//           setRideData({
//             ...rideData,
//             startLocation: result.routes[0].legs[0].start_location.toJSON(),
//             endLocation: result.routes[0].legs[0].end_location.toJSON(),
//           });
//         } else {
//           console.error(`Error fetching directions: ${status}`);
//           setError('Could not calculate route.'); // Set an error message
//         }
//       }
//     );
//   };

//   const handleChange = (e) => {
//     setRideData({ ...rideData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null); // Clear any previous errors
//     setSuccessMessage(null);

//     try {
//       const rideDataToSend = {
//         ...rideData,
//         startLocation: typeof rideData.startLocation === 'object' ? JSON.stringify(rideData.startLocation) : rideData.startLocation,
//         endLocation: typeof rideData.endLocation === 'object' ? JSON.stringify(rideData.endLocation) : rideData.endLocation,
//       };

//       const response = await api.post('rides/create', rideDataToSend);
//       setSuccessMessage('Ride created successfully!');
//       // Reset form data after successful submission:
//       setRideData({
//         startLocation: '',
//         endLocation: '',
//         startTime: '',
//         price: '',
//         carId: '',
//       });
//       setDirections(null);
//       originRef.current.value = '';
//       destinationRef.current.value = '';
//     } catch (err) {
//       setError(err.response?.data?.message || 'Error creating ride.'); // Improved error handling
//       console.error('Error creating ride:', err);
//     }
//   };

//   return (
//     <div>
//       <LoadScript googleMapsApiKey={googleMapsApiKey}>
//         <MapContainer>
//           <GoogleMap
//             mapContainerStyle={{ width: '100%', height: '100%' }}
//             center={rideData.startLocation ? {lat: rideData.startLocation.lat, lng: rideData.startLocation.lng} : { lat: 37.7749, lng: -122.4194 }}
//             zoom={10}
//             onLoad={setMap}
//             onUnmount={setMap}
//           >
//             {directions && <DirectionsRenderer directions={directions} />}
//             {rideData.startLocation && <Marker position={rideData.startLocation} />} {/* Conditionally render Marker */}

//           </GoogleMap>
//         </MapContainer>
//       </LoadScript>

//       <FormContainer onSubmit={handleSubmit}>
//         {error && <ErrorMessage>{error}</ErrorMessage>} {/* Display error message */}
//         {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>} {/* Display success message */}

//         <Label htmlFor="startLocation">Start Location:</Label>
//         <Input
//           type="text"
//           id="startLocation"
//           name="startLocation"
//           ref={originRef}
//           value={rideData.startLocation}
//           onChange={handleChange}
//           required
//         />

//         <Label htmlFor="endLocation">End Location:</Label>
//         <Input
//           type="text"
//           id="endLocation"
//           name="endLocation"
//           ref={destinationRef}
//           value={rideData.endLocation}
//           onChange={handleChange}
//           required
//         />

//         <Button type="button" onClick={calculateRoute}>
//           Calculate Route
//         </Button>

//         <Label htmlFor="startTime">Start Time:</Label>
//         <Input
//           type="datetime-local"
//           id="startTime"
//           name="startTime"
//           value={rideData.startTime}
//           onChange={handleChange}
//           required
//         />

//         <Label htmlFor="price">Price:</Label>
//         <Input
//           type="number"
//           id="price"
//           name="price"
//           value={rideData.price}
//           onChange={handleChange}
//           required
//         />

//         <Label htmlFor="carId">Car:</Label>
//         {loadingCars ? (
//           <p>Loading cars...</p>
//         ) : (
//           <select
//             id="carId"
//             name="carId"
//             value={rideData.carId}
//             onChange={handleChange}
//             required
//           >
//             <option value="">Select a car</option>
//             {cars.map((car) => (
//               <option key={car._id} value={car._id}>
//                 {car.make} {car.model} ({car.year})
//               </option>
//             ))}
//           </select>
//         )}

//         <Button type="submit">Create Ride</Button>
//       </FormContainer>
//     </div>
//   );
// };

// export default CreateRide;