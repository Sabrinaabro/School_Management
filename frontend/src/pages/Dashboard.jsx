import React from 'react'
import Table from '../components/Table';
import styled from 'styled-components';
import { useState } from 'react';
import { Table as AntTable, Button, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import StudentForm from '../components/StudentForm';

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([
    { key: '1', fname: "Williamson", name: 'John Brown', age: 32, address: 'New York No. 1 Lake Park', gender: 'Male', dob: '2001-01-01', classGrade: 'Grade 1', contactNumber: '1234567890', photo: 'photo1.jpg', fees: 'Paid' },
    { key: '2', fname: "Steve Harrington", name: 'Jim Green', age: 42, address: 'London No. 1 Lake Park', gender: 'Male', dob: '2002-02-02', classGrade: 'Grade 2', contactNumber: '0987654321', photo: 'photo2.jpg', fees: 'Unpaid' },
    { key: '3', fname: "Williamson Den", name: 'Joe Black', age: 32, address: 'Sydney No. 1 Lake Park', gender: 'Male', dob: '2003-03-03', classGrade: 'Grade 1', contactNumber: '2345678901', photo: 'photo3.jpg', fees: 'Paid' },
    { key: '4', fname: "Joe Biden", name: 'Jim Red', age: 32, address: 'London No. 2 Lake Park', gender: 'Male', dob: '2004-04-04', classGrade: 'Grade 2', contactNumber: '3456789012', photo: 'photo4.jpg', fees: 'Unpaid' },
    { key: '5', fname: "Hop", name: 'Jim Blue', age: 32, address: 'London No. 2 Lake Park', gender: 'Male', dob: '2005-05-05', classGrade: 'Nursery', contactNumber: '4567890123', photo: 'photo5.jpg', fees: 'Paid' },
  ]);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
    <Container>
    <HeaderContainer>
        <HeaderTitle>Student List</HeaderTitle>
        <AddButton icon={<PlusOutlined />} onClick={showModal}>
          Add Student
        </AddButton>
      </HeaderContainer>
    <Table data={data} />
    <Modal
        title="Add Student"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <StudentForm />
      </Modal>
    </Container>
    </>
  )
}

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

const AddButton = styled(Button)`
  display: flex;
  align-items: center;
  background-color: #1890ff;
  color: #fff;
  border: none;

  &:hover {
    background-color: #40a9ff;
  }
`;

const StyledTable = styled(AntTable)`
  .ant-table-thead > tr > th {
    background-color: #E04700; 
    color: #333;
    font-weight: 1600; 
  }

  .ant-table-tbody > tr:nth-child(odd) {
    background-color: #4BA1E7; 
  }

  .ant-table-tbody > tr:nth-child(even) {
    background-color: #F4E04D; 
  }

  .ant-table-cell {
    padding: 16px; 
  }
`;

export default Dashboard;