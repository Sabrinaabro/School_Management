import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, Input, InputNumber, Radio, Select, Upload } from 'antd'; 
import styled from 'styled-components';
import Typography from 'antd/es/typography/Typography';

const { TextArea } = Input;
const { Option } = Select;
const { Title } = Typography;

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh; 
  background: #fff;
  
`;

const FormWrapper = styled.div`
  width: 100%;
  max-width: 700px;
  background: #B9D9EB;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  margin: 0 auto;
`;
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  
  margin-right: 130px; 
`;

const SubmitButton = styled(Button)`
  background-color: #1890ff;
  border-color: #1890ff;
  width: 100%;
  max-width: 200px;
  &:hover {
    background-color: #40a9ff;
    border-color: #40a9ff;
  }
`;

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const StudentForm = () => {
  const [form] = Form.useForm();
  const [componentDisabled, setComponentDisabled] = useState(false);

  const handleSubmit = (values) => {
    console.log('Form Values:', values);
  };

  return (
    <PageWrapper>
      <FormWrapper>
        <Title level={2} style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>
          Student Form
        </Title>

        <Form
          form={form}
          labelCol={{ span: 11 }}
          wrapperCol={{ span: 16 }} 
          layout="horizontal"
          onFinish={handleSubmit}
          disabled={componentDisabled}
        >
          <Form.Item
            label="Full Name"
            name="fullName"
            rules={[{ required: true, message: 'Please enter the student\'s full name' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Gender"
            name="gender"
            rules={[{ required: true, message: 'Please select the student\'s gender' }]}
          >
            <Radio.Group>
              <Radio value="male">Male</Radio>
              <Radio value="female">Female</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label="Date of Birth"
            name="dob"
            rules={[{ required: true, message: 'Please select the student\'s date of birth' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            label="Grade"
            name="grade"
            rules={[{ required: true, message: 'Please select the student\'s grade' }]}
          >
            <Select placeholder="Select Grade" style={{ width: '100%' }}>
              <Option value="1">Pre-Nursery</Option>
              <Option value="2">Nursery</Option>
              <Option value="3">KinderGarden</Option>
              <Option value="4">Grade 1</Option>
              <Option value="5">Grade 2</Option>
              <Option value="6">Grade 3</Option>
              <Option value="7">Grade 4</Option>
              <Option value="8">Grade 5</Option>
              <Option value="9">Grade 6</Option>
              <Option value="10">Grade 7</Option>
              <Option value="11">Grade 8</Option>
              <Option value="12">Grade 9</Option>
              <Option value="13">Grade 10</Option>
              
            </Select>
          </Form.Item>

          <Form.Item
            label="Parent/Guardian Name"
            name="parentName"
            rules={[{ required: true, message: 'Please enter the parent/guardian\'s name' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Contact Number"
            name="contactNumber"
            rules={[{ required: true, message: 'Please enter the contact number' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: 'Please enter the address' }]}
          >
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item
            label="Upload Photo"
            name="photo"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            extra="Please upload a recent photo of the student"
          >
            <Upload action="/upload.do" listType="picture-card">
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Form.Item>

          <Form.Item
            wrapperCol={{ offset: 6, span: 18 }} 
          >
            <ButtonWrapper>
            <SubmitButton type="primary" htmlType="submit">
              Add Student
            </SubmitButton>
            </ButtonWrapper>
          </Form.Item>
        </Form>
      </FormWrapper>
    </PageWrapper>
  );
};

export default StudentForm;
