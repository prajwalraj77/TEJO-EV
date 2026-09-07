import React, { useEffect, useState } from "react";
import axios from "axios";

function Service() {
    const [scooters, setScooters] = useState([]);

    const [bookingData, setBookingData] = useState({
        scooter: "",
        serviceType: "",
        bookingDate: "",
        amount: "",
    });

    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchScooters = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/api/scooters`
                );

                setScooters(response.data.scooters);
            } catch (error) {
                console.log(error);
                setMessage("Unable to load scooters.");
            } finally {
                setLoading(false);
            }
        };

        fetchScooters();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setBookingData({
            ...bookingData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage("");

        const token = localStorage.getItem("token");

        if (!token) {
            setMessage("Please login before booking a service.");
            return;
        }

        try {
            // Step 1: Create Razorpay order
            const orderResponse = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/payment/create-order`,
                {
                    amount: Number(bookingData.amount),
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const order = orderResponse.data.order;

            // Step 2: Open Razorpay Checkout
            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount: order.amount,
                currency: order.currency,
                name: "TEJO EV",
                description: `${bookingData.serviceType} Service`,
                order_id: order.id,

                handler: async function (response) {
                    try {
                        // Step 3: Verify payment on backend
                        const verificationResponse = await axios.post(
                            `${import.meta.env.VITE_API_URL}/api/payment/verify`,
                            {
                                razorpay_order_id:
                                    response.razorpay_order_id,

                                razorpay_payment_id:
                                    response.razorpay_payment_id,

                                razorpay_signature:
                                    response.razorpay_signature,
                            },
                            {
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                },
                            }
                        );

                        // Step 4: Create booking only after verification
                        if (verificationResponse.data.success) {
                            const bookingResponse = await axios.post(
                               `${import.meta.env.VITE_API_URL}/api/bookings`,
                                bookingData,
                                {
                                    headers: {
                                        Authorization: `Bearer ${token}`,
                                    },
                                }
                            );

                            console.log(bookingResponse.data);

                            setMessage(
                                "Payment successful! Service booking created successfully."
                            );

                            setBookingData({
                                scooter: "",
                                serviceType: "",
                                bookingDate: "",
                                amount: "",
                            });
                        }
                    } catch (error) {
                        console.log(error);

                        setMessage(
                            error.response?.data?.message ||
                            "Payment verification failed."
                        );
                    }
                },

                prefill: {
                    name: "",
                    email: "",
                    contact: "",
                },

                theme: {
                    color: "#000000",
                },

                modal: {
                    ondismiss: function () {
                        setMessage("Payment cancelled.");
                    },
                },
            };


            const razorpay = new window.Razorpay(options);

            razorpay.open();
        } catch (error) {
            console.log(error);

            setMessage(
                error.response?.data?.message ||
                "Unable to start payment."
            );
        }
    };

    return (
        <div className="min-h-screen">

            {/* Hero */}
            <section className="relative overflow-hidden px-6 py-20 md:py-28">
                <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-gray-200 blur-3xl opacity-60" />
                <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-gray-200 blur-3xl opacity-60" />

                <div className="relative max-w-6xl mx-auto text-center">
                    <p className="text-sm font-semibold uppercase tracking-[0.3em]">
                        TEJO EV Service
                    </p>

                    <h1 className="mt-5 text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                        Keep Your EV
                        <span className="block">
                            Running Smoothly
                        </span>
                    </h1>

                    <p className="mx-auto mt-6 max-w-2xl text-base md:text-lg leading-8 text-gray-600">
                        Book professional service for your TEJO EV scooter
                        quickly and conveniently.
                    </p>
                </div>
            </section>

            {/* Main Booking Section */}
            <section className="px-6 pb-20">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

                    {/* Information */}
                    <div className="lg:sticky lg:top-8">

                        <div className="mb-8">
                            <p className="text-sm font-semibold uppercase tracking-widest">
                                Service Support
                            </p>

                            <h2 className="mt-3 text-3xl md:text-4xl font-bold">
                                Expert care for your electric scooter
                            </h2>

                            <p className="mt-5 text-gray-600 leading-7">
                                Select your scooter, choose the service you
                                need, and schedule a convenient date.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                            <div className="rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                                <div className="text-3xl mb-4">🔧</div>

                                <h3 className="text-lg font-bold">
                                    Professional Service
                                </h3>

                                <p className="mt-2 text-sm text-gray-600">
                                    Get your scooter checked and maintained.
                                </p>
                            </div>

                            <div className="rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                                <div className="text-3xl mb-4">📅</div>

                                <h3 className="text-lg font-bold">
                                    Easy Scheduling
                                </h3>

                                <p className="mt-2 text-sm text-gray-600">
                                    Choose a date that works for you.
                                </p>
                            </div>

                            <div className="rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                                <div className="text-3xl mb-4">🔋</div>

                                <h3 className="text-lg font-bold">
                                    Battery Check
                                </h3>

                                <p className="mt-2 text-sm text-gray-600">
                                    Keep your EV battery performing reliably.
                                </p>
                            </div>

                            <div className="rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                                <div className="text-3xl mb-4">⚡</div>

                                <h3 className="text-lg font-bold">
                                    EV Specialists
                                </h3>

                                <p className="mt-2 text-sm text-gray-600">
                                    Service designed for electric mobility.
                                </p>
                            </div>

                        </div>
                    </div>

                    {/* Booking Form */}
                    <div className="rounded-3xl border bg-white p-6 md:p-8 shadow-xl">

                        <div className="mb-8">
                            <p className="text-sm font-semibold uppercase tracking-widest">
                                Book Now
                            </p>

                            <h2 className="mt-2 text-3xl font-bold">
                                Service Booking
                            </h2>

                            <p className="mt-2 text-sm text-gray-500">
                                Fill in the details below to request a service.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">

                            {/* Scooter */}
                            <div>
                                <label
                                    htmlFor="scooter"
                                    className="block text-sm font-semibold mb-2"
                                >
                                    Select Your Scooter
                                </label>

                                <select
                                    id="scooter"
                                    name="scooter"
                                    value={bookingData.scooter}
                                    onChange={handleChange}
                                    required
                                    disabled={loading}
                                    className="w-full rounded-xl border px-4 py-3 outline-none transition-all duration-300 focus:ring-2"
                                >
                                    <option value="">
                                        {loading
                                            ? "Loading scooters..."
                                            : "-- Select Your Scooter --"}
                                    </option>

                                    {scooters.map((item) => (
                                        <option
                                            value={item._id}
                                            key={item._id}
                                        >
                                            {item.name} — {item.model}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Service Type */}
                            <div>
                                <label
                                    htmlFor="serviceType"
                                    className="block text-sm font-semibold mb-2"
                                >
                                    Service Type
                                </label>

                                <select
                                    id="serviceType"
                                    name="serviceType"
                                    value={bookingData.serviceType}
                                    onChange={handleChange}
                                    required
                                    className="w-full rounded-xl border px-4 py-3 outline-none transition-all duration-300 focus:ring-2"
                                >
                                    <option value="">
                                        -- Select Service Type --
                                    </option>

                                    <option value="General Service">
                                        General Service
                                    </option>

                                    <option value="Battery Check">
                                        Battery Check
                                    </option>

                                    <option value="Brake Service">
                                        Brake Service
                                    </option>

                                    <option value="Electrical Check">
                                        Electrical Check
                                    </option>

                                    <option value="Tyre Service">
                                        Tyre Service
                                    </option>
                                </select>
                            </div>

                            {/* Date */}
                            <div>
                                <label
                                    htmlFor="bookingDate"
                                    className="block text-sm font-semibold mb-2"
                                >
                                    Booking Date
                                </label>

                                <input
                                    type="date"
                                    id="bookingDate"
                                    name="bookingDate"
                                    value={bookingData.bookingDate}
                                    onChange={handleChange}
                                    min={new Date()
                                        .toISOString()
                                        .split("T")[0]}
                                    required
                                    className="w-full rounded-xl border px-4 py-3 outline-none transition-all duration-300 focus:ring-2"
                                />
                            </div>

                            {/* Amount */}
                            <div>
                                <label
                                    htmlFor="amount"
                                    className="block text-sm font-semibold mb-2"
                                >
                                    Service Amount
                                </label>

                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-semibold">
                                        ₹
                                    </span>

                                    <input
                                        type="number"
                                        id="amount"
                                        name="amount"
                                        value={bookingData.amount}
                                        onChange={handleChange}
                                        min="0"
                                        placeholder="Enter service amount"
                                        required
                                        className="w-full rounded-xl border px-4 py-3 pl-9 outline-none transition-all duration-300 focus:ring-2"
                                    />
                                </div>
                            </div>

                            {/* Message */}
                            {message && (
                                <div className="rounded-xl border px-4 py-3 text-sm animate-pulse">
                                    {message}
                                </div>
                            )}

                            {/* Submit */}
                            <button
                                type="submit"
                                className="group w-full rounded-xl bg-black px-6 py-4 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl active:translate-y-0"
                            >
                                <span className="inline-flex items-center gap-2">
                                    Pay & Book
                                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                                        →
                                    </span>
                                </span>
                            </button>

                        </form>
                    </div>
                </div>
            </section>

            {/* Bottom CTA */}
            <section className="px-6 pb-20">
                <div className="max-w-6xl mx-auto rounded-3xl border p-8 md:p-12 text-center">

                    <p className="text-sm font-semibold uppercase tracking-widest">
                        TEJO EV
                    </p>

                    <h2 className="mt-3 text-3xl md:text-4xl font-bold">
                        Your EV deserves the right care.
                    </h2>

                    <p className="mt-4 max-w-2xl mx-auto text-gray-600">
                        Schedule your service and keep your electric mobility
                        experience running smoothly.
                    </p>

                </div>
            </section>

        </div>
    );
}

export default Service;