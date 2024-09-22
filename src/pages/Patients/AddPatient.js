import React, { useState } from 'react';
import { FaUpload } from 'react-icons/fa';

const PatientForm = () => {
  // Form state
  const [formData, setFormData] = useState({
    patientId: '',
    fullName: '',
    middleName: '',
    lastName: '',
    dob: '',
    age: '',
    phone: '',
    email: '',
    address: '',
    gender: '',
    language: '',
    bloodGroup: '',
    existingId: '',
    pin: '',
    profileImage: null,
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file upload
  const handleFileChange = (e) => {
    setFormData({ ...formData, profileImage: e.target.files[0] });
  };

  // Validate form data
  const validate = () => {
    const newErrors = {};
    if (!formData.patientId) newErrors.patientId = 'Patient ID is required';
    if (!formData.fullName) newErrors.fullName = 'Full Name is required';
    if (!formData.dob) newErrors.dob = 'Date of Birth is required';
    if (!formData.age) newErrors.age = 'Age is required';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.language) newErrors.language = 'Language is required';
    if (!formData.bloodGroup) newErrors.bloodGroup = 'Blood Group is required';
    if (!formData.existingId) newErrors.existingId = 'Existing ID is required';
    if (!formData.pin) newErrors.pin = 'PIN is required';

    return newErrors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validate();
    if (Object.keys(formErrors).length === 0) {
      setSuccessMessage('Successfully Added Patient!');
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
        <h2 className="text-xl font-bold mb-4 text-center">Add Patient</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="block mb-2">Patient ID</label>
              <input
                type="text"
                name="patientId"
                placeholder="Patient ID"
                className="w-full p-2 border border-gray-300 rounded"
                value={formData.patientId}
                onChange={handleChange}
              />
              {errors.patientId && <span className="text-red-500 text-sm">{errors.patientId}</span>}
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
            </div>

            <div>
              <label className="block mb-2">Date of Birth</label>
              <input
                type="date"
                name="dob"
                className="w-full p-2 border border-gray-300 rounded"
                value={formData.dob}
                onChange={handleChange}
              />
              {errors.dob && <span className="text-red-500 text-sm">{errors.dob}</span>}
            </div>

            <div>
              <label className="block mb-2">Age</label>
              <input
                type="number"
                name="age"
                placeholder="Age"
                className="w-full p-2 border border-gray-300 rounded"
                value={formData.age}
                onChange={handleChange}
              />
              {errors.age && <span className="text-red-500 text-sm">{errors.age}</span>}
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

            <div>
              <label className="block mb-2">Language</label>
              <select
                name="language"
                className="w-full p-2 border border-gray-300 rounded"
                value={formData.language}
                onChange={handleChange}
              >
                <option value="">Select Language</option>
                <option value="english">English</option>
                <option value="spanish">Spanish</option>
                <option value="french">French</option>
              </select>
              {errors.language && <span className="text-red-500 text-sm">{errors.language}</span>}
            </div>
            
            <div>
              <label className="block mb-2">Blood Group</label>
              <select
                name="bloodGroup"
                className="w-full p-2 border border-gray-300 rounded"
                value={formData.bloodGroup}
                onChange={handleChange}
              >
                <option value="">Select Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
              {errors.bloodGroup && <span className="text-red-500 text-sm">{errors.bloodGroup}</span>}
            </div>
            <div className='flex ml-10'>
            <div>
              <label className="block mb-2">Existing ID</label>
              <input
                type="text"
                name="existingId"
                placeholder="Existing ID"
                className="w-[300px] p-2 border border-gray-300 rounded"
                value={formData.existingId}
                onChange={handleChange}
              />
              {errors.existingId && <span className="text-red-500 text-sm">{errors.existingId}</span>}
            </div>
            <div className='ml-16'>
              <label className="block mb-2">PIN</label>
              <input
                type="password"
                name="pin"
                placeholder="PIN"
                className="w-[150px]  p-2 border border-gray-300 rounded"
                value={formData.pin}
                onChange={handleChange}
              />
              {errors.pin && <span className="text-red-500 text-sm">{errors.pin}</span>}
            </div>
            </div>

           
          </div>

          <button type="submit" className="mt-4 w-full p-2 bg-teal-500 text-white rounded hover:bg-teal-600">
            Add Patient
          </button>
        </form>

        {successMessage && <p className="mt-4 p-2 bg-green-100 text-green-800 rounded">{successMessage}</p>}
        {errorMessage && <p className="mt-4 p-2 bg-yellow-100 text-yellow-800 rounded">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default PatientForm;
