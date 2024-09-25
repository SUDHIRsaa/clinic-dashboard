import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  FaUser,
  FaStethoscope,
  FaBed,
  FaChartBar,
  FaChevronDown,
  FaChevronUp,
  FaClipboardList,
  FaClipboardCheck,
  FaUserFriends,
  FaPills,
} from 'react-icons/fa';

// Sidebar Menu Items
const menuItems = [
  {
    label: 'Dashboard',
    icon: FaChartBar,
    path: '/',
  },
  {
    label: 'Patients',
    icon: FaUser,
    path: '/patients',
    subMenu: [
      { label: 'Add Patient', icon: FaUser, path: '/patients/add' },
      { label: 'All Patients', icon: FaUserFriends, path: '/patients/all' },
      { label: 'Patient Details', icon: FaUser, path: '/patients/details' },
    ],
  },
  {
    label: 'Doctors',
    icon: FaStethoscope,
    path: '/doctors',
    subMenu: [
      { label: 'Add Doctor', icon: FaStethoscope, path: '/doctors/add' },
      { label: 'All Doctors', icon: FaStethoscope, path: '/doctors/all' },
      { label: 'Doctor Details', icon: FaStethoscope, path: '/doctors/details' },
    ],
  },
  {
    label: 'Nurses',
    icon: FaUser,
    path: '/nurses',
    subMenu: [
      { label: 'Add Nurse', icon: FaUser, path: '/nurses/add' },
      { label: 'All Nurses', icon: FaUser, path: '/nurses/all' },
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

// Sidebar Dropdown Item Component
const SidebarItem = ({ label, icon: Icon, path, subMenu, isCollapsed, isOpen, toggleOpen }) => (
  <li>
    {subMenu ? (
      <button
        onClick={toggleOpen}
        className="flex items-center justify-between w-full p-2 text-lg"
      >
        <div className="flex items-center space-x-3">
          <Icon size={24} />
          {!isCollapsed && <span>{label}</span>}
        </div>
        {!isCollapsed && (
          <span>{isOpen ? <FaChevronUp /> : <FaChevronDown />}</span>
        )}
      </button>
    ) : (
      <NavLink
        to={path}
        className="flex items-center p-2 text-lg"
      >
        <Icon size={24} />
        {!isCollapsed && <span className="ml-3">{label}</span>}
      </NavLink>
    )}
    
    {subMenu && isOpen && !isCollapsed && (
      <ul className="pl-6 space-y-2 mt-2">
        {subMenu.map((item, index) => (
          <li key={index}>
            <NavLink
              to={item.path}
              className="flex items-center space-x-2 text-sm"
            >
              <item.icon size={14} /> <span>{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    )}
  </li>
);

const Sidebar = ({ isCollapsed }) => {
  const [openMenu, setOpenMenu] = useState({});

  const toggleMenu = (label) => {
    setOpenMenu((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <aside
      className={`max-h-full bg-teal-600 p-4 text-white overflow-y-auto ${isCollapsed ? 'w-20' : 'w-64'} transition-all duration-300`}
    >
      <ul className="space-y-4">
        {menuItems.map((menu, index) => (
          <SidebarItem
            key={index}
            label={menu.label}
            icon={menu.icon}
            path={menu.path} // Pass the path here
            subMenu={menu.subMenu}
            isCollapsed={isCollapsed}
            isOpen={openMenu[menu.label]}
            toggleOpen={() => toggleMenu(menu.label)}
          />
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
