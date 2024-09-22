import React, { useMemo, useRef } from 'react';
import { useTable, usePagination } from 'react-table';
import html2pdf from 'html2pdf.js';

const AllNurses = () => {
  const data = useMemo(
    () => [
      { id: 1, name: 'Nurse Adams', phone: '123-456-7890' },
      { id: 2, name: 'Nurse Brown', phone: '234-567-8901' },
      { id: 3, name: 'Nurse Johnson', phone: '345-678-9012' },
    ],
    []
  );

  const columns = useMemo(
    () => [
      { Header: 'Nurse ID', accessor: 'id' },
      { Header: 'Nurse Name', accessor: 'name' },
      { Header: 'Phone', accessor: 'phone' },
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
      filename: 'nurses_list.pdf',
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'pt', format: 'a4', orientation: 'portrait' },
    };
    html2pdf().from(element).set(options).save();
  };

  return (
    <div className="p-4 bg-white shadow dark:bg-white min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Nurses List</h2>

      <div className="mb-4 flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
        <button onClick={handleExportToPDF} className="bg-red-500 text-white px-3 py-2 rounded">
          Export to PDF
        </button>
        <button onClick={() => window.print()} className="bg-blue-500 text-white px-3 py-2 rounded">
          Print
        </button>
      </div>

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

      <div className="flex flex-col md:flex-row justify-between items-center mt-4 space-y-2 md:space-y-0">
        <div className="text-sm">
          Showing {pageIndex + 1} of {pageOptions.length} pages
        </div>
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

export default AllNurses;
