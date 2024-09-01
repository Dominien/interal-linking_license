import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const userName = "John Doe"; // Replace with actual user data
  const profilePicUrl = "https://via.placeholder.com/150"; // Replace with actual profile pic URL

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16"> {/* Added items-center to vertically center content */}
          <div className="flex">
            <div className="flex-shrink-0">
              <Link to="/" className="text-2xl font-bold text-white no-underline hover:text-gray-400"> {/* Updated link styling */}
                MyApp
              </Link>
            </div>
          </div>
          <div className="hidden sm:flex sm:items-center">
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-white transition duration-150 ease-in-out"
              >
                <img className="h-8 w-8 rounded-full" src={profilePicUrl} alt="Profile" />
                <span className="ml-3">{userName}</span>
              </button>
              {isDropdownOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    My Profile
                  </Link>
                  <Link
                    to="/settings"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Settings
                  </Link>
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => {
                      setDropdownOpen(false);
                      // Handle logout logic here
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
