// src/Footer.js
import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: black;
  color: white;
  text-align: center;
  padding: 0px 0;
  position: fixed;
  bottom: 0;
  width: 100%;
`;

function Footer() {
  return (
    <FooterContainer>
      <p>&copy; 2025 Car Pooling Ride Sharing. All rights reserved.</p>
    </FooterContainer>
  );
}

export default Footer;
