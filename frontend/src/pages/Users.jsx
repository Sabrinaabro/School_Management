import React, { useState, useEffect } from "react";
import {
  Table as AntTable,
  Button,
  Popconfirm,
  Modal,
  Form,
  Input,
  Select,
  notification,
} from "antd";
import { EditFilled, DeleteFilled, PlusOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { TableBadge } from "../components/styled/Badge";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_PROJECT_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);
const supabaseAdmin = createClient(
  import.meta.env.VITE_SUPABASE_PROJECT_URL,
  import.meta.env.VITE_SUPABASE_SERVICE_ROLE
);

const Users = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRowValues, setSelectedRowValues] = useState({});
  const [editForm] = Form.useForm();
  const [addForm] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const [data, setData] = useState([]);

  // Fetch data from Supabase on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Function to fetch data from Supabase
  const fetchData = async () => {
    try {
      const { data, error } = await supabase.from("users").select("*");
      if (error) throw error;
      setData(
        data.map((item) => ({
          key: item.id,
          name: item.username,
          email: item.email,
          contactNumber: item.contact_number,
          address: item.address,
          role: item.role,
        }))
      );
    } catch (err) {
      console.error("Error fetching data:", err.message);
    }
  };

  // Function to generate filters for table columns
  const generateFilters = (data, key) => {
    const uniqueValues = Array.from(
      new Set(data.map((item) => item[key]))
    ).filter((value) => value);
    return uniqueValues.map((value) => ({ text: value, value }));
  };

  // Define table columns
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
      width: "20%",
    },
    {
      title: "Contact Number",
      dataIndex: "contactNumber",
      filters: generateFilters(data, "contactNumber"),
      filterSearch: true,
      onFilter: (value, record) => record.contactNumber.includes(value),
      width: "20%",
    },
    {
      title: "Role",
      dataIndex: "role",
      filters: generateFilters(data, "role"),
      filterSearch: true,
      onFilter: (value, record) => record.role.includes(value),
      width: "15%",
      render: (role) => (
        <TableBadge
          text={role === "admin" ? "Admin" : "Clerk"}
          color={role === "admin" ? "lime" : "volcano"}
        />
      ),
    },
    {
      title: "Address",
      dataIndex: "address",
      filters: generateFilters(data, "address"),
      filterSearch: true,
      onFilter: (value, record) => record.address.includes(value),
      width: "20%",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <span style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          <Popconfirm
            title="Are you sure to delete this record?"
            onConfirm={() => handleDelete(record)}
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

  // Function to handle record deletion
  const handleDelete = async (record) => {
    try {
      const { error } = await supabase.from("users").delete().eq("id", record.key);
      if (error) throw error;
      setData(data.filter((item) => item.key !== record.key));
      api.success({ message: "Record deleted successfully!" });
    } catch (err) {
      console.error("Error deleting record:", err.message);
      api.error({ message: "Error deleting record", description: err.message });
    }
  };

  // Function to handle record editing
  const handleEdit = (record) => {
    setSelectedRowValues(record);
    setIsModalOpen(true);
    editForm.setFieldsValue({
      fullName: record.name,
      email: record.email,
      contactNumber: record.contactNumber,
      address: record.address,
      role: record.role,
    });
  };

  // Function to handle record update
  const handleUpdate = async (values) => {
  try {

    setIsLoading(true);
    const { error } = await supabase
      .from('users')
      .update({
        username: values.fullName,
        email: values.email,
        contact_number: values.contactNumber,
        address: values.address,
        role: values.role,
      })
      .eq('id', selectedRowValues.key);

    
      if (error) {
        setIsLoading(false);
        throw error;
      }
25

    // Update frontend data
    const updatedData = data.map((item) =>
      item.key === selectedRowValues.key
        ? { ...item, ...values, key: selectedRowValues.key }
        : item
    );
    setData(updatedData);
    setIsModalOpen(false);
    editForm.resetFields();
    
    
    api.success({ message: 'Record updated successfully!' });
  } catch (err) {
    
    console.error('Error updating record:', err.message);
    api.error({
      message: 'Error updating record',
      description: err.message,
    });
  }
};


  // Function to handle adding a new user
  const handleAdd = async (values) => {
    try {
      setIsLoading(true);
      const { data, error } = await supabaseAdmin.auth.admin.createUser({
        email: values.email,
        password: values.password,
        email_confirm: true,
        user_metadata: {
          role: values.role,
          username: values.fullName,
          contactNumber: values.contactNumber,
          address: values.address,
        },
      });

      if (error) {
        setIsLoading(false);
        throw error;
      }

      const newUser = {
        username: values.fullName,
        email: values.email,
        contact_number: values.contactNumber,
        address: values.address,
        role: values.role,
      };

     

      setData([...data, { ...newUser, key: data.length + 1 }]);
      setIsLoading(false);
      setIsAddModalOpen(false);
      addForm.resetFields();
      api.success({ message: "User added successfully!" });
    } catch (err) {
      console.error("Error adding user:", err.message);
      setIsLoading(false);
      api.error({
        message: "Error adding user",
        description: err.message,
      });
    }
  };

  // Show Add User modal
  const showAddModal = () => {
    setIsAddModalOpen(true);
  };

  return (
    <Container>
      {contextHolder}
      <HeaderContainer>
        <HeaderTitle>Manage Users</HeaderTitle>
        <ButtonContainer>
          <AddButton
            type="primary"
            icon={<PlusOutlined />}
            onClick={showAddModal}
          >
            Add User
          </AddButton>
        </ButtonContainer>
      </HeaderContainer>
      <StyledTable
        columns={columns}
        dataSource={data}
        rowKey="key"
        pagination={false}
        scroll={{ y: 500 }}
      />
      <Modal
        title="Edit Record"
        open={isModalOpen}
        okText="Update"
        cancelText="Cancel"
        onCancel={() => setIsModalOpen(false)}
        onOk={() => {
          editForm
            .validateFields()
            .then((values) => handleUpdate(values))
            .catch((info) => console.error("Validate Failed:", info));
        }}
      >
        <Form form={editForm} layout="vertical">
          <Form.Item
            name="fullName"
            label="Full Name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Please enter your email" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="contactNumber"
            label="Contact Number"
            rules={[{ required: true, message: "Please enter a contact number" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="address"
            label="Address"
            rules={[{ required: true, message: "Please enter the address" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="role"
            label="Role"
            rules={[{ required: true, message: "Please select a role" }]}
          >
            <Select>
              <Select.Option value="admin">Admin</Select.Option>
              <Select.Option value="moderator">Clerk</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      {/* Add User Modal */}
      <Modal
        title="Add User"
        open={isAddModalOpen}
        okText="Add"
        cancelText="Cancel"
        onCancel={() => setIsAddModalOpen(false)}
        onOk={() => {
          addForm
            .validateFields()
            .then((values) => handleAdd(values))
            .catch((info) => console.error("Validate Failed:", info));
        }}
        confirmLoading={isLoading}
      >
        <Form form={addForm} layout="vertical">
          <Form.Item
            name="fullName"
            label="Full Name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Please enter your email" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="contactNumber"
            label="Contact Number"
            rules={[{ required: true, message: "Please enter a contact number" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="address"
            label="Address"
            rules={[{ required: true, message: "Please enter the address" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="role"
            label="Role"
            rules={[{ required: true, message: "Please select a role" }]}
          >
            <Select>
              <Select.Option value="admin">Admin</Select.Option>
              <Select.Option value="moderator">Clerk</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </Container>
  );
};


const Container = styled.div`
  position: absolute;
  top: 60px;
  left: 200px;
  right: 0;
  bottom: 0;
  padding: 20px;
  background-color: transparent;
  overflow: auto;

  @media (max-width: 768px) {
    left: 0;
    padding: 10px;
  }
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
  color: #313260;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const AddButton = styled(Button)`
  background-color: #1890ff;
  color: #fff;
  border: none;

  &:hover {
    background-color: #40a9ff;
  }
`;

const StyledTable = styled(AntTable)`
  .ant-table {
    width: 100%;
    max-width: 100%;
    border: 1px solid #ddd;
    border-radius: 8px;
  }

  .ant-table-thead > tr > th {
    background-color: #d2d7c1;
    color: #313260;
    font-weight: 900;
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


export default Users;
