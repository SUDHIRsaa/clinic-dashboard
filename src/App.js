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
import BookAppointments from './pages/BookAppoinments';
import RoomTable from './pages/Room&Ward/Room';
import WardTable from './pages/Room&Ward/Ward';
import { ChakraProvider } from '@chakra-ui/react';
import AppointmentPage from './Doctor';

const App = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed); // Toggle collapse state
  };

  return (
    <ChakraProvider>
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
                <Route path="/room" element={<RoomTable />} />
                <Route path="/wards" element={<WardTable />} />
                <Route path="/appointments/add" element={<BookAppointments />} />
                <Route path='/doctors' element ={<AppointmentPage/>} />
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </ChakraProvider>
  );
};

export default App;
