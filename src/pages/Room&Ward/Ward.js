import React from 'react';
import { useRoomWardProvider } from './useRoomWardProvider';

const WardTable = () => {
  const { wards, updateWardBeds } = useRoomWardProvider();

  const handleBedsChange = (wardId, newBedCount) => {
    updateWardBeds(wardId, newBedCount);
  };

  return (
    <div className=" h-screen overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4">Wards</h2>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="px-4 py-2">Ward ID</th>
            <th className="px-4 py-2">Ward Name</th>
            <th className="px-4 py-2">Total Beds</th>
            <th className="px-4 py-2">Available Beds</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {wards.map(ward => (
            <tr key={ward.id} className="text-center">
              <td className="border px-4 py-2">{ward.id}</td>
              <td className="border px-4 py-2">{ward.wardName}</td>
              <td className="border px-4 py-2">{ward.totalBeds}</td>
              <td className="border px-4 py-2">{ward.availableBeds}</td>
              <td className="border px-4 py-2">
                <input
                  type="number"
                  value={ward.availableBeds}
                  className="border p-1 rounded w-16"
                  onChange={(e) => handleBedsChange(ward.id, e.target.value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WardTable;
