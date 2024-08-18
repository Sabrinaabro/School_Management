import React from 'react'
import Table from '../components/Table';
import styled from 'styled-components';
import { useState } from 'react';
import { Button, Modal, Form } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import StudentForm from '../components/StudentForm';

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editForm] = Form.useForm();  
  const [addForm] = Form.useForm();
  const [data, setData] = useState([]);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleAdd = (value) => {
    const newRecord = {
      key: Date.now().toString(), 
      name: value.fullName, 
      fname: value.parentName,
      gender: value.gender,
      dob: value.dob ? values.dob.format('YYYY-MM-DD') : '', 
      classGrade: value.grade, 
      contactNumber: value.contactNumber,
      address: value.address,
      fees: 'Unpaid', 
    };
    console.log(value);
  
    setData([...data, newRecord]);
    setIsModalOpen(false);
    addForm.resetFields();
  };  

  return (
    <>
    <Container>
      <HeaderContainer>
        <HeaderTitle>Student List</HeaderTitle>
        <ButtonContainer>
          <AddButton icon={<PlusOutlined />} onClick={showModal}>
            Add Student
          </AddButton>
          
        </ButtonContainer>
      </HeaderContainer>
      <Table data={data} />
      <Modal
        title="Add Student"
        open={isModalOpen}
        okText="Add"
        cancelText="Cancel"
        onCancel={() => setIsModalOpen(false)}
        onOk={() => addForm.submit()}
      >
        <Form
          form={addForm}
          layout="vertical"
          onFinish={handleAdd}
        ></Form>
        <StudentForm />
      </Modal>
    </Container>
      </>
);
};

const Container = styled.div`
  width: auto;
  margin: 0 auto;
  padding: 20px;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const HeaderTitle = styled.h2`
  margin: 0;
  font-size: 24px;
  font-weight: 600;
  color: #40a9ff;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px; /* Space between buttons */
`;

const AddButton = styled(Button)`
  background-color: #1890ff;
  color: #fff;
  border: none;

  &:hover {
    background-color: #40a9ff;
  }
`;


export default Dashboard;