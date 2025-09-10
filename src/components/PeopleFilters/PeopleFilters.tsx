import { useSearchParams } from 'react-router-dom';
import { SearchLink } from '../SearchLink';
import classNames from 'classnames';
import { NameFilter } from '../NameFilter';
import { CenturyFilter } from '../CenturyFilter';

export const PeopleFilters = () => {
  const [searchParams] = useSearchParams();
  const sexParam = searchParams.get('sex');

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={classNames({ 'is-active': sexParam === null })}
          params={{ sex: null }}
        >
          All
        </SearchLink>
        <SearchLink
          className={classNames({ 'is-active': sexParam === 'm' })}
          params={{ sex: 'm' }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={classNames({ 'is-active': sexParam === 'f' })}
          params={{ sex: 'f' }}
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
          params={{ century: null, sex: null, query: null }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
