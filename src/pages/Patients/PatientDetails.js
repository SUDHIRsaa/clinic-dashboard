import React from "react";
import { useTable } from "react-table";
import { FaPrint, FaFilePdf, FaUser, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import html2pdf from 'html2pdf.js';

// Example Patient Details
const patientDetails = {
  name: "Daniel Smith",
  dob: "26-10-1989",
  gender: "Male",
  address: "Koramangala, Bangalore, India",
  phone: "+91 11111 11111",
  email: "your@email.com"
};

// Example Visit Data
const visitData = [
  { doctorName: "Manoj Kumar", cost: "$30", date: "12-03-2018", status: "Rescheduled" },
  { doctorName: "Riya", cost: "$26", date: "12-10-2018", status: "Operation" },
  { doctorName: "Paul", cost: "$46", date: "12-11-2018", status: "Fever" },
];

// Example Payment Data
const paymentData = [
  { date: "12-03-2018", cost: "$300", discount: "15%", paymentType: "Check", status: "Pending" },
  { date: "12-03-2018", cost: "$130", discount: "5%", paymentType: "Credit Card", status: "Completed" },
];

// Table component
const Table = ({ columns, data }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

  return (
    <table {...getTableProps()} className="min-w-full table-auto bg-white rounded-lg shadow-md">
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()} className="bg-gray-700 text-white">
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()} className="px-4 py-2 text-left">{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} className="border-b hover:bg-gray-100">
              {row.cells.map(cell => (
                <td {...cell.getCellProps()} className="px-4 py-2">{cell.render('Cell')}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

const PatientDetails = () => {
  const visitColumns = React.useMemo(
    () => [
      { Header: "Doctor Name", accessor: "doctorName" },
      { Header: "Cost", accessor: "cost" },
      { Header: "Visit Date", accessor: "date" },
      { Header: "Status", accessor: "status" },
    ],
    []
  );

  const paymentColumns = React.useMemo(
    () => [
      { Header: "Date", accessor: "date" },
      { Header: "Cost", accessor: "cost" },
      { Header: "Discount", accessor: "discount" },
      { Header: "Payment Type", accessor: "paymentType" },
      { Header: "Status", accessor: "status" },
    ],
    []
  );

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    const element = document.getElementById("pdf-content");
    html2pdf()
      .from(element)
      .save("patient-details.pdf");
  };

  return (
    <div className="container mx-auto p-6 bg-white" id="pdf-content">
      {/* Action Buttons */}
      <div className="flex  mb-6">
        <button
          onClick={handlePrint}
          className="flex items-center px-4 py-2 text-white bg-blue-600 rounded shadow-lg hover:bg-blue-700 transition duration-200"
        >
          <FaPrint className="mr-2" /> Print
        </button>
        <button
          onClick={handleDownloadPDF}
          className="flex items-center px-4 ml-10 py-2 text-white bg-red-600 rounded shadow-lg hover:bg-red-700 transition duration-200"
        >
          <FaFilePdf className="mr-2" /> Download PDF
        </button>
      </div>

     
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Patient Details</h2>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <table className="min-w-full">
            <tbody>
              {Object.entries(patientDetails).map(([key, value]) => (
                <tr key={key} className="border-b">
                  <td className="px-4 py-2 font-semibold text-gray-600">{key.charAt(0).toUpperCase() + key.slice(1)}:</td>
                  <td className="px-4 py-2">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Patient Visits</h2>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <Table columns={visitColumns} data={visitData} />
        </div>
      </div>

      {/* Patient Payment Transactions */}
      <div>
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Patient Payment Transactions</h2>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <Table columns={paymentColumns} data={paymentData} />
        </div>
      </div>
    </div>
  );
};

export default PatientDetails;
