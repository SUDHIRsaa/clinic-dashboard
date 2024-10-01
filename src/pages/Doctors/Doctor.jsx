import React, { useState } from 'react';
import {
  Box,
  Flex,
  Text,
  Heading,
  CircularProgress,
  CircularProgressLabel,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  IconButton,
  Icon,
} from '@chakra-ui/react';
import { FaWhatsapp, FaClipboardList } from 'react-icons/fa';
import { MdEventAvailable } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import DoctorPage from './DoctorPage';

const AppointmentPage = () => {
  const appointments = [
    {
    patient: 'Ramesh Patel',
    contact: '+91 8649 32154',
    location: 'Physical',
    slot: '4:30 pm - 5:30 pm',
    paymentStatus: 'Pending',
  },
  {
    patient: 'Amit Verma',
    contact: '+91 9876 54321',
    location: 'Virtual',
    slot: '3:00 pm - 4:00 pm',
    paymentStatus: 'Completed',
  },
  {
    patient: 'Priya Singh',
    contact: '+91 7654 32198',
    location: 'Physical',
    slot: '5:30 pm - 6:30 pm',
    paymentStatus: 'Pending',
  },
  ];

  const [selectedPatient, setSelectedPatient] = useState(null);
  const navigate = useNavigate();

  const handleAdmit = (patient) => {
    navigate('/admit', { state: { patient } }); 
  };

  if (selectedPatient) {
    return <DoctorPage patient={selectedPatient} onBack={() => setSelectedPatient(null)} />;
  }
  return (

    <Box p={8} bg="gray.50" minH="100vh">
     <Box mb={10} textAlign="center" p={6} bg="teal.50" borderRadius="md" boxShadow="md">
        <Heading size="xl" color="teal.600" mb={4}>
          Welcome, Ayush
        </Heading>
        <Text fontSize="lg" color="gray.600" fontWeight="medium">
          Your Smart Clinic is ready to use.
        </Text>
      </Box>
      <Flex justifyContent="space-around" mb={10} alignItems="center" bg="gray.100" p={6} borderRadius="md" boxShadow="lg">
        {/* Status Info */}
        <Flex direction="column" alignItems="center">
          <Icon as={MdEventAvailable} boxSize={12} color="teal.500" mb={2} />
          <Text fontSize="xl" fontWeight="bold" color="gray.700">
            4 Ongoing
          </Text>
          <Text color="gray.500">of 10 Total Appointments</Text>
        </Flex>
        
        {/* Circular Progress */}
        <CircularProgress value={40} size="150px" thickness="12px" color="teal.400" trackColor="gray.200">
          <CircularProgressLabel fontSize="xl" fontWeight="bold" color="teal.600">
            40%
          </CircularProgressLabel>
        </CircularProgress>
        
        
        <Flex direction="column" alignItems="center">
          <Icon as={FaClipboardList} boxSize={12} color="teal.500" mb={2} />
          <Text fontSize="xl" fontWeight="bold" color="gray.700">
            6 Remaining
          </Text>
          <Text color="gray.500">Appointments Pending</Text>
        </Flex>
      </Flex>

      
      <Heading as="h2" size="md" mb={4}>
        Upcoming Appointments
      </Heading>
      <Box overflowX="auto">
        <Table variant="simple" size="md">
          <Thead bg="green.100">
            <Tr>
              {['Patient', 'Contact', 'Location', 'Slot', 'Payment Status', 'Action', 'Admit'].map((header) => (
                <Th key={header}>{header}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {appointments.map((appointment, index) => (
              <Tr key={index}>
                <Td>
                  <Button variant="link" onClick={() => setSelectedPatient(appointment.patient)}>
                    {appointment.patient}
                  </Button>
                </Td>
                {['contact', 'location', 'slot', 'paymentStatus'].map((field) => (
                  <Td key={field}>{appointment[field]}</Td>
                ))}
                <Td>
                  <IconButton colorScheme="whatsapp" icon={<FaWhatsapp />} aria-label="Contact via WhatsApp" />
                </Td>
                <Td>
                  <Button colorScheme="teal" onClick={() => handleAdmit(appointment.patient)}>
                    Admit
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default AppointmentPage;
