import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Use useParams to get the ride ID
import styled from "styled-components";
import Navbar from "../components/Navbar"; // Make sure the path is correct
import {
  FaCar,
  FaUser,
  FaKey,
  FaStar,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa"; // Import more icons
import api from "../services/api"; // Import your api instance

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
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
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

const RideDetails = () => {
  const { id } = useParams(); // Get the ride ID from the URL
  const [ride, setRide] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRideDetails = async () => {
      try {
        const response = await api.get(`/rides/ride-details/${id}`); // Fetch ride details using the ID
        setRide(response.data);
      } catch (err) {
        setError(err.response?.data.message || "Error fetching ride details.");
        console.error("Error fetching ride details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRideDetails();
  }, [id]); // Add id as a dependency

  if (loading) {
    return <div>Loading ride details...</div>;
  }

  if (error) {
    return <div style={{ color: "red" }}>{error}</div>;
  }

  if (!ride) {
    return <div>Ride not found.</div>;
  }

  const handleContactDriver = () => {
    // Implement contact logic (e.g., open a modal, redirect to a messaging app, etc.)
    if (ride.driver && ride.driver.phone) {
      window.location.href = `tel:${ride.driver.phone}`;
    } else {
      alert("Driver's phone number is not available.");
    }
  };

  return (
    <div>
      <RideDetailsContainer>
        <RideCard>
          {/* {ride.car && ride.car.image && <CarImage src={ride.car.image} alt="Car" />}  */}
          <RideInfo>
            <FaMapMarkerAlt /> {ride.startLocation} to {ride.endLocation}
          </RideInfo>
          <RideInfo>
            <FaClock /> {new Date(ride.startTime).toLocaleDateString()} at{" "}
            {new Date(ride.startTime).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </RideInfo>
          <RideInfo>
            <FaUser /> Driver:{" "}
            {ride.driver
              ? `${ride.driver.firstName} ${ride.driver.lastName}`
              : "N/A"}
          </RideInfo>
          <RideInfo>
            <FaCar /> Car:{" "}
            {ride.car
              ? `${ride.car.make} ${ride.car.model} (${ride.car.year})`
              : "N/A"}
          </RideInfo>
          <RideInfo>
            <FaStar /> Rating:{" "}
            {ride.driver && ride.driver.rating ? ride.driver.rating : "N/A"}
          </RideInfo>
          <RideInfo>
            <FaKey /> License Plate: {ride.car ? ride.car.licensePlate : "N/A"}
          </RideInfo>
          <RideInfo>Price: ${ride.price}</RideInfo>
          <ContactButton onClick={handleContactDriver}>
            Contact Driver
          </ContactButton>
        </RideCard>
      </RideDetailsContainer>
    </div>
  );
};

export default RideDetails;

// function RideDetails() {
//   const location = useLocation();
//   const ride = location.state.ride;

//   return (
//     <RideDetailsContainer>
//       <Navbar />
//       <RideCard>
//         <CarImage
//           src={ride.car === 'Sedan' ? '/path/to/sedan.jpg' : '/path/to/swift.jpg'}
//           alt="Car"
//         />
//         <h2>Ride Details</h2>

//         <RideInfo><FaCar /> <strong>Car:</strong> {ride.car}</RideInfo>
//         <RideInfo><FaKey /> <strong>Car Number:</strong> {ride.carNumber}</RideInfo>
//         <RideInfo><FaUser /> <strong>Driver:</strong> {ride.driverName}</RideInfo>
//         <RideInfo><FaStar style={{ color: '#f1c40f' }} /> <strong>Rating:</strong> {ride.driverRating} ⭐</RideInfo>
//         <RideInfo><FaCar /> <strong>Seats Available:</strong> {ride.seatsAvailable}</RideInfo>
//         <RideInfo><FaKey /> <strong>Share Code:</strong> {ride.shareCode}</RideInfo>

//         <ContactButton href={`tel:${ride.driverContact}`}>
//           <FaPhone /> Call Driver
//         </ContactButton>
//       </RideCard>
//     </RideDetailsContainer>
//   );
// }

// export default RideDetails;
