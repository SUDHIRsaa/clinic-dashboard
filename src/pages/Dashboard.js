import React from 'react';
import { FaUser, FaChartBar, FaDollarSign } from 'react-icons/fa';
import {
  Box,
  Grid,
  Heading,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  SimpleGrid,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from 'recharts';

// Sample data
const lineData = [
  { year: '2016 Q1', appointments: 20 },
  { year: '2016 Q2', appointments: 15 },
  { year: '2016 Q3', appointments: 40 },
  { year: '2016 Q4', appointments: 25 },
  { year: '2017 Q1', appointments: 35 },
  { year: '2017 Q2', appointments: 50 },
  { year: '2018 Q1', appointments: 65 },
];

const barData = [
  { year: '2012', patients: 15 },
  { year: '2013', patients: 30 },
  { year: '2014', patients: 60 },
  { year: '2015', patients: 45 },
  { year: '2016', patients: 25 },
  { year: '2017', patients: 35 },
];

const pieData = [
  { name: 'Completed', value: 45 },
  { name: 'Pending', value: 25 },
  { name: 'Cancelled', value: 30 },
];

const COLORS = ['#00C49F', '#FFBB28', '#FF8042'];

// Reusable StatCard component
const StatCard = ({ icon: Icon, title, value, change, color }) => (
  <Box bg="white" shadow="md" p={4} rounded="md">
    <Box display="flex" alignItems="center">
      <Box
        className={`w-12 h-12 flex justify-center items-center rounded-full ${color} text-white mr-3`}
      >
        <Icon className="text-2xl" />
      </Box>
      <Stat>
        <StatLabel fontSize="lg">{title}</StatLabel>
        <StatNumber fontSize="2xl" fontWeight="bold">{value}</StatNumber>
        <StatHelpText color={change > 0 ? 'green.500' : 'red.500'}>
          {change > 0 ? `+${change}% Increased` : `${change}% Decreased`}
        </StatHelpText>
      </Stat>
    </Box>
  </Box>
);

const Dashboard = () => {
  return (
    <Box p={4}>
      <Heading size="lg" mb={4}>Quick Statistics</Heading>

      <SimpleGrid columns={{ base: 1, sm: 3 }} spacing={4}>
        {/* StatCards for Patients, Appointments, and Revenue */}
        <StatCard
          icon={FaUser}
          title="Patients"
          value="348"
          change={20}
          color="bg-pink-500"
        />
        <StatCard
          icon={FaChartBar}
          title="Appointments"
          value="1585"
          change={-15}
          color="bg-green-500"
        />
        <StatCard
          icon={FaDollarSign}
          title="Total Revenue"
          value="$7300"
          change={10}
          color="bg-orange-500"
        />
      </SimpleGrid>

      {/* Charts Section */}
      <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={4} mt={4}>
        <Box bg="white" shadow="md" p={4} rounded="md">
          <Heading size="sm" mb={2}>Appointments Year by Year</Heading>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={lineData}>
              <Line type="monotone" dataKey="appointments" stroke="#FF69B4" />
              <XAxis dataKey="year" />
              <YAxis />
              <RechartsTooltip />
            </LineChart>
          </ResponsiveContainer>
        </Box>

        <Box bg="white" shadow="md" p={4} rounded="md">
          <Heading size="sm" mb={2}>Patients Year by Year</Heading>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barData}>
              <XAxis dataKey="year" />
              <YAxis />
              <RechartsTooltip />
              <Bar dataKey="patients" fill="#FF8C00" />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </Grid>

      {/* Appointment Table Section */}
      <Box mt={4} bg="white" shadow="md" p={4} rounded="md">
        <Heading size="sm" mb={2}>Appointments</Heading>
        <Box overflowX="auto">
          <Table variant="simple">
            <Thead bg="gray.700">
              <Tr>
                <Th color="white">Patient Name</Th>
                <Th color="white">Doctor</Th>
                <Th color="white">Check-Up</Th>
                <Th color="white">Date</Th>
                <Th color="white">Time</Th>
                <Th color="white">Status</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>Rajesh</Td>
                <Td>Manoj Kumar</Td>
                <Td>Dental</Td>
                <Td>12-10-2018</Td>
                <Td>12:10 PM</Td>
                <Td color="green.500">Completed</Td>
              </Tr>
              <Tr>
                <Td>Riya</Td>
                <Td>Daniel</Td>
                <Td>Ortho</Td>
                <Td>12-10-2018</Td>
                <Td>1:10 PM</Td>
                <Td color="yellow.500">Pending</Td>
              </Tr>
              <Tr>
                <Td>Siri</Td>
                <Td>Daniel</Td>
                <Td>Ortho</Td>
                <Td>12-10-2018</Td>
                <Td>1:30 PM</Td>
                <Td color="red.500">Cancelled</Td>
              </Tr>
            </Tbody>
          </Table>
        </Box>
      </Box>

      {/* PieChart and Doctors Availability Section */}
      <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={4} mt={4}>
        <Box bg="white" shadow="md" p={4} rounded="md">
          <Heading size="sm" mb={2}>Appointments Status</Heading>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={pieData} dataKey="value" outerRadius={100} label>
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <RechartsTooltip />
            </PieChart>
          </ResponsiveContainer>
        </Box>

        <Box bg="white" shadow="md" p={4} rounded="md">
          <Heading size="sm" mb={2}>Doctors Availability</Heading>
          <Box overflowX="auto">
            <Table variant="simple">
              <Thead bg="gray.700">
                <Tr>
                  <Th color="white">Doctor</Th>
                  <Th color="white">Speciality</Th>
                  <Th color="white">Availability</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>Rajesh</Td>
                  <Td>Dental</Td>
                  <Td>Yes</Td>
                </Tr>
                <Tr>
                  <Td>Manoj Kumar</Td>
                  <Td>Ortho</Td>
                  <Td>Yes</Td>
                </Tr>
                <Tr>
                  <Td>Siri</Td>
                  <Td>Cardio</Td>
                  <Td>No</Td>
                </Tr>
              </Tbody>
            </Table>
          </Box>
        </Box>
      </Grid>
    </Box>
  );
};

export default Dashboard;
