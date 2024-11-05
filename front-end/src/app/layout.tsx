'use client'

import { useState } from 'react';
import Link from 'next/link';
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <html lang="en">
      <body className="antialiased font-sans">
        {/* Navbar */}
        <header className="bg-biru shadow-lg fixed w-full z-50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            {/* Logo */}
            <div className="text-2xl font-bold text-white">SIGMA HOTEL</div>

            {/* Navigation Links (Desktop) */}
            <nav className="hidden md:flex space-x-8 ">
              <Link href="/" className="text-white hover:text-blue-600 transition py-2">
                Home
              </Link>
              <Link href="/rooms" className="text-white hover:text-blue-600 transition py-2">
                Rooms
              </Link>
              <Link href="/facilities" className="text-white hover:text-blue-600 transition py-2">
                Facilities
              </Link>
              <Link href="/about" className="text-white hover:text-blue-600 transition py-2">
                About Us
              </Link>
              {/* Change the Contact link to a button */}
              <Link href="/book" className="bg-birumuda text-white py-2 px-4 rounded transition hover:bg-blue-700">
                Book
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={toggleMenu} className="text-gray-700 focus:outline-none">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu Links */}
          {isMenuOpen && (
            <nav
              className="md:hidden bg-white shadow-lg absolute top-full left-0 w-full z-40"
              style={{ top: '100%' }}
            >
              <ul className="flex flex-col p-4 space-y-4">
                <li>
                  <Link href="/" className="text-gray-700 hover:text-blue-600 transition py-2" onClick={closeMenu}>
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/rooms" className="text-gray-700 hover:text-blue-600 transition py-2" onClick={closeMenu}>
                    Rooms
                  </Link>
                </li>
                <li>
                  <Link href="/facilities" className="text-gray-700 hover:text-blue-600 transition py-2" onClick={closeMenu}>
                    Facilities
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-gray-700 hover:text-blue-600 transition py-2" onClick={closeMenu}>
                    About Us
                  </Link>
                </li>
                {/* Change the Contact link to a button */}
                <li>
                  <Link href="/book" className="bg-blue-600 text-white py-2 px-4 rounded transition hover:bg-blue-700 flex items-center justify-center" onClick={closeMenu}>
                    Book
                  </Link>
                </li>
              </ul>
            </nav>
          )}
        </header>

        {/* Page Content */}
        <main>{children}</main>

        {/* Footer */}
        <footer className="bg-biru text-gray-200">
          <div className="container mx-auto px-4 py-8 text-white">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
              {/* About Us */}
              <div>
                <h3 className="text-xl font-semibold mb-4">About Us</h3>
                <p className="text-sm text-gray-400">
                  SIGMA Hotel is a luxurious hotel offering the best accommodation and service for your comfort and relaxation.
                </p>
              </div>

              {/* Contact Info */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
                <ul className="text-sm text-gray-400 space-y-2">
                  <li>Email: info@schotel.com</li>
                  <li>Phone: +123 456 789</li>
                  <li>Address: 123 Hotel St, City, Country</li>
                </ul>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
                <ul className="text-sm text-gray-400 space-y-2">
                  <li>
                    <a href="/rooms" className="hover:text-blue-600 transition">
                      Rooms
                    </a>
                  </li>
                  <li>
                    <a href="/facilities" className="hover:text-blue-600 transition">
                      Facilities
                    </a>
                  </li>
                  <li>
                    <a href="/about" className="hover:text-blue-600 transition">
                      About Us
                    </a>
                  </li>
                  <li>
                    <a href="/contact" className="hover:text-blue-600 transition">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-400">
              &copy; 2024 SIGMA Hotel. All rights reserved.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
