// import React from 'react';
import { useCallback } from 'react';
import classNames from 'classnames';
import {
  Link,
  // Link,
  useSearchParams,
} from 'react-router-dom';
import { SearchLink } from '../SearchLink';
import { SortLink } from '../SortLink';
import { centuries } from '../../utils/centuries';
import { getSearchWith } from '../../utils/searchHelper';
// import { SearchLink } from '../SearchLink';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  // const sex = searchParams.get('sex') || null;
  const centuriesSearchParams = searchParams.getAll('centuries') || [];
  const querySearchParams = searchParams.get('query') || '';

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
        <SortLink gender={null}>
          All
        </SortLink>
        <SortLink gender="m">
          Male
        </SortLink>
        <SortLink gender="f">
          Female
        </SortLink>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={querySearchParams}
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
                  centuries: centuriesSearchParams.includes(century)
                    ? centuriesSearchParams.filter(cen => cen !== century)
                    : [...centuriesSearchParams, century],
                }}
                className={classNames(
                  'button',
                  'mr-1',
                  { 'is-info': centuriesSearchParams.includes(century) },
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
                { 'is-outlined': centuriesSearchParams.length },
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
