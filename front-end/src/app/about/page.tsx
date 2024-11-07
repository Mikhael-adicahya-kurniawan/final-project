import Image from 'next/image';

const AboutUs = () => {
    return (
        <section className="bg-gray-50 py-20">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center text-gray-900 mb-8 mt-16">About Us</h2>

                <div className="flex flex-col md:flex-row md:space-x-8 rounded-lg shadow-lg p-6 bg-biru">
                    {/* Deskripsi Hotel */}
                    <div className="md:w-2/3 mb-8 md:mb-0">
                        <h3 className="text-2xl font-semibold mb-4 mt-12 text-white">Welcome to SIGMA Hotel</h3>
                        <p className="text-white mb-4">
                            SIGMA Hotel is a luxurious haven where comfort meets elegance. Our dedicated staff is here to ensure your stay is
                            nothing short of extraordinary. Enjoy a range of world-class amenities and services designed to provide
                            an unforgettable experience.
                        </p>
                        <p className="text-white mb-4">
                            Whether you are visiting for business or leisure, SC Hotel offers a variety of accommodations to meet your
                            needs, along with fine dining options and relaxing spaces to unwind.
                        </p>
                    </div>

                    {/* Gambar Hotel */}
                    <div className="md:w-1/3">
                        <Image
                            src="/images/hero.jpg" // Ganti dengan path gambar hotel Anda
                            alt="SC Hotel"
                            width={500} // Lebar gambar
                            height={400} // Tinggi gambar
                            className="rounded-lg shadow-lg" // Gaya gambar
                        />
                    </div>
                </div>

                <div className="flex flex-col md:flex-row md:space-x-8 mt-12">
                    {/* Visi */}
                    <div className="md:w-1/2 bg-white rounded-lg shadow p-6">
                        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Our Vision</h3>
                        <p className="text-gray-600">
                            To be the leading hotel in the region known for exceptional service and hospitality.
                        </p>
                    </div>

                    {/* Misi */}
                    <div className="md:w-1/2 bg-white rounded-lg shadow p-6">
                        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h3>
                        <p className="text-gray-600">
                            To provide our guests with outstanding service and the highest quality accommodations to create memorable
                            experiences.
                        </p>
                    </div>
                </div>

                {/* Tim */}
                <div className="mt-12">
                    <h3 className="text-3xl font-semibold text-center text-gray-800 mb-6">Meet Our Team</h3>
                    <div className="flex flex-wrap justify-center gap-4">
                        {/* Anggota Tim 1 */}
                        <div className="bg-white rounded-lg shadow p-4 w-full sm:w-64 flex-shrink-0">
                            <Image
                                src="/images/foto1.jpg" // Ganti dengan gambar anggota tim Anda
                                alt="Team Member 1"
                                width={200}
                                height={200}
                                className="rounded-full mb-4 mx-auto"
                            />
                            <h4 className="text-lg font-semibold text-gray-800 text-center">Mikhael Adicahya K.</h4>
                            <p className="text-gray-600 text-center">OWNER</p>
                        </div>

                        {/* Anggota Tim 2 */}
                        <div className="bg-white rounded-lg shadow p-4 w-64 flex-shrink-0">
                            <Image
                                src="/images/foto1.jpg" // Ganti dengan gambar anggota tim Anda
                                alt="Team Member 2"
                                width={200}
                                height={200}
                                className="rounded-full mb-4"
                            />
                            <h4 className="text-lg font-semibold text-gray-800">M. Raddya Fakhreza</h4>
                            <p className="text-gray-600">OWNER</p>
                        </div>

                        {/* Anggota Tim 3 */}
                        <div className="bg-white rounded-lg shadow p-4 w-64 flex-shrink-0">
                            <Image
                                src="/images/foto21.png" // Ganti dengan gambar anggota tim Anda
                                alt="Team Member 3"
                                width={200}
                                height={200}
                                className="rounded-full mb-4"
                            />
                            <h4 className="text-lg font-semibold text-gray-800">Zaky Muhammad</h4>
                            <p className="text-gray-600">OWNER</p>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default AboutUs;
