import React from 'react';
import { FaBars, FaExpand, FaCompress } from 'react-icons/fa';

const Navbar = ({ toggleSidebar }) => {
  const [isFullscreen, setIsFullscreen] = React.useState(false);

  const toggleFullScreen = () => {
    if (!isFullscreen) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    setIsFullscreen(!isFullscreen);
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-700 shadow">
      {/* Hamburger Button */}
      <button onClick={toggleSidebar} className="p-2 text-white">
        <FaBars size={20} />
      </button>

      {/* Fullscreen Toggle */}
      <button onClick={toggleFullScreen} className="p-2 bg-gray-200 rounded">
        {isFullscreen ? <FaCompress /> : <FaExpand />}
      </button>
    </nav>
  );
};

export default Navbar;
