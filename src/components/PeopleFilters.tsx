import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { ChangeEvent } from 'react';
import { SearchLink } from './SearchLink';
import { getSearchWith } from '../utils/searchHelper';
import { filterBySex } from '../types/filterBySex';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const centuriesList = ['16', '17', '18', '19', '20'];

  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');
  const query = searchParams.get('query') || '';

  function handleSearch(e: ChangeEvent<HTMLInputElement>): void {
    const newParam = getSearchWith(searchParams,
      { query: e.target.value || null });

    setSearchParams(newParam);
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {filterBySex.map(option => (
          <SearchLink
            params={{ sex: option.value }}
            className={cn({ 'is-active': sex === option.value })}
          >
            {option.title}
          </SearchLink>
        ))}
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={query}
            onChange={e => handleSearch(e)}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuriesList.map(century => (
              <SearchLink
                key={century}
                params={{
                  centuries: centuries.includes(century)
                    ? centuries.filter(c => c !== century)
                    : [...centuries, century],
                }}
                className={cn('button mr-1', {
                  'is-info': centuries.includes(century),
                })}
              >
                {century}
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
        <SearchLink
          className="button is-link is-outlined is-fullwidth"
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
