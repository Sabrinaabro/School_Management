import React from "react";
import styled from "styled-components";
import { Row, Col, Button } from "antd";
import logo from "/src/assets/evas.jpg";
import ublLogo from "/src/assets/ubl.png";

const ChallanContainer = styled.div`
  @font-face {
    font-family: 'Active Heart';
    src: url('/src/assets/fonts/SUSE-Regular.ttf') format('truetype');
  }

  @font-face {
    font-family: 'Agrandir Regular';
    src: url('/src/assets/fonts/Agrandir-Regular.otf') format('truetype');
  }

  @font-face {
    font-family: 'Proxima Nova Regular';
    src: url('/src/assets/fonts/ProximaNova-Regular.ttf') format('truetype');
  }

  width: 100%;
  max-width: 1200px; 
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  text-align: center;
  color: #333;
  overflow: hidden;

  @media print {
    .no-print {
      display: none;
    }
  }

  .header {
    text-align: center;
    margin-bottom: 10px;

    .logo-container {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 10px;

      .ubl-logo {
        height: 40px;
        margin-right: 10px;
      }

      .school-logo {
        height: 40px;
        margin-left: 70px;
      }
    }

    .school-name {
      font-family: 'Active Heart';
      font-size: 14px;
      font-weight: bold;
      color: #313260;
    }

    .bank-name {
      font-family: 'Agrandir Regular';
      font-size: 11px; 
      font-weight: bold;
      margin-bottom: 5px;
      margin-left: 45px;
      text-align: center;
      white-space: normal; 
      line-height: 1.2; 
    }

    p {
      margin: 0;
      font-family: 'Active Heart'; 
      font-weight: bold;
      font-size: 12px;
      text-align: left;
    }
  }

  .challan-details {
    text-align: left;
    margin-top: 10px;

    p {
      font-family: 'Proxima Nova Regular';
      font-size: 10px;
    }

    table {
      width: 100%;
      margin-top: 20px;
      border-collapse: collapse;

      th,
      td {
        border: 1px solid #313260;
        padding: 8px;
        text-align: left;
        font-family: 'Proxima Nova Regular';
        font-size: 10px;
      }

      th {
        background-color: #f5f5f5;
        font-weight: bold;
        font-size: 12px;
      }
    }
  }

  .footer {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    font-size: 10px;
    font-family: 'Proxima Nova Regular';
  }
`;

const Challan = ({ student = {} }) => {
  const { name, fname, classGrade, grNumber } = student;

  return (
    <ChallanContainer>
      <Row gutter={16}>
        {["Bank Copy", "School Copy", "Student Copy"].map((copy, index) => (
          <Col span={8} key={index}>
            <div className="header">
              <div className="logo-container">
                <img src={ublLogo} alt="UBL Logo" className="ubl-logo" />
                <div className="bank-name">
                  <span>BANK</span><br />
                  <span>CHALLAN</span>
                </div>
                <img src={logo} alt="School Logo" className="school-logo" />
              </div>
              <div className="school-name">
                <span>EVA'S ACADEMY,</span><br />
                <span>HYDERABAD</span>
              </div>
              <p>A/C NO.</p>
            </div>
            <div className="challan-details">
              <p><strong>Name:</strong> {name}</p>
              <p><strong>Father's Name:</strong> {fname}</p>
              <p><strong>Grade:</strong> {classGrade}</p>
              <p><strong>Gr Number:</strong> {grNumber}</p>
              <table>
                <thead>
                  <tr>
                    <th>PARTICULARS</th>
                    <th>AMOUNT</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1. Tuition Fee:</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>2. Late Fee:</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>3. Net Payment (Before Due Date):</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>4. Net Payment (After Due Date):</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: 'right', paddingRight: '10px' }}>Arrears:</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: 'right', paddingRight: '10px' }}>Total Amount (PKR):</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td style={{ border: 'none' }}>Amount in Words:</td>
                    <td style={{ border: 'none' }}></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="footer">
              <div>Issue Date: __________</div>
              <div>Due Date: __________</div>
            </div>
            <div className="footer">
              <div>School Accountant</div>
              <div>Bank Stamp</div>
            </div>
            <div style={{ marginTop: "20px", textAlign: "center" }}>
              {copy}
            </div>
          </Col>
        ))}
      </Row>
      <Button type="primary" onClick={() => window.print()} className="no-print">
        Print Challan
      </Button>
    </ChallanContainer>
  );
};

export default Challan;
