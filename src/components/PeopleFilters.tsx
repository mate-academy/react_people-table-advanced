import { Person } from '../types/Person';
import { NameFilter } from './NameFilter';
import { SexFilter } from './SexFilter';
import { CenturyFilter } from './CenturyFilter';
import { useSearchParams } from 'react-router-dom';
import React from 'react';

interface Props {
  people: Person[];
}

export const PeopleFilters: React.FC<Props> = ({ people }) => {
  const [, setSearchParams] = useSearchParams();

  const centuries = Array.from(
    new Set(people.map(person => Math.ceil(person.born / 100))),
  ).sort((a, b) => a - b);

  const handleReset = () => {
    setSearchParams({});
  };

  return (
    <nav className="panel" data-cy="people-filters">
      <p className="panel-heading">Filters</p>

      <SexFilter />

      <NameFilter />

      <CenturyFilter centuries={centuries} />

      <div className="panel-block">
        <button
          type="button"
          className="button is-link is-outlined is-fullwidth"
          onClick={handleReset}
        >
          Reset all filters
        </button>
      </div>
    </nav>
  );
};
