import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom"; // Import Link for navigation

const RideListContainer = styled.div`
  width: 100%;
  overflow-x: auto; // For horizontal scrolling if needed
`;

const RideListTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); // Add a subtle shadow
`;

const RideListHeader = styled.thead`
  background-color: #f0f0f0; // Light gray background for header
`;

const RideListHeaderCell = styled.th`
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd; // Add a bottom border to header cells
  font-weight: bold;
`;

const RideListRow = styled.tr`
  &:nth-child(even) {
    background-color: #f5f5f5; // Light gray background for even rows
  }

  &:hover {
    background-color: #e0e0e0; // Slightly darker background on hover
  }
`;

const RideListCell = styled.td`
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
`;

const RideDetailsLink = styled(Link)`
  color: #007bff; /* Blue link color */
  text-decoration: none; /* Remove underline */

  &:hover {
    text-decoration: underline; /* Add underline on hover */
  }
`;

function RideList({ rides }) {
  return (
    <RideListContainer>
      <RideListTable>
        <RideListHeader>
          <tr>
            <RideListHeaderCell>Origin</RideListHeaderCell>
            <RideListHeaderCell>Destination</RideListHeaderCell>
            <RideListHeaderCell>Date</RideListHeaderCell>
            <RideListHeaderCell>Time</RideListHeaderCell>
            <RideListHeaderCell>Details</RideListHeaderCell>{" "}
            {/* Added Details column */}
          </tr>
        </RideListHeader>
        <tbody>
          {rides.map((ride) => (
            <RideListRow key={ride._id}>
              {" "}
              {/* Use a unique key (e.g., ride._id) */}
              <RideListCell>{ride.startLocation}</RideListCell>
              <RideListCell>{ride.endLocation}</RideListCell>
              <RideListCell>
                {new Date(ride.startTime).toLocaleDateString()}
              </RideListCell>{" "}
              {/* Format date */}
              <RideListCell>
                {new Date(ride.startTime).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </RideListCell>{" "}
              {/* Format time */}
              <RideListCell>
                <RideDetailsLink to={`/ride/${ride._id}`}>View</RideDetailsLink>{" "}
                {/* Link to ride details */}
              </RideListCell>
            </RideListRow>
          ))}
        </tbody>
      </RideListTable>
    </RideListContainer>
  );
}

export default RideList;
