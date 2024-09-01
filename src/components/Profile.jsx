import React, { useEffect, useState } from 'react';

const Profile = () => {
  const [userInfo, setUserInfo] = useState({ user: '', expires: '' });

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
            setUserInfo({ user: data.user, expires: validKeys[normalizedKey].expires });
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

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto p-6">
        <div className="p-8 bg-gray-800 shadow-lg rounded-lg">
          <h1 className="text-3xl font-bold mb-4">Profile</h1>
          <div className="mb-4">
            <h2 className="text-xl font-semibold">User Name:</h2>
            <p className="text-lg">{userInfo.user}</p>
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-semibold">License Expiration Date:</h2>
            <p className="text-lg">{userInfo.expires}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
