import React from 'react';
import styled, { keyframes } from 'styled-components';
import logoImage from '../assets/evas.jpg';
import bgImage from '../assets/bg.jpg';

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-30px);
  }
  60% {
    transform: translateY(-15px);
  }
`;
const PreloaderWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  z-index: 9999;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(${bgImage});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    filter: blur(15px);
    z-index: -1;
  }
`;

const Logo = styled.img`
  width: 120px;
  height: 120px;
  animation: ${blink} 2s infinite;
`;

const LoadingText = styled.div`
  margin-top: 20px;
  font-size: 24px;
  animation: ${bounce} 2s infinite;
  color: #313260;
  font-size: 22px; 
  font-weight: bold; 
  font-family: 'Arial', sans-serif; 
`;

const Preloader = () => {
  return (
    <PreloaderWrapper>
      <Logo src={logoImage} alt="Logo" />
      <LoadingText>Eva's Academy</LoadingText>
    </PreloaderWrapper>
  );
};

export default Preloader;
