import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { CenturyFilter } from './CenturyFilter';
import { NameFilter } from './NameFilter';
import { SearchLink } from './SearchLink';

export const PeopleFilters = () => {
  const [searchParams] = useSearchParams();
  const sex = searchParams.get('sex');

  return (
    <nav className="panel">
      <p className="panel-heading">
        Filters
      </p>

      <p className="panel-tabs">
        <SearchLink
          params={{ sex: null }}
          className={classNames('link--small', { 'is-active': !sex })}
        >
          All
        </SearchLink>

        <SearchLink
          params={{ sex: 'm' }}
          className={classNames('link--small', { 'is-active': sex === 'm' })}
        >
          Male
        </SearchLink>

        <SearchLink
          params={{ sex: 'f' }}
          className={classNames('link--small', { 'is-active': sex === 'f' })}
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
          className="
            button
            is-danger-light
            has-background-violet-light
            is-outlined
            is-fullwidth
          "
          params={{
            sex: null,
            query: null,
            centuries: null,
          }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
