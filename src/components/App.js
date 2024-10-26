// src/components/App.js
import React from 'react';
import '../styles/App.css';
import FormComponent from './forms/FormComponent'; // Corrected path
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FAQPage from './forms/FAQPage'; // Import the new FAQPage component
import ministryImage from '../assets/ministry.jpg';
import pothenImage from '../assets/pothen_without.png';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <img src={ministryImage} alt="Ministry" style={{width: '45%', height: 'auto'}}/>
            <img src={pothenImage} alt="Pothen" style={{width: '55%', height: 'auto'}}/>
          </div>
          <h1>Εσωτερική εφαρμογή ενημέρωσης και συλλογής απαραίτητων στοιχείων για τη μηνιαία αποστολή καταστάσεων για το πόθεν </h1>
        </header>
        <main>
          <Routes>
            <Route path="/faq" element={<FAQPage/>}/>
            <Route path="/" element={<FormComponent/>}/>
            {/* Add more routes as needed */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
