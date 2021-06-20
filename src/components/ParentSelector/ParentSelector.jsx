import React from 'react';
import { arrayOf, bool, func, shape, string } from 'prop-types';

export const ParentSelector = ({
  people,
  setParent,
  disabled = false,
  err,
}) => (
  <div className="select">
    <select
      className={err ? 'is-danger' : ''}
      onChange={event => setParent(event.target.value)}
      disabled={disabled}
    >
      <option
        selected
        value=""
      >
        select mother
      </option>
      {people ? people.map(person => (
        <option value={person.name}>
          {person.name}
        </option>
      )) : ''}
    </select>
    <p className="help is-danger">{err}</p>
  </div>
);

ParentSelector.propTypes = {
  people: arrayOf(shape()).isRequired,
  setParent: func.isRequired,
  disabled: bool,
  err: string.isRequired,
};

ParentSelector.defaultProps = {
  disabled: false,
};
