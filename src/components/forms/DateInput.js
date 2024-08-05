import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function DateInput({ name, selected, onChange, required }) {
  // Get today's date
  const today = new Date();
  
  return (
    <div className="form-group">
      <label htmlFor={name}>{name}:</label>
      <DatePicker
        selected={selected}
        onChange={(date) => onChange(name, date)}
        dateFormat="yyyy-MM-dd"
        placeholderText="DD/MM/YYYY"
        className="form-control"
        required={required}
        maxDate={today}
      />
    </div>
  );
}

export default DateInput;