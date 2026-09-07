import React from "react";
import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="border-t mt-20 bg-gray-50 text-center md:text-left">

            <div className="max-w-7xl mx-auto px-6 py-14">

                {/* Footer Content */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-20">

                    {/* Brand */}
                    <div>
                        <Link to="/" className="inline-block">
                            <img
                                src="/tejo-logo.png"
                                alt="TEJO EV"
                                className="h-10 md:h-11 w-auto object-contain"
                            />
                        </Link>

                        <p className="mt-5 text-sm leading-6 max-w-sm text-gray-600">
                            Smart electric mobility designed for a cleaner,
                            smarter and more sustainable future.
                        </p>
                    </div>

                    {/* Explore */}
                    <div>
                        <h3 className="font-semibold text-lg">
                            Explore
                        </h3>

                        <div className="flex flex-col gap-3 mt-5 text-sm">

                            <Link
                                to="/"
                                className="text-gray-600 hover:text-black transition"
                            >
                                Home
                            </Link>

                            <Link
                                to="/scooters"
                                className="text-gray-600 hover:text-black transition"
                            >
                                Scooters
                            </Link>

                            <Link
                                to="/service"
                                className="text-gray-600 hover:text-black transition"
                            >
                                Service
                            </Link>

                            <Link
                                to="/vehicle"
                                className="text-gray-600 hover:text-black transition"
                            >
                                EV Demo
                            </Link>

                        </div>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="font-semibold text-lg">
                            Services
                        </h3>

                        <div className="flex flex-col gap-3 mt-5 text-sm">

                            <Link
                                to="/service"
                                className="text-gray-600 hover:text-black transition"
                            >
                                Book a Service
                            </Link>

                            <Link
                                to="/auth"
                                className="text-gray-600 hover:text-black transition"
                            >
                                Customer Login
                            </Link>

                            <span className="text-gray-600">
                                EV Support
                            </span>

                            <span className="text-gray-600">
                                Electric Mobility
                            </span>

                        </div>
                    </div>

                </div>

                {/* Bottom Footer */}
                <div className="border-t mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500 text-center md:text-left">

                    <p>
                        © 2026 TEJO EV. All rights reserved.
                    </p>

                    <p>
                        Electric Mobility for a Better Future.
                    </p>

                </div>

            </div>

        </footer>
    );
}

export default Footer;