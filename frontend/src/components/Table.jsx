import React, { useState } from "react";
import { Table as AntTable, Button, Popconfirm, Modal, Form, Dropdown, Menu } from "antd";
import { EditFilled, DeleteFilled, MoreOutlined } from "@ant-design/icons";
import styled from "styled-components";
import UpdateForm from "./UpdateForm";
import { TableBadge } from "./styled/Badge";
import Challan from "./Challan";
import moment from "moment";
import { createClient } from "@supabase/supabase-js";
import { notification } from "antd";

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

const supabase = createClient(import.meta.env.VITE_SUPABASE_PROJECT_URL, import.meta.env.VITE_SUPABASE_ANON_KEY);

const generateFilters = (data = [], id) => {
    if (!Array.isArray(data) || !id) return []; // Early exit if data isn't an array or key is missing
    const uniqueValues = Array.from(new Set(data.map((item) => item[id]))).filter(
        (value) => value !== undefined && value !== null
    );
    return uniqueValues.map((value) => ({ text: value, value }));
};

const Table = (props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isChallanModalOpen, setIsChallanModalOpen] = useState(false);
    const [selectedRowValues, setSelectedRowValues] = useState({});
    const [api, contextHolder] = notification.useNotification();
    const [editForm] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);

    const handleDelete = async (record) => {
        console.log(record);
        try {
            const { error } = await supabase.from("students").delete().eq("id", record.id);
            if (error) throw error;
            setData(data.filter((item) => item.id !== record.id));
            api.success({ message: "Record deleted successfully!" });
        } catch (err) {
            console.error("Error deleting record:", err.message);
            api.error({ message: "Error deleting record", description: err.message });
        }
    };

    const handleUpdate = async (record) => {
        console.log(selectedRowValues.id);
        try {
            setIsLoading(true);
            const { error, data: dataStu } = await supabase
                .from("students")
                .update({  
            name: record.name,  
            parent: record.parent,  
            gender: record.gender,  
            dob: record.dob,  
            grade: record.grade, 
            contact: record.contact, 
            address: record.address,    
            gr_no: record.gr_no,
                })
                .eq("id", selectedRowValues.id);

            console.log(dataStu, error);

            if (error) {
                setIsLoading(false);
                throw error;
            }

            // Update frontend data
            const updatedData = props.data.map((item) =>
                item.id === selectedRowValues.id ? { ...item, ...record, id: selectedRowValues.id } : item
            );
            props.setData(updatedData);
            setIsModalOpen(false);

            api.success({ message: "Record updated successfully!" });
        } catch (err) {
            console.error("Error updating record:", err.message);
            api.error({
                message: "Error updating record",
                description: err.message,
            });
        }
    };

    const handleEdit = (record) => {
        console.log("Editing record:", record);  // Log the record to confirm data
        setSelectedRowValues(record);
        setIsModalOpen(true);
        editForm.setFieldsValue({
            id: record.key,  // Ensure this matches the field names in the form
            name: record.name,
            parent: record.parent,
            gender: record.gender,
            dob: record.dob,
            grade: record.grade,
            contact: record.contact,
            address: record.address,
            gr_no: record.gr_no,
        });
    };

    const handleChallan = (record) => {
        setSelectedRowValues(record);
        setIsChallanModalOpen(true);
    };

    const menu = (record) => (
        <Menu>
            <Menu.Item key="1" onClick={() => handleEdit(record)}>
                <EditFilled style={{ color: "green" }} /> Edit
            </Menu.Item>
            <Menu.Item key="2">
                <Popconfirm
                    title="Are you sure to delete this student?"
                    onConfirm={() => handleDelete(record.id)}
                    okText="Yes"
                    cancelText="No"
                >
                    <DeleteFilled style={{ color: "#BD1B0F" }} /> Delete
                </Popconfirm>
            </Menu.Item>
            <Menu.Item key="3" onClick={() => handleChallan(record)}>
                Generate Challan
            </Menu.Item>
        </Menu>
    );

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            filters: generateFilters(props.data, "name"),
            filterSearch: true,
            onFilter: (value, record) => record.name.includes(value),
            sorter: (a, b) => a.name.localeCompare(b.name),
            width: "10%",
        },
        {
            title: "Guardian Name",
            dataIndex: "parent",
           
            filters: generateFilters(props.data, "parent"),
            filterSearch: true,
            onFilter: (value, record) => record.parent.includes(value),
            sorter: (a, b) => a.parent.localeCompare(b.parent),
            width: "16%",
        },
        {
            title: "Gender",
            dataIndex: "gender",
            filters: generateFilters(props.data, "gender"),
            filterSearch: true,
            onFilter: (value, record) => record.gender === value,
            width: "10%",
        },
        {
            title: "Date of Birth",
            dataIndex: "dob",
            sorter: (a, b) => new Date(a.dob) - new Date(b.dob),
            width: "12%",
        },
        {
            title: "Grade",
            dataIndex: "grade",
            filters: generateFilters(props.data, "grade"),
            filterSearch: true,
            onFilter: (value, record) => record.grade === value,
            width: "10%",
        },
        {
            title: "Contact Number",
            dataIndex: "contact",
            width: "15%",
        },
        {
            title: "Address",
            dataIndex: "address",
            filters: generateFilters(props.data, "address"),
            filterSearch: true,
            onFilter: (value, record) => record.address.includes(value),
            width: "25%",
        },
        {
            title: "Gr#",
            dataIndex: "gr_no",
            width: "15%",
        },
        // {
        //     title: "Status",
        //     dataIndex: "fees",
        //     filters: generateFilters(props.data, "fees"),
        //     filterSearch: true,
        //     onFilter: (value, record) => record.fees === value,
        //     width: "10%",
        //     render: (fees) => (
        //         <TableBadge text={fees === "Paid" ? "Paid" : "Unpaid"} color={fees === "Paid" ? "lime" : "volcano"} />
        //     ),
        // },
        {
            title: "Action",
            key: "action",
            render: (text, record) => (
                <Dropdown overlay={menu(record)} trigger={["click"]}>
                    <Button type="link" icon={<MoreOutlined style={{ fontSize: "16px", color: "#000" }} />} />
                </Dropdown>
            ),
        },
    ];

    return (
        <>
            <StyledTable columns={columns} dataSource={props.data} rowKey="id" pagination={false} />
            <Modal
                title="Edit Student"
                open={isModalOpen}
                okText="Update"
                cancelText="Cancel"
                onCancel={() => setIsModalOpen(false)}
                footer={false}
                // onOk={() => {
                //     editForm
                //         .validateFields()
                //         .then((values) => handleUpdate(values))
                //         .catch((info) => console.error("Validate Failed:", info));
                // }}
            >
                <UpdateForm handleEdit={handleUpdate} form={editForm} selectedRowValues={selectedRowValues} />
            </Modal>
            <Modal
                open={isChallanModalOpen}
                onCancel={() => setIsChallanModalOpen(false)}
                footer={null}
                header={false}
                width={1200}
            >
                <div id="challan-content">
                    <Challan student={selectedRowValues} />
                </div>
            </Modal>
        </>
    );
};

export default Table;
