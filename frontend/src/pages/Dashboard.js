import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import UserProfile from "../components/UserProfile"; // Import UserProfile component
import RideList from "../components/RideList"; // Import RideList component
import api from "../services/api"; // Import API function
import { useAuth } from "../context/AuthContext"; // Import Auth Context (if you have one)
import AddCarForm from "../components/AddCarForm";
import CarCard from "../components/CarCard";
import CreateRideForm from "../components/CreateRideForm";

// Gradient Background Animation
const gradientAnimation = keyframes`
 0% { background-position: 0% 50%; } 
 50% { background-position: 100% 50%; } 
 100% { background-position: 0% 50%; } `;
// Main Container
const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  padding: 40px 20px;
  background: linear-gradient(
    -45deg,
    rgb(255, 0, 204),
    rgb(255, 230, 0),
    rgba(60, 0, 255, 0.69),
    rgb(9, 255, 0)
  );
  background-size: 400% 400%;
  animation: ${gradientAnimation} 10s ease infinite;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column; // Stack elements vertically
  align-items: center; // Center horizontally
  width: 90%; // Occupy most of the container width
  max-width: 1200px; // Set a maximum width
  margin-top: 20px; // Add some top margin
`;

const Section = styled.div`
  width: 100%;
  margin-bottom: 20px;
  background-color: rgba(
    255,
    255,
    255,
    0.8
  ); // Semi-transparent white background
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); // Add a subtle shadow
`;

const SectionTitle = styled.h2`
  margin-bottom: 10px;
  color: #333; // Darker heading color
`;

export default function Dashboard() {
  const { user } = useAuth();
  const [myRides, setMyRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMyRides = async () => {
      try {
        const response = await api.get("/rides/myrides");
        setMyRides(response.data);
      } catch (err) {
        setError(err.message || "Failed to fetch rides.");
        console.error("Error fetching rides:", err);

        if (err.response) {
          console.error("Error details:", err.response.data);
        }
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchMyRides();
    }
  }, [user]);

  return (
    <DashboardContainer>
      <ContentContainer>
        <Section>
          <SectionTitle>My Profile</SectionTitle>
          <UserProfile user={user} /> {/* Pass user data to UserProfile */}
        </Section>

        <Section>
          <SectionTitle>My Rides</SectionTitle>
          {loading && <p>Loading rides...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
          {!loading && !error && <RideList rides={myRides} />}
          {!loading && !error && myRides.length === 0 && <p>No rides found.</p>}
        </Section>

        

      </ContentContainer>
    </DashboardContainer>
  );
}
