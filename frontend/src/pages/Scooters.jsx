import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Scooters() {
  const [scooters, setScooters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const scooterImages = [
    "/scooter1.jpg",
    "/scooter2.jpg",
    "/scooter3.jpg",
  ];

  useEffect(() => {
    const fetchScooters = async () => {
      try {
        const response = await axios.get(
         `${import.meta.env.VITE_API_URL}/api/scooters`
        );

        setScooters(response.data.scooters);
      } catch (error) {
        console.log(error);
        setError("Unable to load scooters.");
      } finally {
        setLoading(false);
      }
    };

    fetchScooters();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading scooters...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <section className="min-h-screen px-6 py-16">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-widest">
            Our Collection
          </p>

          <h1 className="text-4xl md:text-5xl font-bold mt-3">
            Explore Our Electric Scooters
          </h1>

          <p className="mt-4 max-w-2xl mx-auto">
            Discover electric scooters designed for comfortable,
            reliable and sustainable everyday mobility.
          </p>
        </div>

        {/* Scooter Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {scooters.map((scooter, index) => {
            const image =
              scooterImages[index % scooterImages.length];

            return (
              <div
                key={scooter._id}
                className="border rounded-2xl overflow-hidden hover:shadow-xl transition"
              >

                {/* Image */}
                <div className="h-64 flex items-center justify-center overflow-hidden">
                  <img
                    src={image}
                    alt={scooter.name}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Details */}
                <div className="p-6">

                  <p className="text-sm uppercase tracking-widest">
                    {scooter.model}
                  </p>

                  <h2 className="text-2xl font-bold mt-2">
                    {scooter.name}
                  </h2>

                  <p className="text-2xl font-bold mt-4">
                    ₹{scooter.price.toLocaleString("en-IN")}
                  </p>

                  {/* Specifications */}
                  <div className="grid grid-cols-3 gap-3 mt-6">

                    <div>
                      <p className="text-xs">RANGE</p>
                      <p className="font-semibold mt-1">
                        {scooter.rangeMin}-{scooter.rangeMax} km
                      </p>
                    </div>

                    <div>
                      <p className="text-xs">BATTERY</p>
                      <p className="font-semibold mt-1">
                        {scooter.batteryCapacity} Ah
                      </p>
                    </div>

                    <div>
                      <p className="text-xs">SPEED</p>
                      <p className="font-semibold mt-1">
                        {scooter.topSpeed} km/h
                      </p>
                    </div>

                  </div>

                  {/* Details Button */}
                  <Link
                    to={`/scooters/${scooter._id}`}
                    className="block text-center mt-6 px-6 py-3 rounded-xl bg-black text-white font-semibold hover:bg-gray-800 transition"
                  >
                    View Details →
                  </Link>

                </div>
              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
}

export default Scooters;