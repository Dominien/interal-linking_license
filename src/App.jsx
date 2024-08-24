import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import InternalLinkingTool from './components/InternalLinkingTool'; // Import your InternalLinkingTool component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login onLogin={() => console.log('Logged in!')} />} />
        <Route path="/internal-linking-tool" element={<InternalLinkingTool />} />
      </Routes>
    </Router>
  );
}

export default App;
