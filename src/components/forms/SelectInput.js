import React from 'react';

function SelectInput({ name, value, onChange, options, required }) {
  return (
    <div className="form-group">
      <label htmlFor={name}>{name}:</label>
      <select id={name} name={name} value={value} onChange={onChange} required={required}>
        <option value="">Επιλογή...</option>
        {options.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}

export default SelectInput;