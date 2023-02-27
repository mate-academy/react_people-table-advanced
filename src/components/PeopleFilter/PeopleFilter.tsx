import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import React from 'react';
import { SearchLink } from '../SearchLink';

export const PeopleFilters = React.memo(() => {
  const centuriesValues = ['16', '17', '18', '19', '20'];
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sex = searchParams.get('sex');

  const updateSearchParams = (
    params: { [key: string]: string | string[] | null },
  ) => {
    Object.entries(params).forEach(([key, value]) => {
      if (!value) {
        searchParams.delete(key);
      } else if (Array.isArray(value)) {
        searchParams.delete(key);
        value.forEach(part => {
          searchParams.append(key, part);
        });
      } else {
        searchParams.set(key, value);
      }
    });

    setSearchParams(searchParams);
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateSearchParams({ query: event.target.value || null });
  };

  const handleResetAllFilters = () => {
    updateSearchParams({
      query: null,
      centuries: null,
      sex: null,
    });
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={cn({ 'is-active': !sex })}
          params={{ sex: null }}
        >
          All
        </SearchLink>

        <SearchLink
          className={cn({ 'is-active': sex === 'm' })}
          params={{ sex: 'm' }}
        >
          Male
        </SearchLink>

        <SearchLink
          className={cn({ 'is-active': sex === 'f' })}
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
            onChange={handleInput}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuriesValues.map(century => (
              <button
                key={century}
                type="button"
                data-cy="century"
                className={cn('button mr-1', {
                  'is-info': centuries.includes(century),
                })}
                onClick={() => {
                  updateSearchParams({
                    centuries: centuries.includes(century)
                      ? centuries.filter(c => c !== century)
                      : [...centuries, century],
                  });
                }}
              >
                {century}
              </button>
            ))}
          </div>

          <div className="level-right ml-4">
            <button
              type="button"
              data-cy="centuryALL"
              className="button is-success is-outlined"
              onClick={() => {
                updateSearchParams({ centuries: null });
              }}
            >
              All
            </button>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <button
          type="button"
          className="button is-link is-outlined is-fullwidth"
          onClick={handleResetAllFilters}
        >
          Reset all filters
        </button>
      </div>
    </nav>
  );
});
