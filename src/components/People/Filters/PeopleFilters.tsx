import React from 'react';
import { CenturyFilter } from './CenturyFilter';
import { NameFilter } from './NameFilter';
import { SexFilter } from './SexFilter';
import { Person } from '../../../types';
import { SearchLink } from '../../SearchLink';

type Props = {
  peopleFromServer: Person[],
  searchParams: URLSearchParams,
  setSearchParams: (searchParams: URLSearchParams) => void,
  query: string,
  selectedSex: string,
  centuries: string[],
  getCenturyFromYear: (year: number) => number,
};

export const PeopleFilters: React.FC<Props> = ({
  peopleFromServer,
  searchParams,
  setSearchParams,
  query,
  selectedSex,
  centuries,
  getCenturyFromYear,
}) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);

    params.set('query', event.target.value);

    setSearchParams(params);
  };

  const handleSexChange = (filterSex: string) => {
    const params = new URLSearchParams(searchParams);

    params.set('sex', filterSex);

    setSearchParams(params);
  };

  const toggleCenturyChange = (century: string) => {
    const params = new URLSearchParams(searchParams);

    const newCenturies = centuries.includes(century)
      ? centuries.filter(c => c !== century)
      : [...centuries, century];

    params.delete('centuries');
    newCenturies.forEach(c => params.append('centuries', c));

    setSearchParams(params);
  };

  const clearCenturies = () => {
    const params = new URLSearchParams(searchParams);

    params.delete('centuries');
    setSearchParams(params);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <SexFilter
        selectedSex={selectedSex}
        handleSexChange={handleSexChange}
      />
      <NameFilter
        query={query}
        handleInputChange={handleInputChange}
      />
      <CenturyFilter
        peopleFromServer={peopleFromServer}
        centuries={centuries}
        clearCenturies={clearCenturies}
        toggleCenturyChange={toggleCenturyChange}
        getCenturyFromYear={getCenturyFromYear}
      />

      <div className="panel-block">
        <SearchLink
          params={{
            sex: null,
            query: null,
            centuries: null,
          }}
          className="button is-link is-outlined is-fullwidth"
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
