import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    "Α.Φ.Μ.": '',
    "Α.Δ.Τ - Α.Γ.Μ": '',
    "Επώνυμο": '',
    "Όνομα": '',
    "Πατρώνυμο": '',
    "Μητρώνυμο": '',
    "Ημ/νία Γέννησης": '',
    "Δήμος": '',
    "Δ.Ο.Υ": '',
    "Ιδιότητα": '',
    "Νόμος": '',
    "Ημ/νία Απόκτησης Ιδιότητας": '',
    "Ημ/νία Απώλειας Ιδιότητας": '',
    "Οργανική Μονάδα": '',
    "Νέα Οργανική Μονάδα": '',
    "Βαθμός": '',
  });
  const [ids, setIds] = useState([]);
  const [grades, setGrades] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: 'binary' });

      // Reading IDs from the first sheet, skipping the first line
      const wsnameIds = wb.SheetNames[0];
      const wsIds = wb.Sheets[wsnameIds];
      const dataIds = XLSX.utils.sheet_to_json(wsIds, { header: 1 });
      const idsFromXLS = dataIds.slice(1).map(row => row[0]).filter(id => id !== undefined);
      setIds(idsFromXLS);

      // Reading Βαθμός from the third sheet, skipping the first line
      const wsnameGrades = wb.SheetNames[2]; // Sheets are 0-indexed; 2 means the third sheet
      const wsGrades = wb.Sheets[wsnameGrades];
      const dataGrades = XLSX.utils.sheet_to_json(wsGrades, { header: 1 });
      const gradesFromXLS = dataGrades.slice(1).map(row => row[0]).filter(grade => grade !== undefined);
      setGrades(gradesFromXLS);
    };
    reader.readAsBinaryString(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const ws = XLSX.utils.json_to_sheet([formData]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "FormData");
    XLSX.writeFile(wb, "formData.xlsx");
  };

  return (
      <div className="App">
        <h2>Εφαρμογή Πόθεν</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="file">Αρχείο XLS που περιέχει τους κωδικούς:</label>
            <input type="file" id="file" accept=".xls,.xlsx" onChange={handleFileChange} />
          </div>

          {Object.keys(formData).map((key) => (
              key !== "Ιδιότητα" && key !== "Βαθμός" ? (
                  <div key={key}>
                    <label htmlFor={key}>{key}:</label>
                    <input
                        type="text"
                        id={key}
                        name={key}
                        value={formData[key]}
                        onChange={handleChange}
                    />
                  </div>
              ) : (
                  <div key={key}>
                    <label htmlFor={key}>{key}:</label>
                    <select id={key} name={key} value={formData[key]} onChange={handleChange}>
                      <option value="">Select...</option>
                      {(key === "Ιδιότητα" ? ids : grades).map(value => (
                          <option key={value} value={value}>{value}</option>
                      ))}
                    </select>
                  </div>
              )
          ))}
          <button type="submit">Save to XLS</button>
        </form>
      </div>
  );
}

export default App;
