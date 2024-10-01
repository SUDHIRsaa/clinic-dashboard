import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Grid,
  VStack,
  Alert,
  AlertIcon,
  Heading,
  useToast,
  Container,
  InputGroup,
  InputLeftElement,
  Input,
  Select,
  Flex, // Import Flex
} from '@chakra-ui/react';
import { MdPerson, MdPhone, MdEmail, MdBadge, MdRoom } from 'react-icons/md';
import { FaHospitalAlt, FaUserNurse } from 'react-icons/fa';
import { AiOutlineClockCircle } from 'react-icons/ai';

const AddNurse = () => {
  const initialFormData = {
    nurseId: '',
    firstName: '',
    middleName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    department: '',
    shift: '',
    ward: '',
  };

  const initialWorkingDetails = {
    ward: '',
    shift: '',
    bed: '',
    room: '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [workingDetails, setWorkingDetails] = useState(initialWorkingDetails);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showWorkingDetails, setShowWorkingDetails] = useState(false);
  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleWorkingDetailsChange = (e) => {
    const { name, value } = e.target;
    setWorkingDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const validate = () => {
    const requiredFields = ['nurseId', 'firstName', 'lastName', 'phoneNumber', 'department', 'shift', 'ward'];
    const newErrors = requiredFields.reduce((acc, field) => {
      if (!formData[field]) acc[field] = `${field.replace(/([A-Z])/g, ' $1')} is required`;
      return acc;
    }, {});
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validate();
    if (Object.keys(formErrors).length === 0) {
      setSuccessMessage('Nurse Added Successfully!');
      setErrorMessage('');
      setErrors({});
      setShowWorkingDetails(true);
      toast({
        title: 'Success!',
        description: 'Nurse Added.',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    } else {
      setSuccessMessage('');
      setErrorMessage('Please fill in the required fields.');
      setErrors(formErrors);
    }
  };

  const renderFormControl = (label, name, type = 'text', placeholder, isSelect = false, options = [], icon = null) => (
    <FormControl isInvalid={errors[name]}>
      <FormLabel mb={2}>{label}</FormLabel>
      <InputGroup>
        {icon && (
          <InputLeftElement
            pointerEvents="none"
            children={icon}
            style={{ paddingLeft: '12px', color: 'teal', height: '100%', display: 'flex', alignItems: 'center' }}
          />
        )}
        {isSelect ? (
          <Select
            name={name}
            value={formData[name]}
            onChange={handleChange}
            placeholder={placeholder}
            focusBorderColor="teal"
            bg="gray.100"
            paddingLeft={icon ? '40px' : '16px'} // Added padding left for the icon
            _hover={{ bg: 'white' }}
          >
            {options.map((option) => (
              <option key={option} value={option} style={{ padding: '8px' }}>
                {option}
              </option>
            ))}
          </Select>
        ) : (
          <Input
            type={type}
            name={name}
            placeholder={placeholder}
            value={formData[name]}
            onChange={handleChange}
            focusBorderColor="teal.400"
            paddingLeft={icon ? '40px' : '16px'} // Added padding left for the icon
          />
        )}
      </InputGroup>
      <FormErrorMessage>{errors[name]}</FormErrorMessage>
    </FormControl>
  );

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
    <Container maxW="full" p={0} minH="100vh"> {/* Set minH to full height */}
      <Flex direction="column" justify="center" align="center" h="100%">
        <Box w="full" bg="white" py={8}>
          <Box maxW="container.xl" mx="auto" p={6} bg="white" rounded="lg" shadow="lg">
            <Heading as="h2" size="lg" textAlign="center" color="black" mb={6}>
              Add Nurse
            </Heading>
            <form onSubmit={handleSubmit}>
              <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={6}>
                {renderFormControl('Nurse ID', 'nurseId', 'text', 'Nurse ID', false, [], <MdBadge color="teal" />)}
                {renderFormControl('First Name', 'firstName', 'text', 'First Name', false, [], <MdPerson color="teal" />)}
                {renderFormControl('Middle Name', 'middleName', 'text', 'Middle Name', false, [], <MdPerson color="teal" />)}
                {renderFormControl('Last Name', 'lastName', 'text', 'Last Name', false, [], <MdPerson color="teal" />)}
                {renderFormControl('Phone Number', 'phoneNumber', 'text', 'Phone Number', false, [], <MdPhone color="teal" />)}
                {renderFormControl('Email', 'email', 'email', 'Email', false, [], <MdEmail color="teal" />)}
                {renderFormControl('Department', 'department', 'text', 'Department', false, [], <FaHospitalAlt color="teal" />)}
                {renderFormControl('Shift', 'shift', 'text', 'Select Shift', true, ['Day', 'Night'], <AiOutlineClockCircle color="teal" />)}
                {renderFormControl('Ward', 'ward', 'text', 'Select Ward', true, wards, <FaUserNurse color="teal" />)}
              </Grid>
              <Button type="submit" colorScheme="teal" mt={6} w="full" _hover={{ bg: 'teal' }}>
                Add Nurse
              </Button>
            </form>
            {successMessage && (
              <Alert status="success" mt={4} rounded="md">
                <AlertIcon />
                {successMessage}
              </Alert>
            )}
            {errorMessage && (
              <Alert status="error" mt={4} rounded="md">
                <AlertIcon />
                {errorMessage}
              </Alert>
            )}
          </Box>
        </Box>

        {showWorkingDetails && (
          <Box mt={6} bg="white" p={6} rounded="lg" shadow="lg">
            <Heading as="h3" size="md" mb={4}>
              Nurse Working Details
            </Heading>
            <VStack spacing={4} align="stretch">
              {renderFormControl('Ward', 'ward', 'text', 'Ward', false, [], <FaUserNurse color="teal.500" />)}
              {renderFormControl('Shift', 'shift', 'text', 'Select Shift', true, ['Day', 'Night'], <AiOutlineClockCircle color="teal.500" />)}
              {renderFormControl('Bed', 'bed', 'text', 'Bed', false, [], <MdRoom color="teal.500" />)}
              {renderFormControl('Room', 'room', 'text', 'Room', false, [], <MdRoom color="teal" />)}
            </VStack>
            <Button colorScheme="teal" mt={4} w="full" _hover={{ bg: 'teal.600' }}>
              Save Working Details
            </Button>
          </Box>
        )}
      </Flex>
    </Container>
  );
};

export default AddNurse;
