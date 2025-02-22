import cn from 'classnames';

import { useSearchParams } from 'react-router-dom';

import { SearchLink } from './SearchLink';
import { QueryFilter } from './QueryFilter';
import { CenturyFilter } from './CenturyFilter';
import { PeopleFilter, Sex } from '../types/enums';

export const PeopleFilters = () => {
  const [searchParams] = useSearchParams();
  const sex = searchParams.get('sex') || '';
  const isMale = sex === `${Sex.MALE}`;

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>
      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: null }}
          className={cn({ 'is-active': !sex })}
        >
          {PeopleFilter.All}
        </SearchLink>
        <SearchLink
          params={{ sex: `${Sex.MALE}` }}
          className={cn({ 'is-active': isMale })}
        >
          {PeopleFilter.Male}
        </SearchLink>
        <SearchLink
          params={{ sex: 'f' }}
          className={cn({ 'is-active': !isMale })}
        >
          {PeopleFilter.Female}
        </SearchLink>
      </p>

      <div className="panel-block">
        <QueryFilter />
      </div>

      <div className="panel-block">
        <CenturyFilter />
      </div>

      <div className="panel-block">
        <SearchLink
          className="button is-link is-outlined is-fullwidth"
          params={{ centuries: null, query: null, sex: null }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
