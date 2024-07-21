import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function DateInput({ name, selected, onChange, required }) {
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
      />
    </div>
  );
}

export default DateInput;