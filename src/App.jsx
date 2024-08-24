import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/login';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Navigate to="/tool" /> : <Login onLogin={handleLogin} />} />
        <Route path="/tool" element={isLoggedIn ? <div>Your Tool Here</div> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
