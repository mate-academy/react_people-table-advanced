import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const DateInput = ({
  applyDate,
  placeholder,
  label,
  disabled,
  err,
  errText,
  min,
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
        <p className="help is-danger">{err ? errText : ''}</p>
      </div>
    </div>
  );
};

DateInput.propTypes = {
  applyDate: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  err: PropTypes.bool,
  errText: PropTypes.string,
  min: PropTypes.number,
};

DateInput.defaultProps = {
  disabled: false,
  min: 1400,
  errText: '',
  err: false,
};
