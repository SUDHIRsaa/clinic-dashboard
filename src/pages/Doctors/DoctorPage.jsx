import React from 'react';
import { Box, Tabs, TabList, TabPanels, Tab, TabPanel, Button } from '@chakra-ui/react';
import MedicalHistory from './MedicalHistory';
import VitalsAndExamination from './VitalsAndExamination';

const DoctorPage = ({ patient, onBack }) => { 
  return (
    <Box p={5}>
      {/* Back Button */}
      <Button onClick={onBack} colorScheme="teal" mb={6}>
        Back to Appointments
      </Button>
      
      {/* Styled Tabs as Navbar */}
      <Tabs isFitted variant="unstyled">
        {/* Remove the bottom border of TabList */}
        <TabList mb="1em">
          <Tab
            _selected={{
              color: "white",
              bg: "teal.400",
              borderRadius: "md",
              boxShadow: "md",
            }}
            _hover={{ bg: "blue.100", color: "blue.600" }}  // Different hover background and text color
            color="teal.600"
            fontWeight="bold"
            px={6}
            py={2}
            border="1px solid teal"
            mx={2}
            borderRadius="md"
            transition="all 0.2s ease"
          >
            Medical History
          </Tab>
          <Tab
            _selected={{
              color: "white",
              bg: "teal.400",
              borderRadius: "md",
              boxShadow: "md",
            }}
            _hover={{ bg: "blue.100", color: "blue.600" }}  // Different hover background and text color
            color="teal.600"
            fontWeight="bold"
            px={6}
            py={2}
            border="1px solid teal"
            mx={2}
            borderRadius="md"
            transition="all 0.2s ease"
          >
            Vitals and General Examination
          </Tab>
        </TabList>

        {/* Tab Panels */}
        <TabPanels>
          <TabPanel>
            <MedicalHistory />
          </TabPanel>
          <TabPanel>
            <VitalsAndExamination />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default DoctorPage;
