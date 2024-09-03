import React, { useEffect } from "react";
import Table from "../components/Table";
import styled from "styled-components";
import { useState } from "react";
import { Button, Modal, Form } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import StudentForm from "../components/StudentForm";
import { useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import { notification } from "antd";
import moment from "moment";

const supabase = createClient(import.meta.env.VITE_SUPABASE_PROJECT_URL, import.meta.env.VITE_SUPABASE_ANON_KEY);

const Dashboard = ({ session }) => {
    const navigate = useNavigate();

    // This will protect our route. User needs to be authenticated in order to access this route
    // useEffect(() => {
    //     if (!session) {
    //         navigate("/login");
    //     }
    // }, [session]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [addForm] = Form.useForm();
    const [data, setData] = useState();
    const [api, contextHolder] = notification.useNotification();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    // Function to fetch data from Supabase
    const fetchData = async () => {
        try {
            const { data, error } = await supabase.from("students").select("*");
            console.log({ data });
            if (error) throw error;
            setData(
                data.map((item) => ({
                    key: item.id,
                    name: item.name,
                    parent: item.parent,
                    gender: item.gender,
                    dob: item.dob,
                    grade: item.grade,
                    contact: item.contact,
                    address: item.address,
                    gr_no: item.gr_no,
                }))
            );
        } catch (err) {
            console.error("Error fetching data:", err.message);
        }
    };

    const showModal = () => {
        setIsModalOpen(true);
    };

    // Function to handle adding a new user
    const handleAdd = async (record) => {
        try {
            setIsLoading(true);
            const { data: newData, error } = await supabase
                .from("students")
                .insert({
                    name: record.fullName,
                    parent: record.parentName,
                    gender: record.gender,
                    dob: record.dob,
                    grade: record.grade,
                    contact: record.contactNumber,
                    address: record.address,
                    gr_no: record.grNumber,
                })
                .select("*");

            if (error) {
                setIsLoading(false);
                throw error;
            }

            setData((prevData) => [newData[0], ...prevData]);
            setIsLoading(false);
            setIsModalOpen(false);
            addForm.resetFields();
            api.success({ message: "Student added successfully!" });
        } catch (err) {
            console.error("Error adding student:", err.message);
            setIsLoading(false);
            api.error({
                message: "Error adding student",
                description: err.message,
            });
        }
    };

    return (
        <>
            <Container>
                {contextHolder}
                <HeaderContainer>
                    <HeaderTitle>Student List</HeaderTitle>
                    <ButtonContainer>
                        <AddButton icon={<PlusOutlined />} onClick={showModal}>
                            Add Student
                        </AddButton>
                    </ButtonContainer>
                </HeaderContainer>
                <Table data={data} setData={setData} />
                <Modal title="Add Student" open={isModalOpen} footer={false} onCancel={() => setIsModalOpen(false)}>
                    <StudentForm handleAdd={handleAdd} form={addForm} />
                </Modal>
            </Container>
        </>
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
    width: 100%;
    padding: 0 10px;
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

const ButtonContainer = styled.div`
    display: flex;
    margin-right: 10px;
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

export default Dashboard;
