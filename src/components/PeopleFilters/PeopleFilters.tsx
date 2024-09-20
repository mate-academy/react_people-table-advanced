import { useSearchParams } from 'react-router-dom';
import { SexFilter } from '../SexFilter';
import { NameFilter } from '../NameFilter';
import { CenturyFilter } from '../CenturyFilter';
import { SearchLink } from '../SearchLink';
import React from 'react';
import { getSearchWith } from '../../utils/searchHelper';

export const PeopleFilters = () => {
  const [searchParam, setSearchParam] = useSearchParams();

  const selectedCenturies = searchParam.getAll('centuries') || [];
  const selectedSex = searchParam.get('sex') || '';
  const query = searchParam.get('query') || '';

  const getCenturyParams = (century: string) => {
    return selectedCenturies.includes(century)
      ? selectedCenturies.filter(c => c !== century)
      : [...selectedCenturies, century];
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;

    const newSearch = getSearchWith(searchParam, { query: newQuery || null });

    setSearchParam(newSearch);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <SexFilter selectedSex={selectedSex} />

      <NameFilter query={query} onQueryChange={handleQueryChange} />

      <CenturyFilter
        selectedCenturies={selectedCenturies}
        getCenturyParams={getCenturyParams}
      />

      <div className="panel-block">
        <SearchLink
          className="button is-link is-outlined is-fullwidth"
          params={{ centuries: [], sex: null, query: null }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
