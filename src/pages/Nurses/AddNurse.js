import React, { useState } from 'react';

const AddNurse = () => {
  const [formData, setFormData] = useState({
    nurseId: '',
    firstName: '',
    middleName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    department: '',
    shift: '',
    ward: '',
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.nurseId) newErrors.nurseId = 'Nurse ID is required';
    if (!formData.firstName) newErrors.firstName = 'First Name is required';
    if (!formData.lastName) newErrors.lastName = 'Last Name is required';
    if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone Number is required';
    if (!formData.department) newErrors.department = 'Department is required';
    if (!formData.shift) newErrors.shift = 'Shift is required';
    if (!formData.ward) newErrors.ward = 'Ward is required';

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validate();
    if (Object.keys(formErrors).length === 0) {
      setSuccessMessage('Successfully Added Nurse!');
      setErrorMessage('');
      setErrors({});
      // Add nurse submission logic here
    } else {
      setSuccessMessage('');
      setErrorMessage('Please fill in the required fields.');
      setErrors(formErrors);
    }
  };

  return (
    <div className="w-full bg-gray-100 p-8">
      <div className="w-full h-full p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-xl font-bold mb-4 text-center">Add Nurse</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="block mb-2">Nurse ID</label>
              <input
                type="text"
                name="nurseId"
                placeholder="Nurse ID"
                className="w-full p-2 border border-gray-300 rounded"
                value={formData.nurseId}
                onChange={handleChange}
              />
              {errors.nurseId && <span className="text-red-500 text-sm">{errors.nurseId}</span>}
            </div>

            <div>
              <label className="block mb-2">First Name</label>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                className="w-full p-2 border border-gray-300 rounded"
                value={formData.firstName}
                onChange={handleChange}
              />
              {errors.firstName && <span className="text-red-500 text-sm">{errors.firstName}</span>}
            </div>

            <div>
              <label className="block mb-2">Middle Name</label>
              <input
                type="text"
                name="middleName"
                placeholder="Middle Name"
                className="w-full p-2 border border-gray-300 rounded"
                value={formData.middleName}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block mb-2">Last Name</label>
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                className="w-full p-2 border border-gray-300 rounded"
                value={formData.lastName}
                onChange={handleChange}
              />
              {errors.lastName && <span className="text-red-500 text-sm">{errors.lastName}</span>}
            </div>

            <div>
              <label className="block mb-2">Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                placeholder="Phone Number"
                className="w-full p-2 border border-gray-300 rounded"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
              {errors.phoneNumber && <span className="text-red-500 text-sm">{errors.phoneNumber}</span>}
            </div>

            <div>
              <label className="block mb-2">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full p-2 border border-gray-300 rounded"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block mb-2">Department</label>
              <input
                type="text"
                name="department"
                placeholder="Department"
                className="w-full p-2 border border-gray-300 rounded"
                value={formData.department}
                onChange={handleChange}
              />
              {errors.department && <span className="text-red-500 text-sm">{errors.department}</span>}
            </div>

            <div>
              <label className="block mb-2">Shift</label>
              <select
                name="shift"
                className="w-full p-2 border border-gray-300 rounded"
                value={formData.shift}
                onChange={handleChange}
              >
                <option value="">Select Shift</option>
                <option value="Day">Day</option>
                <option value="Night">Night</option>
              </select>
              {errors.shift && <span className="text-red-500 text-sm">{errors.shift}</span>}
            </div>

            <div>
              <label className="block mb-2">Ward</label>
              <input
                type="text"
                name="ward"
                placeholder="Ward"
                className="w-full p-2 border border-gray-300 rounded"
                value={formData.ward}
                onChange={handleChange}
              />
              {errors.ward && <span className="text-red-500 text-sm">{errors.ward}</span>}
            </div>
          </div>

          <button type="submit" className="mt-4 w-full p-2 bg-teal-500 text-white rounded hover:bg-teal-600">
            Add Nurse
          </button>
        </form>

        {successMessage && <p className="mt-4 p-2 bg-green-100 text-green-800 rounded">{successMessage}</p>}
        {errorMessage && <p className="mt-4 p-2 bg-yellow-100 text-yellow-800 rounded">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default AddNurse;
