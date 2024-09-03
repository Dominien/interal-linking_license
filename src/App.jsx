import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import InternalLinkingTool from './components/InternalLinkingTool';
import Profile from './components/Profile';
import Login from './components/Login'; // Import the Login component

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Login />} /> {/* Set Login as the main page */}
            <Route path="/tool" element={<InternalLinkingTool />} /> {/* Internal Linking Tool route */}
            <Route path="/profile" element={<Profile />} /> {/* Profile route */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
