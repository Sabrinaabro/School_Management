// src/components/exportToExcel.jsx
import * as XLSX from "xlsx";

export const exportToExcel = (data, fileName = "StudentData.xlsx") => {
  if (!data || !data.length) {
    alert("No data to export");
    return;
  }

  // Prepare data for Excel export
  const formattedData = data.map((item) => ({
    Name: item.name,
    Parent: item.parent,
    Gender: item.gender,
    "Date of Birth": item.dob,
    Grade: item.grade,
    Contact: item.contact,
    Address: item.address,
    "GR Number": item.gr_no,
  }));

  // Create a new workbook and add a worksheet
  const worksheet = XLSX.utils.json_to_sheet(formattedData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Students");

  // Write the Excel file and trigger download
  XLSX.writeFile(workbook, fileName);
};
