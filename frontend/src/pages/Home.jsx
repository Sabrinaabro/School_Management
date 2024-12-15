import React from 'react';
import styled from 'styled-components';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { ArrowRightOutlined } from '@ant-design/icons';
import ParticleBackground from '../components/ParticleBackground';
import logo from '../assets/evas.jpg';
import schoolImage from '../assets/school.png';

// Styled Components
const HomeContainer = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: transparent;

  @media (max-width: 1200px) {
    flex-direction: column; 
    padding: 10px; 
  }
`;

const ParticleWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;

  @media (max-width: 1200px) {
    height: 100vh; 
  }
`;

const Banner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  max-width: 1200px;
  padding: 20px;
  border-radius: 10px;
  z-index: 2;

  @media (max-width: 1200px) {
    flex-direction: column;
    padding: 10px;
  }
`;

const LeftContent = styled.div`
  text-align: left;

  @media (max-width: 1200px) {
    text-align: left;
  }
`;

const Logo = styled.img`
  width: 80px;
  margin-bottom: 10px;

  @media (max-width: 1200px) {
    width: 60px; 

  }
`;

const SchoolName = styled.h2`
  font-size: 2rem;
  margin: 0;
  color: #313260;

  @media (max-width: 1200px) {
    font-size: 1.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
  }

  @media (max-width: 360px) {
    font-size: 0.8rem;
  }
`;


const Motto = styled.p`
  font-size: 1.3rem;
  color: #b02915;

 @media (max-width: 1200px) {
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }

  @media (max-width: 360px) {
    font-size: 0.6rem;
  }
`;

const RightContent = styled.div`
  position: static;
  display: flex;
  align-items: center;
  justify-content: center;
 @media (max-width: 1200px) {
    margin-top: 20px; 
  }

  @media (max-width: 480px) {
    margin-top: 10px; 
  }
`;

const StudentsImage = styled.img`
  max-width: 600px;
  height: auto;
  border-radius: 10px;
  margin-right: 120px; 
  margin-bottom: 20px;

  @media (max-width: 1200px) {
    max-width: 50%;
    margin-right: auto; 
  }

  @media (max-width: 768px) {
    max-width: 60%;
  }

  @media (max-width: 480px) {
    max-width: 70%;
  }

  @media (max-width: 360px) {
    max-width: 80%;
  }
`;


const Cta = styled.div`
  position: fixed;
  right: 5px;
  bottom: 100px;
  display: flex;
  flex-direction: row;
  gap: 10px;
  z-index: 3;
  margin-top: 20px; /* Add margin to keep distance */

  @media (max-width: 1200px) {
    flex-direction: row;
    align-items: center;
    margin-top: 30px; /* Adjust margin to prevent overlap */
    right: 5px; /* Adjust position */
    bottom: 5px; /* Adjust bottom position */
  }

  @media (max-width: 768px) {
    right: 50px; /* Further adjust on smaller screens */
    bottom: 70px;
  }

  @media (max-width: 480px) {
    right: 20px;
    bottom: 60px;
    gap: 5px;
    margin-top: 20px; /* Ensure enough spacing */
  }

  @media (max-width: 360px) {
    right: 10px;
    bottom: 50px;
    gap: 5px;
    margin-top: 15px; /* Additional spacing for smallest screens */
  }
`;


const StyledButton = styled(Button)`
  background-color: #3e8ede;
  border-color: #3e8ede;
  color: #f0f8ff;
  padding: 8px 15px;
  font-size: 1.2rem;
  border-radius: 5px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;

  &:hover {
    background-color: #2c6ab1;
    border-color: #2c6ab1;
    color: #fff;
  }

 @media (max-width: 1200px) {
    font-size: 1rem;
    padding: 8px 16px;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
    padding: 6px 12px;
  }

  @media (max-width: 360px) {
    font-size: 0.8rem;
    padding: 5px 10px;
  }
`;



const DashboardButton = styled(StyledButton)`
    background-color: #3E8EDE; 
    border-color: #3E8EDE;
     padding: 8px 10px;
  font-size: 1.2rem;
    
    &:hover {
        background-color: #2C6AB1;
        border-color: #2C6AB1;
    }
@media (max-width: 1200px) {
    font-size: 1rem;
    padding: 8px 16px;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
    padding: 6px 12px;
  }

  @media (max-width: 360px) {
    font-size: 0.8rem;
    padding: 5px 10px;
  }
`;

function Home() {
    return (
        <HomeContainer>
            <ParticleWrapper>
                <ParticleBackground />
            </ParticleWrapper>
            <Banner>
                <LeftContent>
                <Logo src={logo} alt="School Logo" />
                    <SchoolName>Eva's Academy, Hyderabad</SchoolName>
                    <Motto>Excellence Our Commitment</Motto>
                </LeftContent>
                <RightContent>
                <StudentsImage src={schoolImage} alt="Students" />
                    <Cta>
                        <Link to="/login">
                            <StyledButton type="primary" size="large">
                                Login
                            </StyledButton>
                        </Link>
                        <Link to="/dashboard">
                            <DashboardButton type="primary" size="large">
                                Go to Dashboard
                                <ArrowRightOutlined style={{ marginLeft: '8px' }} />
                            </DashboardButton>
                        </Link>
                    </Cta>
                </RightContent>
            </Banner>
        </HomeContainer>
    );
}

export default Home;
