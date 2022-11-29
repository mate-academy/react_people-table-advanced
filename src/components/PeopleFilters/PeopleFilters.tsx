import { useCallback } from 'react';
import classNames from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';
import { SearchLink } from '../SearchLink';
import { FilterLink } from '../FilterLink';
import { centuries } from '../../utils/centuries';
import { getSearchWith } from '../../utils/searchHelper';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const centuriesParams = searchParams.getAll('centuries') || [];
  const queryParams = searchParams.get('query') || '';

  const handleChangeQuery = useCallback((
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSearchParams(
      getSearchWith(searchParams, { query: event.target.value || null }),
    );
  }, []);

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <FilterLink gender={null}>
          All
        </FilterLink>
        <FilterLink gender="m">
          Male
        </FilterLink>
        <FilterLink gender="f">
          Female
        </FilterLink>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={queryParams}
            onChange={handleChangeQuery}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuries.map(century => (
              <SearchLink
                data-cy="century"
                params={{
                  centuries: centuriesParams.includes(century)
                    ? centuriesParams.filter(cen => cen !== century)
                    : [...centuriesParams, century],
                }}
                className={classNames(
                  'button',
                  'mr-1',
                  { 'is-info': centuriesParams.includes(century) },
                )}
                key={century}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              params={{ centuries: null }}
              className={classNames(
                'button',
                'is-success',
                { 'is-outlined': centuriesParams.length },
              )}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link
          className="button is-link is-outlined is-fullwidth"
          to={{
            search: '',
          }}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
