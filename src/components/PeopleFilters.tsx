import cn from 'classnames';
import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import { SearchParams, getSearchWith } from '../utils/searchHelper';
import { Sex } from '../types';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];

  const centuriesButton = ['16', '17', '18', '19', '20'];

  const setSearchWith = useCallback(
    (params: SearchParams) => {
      const search = getSearchWith(searchParams, params);

      setSearchParams(search);
    },
    [searchParams, setSearchParams],
  );

  const handleQueryChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchWith({ query: event.target.value || null });
    },
    [setSearchWith],
  );

  return (
    <>
      <nav className="panel">
        <p className="panel-heading">Filters</p>

        {/* FILTER_All_m_f */}
        <p className="panel-tabs" data-cy="SexFilter">
          <SearchLink
            className={cn('', {
              'is-active': !sex,
            })}
            params={{ sex: null }}
          >
            All
          </SearchLink>

          <SearchLink
            className={cn({
              'is-active': sex === Sex.MALE,
            })}
            params={{ sex: Sex.MALE }}
          >
            Male
          </SearchLink>

          <SearchLink
            className={cn({
              'is-active': sex === Sex.FEMALE,
            })}
            params={{ sex: Sex.FEMALE }}
          >
            Female
          </SearchLink>
        </p>

        {/* SEARCHING */}
        <div className="panel-block">
          <p className="control has-icons-left">
            <input
              data-cy="NameFilter"
              type="search"
              className="input"
              placeholder="Search"
              value={query}
              onChange={event => handleQueryChange(event)}
            />

            <span className="icon is-left">
              <i className="fas fa-search" aria-hidden="true" />
            </span>
          </p>
        </div>

        {/* CHOOSE PARAMETERS CENTURIES */}
        <div className="panel-block">
          <div
            className="level is-flex-grow-1 is-mobile"
            data-cy="CenturyFilter"
          >
            <div className="level-left">
              {centuriesButton.map(century => (
                <SearchLink
                  key={century}
                  className={cn('button mr-1', {
                    'is-info': centuries.includes(century),
                  })}
                  params={{
                    centuries: centuries.includes(century)
                      ? centuries.filter(years => century !== years)
                      : [...centuries, century],
                  }}
                >
                  {century}
                </SearchLink>
              ))}
            </div>

            <div className="level-right ml-4">
              <SearchLink
                data-cy="centuryALL"
                className={cn('button', 'is-success', {
                  'is-outlined': centuries.length,
                })}
                params={{
                  centuries: [],
                }}
              >
                All
              </SearchLink>
            </div>
          </div>
        </div>

        <div className="panel-block">
          <SearchLink
            className="button is-link is-outlined is-fullwidth"
            params={{
              sex: [],
              centuries: [],
              query: [],
            }}
          >
            Reset all filters
          </SearchLink>
        </div>
      </nav>
    </>
  );
};
