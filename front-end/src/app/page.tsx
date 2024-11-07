'use client';

import Image from 'next/image';
import Link from 'next/link';
import Carousel from './Carousel';

const LandingPage = () => {
  return (
    <section className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div
        className="relative h-screen bg-cover bg-center"
        style={{ backgroundImage: 'url("https://www.bluestarhotel.com/photoswipe/photos/large/2.webp")' }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center">
          <h1 className="text-5xl font-bold text-white text-center mb-4">
            Welcome to Luxury Stay
          </h1>
          <p className="text-lg text-gray-200 text-center mb-6">
            Your perfect vacation awaits. Experience the best comfort and amenities at our hotel.
          </p>
          <Link href="/book" className="bg-birumuda text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-biru transition">
            Book Now
          </Link>
        </div>
      </div>

      {/* Gallery Section */}
      <div className="container mx-auto px-4 text-center mt-16">
        <h2 className="text-4xl font-bold text-gray-800 mb-12">Gallery</h2>
        <Carousel />
      </div>

      {/* Services Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-12">Our Services</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { img: "/images/spa1.jpg", title: "Relaxing Spa", description: "Pamper yourself with our luxurious spa treatments to unwind and recharge." },
              { img: "/images/restaurant.jpg", title: "Fine Dining", description: "Indulge in gourmet meals prepared by world-class chefs in a beautiful setting." },
              { img: "/images/infinitypool.jpg", title: "Infinity Pool", description: "Take a dip in our rooftop infinity pool while enjoying panoramic city views." }
            ].map((service, index) => (
              <div key={index} className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105">
                <Image src={service.img} alt={service.title} width={300} height={200} className="rounded-md mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-biru py-20">
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-4xl font-bold mb-12">What Our Guests Say</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { text: "This hotel exceeded all expectations! The rooms were clean, the staff was incredibly friendly, and the views were stunning.", author: "John Doe", rating: "★★★★★" },
              { text: "Amazing experience! The infinity pool is breathtaking, and the food is to die for. Definitely coming back.", author: "Jane Smith", rating: "★★★★★" },
              { text: "A truly luxurious stay! The spa treatments were heavenly, and the location couldn't have been better.", author: "Alex Johnson", rating: "★★★★☆" }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white bg-opacity-10 p-6 rounded-lg shadow-lg">
                <p className="mb-4">&quot;{testimonial.text}&quot;</p>
                <h3 className="text-lg font-semibold">- {testimonial.author}</h3>
                <div className="flex justify-center mt-2 text-yellow-400">{testimonial.rating}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-white py-20 text-center">
        <h2 className="text-4xl font-bold mb-4">Ready to book your stay?</h2>
        <p className="text-lg mb-6 text-black">
          Enjoy world-class amenities and make unforgettable memories with us.
        </p>
        <Link href="/book" className="bg-birumuda py-3 px-6 rounded-lg text-lg font-semibold hover:bg-blue-700 transition text-white">
          Reserve Now
        </Link>
      </section>
    </section>
  );
};

export default LandingPage;
