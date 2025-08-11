import { Link } from 'react-router-dom';
import cn from 'classnames';
import { useFilter } from '../utils/useFilter';
import { getSearchWith } from '../utils/searchHelper';
import { CENTURIE_VALUES, SEX_OPTIONS } from '../utils/Constants';

export const PeopleFilters = () => {
  const { query, sex, activeCenturies, searchParams, handleSearch } =
    useFilter();

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {SEX_OPTIONS.map(option => (
          <Link
            key={option.name}
            className={cn({
              'is-active':
                option.value === sex || (option.value === '' && sex === null),
            })}
            to={{
              search: getSearchWith(searchParams, {
                sex: option.value === 'All' ? null : option.value,
              }),
            }}
          >
            {option.name}
          </Link>
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
        <Link
          className={cn('button is-link is-fullwidth', {
            'is-outlined': sex === null && !activeCenturies.length && !query,
          })}
          to={{ search: '' }}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
