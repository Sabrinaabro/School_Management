import React, { useEffect } from "react";
import Table from "../components/Table";
import styled from "styled-components";
import { useState } from "react";
import { Button, Modal, Form } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import StudentForm from "../components/StudentForm";
import { useNavigate } from "react-router-dom";


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
   
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleAdd = (value) => {
        const newRecord = {
            key: Date.now().toString(),
            name: value.fullName,
            fname: value.parentName,
            gender: value.gender,
            dob: value.dob ? value.dob.format("YYYY-MM-DD") : "",
            classGrade: value.grade,
            contactNumber: value.contactNumber,
            address: value.address,
            fees: "Unpaid",
        };
        setData([...data, newRecord]);
        console.log(value);
        setIsModalOpen(false);
        addForm.resetFields();
    };

    return (
        <>
            <Container>
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
