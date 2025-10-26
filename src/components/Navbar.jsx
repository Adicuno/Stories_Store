import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-md px-6 py-4 flex justify-between items-center">
    {/* Logo */}
    <Link
      to="/"
      className="text-3xl font-extrabold text-indigo-600 hover:text-indigo-700 transition duration-300"
    >
      StoryStore
    </Link>

    {/* Navigation Links */}
    <div className="space-x-6 flex items-center">
      <Link
        to="/login"
        className="text-gray-700 font-medium hover:text-indigo-600 transition duration-300"
      >
        Login
      </Link>
      <Link
        to="/register"
        className="text-gray-700 font-medium hover:text-indigo-600 transition duration-300"
      >
        Register
      </Link>
      <Link
        to="/profile"
        className="text-gray-700 font-medium hover:text-indigo-600 transition duration-300"
      >
        Profile
      </Link>
    </div>
  </nav>
);

export default Navbar;
