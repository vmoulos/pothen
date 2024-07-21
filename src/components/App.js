// src/components/App.js
import React from 'react';
import '../styles/App.css';
import FormComponent from './forms/FormComponent'; // Corrected path

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Πόθεν</h1>
      </header>
      <main>
        <FormComponent />
      </main>
    </div>
  );
}

export default App;
