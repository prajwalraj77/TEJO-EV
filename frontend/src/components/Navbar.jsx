import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="border-b bg-white">
      <div className="max-w-7xl mx-auto px-6 py-4">

        {/* Main Navbar */}
        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link to="/" onClick={closeMenu} className="flex items-center">
            <img
              src="/tejo-logo.png"
              alt="TEJO EV"
              className="h-10 md:h-11 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">

            <Link
              to="/"
              className="font-medium hover:opacity-60 transition"
            >
              Home
            </Link>

            <Link
              to="/scooters"
              className="font-medium hover:opacity-60 transition"
            >
              Scooters
            </Link>

            <Link
              to="/service"
              className="font-medium hover:opacity-60 transition"
            >
              Service
            </Link>

            <Link
              to="/vehicle"
              className="px-5 py-2.5 rounded-lg bg-black text-white font-semibold hover:bg-gray-800 transition"
            >
              EV Demo
            </Link>

            <Link
              to="/auth"
              className="font-medium hover:opacity-60 transition"
            >
              Login
            </Link>

          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-2xl"
            aria-label="Toggle menu"
          >
            {menuOpen ? "✕" : "☰"}
          </button>

        </div>

        {/* Mobile Navigation */}
        {menuOpen && (
          <div className="md:hidden pt-6 pb-3">

            <div className="flex flex-col gap-5">

              <Link
                to="/"
                onClick={closeMenu}
                className="font-medium"
              >
                Home
              </Link>

              <Link
                to="/scooters"
                onClick={closeMenu}
                className="font-medium"
              >
                Scooters
              </Link>

              <Link
                to="/service"
                onClick={closeMenu}
                className="font-medium"
              >
                Service
              </Link>

              <Link
                to="/vehicle"
                onClick={closeMenu}
                className="font-semibold"
              >
                EV Demo
              </Link>

              <Link
                to="/auth"
                onClick={closeMenu}
                className="font-medium"
              >
                Login
              </Link>

            </div>

          </div>
        )}

      </div>
    </nav>
  );
}

export default Navbar;