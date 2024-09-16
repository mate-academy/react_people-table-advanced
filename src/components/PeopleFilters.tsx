import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';

import { SexFilter } from '../types/SexFilter';
import { SearchLink } from './SearchLink';
import { Century } from '../types/Century';
import { getSearchWith } from '../utils/searchHelper';

const CENTURIES_FOR_FILTERING: Century[] = ['16', '17', '18', '19', '20'];

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchCenturies = searchParams.getAll('centuries') || [];
  const query = searchParams.get('query') || '';

  const toggleCentury = (century: Century) => {
    return searchCenturies.includes(century)
      ? searchCenturies.filter(iterated_century => iterated_century !== century)
      : [...searchCenturies, century];
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputText = event.target.value || null;
    const params = getSearchWith(searchParams, { query: inputText });

    setSearchParams(params);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {Object.values(SexFilter).map(filter => {
          const searchFilterParam = filter[0].toLowerCase();
          const selectedFilter = searchParams.get('sex');
          const isAllFilterSelected =
            filter === SexFilter.All && selectedFilter === null;

          return (
            <SearchLink
              key={filter}
              className={cn({
                'is-active':
                  selectedFilter === searchFilterParam || isAllFilterSelected,
              })}
              params={{
                sex: filter === SexFilter.All ? null : searchFilterParam,
              }}
            >
              {filter}
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
            {CENTURIES_FOR_FILTERING.map(century => (
              <SearchLink
                key={century}
                data-cy="century"
                className={cn('button mr-1', {
                  'is-info': searchCenturies.includes(century),
                })}
                params={{ centuries: toggleCentury(century) }}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={cn('button is-success', {
                'is-outlined': !!searchCenturies.length,
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
          params={{ centuries: null, query: null, sex: null }}
          className="button is-link is-outlined is-fullwidth"
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
