import React from 'react';
import './App.css';
import Login from './components/Login'; // Correct import path

function App() {
  const handleLogin = () => {
    console.log('User logged in!');
    // Additional logic after a successful login can be added here
  };

  return (
    <div className="App">
      <Login onLogin={handleLogin} />
    </div>
  );
}

export default App;
