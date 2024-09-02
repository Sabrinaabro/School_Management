import React, { useRef } from "react";
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
      position: relative;

      .ubl-logo-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-right: 100px;
      }

      .ubl-logo {
        height: 40px;
      }

      .bank-name {
        font-family: 'Agrandir Regular';
        font-size: 11px; 
        font-weight: bold;
        margin-top: 5px; 
        text-align: center;
        white-space: normal; 
        line-height: 1.2; 
      }

      .school-logo {
        height: 55px;
        margin-left: 70px;
      }
    }

    .school-name {
      font-family: 'Active Heart';
      font-size: 14px;
      font-weight: bold;
      color: #313260;
    }

    p {
      margin: 0;
      font-family: 'Active Heart'; 
      font-weight: regular;
      font-size: 12px;
      text-align: center;
      margin-bottom: 25px;
    }
  }

  .challan-details {
    text-align: left;
    margin-top: 20px;

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
  const challanRef = useRef(null);
  const { name, parent, grade, gr_no } = student;

  const printChallan = () => {
    const printContents = challanRef.current.innerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload(); // To refresh the page and restore original content
  };

  return (
    <div ref={challanRef}>
      <ChallanContainer>
        <Row gutter={16}>
          {["Bank Copy", "School Copy", "Student Copy"].map((copy, index) => (
            <Col span={8} key={index}>
              <div className="header">
                <div className="logo-container">
                  <div className="ubl-logo-container">
                    <img src={ublLogo} alt="UBL Logo" className="ubl-logo" />
                    <div className="bank-name">
                      <span>PV NO.</span>
                    </div>
                  </div>
                  <img src={logo} alt="School Logo" className="school-logo" />
                </div>
                <div className="school-name">
                  <span>EVA'S ACADEMY,</span><br />
                  <span>HYDERABAD</span>
                </div>
                <p>UBL A/C NO. 314359562</p>
              </div>
              <div className="challan-details">
                <p><strong>Name:</strong> {name}</p>
                <p><strong>Father's Name:</strong> {parent}</p>
                <p><strong>Grade:</strong> {grade}</p>
                <p><strong>GR No:</strong> {gr_no}</p>
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
                      <td>2. Net Payment (Before Due Date):</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>3. Net Payment (After Due Date):</td>
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
                      <td style={{ textAlign: 'right', paddingRight: '10px' }}>Late Fee After Due Date:</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: 'right', paddingRight: '10px' }}>Total Amount After Late Fee:</td>
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
                <div>Expiry Date: __________</div>
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
        <Button type="primary" onClick={printChallan} className="no-print">
          Print Challan
        </Button>
      </ChallanContainer>
    </div>
  );
};

export default Challan;
