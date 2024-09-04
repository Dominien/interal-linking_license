import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Login from './components/Login';
import InternalLinkingTool from './components/InternalLinkingTool';
import Profile from './components/Profile';
import Navbar from './Navbar'; // Import Navbar component from src
import Footer from './Footer'; // Import Footer component from src

const App = () => {
  const location = useLocation(); // Get the current route location

  return (
    <div>
      {/* Conditionally render Navbar only if the route is not "/" */}
      {location.pathname !== '/' && <Navbar />}
      <Routes>
        <Route path="/" element={<Login onLogin={() => console.log('Logged in!')} />} />
        <Route path="/internal-linking-tool" element={<InternalLinkingTool />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Footer />
    </div>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
