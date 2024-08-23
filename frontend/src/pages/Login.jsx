import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import styled from 'styled-components';

const PageWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 550px;  
  width: calc(100% - 200px); 
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start; 
  justify-content: center;
  overflow: hidden;
  z-index: 1;

@media (max-width: 768px) {
  width: 100%;
  margin-left: 0;
  top: 0;
  left: 0;
  transform: none;
  justify-content: flex-start;
}
`;

const FormWrapper = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 40px;
  background-color: #F0F8FF;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.img`
  display: block;
  margin: 0 auto 30px;
  width: 150px;
`;

const StyledForm = styled(Form)`
  .ant-form-item {
    margin-bottom: 20px;
  }
`;

const StyledButton = styled(Button)`
  width: 100%;
`;

const Login = () => {
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <PageWrapper>
      <FormWrapper>
        <Logo src="src/assets/evas.jpg" alt="Logo" />

        <StyledForm
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <StyledButton type="primary" htmlType="submit">
              Login
            </StyledButton>
          </Form.Item>
        </StyledForm>
      </FormWrapper>
    </PageWrapper>
  );
};

export default Login;
