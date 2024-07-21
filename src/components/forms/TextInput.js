import React from 'react';

function TextInput({ name, value, onChange, required }) {
  return (
    <div className="form-group">
      <label htmlFor={name}>{name}:</label>
      <input
        type="text"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
}

export default TextInput;