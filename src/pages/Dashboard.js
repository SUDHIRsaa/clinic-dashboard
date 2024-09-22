import React from 'react';
import { FaUser, FaChartBar, FaDollarSign } from 'react-icons/fa';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from 'recharts';

// Sample data
const lineData = [
  { year: '2016 Q1', appointments: 20 },
  { year: '2016 Q2', appointments: 15 },
  { year: '2016 Q3', appointments: 40 },
  { year: '2016 Q4', appointments: 25 },
  { year: '2017 Q1', appointments: 35 },
  { year: '2017 Q2', appointments: 50 },
  { year: '2018 Q1', appointments: 65 },
];

const barData = [
  { year: '2012', patients: 15 },
  { year: '2013', patients: 30 },
  { year: '2014', patients: 60 },
  { year: '2015', patients: 45 },
  { year: '2016', patients: 25 },
  { year: '2017', patients: 35 },
];

const pieData = [
  { name: 'Completed', value: 45 },
  { name: 'Pending', value: 25 },
  { name: 'Cancelled', value: 30 },
];

const COLORS = ['#00C49F', '#FFBB28', '#FF8042'];

// Reusable StatCard component
const StatCard = ({ icon: Icon, title, value, change, color }) => (
  <div className="bg-white shadow p-4 rounded">
    <div className="flex items-center">
      <div className={`w-12 h-12 flex justify-center items-center rounded-full ${color} text-white mr-3`}>
        <Icon className="text-2xl" />
      </div>
      <h2 className="text-xl">{title}</h2>
    </div>
    <p className="text-3xl font-bold">{value}</p>
    <p className={change > 0 ? 'text-green-500' : 'text-red-500'}>
      {change > 0 ? `+${change}% Increased` : `${change}% Decreased`}
    </p>
  </div>
);

const Dashboard = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Quick Statistics</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* StatCards for Patients, Appointments, and Revenue */}
        <StatCard
          icon={FaUser}
          title="Patients"
          value="348"
          change={20}
          color="bg-pink-500"
        />
        <StatCard
          icon={FaChartBar}
          title="Appointments"
          value="1585"
          change={-15}
          color="bg-green-500"
        />
        <StatCard
          icon={FaDollarSign}
          title="Total Revenue"
          value="$7300"
          change={10}
          color="bg-orange-500"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
        <div className="bg-white shadow p-4 rounded">
          <h2 className="text-xl mb-2">Appointments Year by Year</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={lineData}>
              <Line type="monotone" dataKey="appointments" stroke="#FF69B4" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white shadow p-4 rounded">
          <h2 className="text-xl mb-2">Patients Year by Year</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barData}>
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="patients" fill="#FF8C00" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Appointment and PieChart Section */}
      <div className="mt-4 bg-white shadow p-4 rounded">
        <h2 className="text-xl mb-2">Appointments</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-700">
                <th className="px-4 py-2 border">Patient Name</th>
                <th className="px-4 py-2 border">Doctor</th>
                <th className="px-4 py-2 border">Check-Up</th>
                <th className="px-4 py-2 border">Date</th>
                <th className="px-4 py-2 border">Time</th>
                <th className="px-4 py-2 border">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2 border">Rajesh</td>
                <td className="px-4 py-2 border">Manoj Kumar</td>
                <td className="px-4 py-2 border">Dental</td>
                <td className="px-4 py-2 border">12-10-2018</td>
                <td className="px-4 py-2 border">12:10PM</td>
                <td className="px-4 py-2 border text-green-500">Completed</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border">Riya</td>
                <td className="px-4 py-2 border">Daniel</td>
                <td className="px-4 py-2 border">Ortho</td>
                <td className="px-4 py-2 border">12-10-2018</td>
                <td className="px-4 py-2 border">1:10PM</td>
                <td className="px-4 py-2 border text-yellow-500">Pending</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border">Siri</td>
                <td className="px-4 py-2 border">Daniel</td>
                <td className="px-4 py-2 border">Ortho</td>
                <td className="px-4 py-2 border">12-10-2018</td>
                <td className="px-4 py-2 border">1:30PM</td>
                <td className="px-4 py-2 border text-red-500">Cancelled</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-4">
        <div className="bg-white shadow p-4 rounded flex-1">
          <h2 className="text-xl mb-2">Appointments Status</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={pieData} dataKey="value" outerRadius={100} label>
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white shadow p-4 rounded flex-1">
          <h2 className="text-xl mb-2">Doctors Availability</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-700">
                  <th className="px-4 py-2 border">Doctor</th>
                  <th className="px-4 py-2 border">Speciality</th>
                  <th className="px-4 py-2 border">Availability</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2 border">Rajesh</td>
                  <td className="px-4 py-2 border">Dental</td>
                  <td className="px-4 py-2 border">Yes</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border">Manoj Kumar</td>
                  <td className="px-4 py-2 border">Ortho</td>
                  <td className="px-4 py-2 border">Yes</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border">Siri</td>
                  <td className="px-4 py-2 border">Cardio</td>
                  <td className="px-4 py-2 border">No</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
