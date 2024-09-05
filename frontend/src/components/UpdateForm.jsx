import React, { useEffect, useState } from "react";
import { Button, DatePicker, Form, Input, Radio, Select, Typography } from "antd";
import styled from "styled-components";
import dayjs from "dayjs";

const { TextArea } = Input;
const { Option } = Select;
const { Title } = Typography;

const UpdateForm = ({ selectedRowValues, handleEdit }) => {
    const [editForm] = Form.useForm();
    const [componentDisabled, setComponentDisabled] = useState(false);

    useEffect(() => {
        if (selectedRowValues && editForm) {
            editForm.setFieldsValue({
                name: selectedRowValues.name,
                gender: selectedRowValues.gender,
                dob: selectedRowValues.dob ? dayjs(selectedRowValues.dob) : null,
                grade: selectedRowValues.grade,
                parent: selectedRowValues.parent,
                contact: selectedRowValues.contact,
                address: selectedRowValues.address,
                gr_no: selectedRowValues.gr_no,
            });
        }
    }, [selectedRowValues, editForm]);

    return (
        <PageWrapper>
            <FormWrapper>
                <Title level={2} style={{ textAlign: "center", marginBottom: "20px", color: "#333" }}>
                    Update Student Information
                </Title>

                <Form
                    form={editForm}
                    labelCol={{ span: 11 }}
                    wrapperCol={{ span: 16 }}
                    layout="horizontal"
                    onFinish={handleEdit}
                    disabled={componentDisabled}
                >
                    <Form.Item
                        label="Full Name"
                        name="name"
                        rules={[{ required: true, message: "Please enter the student's full name" }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Gender"
                        name="gender"
                        rules={[{ required: true, message: "Please select the student's gender" }]}
                    >
                        <Radio.Group>
                            <Radio value="male">Male</Radio>
                            <Radio value="female">Female</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item
                        label="Date of Birth"
                        name="dob"
                        rules={[{ required: true, message: "Please select the student's date of birth" }]}
                    >
                        <DatePicker style={{ width: "100%" }} />
                    </Form.Item>

                    <Form.Item
                        label="Grade"
                        name="grade"
                        rules={[{ required: true, message: "Please select the student's grade" }]}
                    >
                        <Select placeholder="Select Grade" style={{ width: "100%" }}>
                            <Option value="1">Pre-Nursery</Option>
                            <Option value="2">Nursery</Option>
                            <Option value="3">KinderGarden</Option>
                            <Option value="4">Grade 1</Option>
                            <Option value="5">Grade 2</Option>
                            <Option value="6">Grade 3</Option>
                            <Option value="7">Grade 4</Option>
                            <Option value="8">Grade 5</Option>
                            <Option value="9">Grade 6</Option>
                            <Option value="10">Grade 7</Option>
                            <Option value="11">Grade 8</Option>
                            <Option value="12">Grade 9</Option>
                            <Option value="13">Grade 10</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Parent/Guardian Name"
                        name="parent"
                        rules={[{ required: true, message: "Please enter the parent/guardian's name" }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Contact Number"
                        name="contact"
                        rules={[{ required: true, message: "Please enter the contact number" }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Address"
                        name="address"
                        rules={[{ required: true, message: "Please enter the address" }]}
                    >
                        <TextArea rows={4} />
                    </Form.Item>

                    <Form.Item
                        label="GR Number"
                        name="gr_no"
                        rules={[{ required: true, message: "Please enter the GR number" }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
                        <ButtonWrapper>
                            <SubmitButton type="primary" htmlType="submit">
                                Update Student
                            </SubmitButton>
                        </ButtonWrapper>
                    </Form.Item>
                </Form>
            </FormWrapper>
        </PageWrapper>
    );
};

export default UpdateForm;

const PageWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: auto;
    background: #fff;
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

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 130px;
`;

const SubmitButton = styled(Button)`
    background-color: #1890ff;
    border-color: #1890ff;
    width: 100%;
    max-width: 200px;
    &:hover {
        background-color: #40a9ff;
        border-color: #40a9ff;
    }
`;
