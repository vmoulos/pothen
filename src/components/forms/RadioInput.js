import React from 'react';

function RadioInput({ name, value, onChange, required }) {
  return (
    <div className="form-group">
      <label>{name}:</label>
      <div>
        <label>
          <input
            type="radio"
            name={name}
            value="Ναι"
            checked={value === 'Ναι'}
            onChange={onChange}
            required={required}
          />
          Ναι
        </label>
        <label>
          <input
            type="radio"
            name={name}
            value="Οχι"
            checked={value === 'Οχι'}
            onChange={onChange}
            required={required}
          />
          Οχι
        </label>
      </div>
    </div>
  );
}

export default RadioInput;