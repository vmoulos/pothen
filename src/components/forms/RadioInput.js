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
            value="Yes"
            checked={value === 'Yes'}
            onChange={onChange}
            required={required}
          />
          Yes
        </label>
        <label>
          <input
            type="radio"
            name={name}
            value="No"
            checked={value === 'No'}
            onChange={onChange}
            required={required}
          />
          No
        </label>
      </div>
    </div>
  );
}

export default RadioInput;