import React from 'react';
import { useRoomWardProvider } from './useRoomWardProvider';

const RoomTable = () => {
  const { rooms, updateRoomBeds } = useRoomWardProvider();

  const handleBedsChange = (roomId, newBedCount) => {
    updateRoomBeds(roomId, newBedCount);
  };

  return (
    <div className=" h-screen overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4">Rooms</h2>
      <table className=" bg-white w-full border border-gray-200 rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="px-4 py-2">Room ID</th>
            <th className="px-4 py-2">Room Name</th>
            <th className="px-4 py-2">Ward</th>
            <th className="px-4 py-2">Available Beds</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map(room => (
            <tr key={room.id} className="text-center">
              <td className="border px-4 py-2">{room.id}</td>
              <td className="border px-4 py-2">{room.roomName}</td>
              <td className="border px-4 py-2">{room.ward}</td>
              <td className="border px-4 py-2">{room.availableBeds}</td>
              <td className="border px-4 py-2">
                <input
                  type="number"
                  value={room.availableBeds}
                  className="border p-1 rounded w-16"
                  onChange={(e) => handleBedsChange(room.id, e.target.value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoomTable;
