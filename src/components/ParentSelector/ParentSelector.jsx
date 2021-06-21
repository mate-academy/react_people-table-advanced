import React from 'react';
import { arrayOf, bool, func, shape, string } from 'prop-types';

export const ParentSelector = ({
  people,
  setParent,
  disabled,
  err,
  errText,
  title,
}) => (
  <div className="select">
    <select
      className={err ? 'is-danger' : ''}
      onChange={(event) => {
        setParent(event.target.value);
      }}
      disabled={disabled}
    >
      <option
        defaultValue
        value=""
      >
        {title}
      </option>
      {people ? people.map(person => (
        <option value={person.name}>
          {person.name}
        </option>
      )) : ''}
    </select>
    <p className="help is-danger">{err ? errText : ''}</p>
  </div>
);

ParentSelector.propTypes = {
  people: arrayOf(shape()).isRequired,
  setParent: func.isRequired,
  disabled: bool,
  err: bool,
  errText: string,
  title: string.isRequired,
};

ParentSelector.defaultProps = {
  disabled: false,
  err: false,
  errText: '',
};
