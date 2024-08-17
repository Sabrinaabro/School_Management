import React from 'react';
import { Table as AntTable, Button  } from 'antd';
import { EditFilled, DeleteFilled  } from '@ant-design/icons';
import styled from 'styled-components';

const StyledTable = styled(AntTable)`
  .ant-table-thead > tr > th {
    background-color: #FFE4E1; 
    color: #333;
    font-weight: 1600; 
  }

  .ant-table-tbody > tr:nth-child(odd) {
    background-color: #4BA1E7; 
  }

  .ant-table-tbody > tr:nth-child(even) {
    background-color: #F4E04D; 
  }

  .ant-table-cell {
    padding: 16px; 
  }
`;


const generateFilters = (data, key) => {
  const uniqueValues = Array.from(new Set(data.map(item => item[key]))).filter(value => value);
  return uniqueValues.map(value => ({ text: value, value }));
};

const Table = (props) => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      filters: generateFilters(props.data, 'name'),
      filterSearch: true,
      onFilter: (value, record) => record.name.includes(value),
      sorter: (a, b) => a.name.localeCompare(b.name),
      width: '15%',
    },
    {
      title: 'Guardian Name',
      dataIndex: 'fname',
      filters: generateFilters(props.data, 'fname'),
      filterSearch: true,
      onFilter: (value, record) => record.fname.includes(value),
      sorter: (a, b) => a.fname.localeCompare(b.fname),
      width: '20%',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      filters: generateFilters(props.data, 'gender'),
      filterSearch: true,
      onFilter: (value, record) => record.gender === value,
      width: '10%',
    },
    {
      title: 'Date of Birth',
      dataIndex: 'dob',
      sorter: (a, b) => new Date(a.dob) - new Date(b.dob),
      width: '15%',
    },
    {
      title: 'Grade',
      dataIndex: 'classGrade',
      filters: generateFilters(props.data, 'classGrade'),
      filterSearch: true,
      onFilter: (value, record) => record.classGrade === value,
      width: '10%',
    },
    {
      title: 'Contact Number',
      dataIndex: 'contactNumber',
      filters: generateFilters(props.data, 'contactNumber'),
      filterSearch: true,
      onFilter: (value, record) => record.contactNumber.includes(value),
      width: '20%',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      filters: generateFilters(props.data, 'address'),
      filterSearch: true,
      onFilter: (value, record) => record.address.includes(value),
      width: '25%',
    },

    {
      title: 'Status  ',
      dataIndex: 'fees',
      filters: generateFilters(props.data, 'fees'),
      filterSearch: true,
      onFilter: (value, record) => record.fees === value,
      width: '10%',
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <span style={{ display: "flex", gap: "0.5rem", alignItems: "center", justifyContent: "center" }}>
          <Button icon={<DeleteFilled style={{ color: '#BD1B0F' }} />} onClick={() => handleDelete(record)} />
          <Button icon={<EditFilled style={{ color: 'green' }} />} onClick={() => handleEdit(record)} style={{ marginRight: 8 }} />
        </span>
      ),
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  const handleEdit = (record) => {
    console.log('Edit:', record);
  };

  const handleDelete = (record) => {
    console.log('Delete:', record);
  };



  return (
    <>
      <StyledTable columns={columns} dataSource={props.data} onChange={onChange} />
    </>
  );
};

export default Table;
