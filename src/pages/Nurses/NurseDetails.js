import React from "react";
import { useTable } from "react-table";
import { FaPrint, FaFilePdf, FaUser, FaPhone, FaEnvelope } from "react-icons/fa";
import html2pdf from 'html2pdf.js';

// Example Nurse Details
const nurseDetails = {
  name: "Emma Johnson",
  dob: "15-05-1990",
  gender: "Female",
  phone: "+91 22222 22222",
  email: "nurse@email.com"
};

// Example Visit Data (for Nurse)
const nurseVisitData = [
  { patientName: "Daniel Smith", date: "12-03-2023", status: "Checked" },
  { patientName: "Alice Brown", date: "12-04-2023", status: "Follow-up" },
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

const NurseDetails = () => {
  const visitColumns = React.useMemo(
    () => [
      { Header: "Patient Name", accessor: "patientName" },
      { Header: "Date", accessor: "date" },
      { Header: "Status", accessor: "status" },
    ],
    []
  );

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    const element = document.getElementById("pdf-content");
    html2pdf().from(element).save("nurse-details.pdf");
  };

  return (
    <div className="container mx-auto p-6 bg-gradient-to-r from-gray-50 to-gray-200" id="pdf-content">
      
      <div className="flex justify-between mb-6">
        <button onClick={handlePrint} className="flex items-center px-4 py-2 text-white bg-blue-600 rounded shadow-lg hover:bg-blue-700 transition duration-200">
          <FaPrint className="mr-2" /> Print
        </button>
        <button onClick={handleDownloadPDF} className="flex items-center px-4 py-2 text-white bg-red-600 rounded shadow-lg hover:bg-red-700 transition duration-200">
          <FaFilePdf className="mr-2" /> Download PDF
        </button>
      </div>

     
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Nurse Details</h2>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <table className="min-w-full">
            <tbody>
              {Object.entries(nurseDetails).map(([key, value]) => (
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
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Nurse Visits</h2>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <Table columns={visitColumns} data={nurseVisitData} />
        </div>
      </div>
    </div>
  );
};

export default NurseDetails;
