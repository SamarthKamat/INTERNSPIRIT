import React from 'react';
import styled from 'styled-components';

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column; // Or row, depending on your layout
  align-items: center;  // Center horizontally
  padding: 20px;
  width: 100%;
`;

const Avatar = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%; // Make it circular
  object-fit: cover; // Prevent image distortion
  margin-bottom: 10px;
  border: 3px solid #fff; // Add a white border
  box-shadow: 0 4px 8px rgba(0,0,0,0.1); // Add a subtle shadow
`;

const UserInfo = styled.div`
  text-align: center; // Center text
  color: #333; // Darker text color
`;

const Name = styled.h3`
  margin-bottom: 5px;
  color: #007bff; // Blue name color
`;

const Email = styled.p`
  color: #6c757d; // Gray email color
  margin-bottom: 10px;
`;

const Phone = styled.p`
    color: #6c757d;
`;

function UserProfile({ user }) {
  if (!user) {
    return <p>Loading profile...</p>; // Or a spinner
  }

  return (
    <ProfileContainer>
      <Avatar src={user.profilePicture || "https://via.placeholder.com/150"} alt={user.name} /> {/* Use a placeholder image */}
      <UserInfo>
        <Name>{user.name}</Name>
        <Email>{user.email}</Email>
        {user.phone && <Phone>Phone: {user.phone}</Phone>} {/* Conditionally render phone */}
        {/* Add other user information here */}
      </UserInfo>
    </ProfileContainer>
  );
}

export default UserProfile;