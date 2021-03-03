import React from 'react';
import { PeopleFilterProps } from './typesDefinitions';

export const PeopleFilter: React.FC<PeopleFilterProps> = ({ query,
  handleQueryChange }) => {

  return (
    <div className="input-group input-group-lg">
      <div className="input-group-prepend">
        <span className="input-group-text">Find person</span>
      </div>
      <input
        type="text"
        className="form-control"
        placeholder="Please enter name"
        value={query}
        onChange={(event) => handleQueryChange(event.target.value)} />
    </div>
  );
};
