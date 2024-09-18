import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { CENTURIES, Century, Filter, Sex } from '../types';
import { SearchParams } from '../types/SearchParams';
import { SearchLink } from './SearchLink';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sexSearchParam = searchParams.get(SearchParams.sex) || '';
  const centurySearchParams = searchParams.getAll(SearchParams.centuries);
  const querySearchParams = searchParams.get(SearchParams.query) || '';

  const filters = Object.values(Filter);

  const getCenturies = (century: Century) => {
    if (centurySearchParams.includes(century)) {
      return centurySearchParams.filter(param => param !== century);
    }

    return [...centurySearchParams, century];
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    const params = new URLSearchParams(searchParams);

    if (query) {
      params.set(SearchParams.query, query);
    } else {
      params.delete(SearchParams.query);
    }

    setSearchParams(params);
  };

  const handleClearAllFilters = () => {
    setSearchParams('');
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {filters.map(filter => (
          <SearchLink
            params={{ [SearchParams.sex]: Sex[filter] }}
            className={cn({
              'is-active': sexSearchParam === Sex[filter],
            })}
            key={filter}
          >
            {filter}
          </SearchLink>
        ))}
      </p>

      <div className="panel-block">
        <div className="control has-icons-left">
          <input
            type="search"
            className="input"
            placeholder="Search"
            onChange={handleQueryChange}
            value={querySearchParams}
          />
          <span className="icon is-left">
            <i className="fas fa-search"></i>
          </span>
        </div>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {CENTURIES.map(century => (
              <SearchLink
                key={century}
                data-cy="century"
                className={cn('button mr-1', {
                  'is-info': centurySearchParams.includes(century),
                })}
                params={{
                  [SearchParams.centuries]: getCenturies(century),
                }}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              params={{ [SearchParams.centuries]: null }}
              data-cy="centuryALL"
              className="button is-success is-outlined"
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <button
          className="button is-link is-outlined is-fullwidth"
          onClick={handleClearAllFilters}
        >
          Reset all filters
        </button>
      </div>
    </nav>
  );
};
