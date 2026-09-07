
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";

function Home() {
    const [scooters, setScooters] = useState([]);

    useEffect(() => {
        const fetchScooters = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/api/scooters`
                );

                setScooters(response.data.scooters);
            } catch (error) {
                console.log(error);
            }
        };

        fetchScooters();
    }, []);

    return (
        <div>
           

            <section className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6">
                <h1 className="text-5xl md:text-7xl font-bold max-w-4xl">
                    Electric Mobility for a Better Future
                </h1>

                <p className="mt-6 text-lg max-w-2xl">
                    Experience smart, sustainable and reliable electric mobility
                    designed for modern India.
                </p>

                <div className="flex gap-4 mt-8">
                    <Link
                        to="/scooters"
                        className="px-6 py-3 rounded-lg bg-black text-white"
                    >
                        Explore Scooters
                    </Link>

                    <Link
                        to="/service"
                        className="px-6 py-3 rounded-lg border border-black"
                    >
                        Book a Service
                    </Link>
                </div>
            </section>





  <section className="px-6 py-20">
    <div className="max-w-7xl mx-auto">

        <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest">
                Our Collection
            </p>

            <h2 className="text-4xl md:text-5xl font-bold mt-3">
                Explore Our Electric Scooters
            </h2>

            <p className="mt-4 max-w-2xl mx-auto">
                Discover electric scooters designed for comfortable,
                reliable and sustainable everyday mobility.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {scooters.slice(0, 6).map((scooter, index) => {

                const scooterImages = [
                    "/scooter1.jpg",
                    "/scooter2.jpg",
                    "/scooter3.jpg",
                ];

                const image =
                    scooterImages[index % scooterImages.length];

                return (
                    <div
                        key={scooter._id}
                        className="group rounded-2xl border overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                    >

                        {/* Image */}
                        <div className="h-64 overflow-hidden">
                            <img
                                src={image}
                                alt={scooter.name}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                        </div>

                        {/* Content */}
                        <div className="p-6">

                            <p className="text-sm mb-2">
                                {scooter.model}
                            </p>

                            <h3 className="text-2xl font-bold">
                                {scooter.name}
                            </h3>

                            <p className="mt-3 text-sm line-clamp-2">
                                {scooter.description}
                            </p>

                            <div className="grid grid-cols-3 gap-3 mt-6">

                                <div>
                                    <p className="text-xs">
                                        RANGE
                                    </p>

                                    <p className="font-semibold">
                                        {scooter.rangeMin}-{scooter.rangeMax} km
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs">
                                        BATTERY
                                    </p>

                                    <p className="font-semibold">
                                        {scooter.batteryCapacity} Ah
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs">
                                        SPEED
                                    </p>

                                    <p className="font-semibold">
                                        {scooter.topSpeed} km/h
                                    </p>
                                </div>

                            </div>

                            <div className="flex items-center justify-between mt-6">

                                <div>
                                    <p className="text-sm">
                                        Starting from
                                    </p>

                                    <p className="text-2xl font-bold">
                                        ₹{scooter.price.toLocaleString("en-IN")}
                                    </p>
                                </div>

                                <Link
                                    to={`/scooters/${scooter._id}`}
                                    className="px-5 py-3 rounded-lg transition-all duration-300 hover:-translate-y-1"
                                >
                                    View Details →
                                </Link>

                            </div>

                        </div>
                    </div>
                );
            })}

        </div>

        <div className="text-center mt-12">
            <Link
                to="/scooters"
                className="inline-block px-7 py-3 rounded-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
                View All Scooters →
            </Link>
        </div>

    </div>
</section>

            <section className="px-6 py-20">
                <div className="max-w-7xl mx-auto">

                    <div className="text-center mb-12">
                        <p className="text-sm font-semibold uppercase tracking-widest">
                            Why TEJO EV
                        </p>

                        <h2 className="text-4xl md:text-5xl font-bold mt-3">
                            Built for Modern Mobility
                        </h2>

                        <p className="mt-4 max-w-2xl mx-auto">
                            Experience electric mobility designed around performance,
                            comfort and everyday practicality.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                        <div className="p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                            <div className="text-3xl mb-4">⚡</div>

                            <h3 className="text-xl font-bold">
                                Fast Charging
                            </h3>

                            <p className="mt-3">
                                Spend less time charging and more time on the road.
                            </p>
                        </div>

                        <div className="p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                            <div className="text-3xl mb-4">🔋</div>

                            <h3 className="text-xl font-bold">
                                Long Range
                            </h3>

                            <p className="mt-3">
                                Designed to support practical everyday travel and commuting.
                            </p>
                        </div>

                        <div className="p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                            <div className="text-3xl mb-4">🛠</div>

                            <h3 className="text-xl font-bold">
                                Low Maintenance
                            </h3>

                            <p className="mt-3">
                                Electric mobility with reduced maintenance requirements.
                            </p>
                        </div>

                        <div className="p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                            <div className="text-3xl mb-4">🌱</div>

                            <h3 className="text-xl font-bold">
                                Sustainable Mobility
                            </h3>

                            <p className="mt-3">
                                Move towards cleaner and more sustainable transportation.
                            </p>
                        </div>

                    </div>
                </div>
            </section>

            
        </div>
    );
}

export default Home;