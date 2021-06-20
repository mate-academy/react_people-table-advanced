import React, { useState } from 'react';
import { func } from 'prop-types';

export const SexSelector = ({ applySex }) => {
  const [sex, setSex] = useState('');

  return (
    <div className="field">
      <label className="label">
        {' '}
        Sex
        <div
          className="control"
          value={sex}
          onChange={(event) => {
            applySex(event.target.value);
            setSex(event.target.value);
          }}
        >
          <label className="radio">
            <input
              value="m"
              type="radio"
              name="answer"
              required
            />
            male
          </label>
          <label className="radio">
            <input
              value="f"
              type="radio"
              name="answer"
              required
            />
            female
          </label>
        </div>
      </label>
    </div>
  );
};

SexSelector.propTypes = {
  applySex: func.isRequired,
};
