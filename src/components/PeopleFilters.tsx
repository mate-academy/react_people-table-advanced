import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';

import { SearchLink } from './SearchLink';

import { FilterBySex, FilterByCentury } from '../types';

import { getSearchWith } from '../utils/searchHelper';
import { toggleCentury } from '../utils/helpers';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sex = searchParams.get('sex') || 'All';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];

  const filterBySex = Object.entries(FilterBySex);
  const filterBySentury = Object.values(FilterByCentury);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newParams = getSearchWith(searchParams, { query: e.target.value });

    setSearchParams(newParams);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {filterBySex.map(([filter, value]) => (
          <SearchLink
            params={{ sex: value === 'All' ? null : value }}
            className={cn({ 'is-active': sex === value })}
            key={value}
          >
            {filter}
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
            onChange={handleOnChange}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {filterBySentury.map(value => (
              <SearchLink
                params={{ centuries: toggleCentury(value, centuries) }}
                data-cy="century"
                className={cn('button mr-1', {
                  'is-info': centuries.includes(value),
                })}
                key={value}
              >
                {value}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={cn(
                'button',
                { 'is-outlined': centuries.length !== 0 },
                { 'is-success': centuries.length === 0 },
              )}
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
          params={{ query: null, centuries: null, sex: null }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
