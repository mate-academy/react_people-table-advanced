import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { CenturyFilter } from './CenturyFilter';
import { QueryFilter } from './QueryFilter';
import { SearchLink } from './SearchLink';
import { SexFilter } from './SexFilter';

export const PeopleFilters = () => {
  const [searchParams] = useSearchParams();

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <SexFilter />

      <QueryFilter />

      <CenturyFilter />

      <div className="panel-block">
        <SearchLink
          className={cn('button is-link is-fullwidth', {
            'is-outlined': searchParams.entries(),
          })}
          params={{ query: null, century: null, sex: null }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
