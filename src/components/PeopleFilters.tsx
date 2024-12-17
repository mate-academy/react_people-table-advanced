import { Link, NavLink } from 'react-router-dom';
import { useFilters } from '../store/FilterContext';
import classNames from 'classnames';

export const PeopleFilters = () => {
  const { query, sexs, centuries, setSearchWith, getSearchWith, searchParams } =
    useFilters();

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchWith({ query: event.target.value });
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {['All', 'Male', 'Female'].map(sex => {
          let normalizedSex = 'All';

          switch (sex) {
            case 'Male':
              normalizedSex = 'm';
              break;
            case 'Female':
              normalizedSex = 'f';
          }

          const isActive =
            normalizedSex === 'All'
              ? sexs.length === 0
              : sexs.includes(normalizedSex);

          return (
            <NavLink
              key={sex}
              to={{
                search: getSearchWith(
                  {
                    sexs:
                      normalizedSex === 'All'
                        ? null
                        : sexs.includes(normalizedSex)
                          ? sexs.filter(ch => normalizedSex !== ch)
                          : [...sexs, normalizedSex],
                  },
                  searchParams,
                ),
              }}
              className={classNames('panel-tab', { 'is-active': isActive })}
            >
              {sex}
            </NavLink>
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
            {['16', '17', '18', '19', '20'].map(century => (
              <Link
                key={century}
                to={{
                  search: getSearchWith(
                    {
                      centuries: centuries.includes(century)
                        ? centuries.filter(ch => century !== ch)
                        : [...centuries, century],
                    },
                    searchParams,
                  ),
                }}
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': centuries.includes(century),
                })}
              >
                {century}
              </Link>
            ))}
          </div>
          <div className="level-right ml-4">
            <Link
              to={{ search: getSearchWith({ centuries: null }, searchParams) }}
              data-cy="centuryALL"
              className={classNames('button is-success ', {
                'is-outlined': centuries.length > 0,
              })}
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link
          to={{
            search: getSearchWith(
              { centuries: null, sexs: null, query: '' },
              searchParams,
            ),
          }}
          className={classNames('button is-link is-fullwidth', {
            'is-outlined ': sexs.length > 0 || centuries.length > 0 || query,
          })}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
