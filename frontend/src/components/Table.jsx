import React, { useState } from "react";
import { Table as AntTable, Badge, Button, Popconfirm, Modal, Form } from "antd";
import { EditFilled, DeleteFilled } from "@ant-design/icons";
import styled from "styled-components";
import UpdateForm from "./UpdateForm";

const StyledBadgeRibbon = styled(Badge.Ribbon)`
    .ant-badge-ribbon {
        color: #fff;
        font-weight: bold;
        margin: 0 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
    }
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
`;

const StyledTable = styled(AntTable)`
    .ant-table-thead > tr > th {
        background-color: #ffe4e1;
        color: #333;
        font-weight: 600;
    }

    .ant-table-tbody > tr:nth-child(odd) {
        background-color: #4ba1e7;
    }

    .ant-table-tbody > tr:nth-child(even) {
        background-color: #f4e04d;
    }

    .ant-table-cell {
        padding: 16px;
    }
`;

const generateFilters = (data, key) => {
    const uniqueValues = Array.from(new Set(data.map((item) => item[key]))).filter((value) => value);
    return uniqueValues.map((value) => ({ text: value, value }));
};

const Table = (props) => {
    const [data, setData] = useState(props.data);
    const [editingRecord, setEditingRecord] = useState(null);
    const [isModalOpen, setisModalOpen] = useState(false);
    const [form] = Form.useForm();

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
                <StyledBadgeRibbon
                    text={fees === "Paid" ? "Paid" : "Unpaid"}
                    color={fees === "Paid" ? "lime" : "volcano"}
                />
            ),
        },
        {
            title: "Action",
            key: "action",
            render: (text, record) => (
                <span style={{ display: "flex", gap: "0.5rem", alignItems: "center", justifyContent: "center" }}>
                    <Popconfirm
                        title="Are you sure to delete this student?"
                        onConfirm={() => handleDelete(record.key)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="link" icon={<DeleteFilled style={{ color: "#BD1B0F" }} />} />
                    </Popconfirm>
                    <Button
                        icon={<EditFilled style={{ color: "green" }} />}
                        onClick={() => console.log({ record })}
                        style={{ marginRight: 8 }}
                    />
                </span>
            ),
        },
    ];

    const onChange = (pagination, filters, sorter, extra) => {
        console.log("params", pagination, filters, sorter, extra);
    };

    const handleEdit = (record) => {
        setEditingRecord(record);
        setisModalOpen(true);
    };

    const handleDelete = (key) => {
        console.log(`Deleting record with key: ${key}`);
        const newData = props.data.filter((item) => item.key !== key);
        console.log("Updated data:", newData);
        props.setData(newData);
    };

    const handleUpdate = (values) => {
        const newData = data.map((item) => (item.key === editingRecord.key ? { ...item, ...values } : item));
        setData(newData);
        setisModalOpen(false);
        setEditingRecord(null);
    };

    return (
        <>
            <StyledTable columns={columns} dataSource={props.data} rowKey="key" />
            <Modal
                title="Edit Student"
                open={isModalOpen}
                okText="Update"
                cancelText="Cancel"
                onCancel={() => setisModalOpen(false)}
                onOk={() => form.submit()}
            >
                <Form layout="vertical" initialValues={editingRecord} onFinish={handleUpdate}></Form>
                <UpdateForm />
            </Modal>
        </>
    );
};

export default Table;
