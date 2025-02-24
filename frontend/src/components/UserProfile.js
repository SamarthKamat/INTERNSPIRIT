import React from 'react';
import styled from 'styled-components';

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column; // Or row, depending on your layout
  align-items: center;  // Center horizontally
  padding: 20px;
  width: 100%;
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