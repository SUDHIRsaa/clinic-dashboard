import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserDoctor, faCalendarAlt, faClock, faClipboardList, faTags } from '@fortawesome/free-solid-svg-icons';

const BookAppointment = () => {
  const [doctor, setDoctor] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [appointmentType, setAppointmentType] = useState('');
  const [service, setService] = useState('');
  const [unitPrice, setUnitPrice] = useState('');
  const [discount, setDiscount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted');
  };

  return (
    <div className="flex items-center justify-center  w-full bg-gray-100">
      <div className="p-6 w-full max-w-lg mt-14 bg-white rounded-lg shadow-lg">
        <div className="flex items-center mb-6">
          <img
            src="https://via.placeholder.com/80"
            alt="Avatar"
            className="rounded-full mr-4"
          />
          <div>
            <h2 className="text-xl font-semibold">Ayuh MORE</h2>
            <p>Male, 20 years old</p>
            <p>Phone No: 7485</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Doctor</label>
            <div className="flex items-center border border-gray-300 rounded">
              <FontAwesomeIcon icon={faUserDoctor} className="ml-2" />
              <select
                className="flex-grow p-2 rounded outline-none"
                value={doctor}
                onChange={(e) => setDoctor(e.target.value)}
                required
              >
                <option value="">Select Doctor</option>
                <option value="doctor1">Dr. Smith</option>
                <option value="doctor2">Dr. John</option>
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium">Appointment Date</label>
            <div className="flex items-center border border-gray-300 rounded">
              <FontAwesomeIcon icon={faCalendarAlt} className="ml-2" />
              <input
                type="date"
                className="flex-grow p-2 rounded outline-none"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium">Appointment Time</label>
            <div className="flex items-center border border-gray-300 rounded">
              <FontAwesomeIcon icon={faClock} className="ml-2" />
              <select
                className="flex-grow p-2 rounded outline-none"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
              >
                <option value="">Select Time</option>
                <option value="10:00 AM">10:00 AM</option>
                <option value="11:00 AM">11:00 AM</option>
                <option value="12:00 PM">12:00 PM</option>
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium">Appointment Type</label>
            <div className="flex items-center border border-gray-300 rounded">
              <FontAwesomeIcon icon={faClipboardList} className="ml-2" />
              <select
                className="flex-grow p-2 rounded outline-none"
                value={appointmentType}
                onChange={(e) => setAppointmentType(e.target.value)}
                required
              >
                <option value="">Select Appointment</option>
                <option value="checkup">Check-up</option>
                <option value="consultation">Consultation</option>
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium">Service</label>
            <div className="flex items-center border border-gray-300 rounded">
              <FontAwesomeIcon icon={faTags} className="ml-2" />
              <select
                className="flex-grow p-2 rounded outline-none"
                value={service}
                onChange={(e) => setService(e.target.value)}
                required
              >
                <option value="">Select Service</option>
                <option value="service1">Dental</option>
                <option value="service2">Ortho</option>
              </select>
            </div>
          </div>

          <div className="flex mb-4">
            <div className="flex-grow mr-2">
              <label className="block mb-1 font-medium">Unit Price</label>
              <input
                type="text"
                placeholder="Unit Price"
                className="p-2 w-full border border-gray-300 rounded"
                value={unitPrice}
                onChange={(e) => setUnitPrice(e.target.value)}
                required
              />
            </div>
            <div className="flex-grow ml-2">
              <label className="block mb-1 font-medium">Discount</label>
              <input
                type="text"
                placeholder="Discount"
                className="p-2 w-full border border-gray-300 rounded"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
              onClick={() => console.log('Generate Bill')}
            >
              Generate Bill
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
            >
              Add Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookAppointment;
