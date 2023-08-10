/* eslint-disable no-console */
import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { SearchLink } from '../SearchLink/SearchLink';
import { SearchParams, getSearchWith } from '../../utils/searchHelper';

const peoplesAge = ['16', '17', '18', '19', '20'];

export const PeopleFilters = () => {
  const [searchParameters, setSearchParameters] = useSearchParams();

  const sex = searchParameters.get('sex');
  const query = searchParameters.get('query');
  const centuries = searchParameters.getAll('centuries');

  const setSearchWith = useCallback(
    (params: SearchParams) => setSearchParameters(
      getSearchWith(searchParameters, params),
    ), [searchParameters],
  );

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={cn({
            'is-active': !sex,
          })}
          params={{ sex: null }}
        >
          All
        </SearchLink>
        <SearchLink
          className={cn({
            'is-active': sex === 'm',
          })}
          params={{ sex: 'm' }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={cn({
            'is-active': sex === 'f',
          })}
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
            value={query || ''}
            onChange={event => setSearchWith(
              { query: event.target.value || null },
            )}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {peoplesAge.map((century) => (
              <SearchLink
                key={century}
                data-cy="century"
                className={cn('button mr-1', {
                  'is-info': centuries.includes(century),
                })}
                params={centuries.includes(century)
                  ? { centuries: centuries.filter((item => item !== century)) }
                  : { centuries: [...centuries, century] }}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={cn('button is-success', {
                'is-outlined': centuries.length !== 0,
              })}
              params={{ centuries: null }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          className={cn('button is-link is-outlined is-fullwidth')}
          params={{ sex: null, query: null, centuries: null }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
