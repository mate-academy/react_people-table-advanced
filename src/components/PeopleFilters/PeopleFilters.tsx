import React, { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Person } from '../../types';
import { SearchParams, getSearchWith } from '../../utils/searchHelper';
import {
  filterBySex,
  filterByQuery,
  filterByCenturies,
} from '../../utils/filterHelpers';
import { SexFilter } from './SexFilter';
import { QueryFilter } from './QueryFilter';
import { CenturyFilter } from './CenturyFilter';
import { SearchLink } from '../SearchLink';

type Props = {
  people: Person[];
  onFilter: (filteredPeople: Person[]) => void;
};

const centuryArr = ['16', '17', '18', '19', '20'];

export const PeopleFilters: React.FC<Props> = ({ people, onFilter }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sex = (searchParams.get('sex') as Person['sex']) || '';
  const query = searchParams.get('query') || '';
  const centuries = useMemo(
    () => searchParams.getAll('centuries') || [],
    [searchParams],
  );

  const filteredPeopleBySex = useMemo(
    () => filterBySex(people, sex),
    [people, sex],
  );
  const filteredPeopleByQuery = useMemo(
    () => filterByQuery(filteredPeopleBySex, query),
    [filteredPeopleBySex, query],
  );
  const filteredPeopleByCenturies = useMemo(
    () => filterByCenturies(filteredPeopleByQuery, centuries),
    [filteredPeopleByQuery, centuries],
  );

  function searchWithParams(params: SearchParams) {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  }

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    searchWithParams({ query: event.target.value || null });
  };

  const toggleCentury = (ch: string) => {
    const newCenturies = centuries.includes(ch)
      ? centuries.filter(century => century !== ch)
      : [...centuries, ch];

    searchWithParams({ centuries: newCenturies });
  };

  const clearCenturies = () => {
    searchWithParams({ centuries: null });
  };

  useEffect(
    () => onFilter(filteredPeopleByCenturies),
    [onFilter, filteredPeopleByCenturies],
  );

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>
      <SexFilter sex={sex} />
      <QueryFilter query={query} onChange={handleQueryChange} />
      <CenturyFilter
        centuries={centuries}
        centuryArr={centuryArr}
        onToggleCentury={toggleCentury}
        onClearCenturies={clearCenturies}
      />
      <div className="panel-block">
        <SearchLink
          className="button is-link is-outlined is-fullwidth"
          params={{ sex: null, query: null, centuries: null }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
