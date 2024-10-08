import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import { format } from 'date-fns';
import '../styles/App.css';
import TextInput from './TextInput';
import SelectInput from './SelectInput';
import DateInput from './DateInput';
import RadioInput from './RadioInput';
import NoteInput from '../forms/NoteInput';
import FaqInput from '../forms/FaqInput';

import formFields from '../config/fieldsConfig'; // Adjust the path as per your project structure

function FormComponent() {
  const initialFormData = formFields.reduce((acc, field) => {
    acc[field.name] = '';
    return acc;
  }, {});

  const [formData, setFormData] = useState(initialFormData); 

  const [optionsIdiotita, setOptionsIdiotita] = useState([]);
  const [optionsVathmos, setOptionsVathmos] = useState([]);
  const [optionsOnomaEpitropis, setOptionsOnomaEpitropis] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const fetchExcelData = async (filePath) => {
        const response = await fetch(filePath);
        const arrayBuffer = await response.arrayBuffer();
        const data = new Uint8Array(arrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        return workbook;
      };

      try {
        const [wb1, wb2, wb3] = await Promise.all([
          fetchExcelData('./faculty.xlsx'),
          fetchExcelData('./rank.xlsx'),
          fetchExcelData('./committee.xlsx')
        ]);

        const processIdiotita = (workbook) => {
          const wsname = workbook.SheetNames[0];
          const ws = workbook.Sheets[wsname];
          const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
          return data.slice(1).map(row => `${row[0]} ${row[1]}`).filter(option => option.trim() !== '');
        };

        const processWorkbook = (workbook) => {
          const wsname = workbook.SheetNames[0];
          const ws = workbook.Sheets[wsname];
          const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
          return data.slice(1).map(row => `${row[1]}`).filter(option => option.trim() !== '');
        };

        setOptionsIdiotita(processIdiotita(wb1));
        setOptionsVathmos(processWorkbook(wb2));
        setOptionsOnomaEpitropis(processWorkbook(wb3));

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

  const handleDateChange = (name, date) => {
    setFormData(prevState => ({
      ...prevState,
      [name]: date
    }));
  };

  const keyMapping = {
    "Α.Φ.Μ.": "afm",
    "Α.Δ.Τ - Α.Γ.Μ": "adt_agm",
    "Επώνυμο": "surname",
    "Όνομα": "name",
    "Πατρώνυμο": "patronym",
    "Ιδιότητα": "idiotita",
    "Ημ/νία Απόκτησης Ιδιότητας": "acquisition_date",
    "Ημ/νία Απώλειας Ιδιότητας": "loss_date",
    "Οργανική Μονάδα": "org_unit",
    "Νέα Οργανική Μονάδα": "new_org_unit",
    "Βαθμός": "grade",
    "Όνομα Επιτροπής": "committee_name",
    "Αριθμός πρωτοκόλλου απόφασης": "decision_protocol_number",
    "Ημ/νία Έκδοσης Απόφασης": "decision_date",
    "Έχετε υποβάλει το προηγούμενο έτος πόθεν στη Γ ομάδα ελέγχου (ετήσιας)": "submitted_previous_year",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedFormData = Object.keys(formData).reduce((acc, key) => {
      const newKey = keyMapping[key];
      acc[newKey] = formData[key];
      return acc;
    }, {});
    // Additional formatting
    formattedFormData["acquisition_date"] = formData["Ημ/νία Απόκτησης Ιδιότητας"] 
    ? format(formData["Ημ/νία Απόκτησης Ιδιότητας"], 'yyyy-MM-dd') 
    : '';
    formattedFormData["loss_date"] = formData["Ημ/νία Απώλειας Ιδιότητας"] 
    ? format(formData["Ημ/νία Απώλειας Ιδιότητας"], 'yyyy-MM-dd') 
    : null;
    formattedFormData["decision_date"] = formData["Ημ/νία Έκδοσης Απόφασης"] 
    ? format(formData["Ημ/νία Έκδοσης Απόφασης"], 'yyyy-MM-dd') 
    : '';
    formattedFormData["submitted_previous_year"] = formData["Έχετε υποβάλει το προηγούμενο έτος πόθεν στη Γ ομάδα ελέγχου (ετήσιας)"] === 'Yes';

    try {
      const response = await fetch('http://localhost:3002/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formattedFormData)
      });
      const result = await response.json();
      if (!result.success) {
        // Handle the error
        setMessage({ type: 'error', text: result.error });
      } else {
        // Handle success
        setMessage({ type: 'success', text: 'Τα στοιχεία καταχωρήθηκαν επιτυχώς.' });
      }
    } catch (error) {
      // Handle network or other errors
      setMessage({ type: 'error', text: 'An unexpected error occurred. Please try again.' });
    }
  };

  return (
  <div>
    <form onSubmit={handleSubmit}>
      <TextInput name="Α.Φ.Μ." value={formData["Α.Φ.Μ."]} onChange={handleChange} required />
      <TextInput name="Α.Δ.Τ - Α.Γ.Μ" value={formData["Α.Δ.Τ - Α.Γ.Μ"]} onChange={handleChange} required />
      <TextInput name="Επώνυμο" value={formData["Επώνυμο"]} onChange={handleChange} required />
      <TextInput name="Όνομα" value={formData["Όνομα"]} onChange={handleChange} required />
      <TextInput name="Πατρώνυμο" value={formData["Πατρώνυμο"]} onChange={handleChange} required />
      <SelectInput name="Ιδιότητα" value={formData["Ιδιότητα"]} onChange={handleChange} options={optionsIdiotita} required />
      <DateInput name="Ημ/νία Απόκτησης Ιδιότητας" selected={formData["Ημ/νία Απόκτησης Ιδιότητας"]} onChange={handleDateChange} required />
      <DateInput name="Ημ/νία Απώλειας Ιδιότητας" selected={formData["Ημ/νία Απώλειας Ιδιότητας"]} onChange={handleDateChange}s />
      <TextInput name="Οργανική Μονάδα" value={formData["Οργανική Μονάδα"]} onChange={handleChange} required />
      <TextInput name="Νέα Οργανική Μονάδα" value={formData["Νέα Οργανική Μονάδα"]} onChange={handleChange} required />
      <SelectInput name="Βαθμός" value={formData["Βαθμός"]} onChange={handleChange} options={optionsVathmos} required />
      <SelectInput name="Όνομα Επιτροπής" value={formData["Όνομα Επιτροπής"]} onChange={handleChange} options={optionsOnomaEpitropis} required />
      <TextInput name="Αριθμός πρωτοκόλλου απόφασης" value={formData["Αριθμός πρωτοκόλλου απόφασης"]} onChange={handleChange} required />
      <DateInput name="Ημ/νία Έκδοσης Απόφασης" selected={formData["Ημ/νία Έκδοσης Απόφασης"]} onChange={handleDateChange} required />
      <RadioInput name="Έχετε υποβάλει το προηγούμενο έτος πόθεν στη Γ ομάδα ελέγχου (ετήσιας)" value={formData["Έχετε υποβάλει το προηγούμενο έτος πόθεν στη Γ ομάδα ελέγχου (ετήσιας)"]} onChange={handleChange} required />
      <NoteInput />
      <FaqInput />
      {message && (
          <div className={message.type === 'error' ? 'error-message' : 'success-message'}>
            {message.text}
          </div>
        )}
      <button type="submit">Κατάθεση</button>
    </form>
  </div>
  );
}

export default FormComponent;