import React, { useState } from "react";
import {
  Table as AntTable,
  Button,
  Popconfirm,
  Modal,
  Form,
  Input,
} from "antd";
import { EditFilled, DeleteFilled, PlusOutlined } from "@ant-design/icons";
import styled from "styled-components";

const StyledTable = styled(AntTable)`
  .ant-table {
    margin: 0 auto;
    max-width: 100%;
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
  }

  .ant-table-thead > tr > th {
    background-color: #d2d7c1;
    color: #313260;
    font-weight: 900;
    border-bottom: 2px solid #ddd;
    font-size: 15px;
    font-family: "Arial", sans-serif;
    text-align: center;
  }

  .ant-table-tbody > tr:nth-child(odd) {
    background: radial-gradient(circle, #d1abad, #d8c2c2);
  }

  .ant-table-tbody > tr:nth-child(even) {
    background: radial-gradient(circle, #eecbaa, #fae0c6);
  }

  .ant-table-cell {
    padding: 16px;
    border-right: 1px solid #ddd;
  }

  .ant-table-tbody > tr:last-child > td {
    border-bottom: 1px solid #ddd;
  }
`;


const Container = styled.div`
position: fixed;
top: 0;
left: 280px;  
width: calc(100% - 200px); 
height: 100vh;
display: flex;
flex-direction: column;
align-items: flex-start; 
justify-content: center;
overflow: hidden;
z-index: 1;
transition: margin-left 0.3s ease;

@media (max-width: 768px) {
width: 100%;
margin-left: 0;
top: 0;
left: 0;
transform: none;
justify-content: flex-start;
}
`;

const HeaderContainer = styled.div`
  display: flex;
  
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 20px; 
  margin-bottom: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
`;

const HeaderTitle = styled.h2`
  margin: 0;
  font-size: 24px;
  font-weight: 600;
  color: #313260;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;
const FormWrapper = styled.div`
  width: 100%;
  max-width: 700px;
  background: #b9d9eb;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  margin: 0 auto;
`;

const ButtonContainer = styled.div`
  display: flex;
  margin-right: 650px;
  gap: 10px;

  @media (max-width: 768px) {
    align-self: stretch;
  }
`;


const AddButton = styled(Button)`
  background-color: #1890ff;
  color: #fff;
  border: none;

  &:hover {
    background-color: #40a9ff;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Clerk = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedRowValues, setSelectedRowValues] = useState({});
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();
  const [addForm] = Form.useForm();
  const [data, setData] = useState([
    {
      key: "1",
      name: "ABc",
      email: "abc@example.com",
      contactNumber: "564654654654",
      address: "dfdsf df sdfsdf ",
    },
    {
      key: "2",
      name: "Jane Doe",
      email: "jane@example.com",
      contactNumber: "66994654",
      address: "Some Address",
    },
  ]);

  const generateFilters = (data, key) => {
    const uniqueValues = Array.from(
      new Set(data.map((item) => item[key]))
    ).filter((value) => value);
    return uniqueValues.map((value) => ({ text: value, value }));
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      filters: generateFilters(data, "name"),
      filterSearch: true,
      onFilter: (value, record) => record.name.includes(value),
      sorter: (a, b) => a.name.localeCompare(b.name),
      width: "15%",
    },
    {
      title: "Email",
      dataIndex: "email",
      filters: generateFilters(data, "email"),
      filterSearch: true,
      onFilter: (value, record) => record.email.includes(value),
      width: "25%",
    },
    {
      title: "Contact Number",
      dataIndex: "contactNumber",
      filters: generateFilters(data, "contactNumber"),
      filterSearch: true,
      onFilter: (value, record) => record.contactNumber.includes(value),
      width: "25%",
    },
    {
      title: "Address",
      dataIndex: "address",
      filters: generateFilters(data, "address"),
      filterSearch: true,
      onFilter: (value, record) => record.address.includes(value),
      width: "25%",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <span style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          <Popconfirm
            title="Are you sure to delete this record?"
            onConfirm={() => handleDelete(record.key)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              type="link"
              icon={
                <DeleteFilled
                  style={{
                    color: "#BD1B0F",
                    border: "none",
                    background: "transparent",
                  }}
                />
              }
            />
          </Popconfirm>
          <Button
            icon={<EditFilled style={{ color: "green" }} />}
            onClick={() => handleEdit(record)}
            style={{
              marginRight: 8,
              border: "none",
              background: "transparent",
            }}
          />
        </span>
      ),
    },
  ];

  const handleDelete = (key) => {
    const newData = data.filter((item) => item.key !== key);
    setData(newData);
  };

  const handleEdit = (record) => {
    setSelectedRowValues(record);
    setIsModalOpen(true);
    editForm.setFieldsValue({
      fullName: record.name,
      email: record.email,
      contactNumber: record.contactNumber,
      address: record.address,
    });
  };

  const handleUpdate = (values) => {
    const updatedData = data.map((item) =>
      item.key === selectedRowValues.key
        ? { ...item, ...values, key: selectedRowValues.key }
        : item
    );
    setData(updatedData);
    setIsModalOpen(false);
    editForm.resetFields();
  };

  const handleAdd = (values) => {
    const newRecord = {
      name: values.fullName,
      email: values.email,
      contactNumber: values.contactNumber,
      address: values.address,
    };
    setData([...data, newRecord]);
    setIsAddModalOpen(false);
    addForm.resetFields();
  };

  const showAddModal = () => {
    setIsAddModalOpen(true);
  };

  return (
    <Container>
      <HeaderContainer>
        <HeaderTitle>Clerk List</HeaderTitle>
        <ButtonContainer>
          <AddButton
            type="primary"
            icon={<PlusOutlined />}
            onClick={showAddModal}
          >
            Add Clerk
          </AddButton>
        </ButtonContainer>
      </HeaderContainer>
      <StyledTable columns={columns} dataSource={data} rowKey="key" />
      <Modal
        title="Edit Record"
        open={isModalOpen}
        okText="Update"
        cancelText="Cancel"
        onCancel={() => setIsModalOpen(false)}
        onOk={() => {
          editForm
            .validateFields()
            .then((values) => {
              handleUpdate(values);
            })
            .catch((info) => {
              console.log("Validation Failed:", info);
            });
        }}
      >
        <UpdateForm form={editForm} />
      </Modal>
      <Modal
        title="Add Clerk"
        open={isAddModalOpen}
        okText="Add"
        cancelText="Cancel"
        onCancel={() => setIsAddModalOpen(false)}
        onOk={() => {
          addForm
            .validateFields()
            .then((values) => {
              handleAdd(values);
            })
            .catch((info) => {
              console.log("Validation Failed:", info);
            });
        }}
      >
        <UpdateForm form={addForm} />
      </Modal>
    </Container>
  );
};

const UpdateForm = ({ form }) => (
  <FormWrapper form={form} layout="vertical">
    <Form.Item
      name="fullName"
      label="Full Name"
      rules={[{ required: true, message: "Please enter the full name" }]}
    >
      <Input placeholder="Enter full name" />
    </Form.Item>
    <Form.Item
      name="email"
      label="Email"
      rules={[
        { required: true, message: "Please enter the email address" },
        { type: "email", message: "Please enter a valid email address" },
      ]}
    >
      <Input placeholder="Enter email address" />
    </Form.Item>
    <Form.Item
      name="contactNumber"
      label="Contact Number"
      rules={[{ required: true, message: "Please enter the contact number" }]}
    >
      <Input placeholder="Enter contact number" />
    </Form.Item>
    <Form.Item
      name="address"
      label="Address"
      rules={[{ required: true, message: "Please enter the address" }]}
    >
      <Input placeholder="Enter address" />
    </Form.Item>
  </FormWrapper>
);

export default Clerk;
