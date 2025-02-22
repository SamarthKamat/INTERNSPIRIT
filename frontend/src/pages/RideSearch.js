import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import Navbar from '../components/Navbar';
import { GoogleMap, LoadScript, Marker, DirectionsRenderer } from '@react-google-maps/api';
import sedanImage from '../assets/sedan.jpg';
import swiftImage from '../assets/swift.jpg';

const googleMapsApiKey = "YOUR_GOOGLE_MAPS_API_KEY";

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
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 19.076, lng: 72.877 });
  const [directions, setDirections] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setMapCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      () => alert('Location access denied!')
    );
  }, []);

  const handleSearch = () => {
    if (!origin || !destination) {
      alert('Please enter start and drop points.');
      return;
    }

    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin,
        destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirections(result);
        } else {
          alert('Unable to find route!');
        }
      }
    );

    const rides = [
      {
        id: 1,
        car: 'Sedan',
        carNumber: 'MH 12 AB 1234',
        driverName: 'Muhammad Ali',
        seatsAvailable: 3,
        driverContact: '+91 9876543210',
        driverRating: '⭐⭐⭐⭐⭐',
        shareCode: 'XYZ123',
      },
      {
        id: 2,
        car: 'Swift',
        carNumber: 'MH 14 CD 5678',
        driverName: 'Mike Dawson',
        seatsAvailable: 2,
        driverContact: '+91 9876543211',
        driverRating: '⭐⭐⭐⭐',
        shareCode: 'ABC456',
      },
    ];

    // Calculate cost for each ride
    const updatedRides = rides.map((ride) => {
      const totalCost = Math.floor(Math.random() * (500 - 100 + 1)) + 100;
      const costPerPassenger = Math.floor(totalCost / ride.seatsAvailable);
      return { ...ride, totalCost, costPerPassenger };
    });

    setSearchResults(updatedRides);
  };

  return (
    <PageContainer>
      <Navbar />
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
            <GoogleMap center={mapCenter} zoom={13} mapContainerStyle={{ width: '100%', height: '100%' }}>
              <Marker position={mapCenter} />
              {directions && <DirectionsRenderer directions={directions} />}
            </GoogleMap>
          </LoadScript>
        </MapContainer>

        <RideContainer>
          {searchResults.map((ride) => (
            <RideCard key={ride.id}>
              <CarImage src={ride.car === 'Sedan' ? sedanImage : swiftImage} alt="Car" />
              <h3>{ride.car}</h3>
              <p>{ride.carNumber}</p>
              <p>Driver: {ride.driverName}</p>
              <p>Seats Available: {ride.seatsAvailable}</p>
              <p>Contact: {ride.driverContact}</p>
              <p>Rating: {ride.driverRating}</p>
              <p>Share Code: {ride.shareCode}</p>
              <p><strong>Total Cost:</strong> ₹{ride.totalCost}</p>
              <p><strong>Cost per Passenger:</strong> ₹{ride.costPerPassenger}</p>
            </RideCard>
          ))}
        </RideContainer>
      </ContentContainer>
    </PageContainer>
  );
};

export default RideSearch;
