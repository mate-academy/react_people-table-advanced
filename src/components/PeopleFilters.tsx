import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';

import { SearchLink } from './SearchLink';
import { NameFilter } from './NameFilter';
import { CenturyFilter } from './CenturyFilter';

export const PeopleFilters = () => {
  const [searchParams] = useSearchParams();
  const sex = searchParams.get('sex');

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: null }}
          className={cn({ 'is-active': sex === null })}
        >
          All
        </SearchLink>

        <SearchLink
          params={{ sex: 'm' }}
          className={cn({ 'is-active': sex === 'm' })}
        >
          Male
        </SearchLink>

        <SearchLink
          params={{ sex: 'f' }}
          className={cn({ 'is-active': sex === 'f' })}
        >
          Female
        </SearchLink>
      </p>

      <div className="panel-block">
        <NameFilter />
      </div>

      <div className="panel-block">
        <CenturyFilter />
      </div>

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
