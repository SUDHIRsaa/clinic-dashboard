import React, { useMemo, useRef } from 'react';
import { useTable, usePagination } from 'react-table';
import html2pdf from 'html2pdf.js';
import { FaClock, FaCalendarAlt } from 'react-icons/fa';

const AllPatients = () => {
  const data = useMemo(
    () => [
      { id: 1, name: 'Manoj Kumar', age: 30, phone: '333-444-7777', lastVisit: '12-03-2018', status: 'Completed' },
      { id: 2, name: 'Riya', age: 26, phone: '3423-232-987', lastVisit: '12-10-2018', status: 'Pending' },
      { id: 3, name: 'Paul', age: 46, phone: '3423-132-987', lastVisit: '45-10-2018', status: 'Cancelled' },
    ],
    []
  );

  const columns = useMemo(
    () => [
      { Header: 'Patient ID', accessor: 'id' },
      { Header: 'Patient Name', accessor: 'name' },
      { Header: 'Age', accessor: 'age' },
      { Header: 'Phone', accessor: 'phone' },
      { Header: 'Last Visit', accessor: 'lastVisit' },
      {
        Header: 'Status',
        accessor: 'status',
        Cell: ({ value }) => {
          const statusClasses = {
            Completed: 'bg-green-500 text-white px-2 py-1 rounded',
            Pending: 'bg-yellow-500 text-white px-2 py-1 rounded',
            Cancelled: 'bg-red-500 text-white px-2 py-1 rounded',
          };
          return <span className={statusClasses[value]}>{value}</span>;
        },
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    gotoPage,
    nextPage,
    previousPage,
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    usePagination
  );

  const tableRef = useRef(null);

  const handleExportToPDF = () => {
    const element = tableRef.current;
    const options = {
      filename: 'patients_list.pdf',
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'pt', format: 'a4', orientation: 'portrait' },
    };
    html2pdf().from(element).set(options).save();
  };

  return (
    <div className="p-4 bg-white shadow min-h-screen">
      {/* Patient Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
        {/* Today Patients */}
        <div className="bg-white shadow p-4 rounded flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold">Today Patients</h2>
            <p className="text-2xl font-bold">10</p>
            <p className="text-sm text-gray-500">Total Patients 10 today</p>
          </div>
          <div className="bg-green-500 text-white p-3 rounded-full">
            <FaClock size={24} />
          </div>
        </div>

        {/* Monthly Patients */}
        <div className="bg-white shadow p-4 rounded flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold">Monthly Patients</h2>
            <p className="text-2xl font-bold">230</p>
            <p className="text-sm text-gray-500">Total Patients 230 this month</p>
          </div>
          <div className="bg-orange-500 text-white p-3 rounded-full">
            <FaCalendarAlt size={24} />
          </div>
        </div>

        {/* Yearly Patients */}
        <div className="bg-white shadow p-4 rounded flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold">Yearly Patients</h2>
            <p className="text-2xl font-bold">1,500</p>
            <p className="text-sm text-gray-500">Total Patients 1,500 this year</p>
          </div>
          <div className="bg-green-500 text-white p-3 rounded-full">
            <FaCalendarAlt size={24} />
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-4">Patients List</h2>

      <div className="mb-4 flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
        <button onClick={handleExportToPDF} className="bg-red-500 text-white px-3 py-2 rounded">
          Export to PDF
        </button>
        <button onClick={() => window.print()} className="bg-blue-500 text-white px-3 py-2 rounded">
          Print
        </button>
      </div>

      {/* Table container with horizontal scroll on smaller screens */}
      <div className="overflow-x-auto">
        <table ref={tableRef} {...getTableProps()} className="min-w-full border-collapse border border-gray-300">
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()} className="bg-gray-700 text-white font-bold">
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()} className="border px-4 py-2 text-sm sm:text-md">
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()} className="border px-4 py-2 text-sm sm:text-md">
                      {cell.render('Cell')}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-4 space-y-2 md:space-y-0">
        <div className="text-sm">Showing {pageIndex + 1} of {pageOptions.length} pages</div>
        <div className="flex items-center space-x-2">
          <button onClick={() => previousPage()} disabled={!canPreviousPage} className="bg-gray-200 text-gray-700 px-3 py-1 rounded">
            Previous
          </button>
          {pageOptions.map((_, idx) => (
            <button key={idx} onClick={() => gotoPage(idx)} className={`px-3 py-1 rounded ${idx === pageIndex ? 'bg-pink-500 text-white' : 'bg-gray-200 text-gray-700'}`}>
              {idx + 1}
            </button>
          ))}
          <button onClick={() => nextPage()} disabled={!canNextPage} className="bg-gray-200 text-gray-700 px-3 py-1 rounded">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllPatients;
