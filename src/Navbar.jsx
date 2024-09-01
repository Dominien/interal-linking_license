import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [userName, setUserName] = useState(''); // State to hold the user's name
  const profilePicUrl = "https://via.placeholder.com/150"; // Replace with actual profile pic URL
  const navigate = useNavigate(); // React Router's hook to programmatically navigate

  // Fetch user details from backend
  useEffect(() => {
    const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage

    if (token) {
      fetch('https://backend-internal-linking.onrender.com/api/get-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      })
        .then(response => response.json())
        .then(data => {
          if (data.valid) {
            setUserName(data.user); // Set the user's name from the response
          } else {
            console.error('Invalid token');
          }
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        });
    } else {
      console.error('No token found');
    }
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token from localStorage
    setDropdownOpen(false);
    navigate('/login'); // Navigate to the login page
  };

  return (
    <nav className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="ml-auto hidden sm:flex sm:items-center"> {/* Added ml-auto to push to the right */}
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center justify-center text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-transparent transition duration-150 ease-in-out"
              >
                <img className="h-8 w-8 rounded-full" src={profilePicUrl} alt="Profile" />
                <span className="ml-3 text-white">{userName}</span> {/* Display the user's name */}
              </button>
              {isDropdownOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                  <Link
                    to="/Profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    My Profile
                  </Link>
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={handleLogout}
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
