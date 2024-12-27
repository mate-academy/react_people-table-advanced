import { debounce } from 'lodash';
import { Link, useSearchParams } from 'react-router-dom';
import { useCallback, useEffect } from 'react';
import classNames from 'classnames';
import { SearchLink } from '../SearchLink';
import { getSearchWith } from '../../utils/searchHelper';

const centuriesArr = ['16', '17', '18', '19', '20'];

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const currentCenturies = searchParams.getAll('centuries') || [];

  const applyQuery = useCallback(
    debounce(
      (
        value: string | null,
        searchParams: URLSearchParams,
        setSearchParams: Function,
      ) => {
        setSearchParams(getSearchWith(searchParams, { query: value }));
      },
      500,
    ),
    [],
  );

  useEffect(() => {
    return () => {
      applyQuery.cancel();
    };
  }, []);

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    applyQuery(event.target.value || null, searchParams, setSearchParams);
  };

  const toggleCenturies = (century: string) => {
    return currentCenturies.includes(century)
      ? currentCenturies.filter(num => num !== century)
      : [...currentCenturies, century];
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
            className="input"
            placeholder="Search"
            onChange={handleQueryChange}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuriesArr.map(century => (
              <SearchLink
                data-cy="century"
                key={century}
                className={classNames('button mr-1', {
                  'is-info': currentCenturies.includes(century),
                })}
                params={{
                  centuries: toggleCenturies(century),
                }}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={classNames('button is-success', {
                'is-outlined': centuriesArr.length,
              })}
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
          to={{ search: '' }}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
