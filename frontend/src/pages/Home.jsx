import React from 'react';
import styled from 'styled-components';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { ArrowRightOutlined } from '@ant-design/icons';
import ParticleBackground from '../components/ParticleBackground';

// Styled Components
const HomeContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;  
    background-color: transparent;
`;

const ParticleWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none; 
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
`;

const LeftContent = styled.div`
    text-align: left;
`;

const Logo = styled.img`
    width: 80px;
    margin-bottom: 10px;
`;

const SchoolName = styled.h2`
    font-size: 2.5rem;
    margin: 0;
    color: #313260;
`;

const Motto = styled.p`
    font-size: 1.5rem;
    color: #b02915;
`;

const RightContent = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const StudentsImage = styled.img`
    max-width: 600px;
    height: auto;
    border-radius: 10px;
`;

const Cta = styled.div`
    position: absolute;
    right: -400px; 
    bottom: 0;
    display: flex;
    flex-direction: row;
    gap: 10px;
    z-index: 3;
`;

const StyledButton = styled(Button)`
    background-color: #3E8EDE; /* Blue color for "Get Started" */
    border-color: #3E8EDE;
    color: #F0F8FF;
    padding: 10px 20px;
    font-size: 1.2rem;
    border-radius: 5px;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;

    &:hover {
        background-color: #2C6AB1;
        border-color: #2C6AB1;
        color: #fff;
    }
`;

const DashboardButton = styled(StyledButton)`
    background-color: #3E8EDE; /* Same blue color for "Go to Dashboard" */
    border-color: #3E8EDE;
    
    &:hover {
        background-color: #2C6AB1;
        border-color: #2C6AB1;
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
                    <Logo src="/src/assets/evas.jpg" alt="School Logo" />
                    <SchoolName>Eva's Academy, Hyderabad</SchoolName>
                    <Motto>Excellence Our Commitment</Motto>
                </LeftContent>
                <RightContent>
                    <StudentsImage src="/src/assets/school.png" alt="Students" />
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
