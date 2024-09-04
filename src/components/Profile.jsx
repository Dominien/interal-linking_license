import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for routing

const Profile = () => {
  const [userInfo, setUserInfo] = useState({ user: '', expires: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');

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
            setUserInfo({ user: data.user, expires: '2024-12-31' }); // Mocked expiration date for example
          } else {
            console.error('Invalid token');
          }
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        })
        .finally(() => setLoading(false));
    } else {
      console.error('No token found');
      setLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto p-6">
        <div className="p-8 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Profile</h2>

          {loading ? (
            <div className="flex justify-center items-center">
              <svg
                className="animate-spin h-8 w-8 text-black"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                ></path>
              </svg>
            </div>
          ) : (
            <>
              <div className="mb-4">
                <h3 className="text-lg font-semibold">User Name:</h3>
                <p className="text-gray-700">{userInfo.user}</p>
              </div>

              <div className="mb-4">
                <h3 className="text-lg font-semibold">License Expiration Date:</h3>
                <p className="text-gray-700">{userInfo.expires}</p>
              </div>

              {/* Products Section */}
              <div className="mb-4">
                <h3 className="text-lg font-semibold">Products:</h3>
                <p className="text-gray-700">
                  {/* Link to Internal Linking Tool */}
                  <Link
                    to="/internal-linking-tool"
                    className="text-blue-500 hover:text-blue-700 font-semibold"
                  >
                    Internal Linking Tool
                  </Link>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
