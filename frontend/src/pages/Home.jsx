import React from 'react';
import styled from 'styled-components';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import ParticleBackground from '../components/ParticleBackground';

// Styled Components
const HomeContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;  
    background-color: transparent;
    
`;

const Banner = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 90%;
    max-width: 1200px;
    padding: 20px;
    border-radius: 10px;
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
    right: -380px; /* Move the button further to the right */
    bottom: 0;
    text-align: right;
`;

const StyledButton = styled(Button)`
    background-color: #3E8EDE;
    border-color: #ffc107;
    color: #F0F8FF;
    padding: 10px 40px;
    font-size: 1.2rem;
    border-radius: 5px;
    transition: all 0.3s ease;

    &:hover {
        background-color: #e0a800;
        border-color: #e0a800;
        color: #fff;
    }
`;

function Home() {
    return (
        <HomeContainer>
            <ParticleBackground />
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
                       Get Started
                        </StyledButton>
                           </Link>
                    </Cta>
                </RightContent>
            </Banner>
        </HomeContainer>
    );
}

export default Home;
