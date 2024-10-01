import React, { useState } from 'react';
import { Box, Heading, Text, Grid, GridItem, Input, Textarea, Select, Divider, Button } from '@chakra-ui/react';

const MedicalHistory = () => {
  // State to hold the editable values
  const [medicalHistory, setMedicalHistory] = useState({
    pastHistory: [
      { disease: 'Hypertension', duration: '2', unit: 'years', notes: 'Diagnosed at age 36. Managed with Amlodipine.' },
      { disease: 'Asthma', duration: '10', unit: 'years', notes: 'Occasional use of inhaler.' }
    ],
    familyHistory: [
      { disease: 'Asthma', duration: '10', unit: 'years', notes: 'Occasional use of inhaler.' }
    ],
    allergies: [
      { allergen: 'Sunlight', duration: '4', unit: 'years', notes: 'Exposure to sunlight causes skin disease.' }
    ],
    medicationHistory: [
      { medicine: 'Paracetamol', duration: '10', unit: 'days', notes: 'Intake causes blisters on skin.' }
    ]
  });

  const handleInputChange = (category, index, field, value) => {
    const updatedCategory = [...medicalHistory[category]];
    updatedCategory[index][field] = value;
    setMedicalHistory({
      ...medicalHistory,
      [category]: updatedCategory
    });
  };

  return (
    <Box p={5} border="1px solid #E2E8F0" borderRadius="md">
      <Heading size="md" mb={4}>Medical History</Heading>

      {/* Past History */}
      <Box mb={6}>
        <Heading size="sm" mb={2}>Past History</Heading>
        {medicalHistory.pastHistory.map((item, index) => (
          <Box border="1px solid #E2E8F0" borderRadius="md" p={4} mb={4} key={index}>
            <Grid templateColumns="repeat(5, 1fr)" gap={6}>
              <GridItem colSpan={1}>
                <Input value={item.disease} onChange={(e) => handleInputChange('pastHistory', index, 'disease', e.target.value)} />
                <Input value={item.duration} onChange={(e) => handleInputChange('pastHistory', index, 'duration', e.target.value)} />
                <Select value={item.unit} onChange={(e) => handleInputChange('pastHistory', index, 'unit', e.target.value)}>
                  <option value="days">days</option>
                  <option value="months">months</option>
                  <option value="years">years</option>
                </Select>
              </GridItem>
              <GridItem colSpan={4}>
                <Textarea value={item.notes} onChange={(e) => handleInputChange('pastHistory', index, 'notes', e.target.value)} />
              </GridItem>
            </Grid>
          </Box>
        ))}
      </Box>

      <Divider my={6} />

      {/* Family History */}
      <Box mb={6}>
        <Heading size="sm" mb={2}>Family History</Heading>
        {medicalHistory.familyHistory.map((item, index) => (
          <Box border="1px solid #E2E8F0" borderRadius="md" p={4} mb={4} key={index}>
            <Grid templateColumns="repeat(5, 1fr)" gap={6}>
              <GridItem colSpan={1}>
                <Input value={item.disease} onChange={(e) => handleInputChange('familyHistory', index, 'disease', e.target.value)} />
                <Input value={item.duration} onChange={(e) => handleInputChange('familyHistory', index, 'duration', e.target.value)} />
                <Select value={item.unit} onChange={(e) => handleInputChange('familyHistory', index, 'unit', e.target.value)}>
                  <option value="days">days</option>
                  <option value="months">months</option>
                  <option value="years">years</option>
                </Select>
              </GridItem>
              <GridItem colSpan={4}>
                <Textarea value={item.notes} onChange={(e) => handleInputChange('familyHistory', index, 'notes', e.target.value)} />
              </GridItem>
            </Grid>
          </Box>
        ))}
      </Box>

      <Divider my={6} />

      {/* Allergies */}
      <Box mb={6}>
        <Heading size="sm" mb={2}>Allergies</Heading>
        {medicalHistory.allergies.map((item, index) => (
          <Box border="1px solid #E2E8F0" borderRadius="md" p={4} mb={4} key={index}>
            <Grid templateColumns="repeat(5, 1fr)" gap={6}>
              <GridItem colSpan={1}>
                <Input value={item.allergen} onChange={(e) => handleInputChange('allergies', index, 'allergen', e.target.value)} />
                <Input value={item.duration} onChange={(e) => handleInputChange('allergies', index, 'duration', e.target.value)} />
                <Select value={item.unit} onChange={(e) => handleInputChange('allergies', index, 'unit', e.target.value)}>
                  <option value="days">days</option>
                  <option value="months">months</option>
                  <option value="years">years</option>
                </Select>
              </GridItem>
              <GridItem colSpan={4}>
                <Textarea value={item.notes} onChange={(e) => handleInputChange('allergies', index, 'notes', e.target.value)} />
              </GridItem>
            </Grid>
          </Box>
        ))}
      </Box>

      <Divider my={6} />

      {/* Medication History */}
      <Box mb={6}>
        <Heading size="sm" mb={2}>Medication History</Heading>
        {medicalHistory.medicationHistory.map((item, index) => (
          <Box border="1px solid #E2E8F0" borderRadius="md" p={4} mb={4} key={index}>
            <Grid templateColumns="repeat(5, 1fr)" gap={6}>
              <GridItem colSpan={1}>
                <Input value={item.medicine} onChange={(e) => handleInputChange('medicationHistory', index, 'medicine', e.target.value)} />
                <Input value={item.duration} onChange={(e) => handleInputChange('medicationHistory', index, 'duration', e.target.value)} />
                <Select value={item.unit} onChange={(e) => handleInputChange('medicationHistory', index, 'unit', e.target.value)}>
                  <option value="days">days</option>
                  <option value="months">months</option>
                  <option value="years">years</option>
                </Select>
              </GridItem>
              <GridItem colSpan={4}>
                <Textarea value={item.notes} onChange={(e) => handleInputChange('medicationHistory', index, 'notes', e.target.value)} />
              </GridItem>
            </Grid>
          </Box>
        ))}
      </Box>

      <Button colorScheme="teal" onClick={() => console.log(medicalHistory)}>Save</Button>
    </Box>
  );
};

export default MedicalHistory;
