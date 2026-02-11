import cn from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';
import { Sex } from '../types/Sex';
import { getSearchWith } from '../utils/searchHelper';
import { SearchParams } from '../types/SearchParams';
import { toggleCenturies } from '../utils/toggleCenturies';

const centuriesList = ['16', '17', '18', '19', '20'];

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const searchBySex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];

  const setSearchWith = (params: SearchParams) => {
    const search = getSearchWith(params, searchParams);

    setSearchParams(search);
  };

  function handleChangeQuery(newQuery: string) {
    setSearchWith({ query: newQuery.trim() || null });
  }

  function handleToggleAll() {
    return { search: getSearchWith({ centuries: [] }, searchParams) };
  }

  function resetFilters() {
    return {
      search: getSearchWith(
        { centuries: [], order: null, query: null, sort: null, sex: null },
        searchParams,
      ),
    };
  }

  const sexOptions = Object.entries(Sex);

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {sexOptions.map(([key, value]) => {
          const isAll = value === Sex.All;
          const isActive = isAll ? !searchBySex : searchBySex === value;

          return (
            <Link
              key={value}
              className={cn({
                'is-active': isActive,
              })}
              to={{
                search: getSearchWith(
                  { sex: isAll ? null : value },
                  searchParams,
                ),
              }}
            >
              {key}
            </Link>
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
            onChange={event => handleChangeQuery(event.target.value)}
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
              <Link
                key={century}
                data-cy="century"
                className={cn('button mr-1', {
                  'is-info': centuries.includes(century),
                })}
                to={{
                  search: getSearchWith(
                    {
                      centuries: toggleCenturies(centuries, century),
                    },
                    searchParams,
                  ),
                }}
              >
                {century}
              </Link>
            ))}
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className={cn('button is-success', {
                'is-outlined': centuries.length,
              })}
              to={handleToggleAll()}
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link
          className="button is-link is-outlined is-fullwidth"
          to={resetFilters()}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
