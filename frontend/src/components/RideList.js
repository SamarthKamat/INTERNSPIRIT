import React from 'react';

function RideList({ rides }) {
  return (
    <div>
      <h2>Available Rides</h2>
      <ul>
        {rides.map(ride => (
          <li key={ride.id}>
            {ride.origin} to {ride.destination} on {ride.date} at {ride.time}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RideList;
