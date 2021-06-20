import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const DateInput = ({
  applyDate,
  placeholder,
  label,
  disabled = false,
  err = '',
  min = 1400,
}) => {
  const [date, setDate] = useState('');

  return (
    <div className="field">
      <label className="label">{label}</label>
      <div className="control">
        <input
          min={min}
          max="2021"
          disabled={disabled}
          value={date}
          onChange={(event) => {
            setDate(event.target.value);
            applyDate(+event.target.value);
          }}
          className={`input ${err ? 'is-danger' : ''}`}
          type="number"
          placeholder={placeholder}
          required
        />
        <p className="help is-danger">{err}</p>
      </div>
    </div>
  );
};

DateInput.propTypes = {
  applyDate: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  err: PropTypes.string.isRequired,
  min: PropTypes.number.isRequired,
};
