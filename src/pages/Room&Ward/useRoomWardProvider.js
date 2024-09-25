import { useState, useEffect } from 'react';

export const useRoomWardProvider = () => {
  const [rooms, setRooms] = useState([
    { id: 1, roomName: 'Room 101', ward: 'Ward A', availableBeds: 2 },
    { id: 2, roomName: 'Room 102', ward: 'Ward A', availableBeds: 3 },
    { id: 3, roomName: 'Room 103', ward: 'Ward B', availableBeds: 4 },
    { id: 4, roomName: 'Room 104', ward: 'Ward B', availableBeds: 3 },
   
  ]);

  const [wards, setWards] = useState([
    { id: 1, wardName: 'Ward A', totalBeds: 10, availableBeds: 0 }, 
    { id: 2, wardName: 'Ward B', totalBeds: 8, availableBeds: 0 },
  
  ]);


  const updateRoomBeds = (roomId, newAvailableBeds) => {
    setRooms(rooms.map(room => 
      room.id === roomId ? { ...room, availableBeds: Number(newAvailableBeds) } : room
    ));
  };


  useEffect(() => {
    const updatedWards = wards.map(ward => {
      const wardRooms = rooms.filter(room => room.ward === ward.wardName);
      const totalAvailableBeds = wardRooms.reduce((sum, room) => sum + Number(room.availableBeds), 0);
      
      return {
        ...ward,
        availableBeds: totalAvailableBeds, 
      };
    });

    setWards(updatedWards);
  }, [rooms]); 
  return {
    rooms,
    wards,
    updateRoomBeds,
  };
};
