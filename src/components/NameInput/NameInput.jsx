import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const NameInput = ({ applyName }) => {
  const [name, setName] = useState('');

  return (
    <div className="field">
      <label>
        Name
        <div className="control">
          <input
            value={name}
            onChange={(event) => {
              if (event.target.value.search(/[0-9]/) === -1) {
                setName(event.target.value);
                applyName(event.target.value);
              }
            }}
            className="input"
            type="text"
            placeholder="John Smith junior"
            required
          />
        </div>
      </label>
    </div>
  );
};

NameInput.propTypes = {
  applyName: PropTypes.func.isRequired,
};
