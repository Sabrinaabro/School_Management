import React, { useState } from "react";
import { Table as AntTable, Button, Popconfirm, Modal, Form, Input, Select, notification } from "antd";
import { EditFilled, DeleteFilled, PlusOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { TableBadge } from "../components/styled/Badge";
import { createClient } from "@supabase/supabase-js";

// using service_role in the admin and anon_key in the non-admin.
const supabase = createClient(import.meta.env.VITE_SUPABASE_PROJECT_URL, import.meta.env.VITE_SUPABASE_ANON_KEY);
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
    const [data, setData] = useState([
        {
            key: "1",
            name: "ABc",
            email: "abc@example.com",
            contactNumber: "564654654654",
            address: "dfdsf df sdfsdf ",
            role: "admin",
        },
        {
            key: "2",
            name: "Jane Doe",
            email: "jane@example.com",
            contactNumber: "66994654",
            address: "Some Address",
            role: "moderator",
        },
    ]);

    const generateFilters = (data, key) => {
        const uniqueValues = Array.from(new Set(data.map((item) => item[key]))).filter((value) => value);
        return uniqueValues.map((value) => ({ text: value, value }));
    };

    // Added a new column becuase we should be able to create admins and clerks in the app.
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
                <TableBadge text={role === "admin" ? "Admin" : "Clerk"} color={role === "admin" ? "lime" : "volcano"} />
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
            role: record.role,
        });
    };

    const handleUpdate = (values) => {
        const updatedData = data.map((item) =>
            item.key === selectedRowValues.key ? { ...item, ...values, key: selectedRowValues.key } : item
        );
        setData(updatedData);
        setIsModalOpen(false);
        editForm.resetFields();
    };

    // use this method everytime you make an API Request.
    const handleAdd = async (values) => {
        try {
            setIsLoading(true);
            const { data, error } = await supabaseAdmin.auth.admin.createUser({
                email: values.email,
                password: values.password,
                user_metadata: {
                    role: values.role,
                    username: values.fullName,
                    contactNumber: values.contactNumber,
                    address: values.address,
                },
            });

            if (error) {
                setIsLoading(false);
                api.open({
                    message: "Something went wrong!",
                    description: `${error.code}: ${error.message}`,
                });
            }

            const newRecord = {
                name: values.fullName,
                email: values.email,
                contactNumber: values.contactNumber,
                address: values.address,
                role: values.role,
            };
            setData([...data, newRecord]);
            setIsLoading(false);
            setIsAddModalOpen(false);
            addForm.resetFields();
        } catch (err) {
            console.log(err);
            setIsLoading(false);
            api.open({
                message: "Something went wrong!",
                description: err.message ? err.message : "Please try again later!",
            });
        }
    };

    const showAddModal = () => {
        setIsAddModalOpen(true);
    };

    return (
        <Container>
            {contextHolder}
            <HeaderContainer>
                <HeaderTitle>Manage Users</HeaderTitle>
                <ButtonContainer>
                    <AddButton type="primary" icon={<PlusOutlined />} onClick={showAddModal}>
                        Add User
                    </AddButton>
                </ButtonContainer>
            </HeaderContainer>
            <StyledTable columns={columns} dataSource={data} rowKey="key" pagination={false} scroll={{ y: 500 }} />
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
                title="Add User"
                open={isAddModalOpen}
                okText={isLoading ? "Adding..." : "Add"}
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
    <Form form={form} layout="vertical">
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
        <Form.Item name="password" label="Password" rules={[{ required: true, message: "Please set the password" }]}>
            <Input placeholder="Enter password" type="password" />
        </Form.Item>
        <Form.Item
            name="contactNumber"
            label="Contact Number"
            rules={[{ required: true, message: "Please enter the contact number" }]}
        >
            <Input placeholder="Enter contact number" />
        </Form.Item>
        <Form.Item name="address" label="Address" rules={[{ required: true, message: "Please enter the address" }]}>
            <Input placeholder="Enter address" />
        </Form.Item>
        <Form.Item name="role" label="Role" rules={[{ required: true, message: "Please select role" }]}>
            <Select
                options={[
                    { value: "admin", label: "Admin" },
                    { value: "moderator", label: "Clerk" },
                ]}
            />
        </Form.Item>
    </Form>
);

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
