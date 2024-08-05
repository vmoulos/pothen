// src/components/App.js
import React from 'react';
import '../styles/App.css';
import FormComponent from './forms/FormComponent'; // Corrected path
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FAQPage from './forms/FAQPage'; // Import the new FAQPage component

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Πόθεν</h1>
        </header>
        <main>
          <Routes>
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/" element={<FormComponent />} />
            {/* Add more routes as needed */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
