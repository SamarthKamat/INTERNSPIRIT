
// RideSearch.js
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import Navbar from "../components/Navbar"; // Correct path
import {
  GoogleMap,
  LoadScript,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";
import sedanImage from "../assets/sedan.jpg"; // Correct paths
import swiftImage from "../assets/swift.jpg";
import api from "../services/api"; // Import api service

const googleMapsApiKey = "AIzaSyCOcIVYH1tYXH0L0ryQVcldisMyRNWrDYA";

const PageContainer = styled.div`
  background: linear-gradient(135deg, #1e3c72, #2a5298);
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
`;

const ContentContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const SearchBox = styled.div`
  background-color: rgba(255, 255, 255, 0.9);
  padding: 20px;
  border-radius: 10px;
  max-width: 500px;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  border: none;
`;

const carAnimation = keyframes`
  0% { transform: translateX(0); }
  50% { transform: translateX(10px); }
  100% { transform: translateX(0); }
`;

const SearchButton = styled.button`
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  background: #ff6f61;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;
  transition: background 0.3s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #e65c50;
  }
`;

const CarIcon = styled.span`
  margin-left: 10px;
  display: inline-block;
  animation: ${carAnimation} 1s infinite;
`;

const MapContainer = styled.div`
  width: 100%;
  height: 300px;
  margin-top: 20px;
  border-radius: 10px;
  overflow: hidden;
`;

const RideContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
  margin-top: 20px;
`;

const RideCard = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  color: black;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

const CarImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 10px;
  margin-bottom: 10px;
`;


const RideSearch = () => {
  const history = useHistory();
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 19.076, lng: 72.877 });
  const [directions, setDirections] = useState(null);
  const [error, setError] = useState(null); // State for errors

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setMapCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => alert("Location access denied!")
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  }, []);

  const handleSearch = async () => {
    if (!origin || !destination) {
      alert("Please enter start and drop points.");
      return;
    }

    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin,
        destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      async (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirections(result);
          setError(null); // Clear any previous errors

          try {
            const response = await api.get("ride-search/search", {
              params: {
                startLocation: origin,
                endLocation: destination,
              },
            });
            console.log(response.data)
            setSearchResults(response.data);
          } catch (error) {
            console.error("Error searching rides:", error);
            setError("Error searching rides. Please try again later."); // Set the error message
            setSearchResults([]); // Clear any previous search results
          }
        } else {
          alert("Unable to find route!");
          setError("Unable to find route!"); // Set the error message
          setSearchResults([]); // Clear any previous search results
        }
      }
    );
  };

  return (
    <PageContainer>
      <ContentContainer>
        <SearchBox>
          <Input
            type="text"
            placeholder="Start Point"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Drop Point"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
          <SearchButton onClick={handleSearch}>
            Search Ride <CarIcon>🚗</CarIcon>
          </SearchButton>
        </SearchBox>

        <MapContainer>
          <LoadScript googleMapsApiKey={googleMapsApiKey}>
            <GoogleMap
              center={mapCenter}
              zoom={13}
              mapContainerStyle={{ width: "100%", height: "100%" }}
            >
              <Marker position={mapCenter} />
              {directions && <DirectionsRenderer directions={directions} />}
            </GoogleMap>
          </LoadScript>
        </MapContainer>

        {error && <p style={{ color: "red" }}>{error}</p>} {/* Display error message */}

        <RideContainer>
          {searchResults.length > 0 ? (
            searchResults.map((ride) => (
              <RideCard key={ride._id}>
                <CarImage
                  src={ride.car?.make === "Sedan" ? sedanImage : swiftImage}
                  alt="Car"
                />
                <h3>{ride.car?.make}</h3>
                <p>{ride.car?.model}</p>
                <p>
                  Driver: {ride.driver?.name}
                </p>
                {/* <p>Seats Available: {ride.seatsAvailable}</p> */}
                <p>Contact: {ride.driver?.phone}</p> {/* Access phone number */}
                <p>
                  <strong>Cost per Passenger:</strong> ₹{ride.price}
                </p>
              </RideCard>
            ))
          ) : (
            <p>No rides found.</p>
          )}
        </RideContainer>
      </ContentContainer>
    </PageContainer>
  );
};

export default RideSearch;