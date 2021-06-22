import React from 'react';
import { arrayOf, bool, func, shape, string } from 'prop-types';

export const ParentSelector = ({
  people,
  setParent,
  disabled,
  title,
}) => (
  <div className="select">
    <select
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
  </div>
);

ParentSelector.propTypes = {
  people: arrayOf(shape()).isRequired,
  setParent: func.isRequired,
  disabled: bool,
  title: string.isRequired,
};

ParentSelector.defaultProps = {
  disabled: false,
};
