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
    const [confirmationMessage, setConfirmationMessage] = useState('');
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        // Calculate total price whenever checkInDate, checkOutDate, or roomType changes
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Ensure check-out date is valid
        if (totalPrice <= 0) {
            alert('Please ensure your check-out date is after your check-in date.');
            return;
        }

        setConfirmationMessage(`Booking confirmed for a ${roomType} from ${checkInDate} to ${checkOutDate}. Total price: $${totalPrice}. Thank you for your booking!`);
        setIsModalOpen(true);
        setName('');
        setEmail('');
        setCheckInDate('');
        setCheckOutDate('');
        setRoomType('single');
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
                                className={`mt-2 px-4 py-2 rounded ${roomType === room.id ? 'bg-krem text-white' : 'bg-krem  text-white' }`}
                                onClick={() => setRoomType(room.id)}
                            >
                                Select
                            </button>
                        </div>
                    ))}
                </div>

                <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md mt-auto">
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="checkInDate" className="block text-gray-700 text-sm font-bold mb-2">Check-In Date</label>
                        <input
                            type="date"
                            id="checkInDate"
                            value={checkInDate}
                            onChange={(e) => setCheckInDate(e.target.value)}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="checkOutDate" className="block text-gray-700 text-sm font-bold mb-2">Check-Out Date</label>
                        <input
                            type="date"
                            id="checkOutDate"
                            value={checkOutDate}
                            onChange={(e) => setCheckOutDate(e.target.value)}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="totalPrice" className="block text-gray-700 text-sm font-bold mb-2">Total Price</label>
                        <input
                            type="text"
                            id="totalPrice"
                            value={`$${totalPrice}`}
                            readOnly
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                    >
                        Book Now
                    </button>
                </form>

                {isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                            <h3 className="text-lg font-bold mb-4">Booking Confirmation</h3>
                            <p>{confirmationMessage}</p>
                            <div className="mt-4">
                                <button
                                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none"
                                    onClick={closeModal}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Booking;
