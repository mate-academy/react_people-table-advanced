import React from 'react';
import { Person } from '../../types';

interface NameFilterProps {
  localSearch: Person['name'];
  onChangeLocalSearch: (name: Person['name']) => void;
}

export const NameFilter: React.FC<NameFilterProps> = ({
  localSearch,
  onChangeLocalSearch,
}) => {
  return (
    <div className="panel-block">
      <p className="control has-icons-left">
        <input
          data-cy="NameFilter"
          type="search"
          className="input"
          value={localSearch}
          onChange={event => {
            onChangeLocalSearch(event.target.value);
          }}
          placeholder="Search"
        />

        <span className="icon is-left">
          <i className="fas fa-search" aria-hidden="true" />
        </span>
      </p>
    </div>
  );
};
