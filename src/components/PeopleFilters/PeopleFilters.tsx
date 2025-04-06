import { GenderFilter } from './components/GenderFilter';
import { SearchFilter } from './components/SearchFilter';
import { CenturyFilter } from './components/CenturyFilter';
import { ResetFilters } from './components/ResetFilters';
import { useSearchParams } from 'react-router-dom';
import { useContext, useState } from 'react';
import { Context } from '../../context/PeoplePageContext';

export const PeopleFilters = () => {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('query') || '');
  const {
    context: { isLoading },
  } = useContext(Context);

  if (isLoading) {
    return null;
  }

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
