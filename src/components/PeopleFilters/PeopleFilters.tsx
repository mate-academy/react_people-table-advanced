import { GenderFilter } from './components/GenderFilter';
import { SearchFilter } from './components/SearchFilter';
import { CenturyFilter } from './components/CenturyFilter';
import { ResetFilters } from './components/ResetFilters';
import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';

export const PeopleFilters = () => {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('query') || '');

  return (
    <div className="column is-7-tablet is-narrow-desktop">
      <nav className="panel">
        <p className="panel-heading">Filters</p>

        <GenderFilter />
        <SearchFilter query={query} setQuery={setQuery} />
        <CenturyFilter />
        <ResetFilters setQuery={setQuery} />
      </nav>
    </div>
  );
};
