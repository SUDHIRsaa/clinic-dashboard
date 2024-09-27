// AppointmentPage.jsx
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
} from '@chakra-ui/react';
import { FaWhatsapp } from 'react-icons/fa';

const AppointmentPage = () => {
  // Dummy data for appointments
  const appointments = [
    {
      patient: 'Ramesh Patel',
      contact: '+91 8649 32154',
      location: 'Physical',
      slot: '4:30 pm - 5:30 pm',
      paymentStatus: 'Pending',
      bedRequired: null, // null means not decided yet
    },
    // Add more as necessary
  ];

  const [bedRequiredStatus, setBedRequiredStatus] = useState(
    appointments.map(() => null)
  );

  const handleBedRequirement = (index, status) => {
    const updatedStatus = [...bedRequiredStatus];
    updatedStatus[index] = status;
    setBedRequiredStatus(updatedStatus);
  };

  return (
    <Box p={5} bg="gray.50" minH="100vh">
      <Heading as="h1" size="lg" mb={2}>
        Welcome, Dr. Ajit Bhalla
      </Heading>
      <Text color="gray.500">Your Smart Clinic is ready to use.</Text>

      <Flex mt={6} mb={4} alignItems="center">
        <Text mr={4}>Appointment status</Text>
        <CircularProgress value={40} size="70px" color="green.400">
          <CircularProgressLabel>Ongoing 4/10</CircularProgressLabel>
        </CircularProgress>
      </Flex>

      <Heading as="h2" size="md" mb={4}>
        Upcoming Appointments
      </Heading>

      <Box overflowX="auto">
        <Table variant="simple" size="md">
          <Thead bg="green.100">
            <Tr>
              <Th>Patient</Th>
              <Th>Contact</Th>
              <Th>Location</Th>
              <Th>Slot</Th>
              <Th>Payment Status</Th>
              <Th>Action</Th>
              <Th>Bed Required?</Th>
            </Tr>
          </Thead>
          <Tbody>
            {appointments.map((appointment, index) => (
              <Tr key={index}>
                <Td>{appointment.patient}</Td>
                <Td>{appointment.contact}</Td>
                <Td>{appointment.location}</Td>
                <Td>{appointment.slot}</Td>
                <Td>{appointment.paymentStatus}</Td>
                <Td>
                  <IconButton
                    colorScheme="whatsapp"
                    icon={<FaWhatsapp />}
                    aria-label="Contact via WhatsApp"
                  />
                </Td>
                <Td>
                  <Flex gap={2}>
                    <Button
                      colorScheme={bedRequiredStatus[index] === 'yes' ? 'green' : 'gray'}
                      onClick={() => handleBedRequirement(index, 'yes')}
                    >
                      Yes
                    </Button>
                    <Button
                      colorScheme={bedRequiredStatus[index] === 'no' ? 'red' : 'gray'}
                      onClick={() => handleBedRequirement(index, 'no')}
                    >
                      No
                    </Button>
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      <Button mt={6} colorScheme="teal" variant="link">
        View all
      </Button>
    </Box>
  );
};

export default AppointmentPage;
