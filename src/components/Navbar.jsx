import React, { useState } from 'react';
import { 
  Flex, 
  Input, 
  IconButton, 
  Avatar, 
  Box, 
  useColorMode, 
  useColorModeValue 
} from '@chakra-ui/react';
import { 
  FaBars, 
  FaBell, 
  FaMoon, 
  FaSun, 
  FaInfoCircle, 
  FaExpand, 
  FaCompress 
} from 'react-icons/fa';

const Navbar = ({ toggleSidebar }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode(); // Chakra UI's hook for dark mode
  const bg = useColorModeValue('white', 'gray.800'); // Background color based on color mode
  const color = useColorModeValue('gray.800', 'white'); // Text color based on color mode

 
  const toggleFullScreen = () => {
    if (!isFullscreen) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    setIsFullscreen(!isFullscreen);
  };

  return (
    <Flex
      justify="space-between"
      align="center"
      bg={bg}
      color={color}
      p={2} 
      shadow="md"
      rounded="full"
      mx={4}
    >
     
      <IconButton
        icon={<FaBars />}
        onClick={toggleSidebar}
        aria-label="Toggle Sidebar"
        variant="ghost"
        size="md" 
        mx={1}
      />

     
      <Box flex="1" mx={3}>
        <Input
          placeholder="Search..."
          variant="filled"
          borderRadius="full"
          focusBorderColor={useColorModeValue('blue.200', 'blue.600')}
          size="sm" 
        />
      </Box>

      <Flex align="center">
        <IconButton
          icon={<FaBell />}
          aria-label="Notifications"
          variant="ghost"
          size="md"
          mx={1}
        />
        <IconButton
          icon={<FaInfoCircle />}
          aria-label="Info"
          variant="ghost"
          size="md"
          mx={1}
        />

       
        <IconButton
          icon={colorMode === 'light' ? <FaMoon /> : <FaSun />}
          onClick={toggleColorMode}
          aria-label="Toggle Theme"
          variant="ghost"
          size="md"
          mx={1}
        />

    
        <IconButton
          icon={isFullscreen ? <FaCompress /> : <FaExpand />}
          onClick={toggleFullScreen}
          aria-label="Toggle Fullscreen"
          variant="ghost"
          size="md"
          mx={1}
        />

      
        <Avatar
          src="https://via.placeholder.com/40"
          size="sm" 
          mx={2}
        />
      </Flex>
    </Flex>
  );
};

export default Navbar;
