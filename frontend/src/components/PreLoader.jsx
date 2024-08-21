import React from 'react';
import { Spin } from 'antd';
import styled, { keyframes } from 'styled-components';
import yourLogo from '/src/assets/eva.png'; 
import backgroundImage from '/src/assets/bg.jpg'; 

const blink = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.2;
  }
  100% {
    opacity: 1;
  }
`;

// Styled component for the logo with blinking animation
const LogoSpinner = styled.div`
  width: 200px; /* Adjust size as needed */
  height: 200px; /* Adjust size as needed */
  background-image: url(${yourLogo});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  animation: ${blink} 1.5s linear infinite; /* Blinking animation */
`;
const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background: url(${backgroundImage}) no-repeat center center; /* Background image */
  background-size: cover; /* Ensure the background covers the entire container */
  position: relative;
  z-index: 1;
`;

const PreLoader = () => (
  <CenteredContainer>
    <Spin indicator={<LogoSpinner />} size="large" />
  </CenteredContainer>
);

export default PreLoader;
