"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

type Room = {
    id: number;
    name: string;
    description: string;
    image: string;
};

function Rooms() {
    const [rooms, setRooms] = useState<Room[]>([]);
    const [selectedRoom, setSelectedRoom] = useState<Room | null>(null); // State untuk room yang dipilih

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await fetch("http://localhost:3001/api/rooms");
                const data = await response.json();
                setRooms(data.rooms);
            } catch (error) {
                console.error("Error fetching rooms:", error);
            }
        };
        fetchRooms();
    }, []);

    return (
        <section className="bg-gray-50 py-20">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center text-gray-900 mb-12 mt-16">Rooms</h2>
                <div className="flex flex-col space-y-8">
                    {rooms.length > 0 ? (
                        rooms.map((room) => (
                            <div key={room.id} className="w-full">
                                <div className="bg-white rounded-2xl overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                                    <Image
                                        src={room.image}
                                        alt={room.name}
                                        width={1200}
                                        height={600}
                                        className="w-full h-96 object-cover"
                                        priority
                                    />
                                    <div className="p-6 flex flex-col items-center">
                                        <h3 className="text-2xl font-semibold text-gray-800 mb-3 text-center">{room.name}</h3>
                                        <p className="text-center text-gray-600">{room.description}</p>
                                        <button
                                            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-all"
                                            onClick={() => setSelectedRoom(room)}
                                        >
                                            Description
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-600">Loading rooms...</p>
                    )}
                </div>

                {/* Popup detail room */}
                {selectedRoom && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white rounded-lg p-8 max-w-lg w-full">
                            <h3 className="text-2xl font-semibold text-gray-800 mb-4">{selectedRoom.name}</h3>
                            <Image
                                src={selectedRoom.image}
                                alt={selectedRoom.name}
                                width={800}
                                height={400}
                                className="w-full h-60 object-cover rounded-lg mb-4"
                            />
                            <p className="text-gray-700">{selectedRoom.description}</p>
                            <button
                                className="mt-6 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-all"
                                onClick={() => setSelectedRoom(null)}
                            >
                                Tutup
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}

export default Rooms;
