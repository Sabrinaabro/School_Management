import React, { useState, useEffect } from 'react';
import { Table as AntTable, Button, Modal } from 'antd';
import { EditFilled, DeleteFilled, PlusOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import StudentForm from './StudentForm';

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


const generateFilters = (data, key) => {
  const uniqueValues = Array.from(new Set(data.map(item => item[key]))).filter(value => value);
  return uniqueValues.map(value => ({ text: value, value }));
};

const Table = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([
    { key: '1', fname: "Williamson", name: 'John Brown', age: 32, address: 'New York No. 1 Lake Park', gender: 'Male', dob: '2001-01-01', classGrade: 'Grade 1', contactNumber: '1234567890', photo: 'photo1.jpg', fees: 'Paid' },
    { key: '2', fname: "Steve Harrington", name: 'Jim Green', age: 42, address: 'London No. 1 Lake Park', gender: 'Male', dob: '2002-02-02', classGrade: 'Grade 2', contactNumber: '0987654321', photo: 'photo2.jpg', fees: 'Unpaid' },
    { key: '3', fname: "Williamson Den", name: 'Joe Black', age: 32, address: 'Sydney No. 1 Lake Park', gender: 'Male', dob: '2003-03-03', classGrade: 'Grade 1', contactNumber: '2345678901', photo: 'photo3.jpg', fees: 'Paid' },
    { key: '4', fname: "Joe Biden", name: 'Jim Red', age: 32, address: 'London No. 2 Lake Park', gender: 'Male', dob: '2004-04-04', classGrade: 'Grade 2', contactNumber: '3456789012', photo: 'photo4.jpg', fees: 'Unpaid' },
    { key: '5', fname: "Hop", name: 'Jim Blue', age: 32, address: 'London No. 2 Lake Park', gender: 'Male', dob: '2005-05-05', classGrade: 'Nursery', contactNumber: '4567890123', photo: 'photo5.jpg', fees: 'Paid' },
  ]);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      filters: generateFilters(data, 'name'),
      filterSearch: true,
      onFilter: (value, record) => record.name.includes(value),
      sorter: (a, b) => a.name.localeCompare(b.name),
      width: '15%',
    },
    {
      title: 'Guardian Name',
      dataIndex: 'fname',
      filters: generateFilters(data, 'fname'),
      filterSearch: true,
      onFilter: (value, record) => record.fname.includes(value),
      sorter: (a, b) => a.fname.localeCompare(b.fname),
      width: '20%',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      filters: generateFilters(data, 'gender'),
      filterSearch: true,
      onFilter: (value, record) => record.gender === value,
      width: '10%',
    },
    {
      title: 'Date of Birth',
      dataIndex: 'dob',
      sorter: (a, b) => new Date(a.dob) - new Date(b.dob),
      width: '15%',
    },
    {
      title: 'Grade',
      dataIndex: 'classGrade',
      filters: generateFilters(data, 'classGrade'),
      filterSearch: true,
      onFilter: (value, record) => record.classGrade === value,
      width: '10%',
    },
    {
      title: 'Contact Number',
      dataIndex: 'contactNumber',
      filters: generateFilters(data, 'contactNumber'),
      filterSearch: true,
      onFilter: (value, record) => record.contactNumber.includes(value),
      width: '20%',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      filters: generateFilters(data, 'address'),
      filterSearch: true,
      onFilter: (value, record) => record.address.includes(value),
      width: '25%',
    },
    {
      title: 'Photo',
      dataIndex: 'photo',
      render: (text) => <img src={text} alt="photo" style={{ width: 50, height: 50 }} />,
      width: '10%',
    },
    {
      title: 'Fees Paid/Unpaid',
      dataIndex: 'fees',
      filters: generateFilters(data, 'fees'),
      filterSearch: true,
      onFilter: (value, record) => record.fees === value,
      width: '10%',
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <span style={{ display: "flex", gap: "0.5rem", alignItems: "center", justifyContent: "center" }}>
          <Button icon={<DeleteFilled style={{ color: '#BD1B0F' }} />} onClick={() => handleDelete(record)} />
          <Button icon={<EditFilled style={{ color: 'green' }} />} onClick={() => handleEdit(record)} style={{ marginRight: 8 }} />
        </span>
      ),
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  const handleEdit = (record) => {
    console.log('Edit:', record);
  };

  const handleDelete = (record) => {
    console.log('Delete:', record);
  };

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
    <Container>
      <HeaderContainer>
        <HeaderTitle>Student List</HeaderTitle>
        <AddButton icon={<PlusOutlined />} onClick={showModal}>
          Add Student
        </AddButton>
      </HeaderContainer>
      <StyledTable columns={columns} dataSource={data} onChange={onChange} />
      <Modal
        title="Add Student"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <StudentForm />
      </Modal>
    </Container>
  );
};

export default Table;
