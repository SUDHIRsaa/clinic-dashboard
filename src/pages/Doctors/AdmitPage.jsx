import React from 'react';
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Select,
  InputGroup,
  InputLeftElement,
  Flex,
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faWeightHanging,
  faRulerVertical,
  faNotesMedical,
  faHeartbeat,
  faPrescriptionBottleAlt,
  faUserNurse,
  faAllergies,
} from '@fortawesome/free-solid-svg-icons'; 
import { useLocation } from 'react-router-dom';

const AdmitPage = () => {
  const location = useLocation();
  const { patient } = location.state || { patient: 'Unknown' };

  // List of wards
  const wards = [
    'Emergency Department (ED)',
    'Intensive Care Unit (ICU)',
    'General Wards',
    'Maternity Ward',
    'Surgical Wards',
    'Pediatrics Ward',
    'Specialty Wards',
    'Rehabilitation Unit',
    'Isolation or Infectious Disease Unit',
    'Psychiatric Unit',
    'Step-Down Units (Intermediate Care)',
    'Discharge Lounge',
    'Day Surgery/Outpatient Units',
  ];

  return (
    <Box p={8} bg="white" minH="100vh">
      <Box p={6} bg="white">
        <Heading as="h2" size="xl" mb={6} color="teal.500">
          Admit Patient: {patient}
        </Heading>

        {/* Flex container for weight and height */}
        <Flex mb={4} gap={4}>
          {/* Patient's Weight */}
          <FormControl>
            <FormLabel>Weight (kg)</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none" color="teal.500">
                <FontAwesomeIcon icon={faWeightHanging} />
              </InputLeftElement>
              <Input
                type="number"
                placeholder="Enter patient's weight"
                focusBorderColor="teal.500"
                border="1px solid black"
                pl="2.5rem"
              />
            </InputGroup>
          </FormControl>

          {/* Patient's Height */}
          <FormControl>
            <FormLabel>Height (cm)</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none" color="teal.500">
                <FontAwesomeIcon icon={faRulerVertical} />
              </InputLeftElement>
              <Input
                type="number"
                placeholder="Enter patient's height"
                focusBorderColor="teal.500"
                border="1px solid black"
                pl="2.5rem"
              />
            </InputGroup>
          </FormControl>
        </Flex>

        {/* Ward Selection */}
        <FormControl mb={4}>
          <FormLabel>Ward</FormLabel>
          <Select placeholder="Select ward" focusBorderColor="teal.500" border="1px solid black">
            {wards.map((ward) => (
              <option key={ward} value={ward}>
                {ward}
              </option>
            ))}
          </Select>
        </FormControl>

        {/* Flex container for Reason for Admission and Vital Signs */}
        <Flex mb={4} gap={4}>
          {/* Admission Reason */}
          <FormControl>
            <FormLabel>Reason for Admission</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none" color="teal.500">
                <FontAwesomeIcon icon={faNotesMedical} />
              </InputLeftElement>
              <Textarea
                placeholder="Enter reason for admission"
                focusBorderColor="teal.500"
                border="1px solid black"
                pl="2.5rem"
              />
            </InputGroup>
          </FormControl>

          {/* Vital Signs */}
          <FormControl>
            <FormLabel>Vital Signs</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none" color="teal.500">
                <FontAwesomeIcon icon={faHeartbeat} />
              </InputLeftElement>
              <Textarea
                placeholder="Enter vital signs (e.g., BP, HR, Temp)"
                focusBorderColor="teal.500"
                border="1px solid black"
                pl="2.5rem"
              />
            </InputGroup>
          </FormControl>
        </Flex>

        {/* Flex container for Medical History and Current Medications */}
        <Flex mb={4} gap={4}>
          {/* Medical History */}
          <FormControl>
            <FormLabel>Medical History</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none" color="teal.500">
                <FontAwesomeIcon icon={faUserNurse} />
              </InputLeftElement>
              <Textarea
                placeholder="Enter patient's medical history"
                focusBorderColor="teal.500"
                border="1px solid black"
                pl="2.5rem"
              />
            </InputGroup>
          </FormControl>

          {/* Current Medications */}
          <FormControl>
            <FormLabel>Current Medications</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none" color="teal.500">
                <FontAwesomeIcon icon={faPrescriptionBottleAlt} />
              </InputLeftElement>
              <Textarea
                placeholder="List current medications"
                focusBorderColor="teal.500"
                border="1px solid black"
                pl="2.5rem"
              />
            </InputGroup>
          </FormControl>
        </Flex>

        {/* Allergies */}
        <FormControl mb={4}>
          <FormLabel>Allergies</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none" color="teal.500">
              <FontAwesomeIcon icon={faAllergies} />
            </InputLeftElement>
            <Textarea
              placeholder="List any known allergies"
              focusBorderColor="teal.500"
              border="1px solid black"
              pl="2.5rem"
            />
          </InputGroup>
        </FormControl>

        <Button colorScheme="teal" mt={4}>
          Admit Patient
        </Button>
      </Box>
    </Box>
  );
};

export default AdmitPage;
