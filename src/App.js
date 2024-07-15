import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import './App.css';
import { format } from 'date-fns';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

function App() {
  const [formData, setFormData] = useState({
    "Α.Φ.Μ.": '',
    "Α.Δ.Τ - Α.Γ.Μ": '',
    "Επώνυμο": '',
    "Όνομα": '',
    "Πατρώνυμο": '',
    "Ιδιότητα": '',
    "Ημ/νία Απόκτησης Ιδιότητας": '',
    "Ημ/νία Απώλειας Ιδιότητας": '',
    "Οργανική Μονάδα": '',
    "Νέα Οργανική Μονάδα": '',
    "Βαθμός": '',
    "Όνομα Επιτροπής": '',
    "Αριθμός πρωτοκόλλου απόφασης": '',
    "Ημ/νία Έκδοσης Απόφασης": '',
    "Έχετε υποβάλει το προηγούμενο έτος πόθεν στη Γ ομάδα ελέγχου (ετήσιας)": ''
  });

  const [optionsIdiotita, setOptionsIdiotita] = useState([]);
  const [optionsVathmos, setOptionsVathmos] = useState([]);
  const [optionsOnomaEpitropis, setOptionsOnomaEpitropis] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchExcelData = async (filePath) => {
        const response = await fetch(filePath);
        const arrayBuffer = await response.arrayBuffer();
        const data = new Uint8Array(arrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        console.log(`Data from ${filePath}:`, workbook);
        return workbook;
      };

      try {
        const [wb1, wb2, wb3] = await Promise.all([
          fetchExcelData('./faculty.xlsx'),
          fetchExcelData('./rank.xlsx'),
          fetchExcelData('./reasons.xlsx')
        ]);

        // Process workbook 1 for Ιδιότητα
        const wsname1 = wb1.SheetNames[0];
        const ws1 = wb1.Sheets[wsname1];
        const data1 = XLSX.utils.sheet_to_json(ws1, { header: 1 });
        const options1 = data1.slice(1).map(row => `${row[0]} ${row[1]}`).filter(option => option.trim() !== '');
        setOptionsIdiotita(options1);

        // Process workbook 2 for Βαθμός
        const wsname2 = wb2.SheetNames[0];
        const ws2 = wb2.Sheets[wsname2];
        const data2 = XLSX.utils.sheet_to_json(ws2, { header: 1 });
        const options2 = data2.slice(1).map(row => `${row[0]} ${row[1]}`).filter(option => option.trim() !== '');
        setOptionsVathmos(options2);

        // Process workbook 3 for Όνομα Επιτροπής
        const wsname3 = wb3.SheetNames[0];
        const ws3 = wb3.Sheets[wsname3];
        const data3 = XLSX.utils.sheet_to_json(ws3, { header: 1 });
        const options3 = data3.slice(1).map(row => `${row[0]} ${row[1]}`).filter(option => option.trim() !== '');
        setOptionsOnomaEpitropis(options3);

      } catch (error) {
        console.error('Error reading files:', error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDateChange = (name,date) => {
    setFormData(prevState => ({
      ...prevState,
      [name]: date
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedFormData = {
      ...formData,
      "Ημ/νία Έκδοσης Απόφασης": formData["Ημ/νία Έκδοσης Απόφασης"] ? format(formData["Ημ/νία Έκδοσης Απόφασης"], 'yyyy-MM-dd') : '',
      "Ημ/νία Απόκτησης Ιδιότητας": formData["Ημ/νία Απόκτησης Ιδιότητας"] ? format(formData["Ημ/νία Απόκτησης Ιδιότητας"], 'yyyy-MM-dd') : '',
      "Ημ/νία Απώλειας Ιδιότητας": formData["Ημ/νία Απώλειας Ιδιότητας"] ? format(formData["Ημ/νία Απώλειας Ιδιότητας"], 'yyyy-MM-dd') : ''
    };
    const ws = XLSX.utils.json_to_sheet([formattedFormData]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "FormData");
    XLSX.writeFile(wb, "formData.xlsx");
  };

  return (
    <div className="App">
      <h2>Εφαρμογή Πόθεν</h2>
      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map((key) => (
          key !== "Ιδιότητα" && key !== "Βαθμός" && key !== "Όνομα Επιτροπής" && key !== "Ημ/νία Έκδοσης Απόφασης" && key !== "Ημ/νία Απόκτησης Ιδιότητας" && key !== "Ημ/νία Απώλειας Ιδιότητας" &&  key !== "Έχετε υποβάλει το προηγούμενο έτος πόθεν στη Γ ομάδα ελέγχου (ετήσιας)" ? (
            <div key={key}>
              <label htmlFor={key}>{key}:</label>
              <input
                type="text"
                id={key}
                name={key}
                value={formData[key]}
                onChange={handleChange}
                required
                className="form-control"
              />
            </div>
          ) : key === "Ιδιότητα" ? (
            <div key={key} className="form-group">
              <label htmlFor={key}>{key}:</label>
              <select id={key} name={key} value={formData[key]} onChange={handleChange} required>
                <option value="">Select...</option>
                {optionsIdiotita.map(value => (
                  <option key={value} value={value}>{value}</option>
                ))}
              </select>
            </div>
          ) : key === "Βαθμός" ? (
            <div key={key} className="form-group">
              <label htmlFor={key}>{key}:</label>
              <select id={key} name={key} value={formData[key]} onChange={handleChange} required>
                <option value="">Select...</option>
                {optionsVathmos.map(value => (
                  <option key={value} value={value}>{value}</option>
                ))}
              </select>
            </div>
          ) : key === "Όνομα Επιτροπής" ? (
            <div key={key} className="form-group">
              <label htmlFor={key}>{key}:</label>
              <select id={key} name={key} value={formData[key]} onChange={handleChange} required>
                <option value="">Select...</option>
                {optionsOnomaEpitropis.map(value => (
                  <option key={value} value={value}>{value}</option>
                ))}
              </select>
            </div>
          ) : key === "Ημ/νία Έκδοσης Απόφασης" || key === "Ημ/νία Απόκτησης Ιδιότητας" || key === "Ημ/νία Απώλειας Ιδιότητας"? (
            <div key={key} className="form-group">
              <label htmlFor={key}>{key}:</label>
              <DatePicker
                id={key}
                selected={formData[key]}
                onChange={(date) => handleDateChange(key, date)}
                placeholderText="DD/MM/YYYY"
                dateFormat="dd/MM/yyyy"
                className="form-control"
                required
              />
            </div>
          ) : key === "Έχετε υποβάλει το προηγούμενο έτος πόθεν στη Γ ομάδα ελέγχου (ετήσιας)" ? (
            <div key={key} className="form-group">
              <label>{key}:</label>
              <div className="radio-group">
                <div>
                  <input
                    type="radio"
                    id="yes"
                    name={key}
                    value="Yes"
                    checked={formData[key] === 'Yes'}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="yes">Yes</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="no"
                    name={key}
                    value="No"
                    checked={formData[key] === 'No'}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="no">No</label>
                </div>
              </div>
            </div>
          ) : null
        ))}
        <div className="note">
          <p>Οι υπόχρεοι των οποίων η οικογενειακή κατάσταση έχει μεταβληθεί, εντός του αναφερόμενου έτους, σε σχέση με την τελευταία οριστικοποιημένη αρχική ή ετήσια Δ.Π.Κ. του προηγούμενου έτους αναφοράς, καθώς και όσοι απέκτησαν ιδιότητα υπόχρεου για πρώτη φορά στο αναφερόμενο έτος, απαιτείται να συνδεθούν στην εφαρμογή «Γνωστοποίηση Στοιχείων Συζύγου/ΜΣΣ Υπόχρεου Πόθεν Έσχες» στην διεύθυνση https://www.pothen.gr/syzygos, προκειμένου να γνωστοποιήσουν τον Αριθμό Φορολογικού Μητρώου (Α.Φ.Μ.) των συζύγων τους, των εν διαστάσει συζύγων τους ή των προσώπων με τα οποία έχουν συνάψει σύμφωνο συμβίωσης</p>
        </div>
        <div className="faq-link">
          <a href="https://www.google.gr/" target="_blank" rel="noopener noreferrer">Για περισσότερες πληροφορίες δείτε το FAQ του Υπουργείου από αυτό το link</a>
        </div>
        <button type="submit">Κατάθεση</button>
      </form>
    </div>
  );
}

export default App;
