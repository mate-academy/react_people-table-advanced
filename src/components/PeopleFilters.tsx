import { useCallback } from 'react';
import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';
import { SearchLink } from './SearchLink';

const arrayOfCenturies = ['16', '17', '18', '19', '20'];
const sexParams = [{ All: null }, { Male: 'm' }, { Female: 'f' }];

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sex = searchParams.get('sex') || null;
  const centuries = searchParams.getAll('centuries') || [];
  const query = searchParams.get('query') || '';

  const onQueryChange
  = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(
      getSearchWith(searchParams, { query: event.target.value || null }),
    );
  }, []);

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {sexParams.map(param => {
          const name = Object.keys(param)[0];
          const value = Object.values(param)[0];

          return (
            <SearchLink
              key={name}
              params={{ sex: value }}
              className={cn({ 'is-active': sex === value })}
            >
              {name}
            </SearchLink>
          );
        })}
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={query}
            onChange={(event) => {
              onQueryChange(event);
            }}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {arrayOfCenturies.map(century => (
              <SearchLink
                data-cy="century"
                key={century}
                params={{
                  centuries: centuries.includes(century)
                    ? centuries.filter(num => num !== century)
                    : [...centuries, century],
                }}
                className={cn(
                  'button mr-1',
                  { 'is-info': centuries.includes(`${century}`) },
                )}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              params={{ centuries: null }}
              className={cn(
                'button is-success',
                { 'is-outlined': centuries.length },
              )}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a
          className="button is-link is-outlined is-fullwidth"
          href="#/people"
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
