import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

function ScooterDetails() {
  const { id } = useParams();

  const [scooter, setScooter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const scooterImages = [
    "/scooter1.jpg",
    "/scooter2.jpg",
    "/scooter3.jpg",
  ];

  useEffect(() => {
    const fetchScooter = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/scooters/${id}`
        );

        setScooter(response.data.scooter);
      } catch (error) {
        console.log(error);
        setError("Unable to load scooter details.");
      } finally {
        setLoading(false);
      }
    };

    fetchScooter();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Loading scooter...</p>
      </div>
    );
  }

  if (error || !scooter) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6">
        <p className="text-red-500 mb-5">
          {error || "Scooter not found."}
        </p>

        <Link
          to="/scooters"
          className="px-6 py-3 rounded-xl bg-black text-white font-semibold"
        >
          ← Back to Scooters
        </Link>
      </div>
    );
  }

  const scooterIndex =
    scooter._id.toString().charCodeAt(0) % scooterImages.length;

  const image = scooterImages[scooterIndex];

  return (
    <section className="min-h-screen px-6 py-12 md:py-20">
      <div className="max-w-7xl mx-auto">

        {/* Back Button */}
        <Link
          to="/scooters"
          className="inline-flex items-center text-sm font-semibold mb-10 hover:underline"
        >
          ← Back to Scooters
        </Link>

        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">

          {/* Scooter Image */}
          <div className="bg-gray-100 rounded-3xl h-[350px] md:h-[500px] flex items-center justify-center overflow-hidden">
            <img
              src={image}
              alt={scooter.name}
              className="w-full h-full object-contain p-6 md:p-10"
            />
          </div>

          {/* Product Information */}
          <div>

            <p className="text-sm font-semibold uppercase tracking-[0.2em]">
              {scooter.model}
            </p>

            <h1 className="text-4xl md:text-6xl font-bold mt-3">
              {scooter.name}
            </h1>

            <p className="text-3xl md:text-4xl font-bold mt-6">
              ₹{scooter.price.toLocaleString("en-IN")}
            </p>

            <p className="text-gray-600 leading-7 mt-6">
              {scooter.description}
            </p>

            {/* Specifications */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">

              <div className="border rounded-2xl p-5">
                <p className="text-xs font-semibold tracking-wider text-gray-500">
                  RANGE
                </p>

                <p className="text-lg font-bold mt-2">
                  {scooter.rangeMin}-{scooter.rangeMax} km
                </p>
              </div>

              <div className="border rounded-2xl p-5">
                <p className="text-xs font-semibold tracking-wider text-gray-500">
                  BATTERY
                </p>

                <p className="text-lg font-bold mt-2">
                  {scooter.batteryCapacity} Ah
                </p>
              </div>

              <div className="border rounded-2xl p-5">
                <p className="text-xs font-semibold tracking-wider text-gray-500">
                  TOP SPEED
                </p>

                <p className="text-lg font-bold mt-2">
                  {scooter.topSpeed} km/h
                </p>
              </div>

            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4 mt-10">

              <Link
                to="/service"
                className="px-8 py-4 rounded-xl bg-black text-white text-center font-semibold hover:bg-gray-800 transition"
              >
                Book Service
              </Link>

              <Link
                to="/scooters"
                className="px-8 py-4 rounded-xl border text-center font-semibold hover:bg-gray-100 transition"
              >
                View All Scooters
              </Link>

            </div>

          </div>
        </div>

        {/* Specifications Section */}
        <div className="mt-20 md:mt-28">

          <div className="text-center mb-10">
            <p className="text-sm font-semibold uppercase tracking-widest">
              Specifications
            </p>

            <h2 className="text-3xl md:text-4xl font-bold mt-3">
              Built for Everyday Electric Mobility
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">

            <div className="border rounded-2xl p-6">
              <p className="text-sm text-gray-500">
                Model
              </p>

              <p className="text-xl font-bold mt-2">
                {scooter.model}
              </p>
            </div>

            <div className="border rounded-2xl p-6">
              <p className="text-sm text-gray-500">
                Battery Capacity
              </p>

              <p className="text-xl font-bold mt-2">
                {scooter.batteryCapacity} Ah
              </p>
            </div>

            <div className="border rounded-2xl p-6">
              <p className="text-sm text-gray-500">
                Maximum Range
              </p>

              <p className="text-xl font-bold mt-2">
                {scooter.rangeMax} km
              </p>
            </div>

            <div className="border rounded-2xl p-6">
              <p className="text-sm text-gray-500">
                Top Speed
              </p>

              <p className="text-xl font-bold mt-2">
                {scooter.topSpeed} km/h
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

export default ScooterDetails;