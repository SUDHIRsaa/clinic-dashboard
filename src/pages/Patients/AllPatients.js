import React, { useMemo, useRef, useState } from 'react';
import { useTable, usePagination } from 'react-table';
import html2pdf from 'html2pdf.js';
import { FaSearch, FaPrint, FaFilePdf, FaFilter, FaCalendarAlt } from 'react-icons/fa';
import { Input, InputGroup, InputRightElement, Button, Flex, Select } from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AllPatients = () => {
  // States for filters
  const [searchTerm, setSearchTerm] = useState('');
  const [gender, setGender] = useState('');
  const [startDate, setStartDate] = useState(null);

  // Sample Data
  const data = useMemo(
    () => [
      { id: 1, name: 'Manoj Kumar', age: 30, phone: '333-444-7777', lastVisit: '12-03-2018', gender: 'Male', status: 'Completed' },
      { id: 2, name: 'Riya', age: 26, phone: '3423-232-987', lastVisit: '12-10-2018', gender: 'Female', status: 'Pending' },
      { id: 3, name: 'Paul', age: 46, phone: '3423-132-987', lastVisit: '45-10-2018', gender: 'Male', status: 'Cancelled' },
    ],
    []
  );

  // Filtered data based on the search term, gender, and date
  const filteredData = useMemo(() => {
    return data.filter((patient) => {
      const matchesName = patient.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesGender = gender === '' || patient.gender === gender;
      const matchesDate =
        !startDate ||
        new Date(patient.lastVisit).toLocaleDateString() === new Date(startDate).toLocaleDateString();

      return matchesName && matchesGender && matchesDate;
    });
  }, [data, searchTerm, gender, startDate]);

  const columns = useMemo(
    () => [
      { Header: 'Patient ID', accessor: 'id' },
      { Header: 'Patient Name', accessor: 'name' },
      { Header: 'Age', accessor: 'age' },
      { Header: 'Phone', accessor: 'phone' },
      { Header: 'Last Visit', accessor: 'lastVisit' },
      { Header: 'Gender', accessor: 'gender' },
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
      data: filteredData,
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
      <h2 className="text-2xl font-bold mb-4">Patients List</h2>

      {/* Search, Gender, Date Picker, and Filter Button in a Flex container */}
      <Flex mb={4} direction={{ base: 'column', md: 'row' }} gap={4} align="center">
        <InputGroup width={{ base: '100%', md: '250px' }}>
          <Input
            placeholder="Search by patient name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <InputRightElement>
            <Button variant="ghost" onClick={() => setSearchTerm('')}>
              <FaSearch />
            </Button>
          </InputRightElement>
        </InputGroup>

        <Select
          placeholder="Select Gender"
          width={{ base: '100%', md: '200px' }}
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </Select>

        <InputGroup width={{ base: '100%', md: '200px' }}>
          <DatePicker
          
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="dd-MM-yyyy"
            placeholderText="Select Date"
            customInput={
              <Input
                placeholder="Select Date"
                icon={<FaCalendarAlt />}
              />
            }
          />
        </InputGroup>

        <Button w={300} colorScheme="green" leftIcon={<FaFilter />}>
          Filter
        </Button>
      </Flex>

     
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
          <Button onClick={() => previousPage()} disabled={!canPreviousPage} size="sm">
            Previous
          </Button>
          {pageOptions.map((_, idx) => (
            <Button
              key={idx}
              onClick={() => gotoPage(idx)}
              size="sm"
              colorScheme={idx === pageIndex ? 'pink' : 'gray'}
            >
              {idx + 1}
            </Button>
          ))}
          <Button onClick={() => nextPage()} disabled={!canNextPage} size="sm">
            Next
          </Button>
        </div>
      </div>

     
      <Flex mt={4} justify="space-between">
        <Button onClick={handleExportToPDF} colorScheme="red" leftIcon={<FaFilePdf />}>
          Export to PDF
        </Button>
        <Button onClick={() => window.print()} colorScheme="blue" leftIcon={<FaPrint />}>
          Print
        </Button>
      </Flex>
    </div>
  );
};

export default AllPatients;
