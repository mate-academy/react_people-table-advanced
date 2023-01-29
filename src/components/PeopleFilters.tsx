import React, { useCallback } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';
import { CenturyFilter } from './CenturyFilter';
import { NameFilter } from './NameFilter';
import { SexFilter } from './SexFilter';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query');
  const personSex = searchParams.get('sex');

  const onQueryChange = useCallback((
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSearchParams(
      getSearchWith(searchParams, { query: event.target.value || null }),
    );
  }, [query, searchParams]);

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <SexFilter sex={personSex} />

      <NameFilter query={query} onQueryChange={onQueryChange} />

      <CenturyFilter />

      <div className="panel-block">
        <Link
          className="button is-link is-outlined is-fullwidth"
          to="/people"
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
