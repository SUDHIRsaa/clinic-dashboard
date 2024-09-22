// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import AddPatient from './pages/Patients/AddPatient';
import AllPatients from './pages/Patients/AllPatients';
import PatientDetails from './pages/Patients/PatientDetails';
import AddDoctor from './pages/Doctors/AddDoctor';
import AllDoctors from './pages/Doctors/AllDoctors';
import DoctorDetails from './pages/Doctors/DoctorDetails';
import AddNurse from './pages/Nurses/AddNurse';
import AllNurses from './pages/Nurses/AllNurses';
import NurseDetails from './pages/Nurses/NurseDetails';
import RoomAllotments from './pages/RoomAllotments';
import BookAppointments from './pages/BookAppoinments'
const App = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <Router>
      <div className="flex">
        <Sidebar isCollapsed={isSidebarCollapsed} />
        <div className="flex-1">
          <Navbar toggleSidebar={toggleSidebar} />
          <main className="p-4">
            <Routes>
              <Route path="/" element={<Dashboard />} />
             
            <Route path="/patients/add" element={<AddPatient />} />
            <Route path="/patients/all" element={<AllPatients />} />
            <Route path="/patients/details" element={<PatientDetails />} />
            <Route path="/doctors/add" element={<AddDoctor />} />
            <Route path="/doctors/all" element={<AllDoctors />} />
            <Route path="/doctors/details/" element={<DoctorDetails />} />
            <Route path="/nurses/add" element={<AddNurse />} />
            <Route path="/nurses/all" element={<AllNurses />} />
            <Route path="/nurses/details/" element={<NurseDetails />} />
            <Route path="/room-allotments" element={<RoomAllotments />} />
            <Route path="/appointments/add" element={<BookAppointments />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;
