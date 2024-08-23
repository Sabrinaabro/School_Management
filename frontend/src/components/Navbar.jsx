import React, { useState } from 'react';
import styled from 'styled-components';
import { Avatar, Button, Layout, Menu, Typography } from 'antd';
import {
  UserOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Header, Sider } = Layout;
const { Text } = Typography;

const StyledHeader = styled(Header)`
  background: #d2d7c1;
  padding: 0 16px;
  position: fixed;
  width: 100%;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  color: #313260;
  gap: 8px;
  font-size: 18px; 
  font-weight: bold; 
  font-family: 'Arial', sans-serif; 

  &:hover {
    color: #b02915; 
    cursor: pointer; 
  }
`;

const HeaderContentWrapper = styled.div`
  display: flex;
  left:92%;
  align-items: center;
  position: fixed;
  right: 16px;
`;

const StyledSider = styled(Sider)`
  background: #d2d7c1;
  .ant-layout-sider-trigger {
    background: #fff;
  }
`;

const StyledMenu = styled(Menu)`
  background: #d2d7c1;
  height: 100%;
  border-right: 0;
  display: flex;
  flex-direction: column;
  padding-top: 80px; 
`;

const Navbar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); 
  const [username, setUsername] = useState(''); 
  const navigate = useNavigate();

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  const handleAvatarClick = () => {
    if (isAuthenticated) {
    
      navigate('/profile');
    } else {
      
      navigate('/login');
    }
  };

  const menuItems = [
    {
      key: '1',
      icon: <PieChartOutlined />,
      label: 'Dashboard',
    },
    {
      key: '2',
      icon: <DesktopOutlined />,
      label: 'Admin',
    },
    {
      key: '3',
      icon: <ContainerOutlined />,
      label: 'Clerk',
    },
    {
      key: 'profile',
      icon: <LogoutOutlined />,
      label: 'Log Out',
      style: { marginTop: 'auto' },
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <StyledSider trigger={null} collapsible collapsed={collapsed}>
        <Button
          type="primary"
          onClick={toggleCollapsed}
          style={{
            marginBottom: 16,
            position: 'absolute',
            top: 16,
            left: 16,
          }}
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
        <StyledMenu
          defaultSelectedKeys={['1']}
          mode="inline"
          theme="dark"
          items={menuItems}
          
        />
      </StyledSider>
      <Layout>
        <StyledHeader>
          <HeaderContent>
            <img 
              src="/src/assets/evas.jpg" 
              width="50" 
              height="45"  
              alt="Logo"
            />
            Eva's Academy
          </HeaderContent>
          <HeaderContentWrapper>
            {isAuthenticated ? (
              <Text>{`Hi, ${username}`}</Text>
            ) : (
              <Avatar 
                size={48} 
                icon={<UserOutlined />} 
                style={{ cursor: 'pointer' }}
                onClick={handleAvatarClick} 
              />
            )}
          </HeaderContentWrapper>       
        </StyledHeader>
      </Layout>
    </Layout>
  );
};

export default Navbar;