import React, { useState } from "react";
import { Table as AntTable, Button, Popconfirm, Modal, Form } from "antd";
import { EditFilled, DeleteFilled } from "@ant-design/icons";
import styled from "styled-components";
import UpdateForm from "./UpdateForm";
import { TableBadge } from "./styled/Badge";

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
const generateFilters = (data, key) => {
    const uniqueValues = Array.from(new Set(data.map((item) => item[key]))).filter((value) => value);
    return uniqueValues.map((value) => ({ text: value, value }));
};

const Table = (props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRowValues, setSelectedRowValues] = useState({});
    const [form] = Form.useForm();
    const [editForm] = Form.useForm();

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            filters: generateFilters(props.data, "name"),
            filterSearch: true,
            onFilter: (value, record) => record.name.includes(value),
            sorter: (a, b) => a.name.localeCompare(b.name),
            width: "15%",
        },
        {
            title: "Guardian Name",
            dataIndex: "fname",
            filters: generateFilters(props.data, "fname"),
            filterSearch: true,
            onFilter: (value, record) => record.fname.includes(value),
            sorter: (a, b) => a.fname.localeCompare(b.fname),
            width: "20%",
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
            width: "15%",
        },
        {
            title: "Grade",
            dataIndex: "classGrade",
            filters: generateFilters(props.data, "classGrade"),
            filterSearch: true,
            onFilter: (value, record) => record.classGrade === value,
            width: "10%",
        },
        {
            title: "Contact Number",
            dataIndex: "contactNumber",
            filters: generateFilters(props.data, "contactNumber"),
            filterSearch: true,
            onFilter: (value, record) => record.contactNumber.includes(value),
            width: "20%",
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
            title: "Status",
            dataIndex: "fees",
            filters: generateFilters(props.data, "fees"),
            filterSearch: true,
            onFilter: (value, record) => record.fees === value,
            width: "10%",
            render: (fees) => (
                <TableBadge text={fees === "Paid" ? "Paid" : "Unpaid"} color={fees === "Paid" ? "lime" : "volcano"} />
            ),
        },
        {
            title: "Action",
            key: "action",
            render: (text, record) => (
                <span style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                    <Popconfirm
                        title="Are you sure to delete this student?"
                        onConfirm={() => handleDelete(record.key)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button
                            type="link"
                            icon={
                                <DeleteFilled style={{ color: "#BD1B0F", border: "none", background: "transparent" }} />
                            }
                        />
                    </Popconfirm>
                    <Button
                        icon={<EditFilled style={{ color: "green" }} />}
                        onClick={() => handleEdit(record)}
                        style={{ marginRight: 8, border: "none", background: "transparent" }}
                    />
                </span>
            ),
        },
    ];

    const handleDelete = (key) => {
        console.log(`Deleting record with key: ${key}`);
        const newData = props.data.filter((item) => item.key !== key);
        props.setData(newData);
    };

    const handleEdit = (record) => {
        setSelectedRowValues(record);
        setIsModalOpen(true);
        editForm.setFieldsValue({
            fullName: record.name,
            parentName: record.fname,
            gender: record.gender,
            dob: record.dob ? moment(record.dob, "YYYY-MM-DD") : null,
            grade: record.classGrade,
            contactNumber: record.contactNumber,
            address: record.address,
        });
    };

    return (
        <>
            <StyledTable columns={columns} dataSource={props.data} rowKey="key" pagination={false} />
            <Modal
                title="Edit Student"
                open={isModalOpen}
                okText="Update"
                cancelText="Cancel"
                onCancel={() => setIsModalOpen(false)}
                footer={false}
            >
                <UpdateForm handleEdit={handleEdit} form={editForm} selectedRowValues={selectedRowValues} />
            </Modal>
        </>
    );
};

export default Table;
