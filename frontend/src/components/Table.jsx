import React, { useEffect, useState, useRef } from "react";
import { Table as AntTable, Button, Popconfirm, Modal, Form, Dropdown, Menu } from "antd";
import { EditFilled, DeleteFilled, MoreOutlined } from "@ant-design/icons";
import styled from "styled-components";
import UpdateForm from "./UpdateForm";
import Challan from "./Challan";
import { createClient } from "@supabase/supabase-js";
import { notification } from "antd";
import ReactToPrint from 'react-to-print';

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

const supabase = createClient(import.meta.env.VITE_SUPABASE_PROJECT_URL,
     import.meta.env.VITE_SUPABASE_ANON_KEY);

const generateFilters = (data = [], id) => {
    if (!Array.isArray(data) || !id) return []; 
    const uniqueValues = Array.from(new Set(data.map((item) => item[id]))).filter(
        (value) => value !== undefined && value !== null
    );
    return uniqueValues.map((value) => ({ text: value, value }));
};

const Table = (props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isChallanModalOpen, setIsChallanModalOpen] = useState(false);
    const [selectedRowValues, setSelectedRowValues] = useState({});
    const [selectedRows, setSelectedRows] = useState([]);
    const [editForm] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [notificationInfo, setNotificationInfo] = useState(null);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]); 
    const printRef = useRef(null);


    useEffect(() => {
        if (notificationInfo) {
            const { type, message, description } = notificationInfo;
            if (type === "success") {
                notification.success({ message, description });
            } else if (type === "error") {
                notification.error({ message, description });
            }
            setNotificationInfo(null);
        }
    }, [notificationInfo]);

    const handleDelete = async (record) => {
        try {
            const { error } = await supabase.from("students").delete().eq("id", record.key);
            if (error) throw error;

            props.setData((prevData) => prevData.filter((item) => item.key !== record.key));

            setNotificationInfo({
                type: "success",
                message: "Record deleted successfully!",
            });
        } catch (err) {
            console.error("Error deleting record:", err.message);

            setNotificationInfo({
                type: "error",
                message: "Error deleting record",
                description: err.message,
            });
        }
    };

    const gradeMap = {
        1: "Pre-Nursery",
        2: "Nursery",
        3: "KinderGarden",
        4: "Grade 1",
        5: "Grade 2",
        6: "Grade 3",
        7: "Grade 4",
        8: "Grade 5",
        9: "Grade 6",
        10: "Grade 7",
        11: "Grade 8",
        12: "Grade 9",
        13: "Grade 10"
    };

    const handleUpdate = async (record) => {
        console.log("Selected Row Key:", selectedRowValues.key);
        
        try {
            setIsLoading(true);
    
            const mappedGrade = gradeMap[record.grade] || record.grade; 
    
            const dobDate = new Date(record.dob);
            const formattedDOB = new Date(dobDate.getTime() - dobDate.getTimezoneOffset() * 60000)
                                  .toISOString().split('T')[0];  
    
            const { error, data: dataStu } = await supabase
                .from("students")
                .update({
                    name: record.name,
                    parent: record.parent,
                    gender: record.gender,
                    dob: formattedDOB,  
                    grade: mappedGrade,  
                    contact: record.contact,
                    address: record.address,
                    gr_no: record.gr_no,
                })
                .eq("id", selectedRowValues.key)
                .select("*");
    
            console.log("Data sent to backend:", {
                ...record,
                dob: formattedDOB,
                grade: mappedGrade,
            });
    
            if (error) {
                setIsLoading(false);
                throw error;
            }
    
            const updatedData = props.data.map((item) =>
                item.key === selectedRowValues.key
                    ? { ...item,
                        ...record, grade: mappedGrade, dob: formattedDOB, key: selectedRowValues.key }
                    : item
            );
            props.setData(updatedData);
    
            setIsModalOpen(false);
    
            setNotificationInfo({
                type: "success",
                message: "Record updated successfully!",
            });
        } catch (err) {
            console.error("Error updating record:", err.message);
    
            setNotificationInfo({
                type: "error",
                message: "Error updating record",
                description: err.message,
            });
        } finally {
            setIsLoading(false);
        }
    };
    

    const handleEdit = (record) => {
        console.log("Editing record:", record); 
        setSelectedRowValues(record);
        setIsModalOpen(true);
        editForm.setFieldsValue({
            id: record.key, 
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


    const handleChallanGeneration = () => {
        if (selectedRows.length === 0) {
          notification.error({
            message: "No students selected",
            description: "Please select at least one student to generate challans.",
          });
          return;
        }
    
        setIsChallanModalOpen(true);
      };
    
      const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
          setSelectedRows(selectedRows);
        },
      };

    const menu = (record) => (
        <Menu>
            <Menu.Item key="1" onClick={() => handleEdit(record)}>
                <EditFilled style={{ color: "green" }} /> Edit
            </Menu.Item>
            <Menu.Item key="2">
                <Popconfirm
                    title="Are you sure to delete this student?"
                    onConfirm={() => handleDelete(record)}
                    okText="Yes"
                    cancelText="No"
                >
                    <DeleteFilled style={{ color: "#BD1B0F" }} /> Delete
                </Popconfirm>
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
            width: "15%",
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
        <Button
        type="primary"
        onClick={handleChallanGeneration}
        disabled={selectedRows.length === 0}
        style={{ marginBottom: 16 }}
      >
        Generate Challan
      </Button>
            <StyledTable columns={columns} dataSource={props.data} rowKey="key" pagination={false}
            rowSelection={rowSelection} />
            <Modal
                title="Edit Student"
                open={isModalOpen}
                okText="Update"
                cancelText="Cancel"
                onCancel={() => setIsModalOpen(false)}
                footer={false}
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
            <ReactToPrint
          trigger={() => (
            <Button type="primary" style={{ marginBottom: 16 }}>
              Print All Challans
            </Button>
          )}
          content={() => printRef.current}
          pageStyle={`

    @page {
    size: landscape; 
    margin: 10mm; 
  }

  @media print {
    body {
      background: white !important;
      margin: 0 !important;
      padding: 0 !important;
    }

    #challan-content {
      
      margin: 0 !important;
      padding: 0 !important;
      page-break-inside: avoid;
    }

    .challan {
        page-break-before: always;
        background-color: white !important;
        padding: 20px;
        margin: 0;
        page-break-after: always;
        page-break-inside: avoid;
       
      }
  }
`}
        />

        <div ref={printRef} id="challan-content" style={{ padding: '10px', backgroundColor: 'white' }}>
          {selectedRows.map((student) => (
            <div key={student.key} style={{ pageBreakInside: 'avoid' ,pageBreakAfter: 'always' }}>
              <Challan student={student} />
            </div>
          ))}
        </div>
    
            </Modal>
        </>
    );
};

export default Table;
