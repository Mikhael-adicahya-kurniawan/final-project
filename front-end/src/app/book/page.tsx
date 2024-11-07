'use client';
import React, { useState, useEffect } from 'react';

const rooms = [
    {
        id: 'single',
        name: 'Single Room',
        price: 100,
        description: 'A cozy room for one, with all essential amenities.',
        image: 'https://www.satoriahotel.com/wp-content/uploads/2022/04/E.-Deluxe-Room-1-scaled-e1651111459463.jpg',
    },
    {
        id: 'double',
        name: 'Double Room',
        price: 150,
        description: 'Perfect for couples or friends, offering a comfortable stay.',
        image: 'https://www.momondo.com/himg/36/eb/50/expedia_group-356495-5dcc1200-828991.jpg',
    },
    {
        id: 'suite',
        name: 'Suite',
        price: 250,
        description: 'Luxurious suite with extra space and premium amenities.',
        image: 'https://s2.bukalapak.com/bukalapak-kontenz-production/content_attachments/75007/original/66013532_s.jpg',
    },
];

const Booking = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const [roomType, setRoomType] = useState('single');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [confirmationMessage, setConfirmationMessage] = useState('');
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);
        const timeDiff = checkOut.getTime() - checkIn.getTime();
        const days = Math.ceil(timeDiff / (1000 * 3600 * 24));

        if (days > 0) {
            const selectedRoom = rooms.find(room => room.id === roomType);
            const pricePerNight = selectedRoom ? selectedRoom.price : 0;
            setTotalPrice(pricePerNight * days);
        } else {
            setTotalPrice(0);
        }
    }, [checkInDate, checkOutDate, roomType]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (totalPrice <= 0) {
            alert('Please ensure your check-out date is after your check-in date.');
            return;
        }

        setIsLoading(true);

        const bookingData = {
            name,
            email,
            checkInDate,
            checkOutDate,
            roomType,
            totalPrice,
        };

        try {
            await new Promise(resolve => setTimeout(resolve, 5000)); // Delay 5 detik

            const response = await fetch('http://localhost:3001/api/book', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bookingData),
            });

            if (!response.ok) {
                throw new Error('Failed to book the room.');
            }

            const data = await response.json();
            setConfirmationMessage(data.message || 'Booking Successful!');
            setIsModalOpen(true);
        } catch (error) {
            if (error instanceof Error) {
                alert('Error: ' + error.message);
            } else {
                alert('An unknown error occurred.');
            }
        } finally {
            setIsLoading(false);
            setName('');
            setEmail('');
            setCheckInDate('');
            setCheckOutDate('');
            setRoomType('single');
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <section className="bg-gray-50 py-20">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center text-gray-900 mb-12 mt-16">
                    Book Your Stay
                </h2>

                <div className="flex flex-col items-center space-y-6 mb-12">
                    {rooms.map(room => (
                        <div key={room.id} className={`border rounded-lg p-4 flex flex-col items-center w-full transition-transform duration-300 transform hover:scale-105 hover:shadow-xl ${roomType === room.id ? 'bg-blue-100' : 'bg-white'}`}>
                            <div className="w-full">
                                <img
                                    src={room.image}
                                    alt={room.name}
                                    className="w-full h-auto object-cover rounded-md mb-2"
                                />
                            </div>
                            <h3 className="text-lg font-bold">{room.name}</h3>
                            <p className="text-gray-600">{room.description}</p>
                            <p className="text-gray-800 font-semibold">${room.price} per night</p>
                            <button
                                className={`mt-2 px-4 py-2 rounded ${roomType === room.id ? 'bg-birumuda text-white' : 'bg-birumuda text-white'}`}
                                onClick={() => setRoomType(room.id)}
                            >
                                Select
                            </button>
                        </div>
                    ))}
                </div>

                {/* Tambahan H2 untuk Booking Form */}
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-12 mt-16">
                    Booking Form
                </h2>

                <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
                    <div className="mb-4">
                        <label className="block text-gray-700">Name</label>
                        <input
                            type="text"
                            className="w-full border rounded-lg p-2"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            className="w-full border rounded-lg p-2"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Check-In Date</label>
                        <input
                            type="date"
                            className="w-full border rounded-lg p-2"
                            value={checkInDate}
                            onChange={(e) => setCheckInDate(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Check-Out Date</label>
                        <input
                            type="date"
                            className="w-full border rounded-lg p-2"
                            value={checkOutDate}
                            onChange={(e) => setCheckOutDate(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Total Price: ${totalPrice}</label>
                    </div>
                    <button
                        type="submit"
                        className={`w-full bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-700 transition duration-300 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <div className="flex items-center justify-center space-x-2">
                                <div className="w-5 h-5 border-t-2 border-r-2 border-white rounded-full animate-spin"></div>
                                <span>Booking...</span>
                            </div>
                        ) : (
                            'Book Now'
                        )}
                    </button>
                </form>

                {isModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                        <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full mx-4 transform transition-all duration-300">
                            <div className="flex items-center justify-center mb-4">
                                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                                    <svg
                                        className="w-6 h-6 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M5 13l4 4L19 7"
                                        ></path>
                                    </svg>
                                </div>
                            </div>
                            <h2 className="text-xl font-bold text-center text-gray-900 mb-2">
                                {confirmationMessage}
                            </h2>
                            <p className="text-gray-600 text-center">
                                Thank you, {name}! Your booking is confirmed.
                            </p>
                            <button
                                onClick={closeModal}
                                className="mt-6 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700 transition duration-300"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Booking;
