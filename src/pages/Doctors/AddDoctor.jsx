import React, { useState } from 'react';
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  Select,
  Flex,
  VStack,
  Text,
  IconButton,
  useToast,
} from '@chakra-ui/react';
import { FaTrash } from 'react-icons/fa';

const AddDoctor = () => {
  const [formData, setFormData] = useState({
    doctorId: '',
    fullName: '',
    specialty: '',
    phone: '',
    email: '',
    address: '',
    gender: '',
  });
  const [errors, setErrors] = useState({});
  const [showSlots, setShowSlots] = useState(false);
  const [days, setDays] = useState([false, false, false, false, false, false, false]);
  const [slots, setSlots] = useState([{ startMinute: null, endMinute: null }]);
  const [showPreview, setShowPreview] = useState(false);
  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.doctorId) newErrors.doctorId = 'Doctor ID is required';
    if (!formData.fullName) newErrors.fullName = 'Full Name is required';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.specialty) newErrors.specialty = 'Specialty is required';

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validate();
    if (Object.keys(formErrors).length === 0) {
      setShowSlots(true);
      setErrors({});
    } else {
      toast({
        title: 'Error.',
        description: 'Please check all required fields.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      setErrors(formErrors);
    }
  };

  const handleDayToggle = (index) => {
    const updatedDays = [...days];
    updatedDays[index] = !updatedDays[index];
    setDays(updatedDays);
  };

  const handleSlotChange = (index, field, value) => {
    const updatedSlots = [...slots];
    updatedSlots[index][field] = value;
    setSlots(updatedSlots);
  };

  const addSlot = () => {
    setSlots([...slots, { startMinute: null, endMinute: null }]);
  };

  const removeSlot = (index) => {
    const updatedSlots = slots.filter((_, i) => i !== index);
    setSlots(updatedSlots);
  };

  const handleSave = () => {
    setShowPreview(true);
    toast({
      title: 'Schedule saved!',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
  };

  const renderSlots = () => (
    <Box mt={4}>
      {slots.map((slot, index) => (
        <Flex key={index} mb={2} alignItems="center">
          <Select
            placeholder="Start Minute"
            value={slot.startMinute}
            onChange={(e) => handleSlotChange(index, 'startMinute', e.target.value)}
            width="100px"
          >
            {[0, 15, 30, 45].map((minute) => (
              <option key={minute} value={minute}>
                {minute < 10 ? `0${minute}` : minute}
              </option>
            ))}
          </Select>
          <Text mx={2}>to</Text>
          <Select
            placeholder="End Minute"
            value={slot.endMinute}
            onChange={(e) => handleSlotChange(index, 'endMinute', e.target.value)}
            width="100px"
          >
            {[0, 15, 30, 45].map((minute) => (
              <option key={minute} value={minute}>
                {minute < 10 ? `0${minute}` : minute}
              </option>
            ))}
          </Select>
          <IconButton
            icon={<FaTrash />}
            onClick={() => removeSlot(index)}
            aria-label="Remove Slot"
            variant="outline"
            colorScheme="red"
            ml={2}
          />
        </Flex>
      ))}
      <Button mt={2} onClick={addSlot} variant="link" colorScheme="blue">
        Add Slot
      </Button>
    </Box>
  );

  const renderPreview = () => {
    const selectedDays = days.map((d, i) => (d ? 'SMTWTFS'[i] : '')).filter((d) => d);

    return (
      <Box mt={4}>
        <Text fontSize="lg" fontWeight="bold">
          Schedule Preview
        </Text>
        {selectedDays.length > 0 ? (
          selectedDays.map((day, i) => (
            <Box key={i} mb={4}>
              <Text fontWeight="bold" mb={2}>
                {day} - Slots:
              </Text>
              {slots.map((slot, index) => (
                <Text key={index}>
                  {slot.startMinute !== null ? `${slot.startMinute}` : 'N/A'} - {slot.endMinute !== null ? `${slot.endMinute}` : 'N/A'}
                </Text>
              ))}
            </Box>
          ))
        ) : (
          <Text>No days selected</Text>
        )}
        <Button mt={4} colorScheme="blue" onClick={handleSave}>
          Save Schedule
        </Button>
        <Button mt={4} colorScheme="blue" onClick={() => setShowPreview(false)}>
          Back
        </Button>
      </Box>
    );
  };

  return (
    <VStack spacing={0} p={8} bg="gray.100">
      <Box bg="white" p={8} boxShadow="md" rounded="md" width="100%" h="screen">
        {!showSlots ? (
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <FormControl isInvalid={errors.doctorId}>
                <FormLabel>Doctor ID</FormLabel>
                <Input
                  name="doctorId"
                  value={formData.doctorId}
                  onChange={handleChange}
                  placeholder="Doctor ID"
                />
                {errors.doctorId && <Text color="red.500">{errors.doctorId}</Text>}
              </FormControl>

              <FormControl isInvalid={errors.fullName}>
                <FormLabel>Full Name</FormLabel>
                <Input
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Full Name"
                />
                {errors.fullName && <Text color="red.500">{errors.fullName}</Text>}
              </FormControl>

              <FormControl isInvalid={errors.specialty}>
                <FormLabel>Specialty</FormLabel>
                <Input
                  name="specialty"
                  value={formData.specialty}
                  onChange={handleChange}
                  placeholder="Specialty"
                />
                {errors.specialty && <Text color="red.500">{errors.specialty}</Text>}
              </FormControl>

              <FormControl isInvalid={errors.phone}>
                <FormLabel>Phone</FormLabel>
                <Input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone"
                />
                {errors.phone && <Text color="red.500">{errors.phone}</Text>}
              </FormControl>

              <FormControl isInvalid={errors.email}>
                <FormLabel>Email</FormLabel>
                <Input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                />
                {errors.email && <Text color="red.500">{errors.email}</Text>}
              </FormControl>

              <FormControl isInvalid={errors.address}>
                <FormLabel>Address</FormLabel>
                <Input
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Address"
                />
                {errors.address && <Text color="red.500">{errors.address}</Text>}
              </FormControl>

              <FormControl isInvalid={errors.gender}>
                <FormLabel>Gender</FormLabel>
                <Select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  placeholder="Select Gender"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </Select>
                {errors.gender && <Text color="red.500">{errors.gender}</Text>}
              </FormControl>

              <Button type="submit" colorScheme="blue">Next</Button>
            </VStack>
          </form>
        ) : showPreview ? (
          <Box className='h-screen'>
            {renderPreview()}
          </Box>
        ) : (
          <Box className='h-screen'>
            <Text fontSize="lg" fontWeight="bold">Select Days</Text>
            <Flex mt={4}>
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
                <Button
                  key={index}
                  onClick={() => handleDayToggle(index)}
                  colorScheme={days[index] ? 'green' : 'gray'}
                  variant="solid"
                  mx={1}
                >
                  {day}
                </Button>
              ))}
            </Flex>
            {renderSlots()}
            <Button mt={4} colorScheme="blue" onClick={() => setShowPreview(true)}>
              Preview Schedule
            </Button>
          </Box>
        )}
      </Box>
    </VStack>
  );
};

export default AddDoctor;
