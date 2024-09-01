import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import InternalLinkingTool from './components/InternalLinkingTool';
import Profile from './components/Profile'; // Import the Profile component

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<InternalLinkingTool />} />
            <Route path="/profile" element={<Profile />} /> {/* Profile route */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
