"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

type Facility = {
    id: number;
    name: string;
    description: string;
    image: string;
};

function Facilities() {
    const [facilities, setFacilities] = useState<Facility[]>([]); // Inisialisasi sebagai array kosong

    useEffect(() => {
        const fetchFacilities = async () => {
            try {
                const response = await fetch("http://localhost:3001/api/facilities");
                const data = await response.json();
                setFacilities(data.facilities);
            } catch (error) {
                console.error("Error fetching facilities:", error);
            }
        };
        fetchFacilities();
    }, []);

    return (
        <section className="bg-gray-50 py-20">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center text-gray-900 mb-12 mt-16">
                    Facilities
                </h2>
                <div className="flex flex-col space-y-8">
                    {facilities.length > 0 ? (
                        facilities.map((facility) => (
                            <div key={facility.id} className="w-full">
                                <div className="bg-white rounded-2xl overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                                    <Image
                                        src={facility.image}
                                        alt={facility.name}
                                        width={1200}
                                        height={600}
                                        className="w-full h-96 object-cover"
                                        priority
                                    />
                                    <div className="p-6 flex flex-col items-center">
                                        <h3 className="text-2xl font-semibold text-gray-800 mb-3 text-center">{facility.name}</h3>
                                        <p className="text-center text-gray-600">{facility.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-600">Loading facilities...</p>
                    )}
                </div>
            </div>
        </section>
    );
}

export default Facilities;
