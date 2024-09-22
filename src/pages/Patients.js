// src/pages/Patients/AddPatient.jsx
import React from 'react';

const AddPatient = () => {
  return (
    <div className="p-4 bg-white shadow dark:bg-gray-700">
      <h2 className="text-xl font-bold">Add Patient</h2>
      <form className="space-y-4">
        <input type="text" placeholder="Patient Name" className="input" />
        <input type="text" placeholder="Age" className="input" />
        <input type="text" placeholder="Gender" className="input" />
        <input type="text" placeholder="Contact" className="input" />
        <button type="submit" className="btn">Add Patient</button>
      </form>
    </div>
  );
};

export default AddPatient;
