import React, { useState } from 'react';
import { Box, Heading, Grid, GridItem, Input, Text } from '@chakra-ui/react';

const VitalsAndExamination = () => {
  const [vitals, setVitals] = useState({
    bloodPressureSystolic: '120',
    bloodPressureDiastolic: '80',
    rbs: '80',
    spo2: '96',
    pulseRate: '80',
    height: '160',
    weight: '60',
  });

  const handleInputChange = (field, value) => {
    setVitals({
      ...vitals,
      [field]: value
    });
  };

  return (
    <Box p={5} border="1px solid #E2E8F0" borderRadius="md">
      <Heading size="md" mb={4}>Vitals</Heading>
      <Grid templateColumns="repeat(4, 1fr)" gap={6}>
        {/* Blood Pressure */}
        <GridItem colSpan={1}>
          <Text>Blood Pressure</Text>
          <Input
            value={vitals.bloodPressureSystolic}
            onChange={(e) => handleInputChange('bloodPressureSystolic', e.target.value)}
            w="60px" mr={2}
          />
          /
          <Input
            value={vitals.bloodPressureDiastolic}
            onChange={(e) => handleInputChange('bloodPressureDiastolic', e.target.value)}
            w="60px" ml={2}
          />
          mm Hg
        </GridItem>

        {/* RBS */}
        <GridItem colSpan={1}>
          <Text>RBS</Text>
          <Input
            value={vitals.rbs}
            onChange={(e) => handleInputChange('rbs', e.target.value)}
          /> mg/dL
        </GridItem>

        {/* SpO2 Levels */}
        <GridItem colSpan={1}>
          <Text>SpO2 Levels</Text>
          <Input
            value={vitals.spo2}
            onChange={(e) => handleInputChange('spo2', e.target.value)}
          /> %
        </GridItem>

        {/* Pulse Rate */}
        <GridItem colSpan={1}>
          <Text>Pulse Rate</Text>
          <Input
            value={vitals.pulseRate}
            onChange={(e) => handleInputChange('pulseRate', e.target.value)}
          /> beats/min
        </GridItem>

        {/* Height */}
        <GridItem colSpan={1}>
          <Text>Height</Text>
          <Input
            value={vitals.height}
            onChange={(e) => handleInputChange('height', e.target.value)}
          /> cm
        </GridItem>

        {/* Weight */}
        <GridItem colSpan={1}>
          <Text>Weight</Text>
          <Input
            value={vitals.weight}
            onChange={(e) => handleInputChange('weight', e.target.value)}
          /> kg
        </GridItem>

        {/* BMI */}
        <GridItem colSpan={2}>
          <Text>Your Body Mass Index is <b>{(vitals.weight / ((vitals.height / 100) ** 2)).toFixed(1)}</b> kg/m²</Text>
          <Text>This is considered <b>Normal</b>.</Text>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default VitalsAndExamination;
