import { Link } from 'react-router-dom';
import { SortTypes } from '../types/SortTypes';
import cn from 'classnames';
import { useFilter } from '../utils/useFilter';
import { getSearchWith } from '../utils/SearchHelper';

const CENTURIE_VALUES = ['16', '17', '18', '19', '20'];

export const PeopleFilters = () => {
  const { query, sex, activeCenturies, searchParams, handleSearch } =
    useFilter();

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          className={cn({ 'is-active': !sex })}
          to={{
            search: getSearchWith(searchParams, { sex: null }),
          }}
        >
          {SortTypes.ALL}
        </Link>
        <Link
          className={cn({ 'is-active': sex === 'm' })}
          to={{
            search: getSearchWith(searchParams, { sex: 'm' }),
          }}
        >
          {SortTypes.MALE}
        </Link>
        <Link
          className={cn({ 'is-active': sex === 'f' })}
          to={{
            search: getSearchWith(searchParams, { sex: 'f' }),
          }}
        >
          {SortTypes.FEMALE}
        </Link>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={query}
            onChange={event =>
              handleSearch({ query: event.target.value.trimStart() || null })
            }
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {CENTURIE_VALUES.map(value => (
              <Link
                data-cy="century"
                className={cn('button mr-1', {
                  'is-info': activeCenturies.includes(value),
                })}
                to={{
                  search: getSearchWith(searchParams, {
                    centuries: activeCenturies.includes(value)
                      ? activeCenturies.filter(active => active !== value)
                      : [...activeCenturies, value],
                  }),
                }}
                key={value}
              >
                {value}
              </Link>
            ))}
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className={cn('button is-success', {
                'is-outlined': !!activeCenturies.length,
              })}
              to={{ search: getSearchWith(searchParams, { centuries: null }) }}
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link className="button is-link is-outlined is-fullwidth" to="/people">
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
