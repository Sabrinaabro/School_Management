import React from 'react';
import { useState } from 'react';
import { Table as AntTable, Button, Modal } from 'antd';
import { EditOutlined, DeleteFilled, PlusOutlined } from '@ant-design/icons';
import styled from 'styled-components';

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

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    filters: [
      {
        text: 'Joe',
        value: 'Joe',
      },
      {
        text: 'Category 1',
        value: 'Category 1',
        children: [
          { text: 'Yellow', value: 'Yellow' },
          { text: 'Pink', value: 'Pink' },
        ],
      },
      {
        text: 'Category 2',
        value: 'Category 2',
        children: [
          { text: 'Green', value: 'Green' },
          { text: 'Black', value: 'Black' },
        ],
      },
    ],
    filterMode: 'tree',
    filterSearch: true,
    onFilter: (value, record) => record.name.includes(value),
    width: '30%',
  },

  {
    title: 'Fathers_Name',
    dataIndex: 'fname',
    filters: [
      {
        text: 'William',
        value: 'William',
      },
      {
        text: 'Category 1',
        value: 'Category 1',
        children: [
          { text: 'Yellow', value: 'Yellow' },
          { text: 'Pink', value: 'Pink' },
        ],
      },
      {
        text: 'Category 2',
        value: 'Category 2',
        children: [
          { text: 'Green', value: 'Green' },
          { text: 'Black', value: 'Black' },
        ],
      },
    ],
    filterMode: 'tree',
    filterSearch: true,
    onFilter: (value, record) => record.name.includes(value),
    width: '30%',
  },

  {
    title: 'Age',
    dataIndex: 'age',
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    filters: [
      { text: 'London', value: 'London' },
      { text: 'New York', value: 'New York' },
    ],
    onFilter: (value, record) => record.address.startsWith(value),
    filterSearch: true,
    width: '40%',
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <span>
        <Button
          type="primary"
          icon={<EditOutlined />}
          onClick={() => handleEdit(record)}
          style={{ marginRight: 8 }}
        />
      </span>
    ),
  },


  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <span>
        <Button
          type="danger"
          icon={<DeleteFilled />}
          onClick={() => handleDelete(record)}
        />
      </span>
    ),
  },
];

const data = [
  { key: '1',fname : "Williamson" ,name: 'John Brown', age: 32, address: 'New York No. 1 Lake Park' },
  { key: '2',fname : "Steve Harrington", name: 'Jim Green', age: 42, address: 'London No. 1 Lake Park' },
  { key: '3',fname : "Williamson Den", name: 'Joe Black', age: 32, address: 'Sydney No. 1 Lake Park' },
  { key: '4',fname : "Joe Biden", name: 'Jim Red', age: 32, address: 'London No. 2 Lake Park' },
  { key: '5',fname : "Hop", name: 'Jim Blue', age: 32, address: 'London No. 2 Lake Park' },

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

const Table = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
  
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
      <AntTable columns={columns} dataSource={data} onChange={onChange} />
      <Modal
        title="Add Student"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Modal content for adding a student goes here...</p>
      </Modal>
    </Container>
  );
};

export default Table;
