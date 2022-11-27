import { FC } from 'react';
import classNames from 'classnames';
import { Link, useResolvedPath, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../utils/searchHelper';
import { SearchLink } from '../SearchLink';

const centuriesDefault = ['16', '17', '18', '19', '20'];

export const PeopleFilters: FC = () => {
  const [searchParams, setSeachParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const parentPath = useResolvedPath('../').pathname;

  const onQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSeachParams(
      getSearchWith(searchParams, { query: event.target.value || null }),
    );
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={classNames({ 'is-active': sex === null })}
          params={{ sex: null }}
        >
          All
        </SearchLink>

        <SearchLink
          className={classNames({ 'is-active': sex === 'm' })}
          params={{ sex: 'm' }}
        >
          Male
        </SearchLink>

        <SearchLink
          className={classNames({ 'is-active': sex === 'f' })}
          params={{ sex: 'f' }}
        >
          Female
        </SearchLink>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            value={query}
            className="input"
            placeholder="Search"
            onChange={onQueryChange}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuriesDefault.map(cent => (
              <SearchLink
                data-cy="century"
                key={cent}
                className={classNames('button mr-1',
                  { 'is-info': centuries.includes(cent) })}
                params={{
                  centuries: centuries.includes(cent)
                    ? centuries.filter(c => c !== cent)
                    : [...centuries, cent],
                }}
              >
                {cent}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className="button is-success is-outlined"
              params={{ centuries: null }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link
          className="button is-link is-outlined is-fullwidth"
          to={{ pathname: parentPath }}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
