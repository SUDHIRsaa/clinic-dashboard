import React, { useState } from 'react';
import { FaUpload } from 'react-icons/fa';

const AddDoctor = () => {
  const [formData, setFormData] = useState({
    doctorId: '',
    fullName: '',
    specialty: '',
    phone: '',
    email: '',
    address: '',
    gender: '',
    profileImage: null,
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, profileImage: e.target.files[0] });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.doctorId) newErrors.doctorId = 'Doctor ID is required';
    if (!formData.fullName) newErrors.fullName = 'Full Name is required';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.specialty) newErrors.specialty = 'Specialty is required';

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validate();
    if (Object.keys(formErrors).length === 0) {
      setSuccessMessage('Successfully Added Doctor!');
      setErrorMessage('');
      setErrors({});
    } else {
      setSuccessMessage('');
      setErrorMessage('You should check in on some of those fields below.');
      setErrors(formErrors);
    }
  };

  return (
    <div className="w-full bg-gray-100 p-8">
      <div className="w-full h-full p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-xl font-bold mb-4 text-center">Add Doctor</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="block mb-2">Doctor ID</label>
              <input
                type="text"
                name="doctorId"
                placeholder="Doctor ID"
                className="w-full p-2 border border-gray-300 rounded"
                value={formData.doctorId}
                onChange={handleChange}
              />
              {errors.doctorId && <span className="text-red-500 text-sm">{errors.doctorId}</span>}
            </div>

            <div>
              <label className="block mb-2">Full Name</label>
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                className="w-full p-2 border border-gray-300 rounded"
                value={formData.fullName}
                onChange={handleChange}
              />
              {errors.fullName && <span className="text-red-500 text-sm">{errors.fullName}</span>}
            </div>

            <div>
              <label className="block mb-2">Specialty</label>
              <input
                type="text"
                name="specialty"
                placeholder="Specialty"
                className="w-full p-2 border border-gray-300 rounded"
                value={formData.specialty}
                onChange={handleChange}
              />
              {errors.specialty && <span className="text-red-500 text-sm">{errors.specialty}</span>}
            </div>

            <div>
              <label className="block mb-2">Phone</label>
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                className="w-full p-2 border border-gray-300 rounded"
                value={formData.phone}
                onChange={handleChange}
              />
              {errors.phone && <span className="text-red-500 text-sm">{errors.phone}</span>}
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
              {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
            </div>

            <div className="md:col-span-2">
              <label className="block mb-2">Address</label>
              <textarea
                name="address"
                placeholder="Address"
                className="w-full p-2 border border-gray-300 rounded"
                rows="3"
                value={formData.address}
                onChange={handleChange}
              ></textarea>
              {errors.address && <span className="text-red-500 text-sm">{errors.address}</span>}
            </div>

            <div className="md:col-span-2">
              <label className="block mb-2">Profile Image</label>
              <div className="flex items-center p-2 border border-gray-300 rounded">
                <input type="file" className="hidden" id="file-upload" onChange={handleFileChange} />
                <label htmlFor="file-upload" className="cursor-pointer flex items-center">
                  <FaUpload className="mr-2" /> Upload Profile Image
                </label>
              </div>
            </div>

            <div>
              <label className="block mb-2">Gender</label>
              <select
                name="gender"
                className="w-full p-2 border border-gray-300 rounded"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && <span className="text-red-500 text-sm">{errors.gender}</span>}
            </div>
          </div>

          <button type="submit" className="mt-4 w-full p-2 bg-teal-500 text-white rounded hover:bg-teal-600">
            Add Doctor
          </button>
        </form>

        {successMessage && <p className="mt-4 p-2 bg-green-100 text-green-800 rounded">{successMessage}</p>}
        {errorMessage && <p className="mt-4 p-2 bg-yellow-100 text-yellow-800 rounded">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default AddDoctor;
