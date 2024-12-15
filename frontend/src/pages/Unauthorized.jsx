import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import styled from 'styled-components';
import unauthorizedImage from '../assets/error.png'; 
import { LeftOutlined } from '@ant-design/icons'; 

const Unauthorized = () => {
  const navigate = useNavigate();

  const handleReturn = () => {
    navigate("/dashboard"); 
  };

  return (
    <Container>
      <ReturnButton onClick={handleReturn}>
      <LeftOutlined />
      </ReturnButton>

      <Heading>Unauthorized Access</Heading>
      <Text>You don't have access to this page.</Text>
      <CenteredImage src={unauthorizedImage} alt="Unauthorized" />
    </Container>
  );
};

export default Unauthorized;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
  text-align: center;
  position: relative;
`;

const Heading = styled.h2`
  color: #d9534f;
  font-size: 2.5rem;
  margin-bottom: 10px;
`;

const Text = styled.p`
  color: #333;
  font-size: 1.2rem;
  margin-bottom: 20px;
`;

const CenteredImage = styled.img`
  max-width: 50%;
  max-height: 70%;
  object-fit: contain;
  margin-bottom: 20px;
`;

const ReturnButton = styled.button`
  position: absolute;
  top: 20px;
  left: 20px;
  padding: 10px;
  background-color: #1890ff;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  color: white;
  font-size: 1rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #40a9ff;
  }

  .anticon {
    font-size: 1.2rem;
  }
`;
