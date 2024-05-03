import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

import { CenturyFilter } from './CenturyFilter';
import { SearchLink } from './SearchLink';
import { NameFilter } from './NameFilter';
import { PersonSex } from '../types/PersonSex';

export const PeopleFilters = () => {
  const [searchParams] = useSearchParams();
  const sex = searchParams.get('sex');

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: null }}
          className={classNames({ 'is-active': !sex })}
        >
          All
        </SearchLink>

        <SearchLink
          params={{ sex: PersonSex.MALE }}
          className={classNames({ 'is-active': sex === PersonSex.MALE })}
        >
          Male
        </SearchLink>

        <SearchLink
          params={{ sex: PersonSex.FEMALE }}
          className={classNames({ 'is-active': sex === PersonSex.FEMALE })}
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
