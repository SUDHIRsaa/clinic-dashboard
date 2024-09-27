import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  FaUser,
  FaStethoscope,
  FaBed,
  FaChartBar,
  FaClipboardList,
  FaClipboardCheck,
  FaUserFriends,
  FaPills,
  FaChevronDown,
  FaChevronUp, // For dropdown toggle icons
} from 'react-icons/fa';
import { Box, Icon, List, ListItem, Text, VStack, Collapse, Flex } from '@chakra-ui/react';

const menuItems = [
  { label: 'Dashboard', icon: FaChartBar, path: '/' },
  {
    label: 'Patients',
    icon: FaUser,
    subMenu: [
      { label: 'Add Patient', icon: FaUser, path: '/patients/add' },
      { label: 'All Patients', icon: FaUserFriends, path: '/patients/all' },
      { label: 'Patient Details', icon: FaUser, path: '/patients/details' },
    ],
  },
  {
    label: 'Doctors',
    icon: FaStethoscope,
    subMenu: [
      { label: 'Add Doctor', icon: FaStethoscope, path: '/doctors/add' },
      { label: 'All Doctors', icon: FaStethoscope, path: '/doctors/all' },
      { label: 'Doctor Details', icon: FaStethoscope, path: '/doctors/details' },
    ],
  },
  {
    label: 'Nurses',
    icon: FaUser,
    subMenu: [
      { label: 'Add Nurse', icon: FaUser, path: '/nurses/add' },
      { label: 'All Nurses', icon: FaUserFriends, path: '/nurses/all' },
      { label: 'Nurse Details', icon: FaUser, path: '/nurses/details' },
    ],
  },
  {
    label: 'Room Allotments',
    icon: FaBed,
    subMenu: [
      { label: 'Rooms', icon: FaBed, path: '/room' },
      { label: 'Beds', icon: FaBed, path: '/wards' },
    ],
  },
  {
    label: 'Appointments',
    icon: FaClipboardList,
    subMenu: [
      { label: 'Book Appointment', icon: FaClipboardList, path: '/appointments/add' },
      { label: 'All Appointments', icon: FaClipboardList, path: '/appointments/all' },
    ],
  },
  {
    label: 'Receptions',
    icon: FaUserFriends,
    subMenu: [{ label: 'All Receptions', icon: FaUserFriends, path: '/receptions/all' }],
  },
  {
    label: 'Invoices',
    icon: FaClipboardCheck,
    subMenu: [{ label: 'All Invoices', icon: FaClipboardCheck, path: '/invoices/all' }],
  },
  {
    label: 'Medicines',
    icon: FaPills,
    subMenu: [
      { label: 'Add Medicine', icon: FaPills, path: '/medicines/add' },
      { label: 'All Medicines', icon: FaPills, path: '/medicines/all' },
    ],
  },
];


const SidebarItem = ({ label, icon: IconComponent, path, subMenu, isOpen, toggleOpen, isCollapsed }) => (
  <ListItem>
    {subMenu ? (
      <>
      
        <Flex
          justify="space-between"
          align="center"
          onClick={toggleOpen}
          className="cursor-pointer"
        >
          <Flex align="center">
            <Icon as={IconComponent} boxSize={6} />
            {!isCollapsed && <Text fontSize="lg" ml={3}>{label}</Text>}
          </Flex>
          {!isCollapsed && (
            <Icon as={isOpen ? FaChevronUp : FaChevronDown} boxSize={4} />
          )}
        </Flex>

       
        <Collapse in={isOpen} animateOpacity>
          <List pl={6} mt={2}>
            {subMenu.map((item, index) => (
              <ListItem key={index} mb={2}>
                <NavLink to={item.path} className="flex items-center space-x-2 text-sm">
                  <Icon as={item.icon} boxSize={4} />
                  {!isCollapsed && <Text ml={2}>{item.label}</Text>}
                </NavLink>
              </ListItem>
            ))}
          </List>
        </Collapse>
      </>
    ) : (
      <NavLink to={path} className="flex items-center p-2 text-lg">
        <Icon as={IconComponent} boxSize={6} />
        {!isCollapsed && <Text ml={3}>{label}</Text>}
      </NavLink>
    )}
  </ListItem>
);

const Sidebar = ({ isCollapsed }) => {
  const [openMenu, setOpenMenu] = useState({});

  const toggleMenu = (label) => {
    setOpenMenu((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <Box
      bg="white"
      color="gray.700"
      w={isCollapsed ? '75px' : '250px'}
      h="h-screen"
      shadow="lg"
      p={5}
    >
      <VStack spacing={10}>
        <List spacing={8}>
          {menuItems.map((menu, index) => (
            <SidebarItem
              key={index}
              label={menu.label}
              icon={menu.icon}
              path={menu.path}
              subMenu={menu.subMenu}
              isOpen={openMenu[menu.label]}
              toggleOpen={() => toggleMenu(menu.label)}
              isCollapsed={isCollapsed}
            />
          ))}
        </List>
      </VStack>
    </Box>
  );
};

export default Sidebar;
