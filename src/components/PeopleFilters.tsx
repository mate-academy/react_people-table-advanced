import classNames from 'classnames';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { SearchParamsContext } from './SearchParamsContext';
import { getSearchWith } from '../utils/searchHelper';
import { SexFilterLink } from './SexFilterLink';
import { Sex } from '../types/Sex';

const centuriesFilterLinksNames = ['16', '17', '18', '19', '20'];

export const PeopleFilters = () => {
  const {
    searchParams,
    setSearchParams,
  } = useContext(SearchParamsContext);

  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries');

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    window.console.log('handle method');
    setSearchParams(getSearchWith(
      searchParams,
      { query: event.currentTarget.value || null },
    ));
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SexFilterLink value={Sex.All} text="All" />
        <SexFilterLink value={Sex.Male} text="Male" />
        <SexFilterLink value={Sex.Female} text="Female" />
        {/* <Link
          className={classNames(
            { 'is-active': sex === null },
          )}
          to={{
            search: getSearchWith(searchParams, { sex: null }),
          }}
        >
          All
        </Link>

        <Link
          className={classNames(
            { 'is-active': sex === 'm' },
          )}
          to={{
            search: getSearchWith(searchParams, { sex: 'm' }),
          }}
        >
          Male
        </Link>

        <Link
          className={classNames(
            { 'is-active': sex === 'f' },
          )}
          to={{
            search: getSearchWith(searchParams, { sex: 'f' }),
          }}
        >
          Female
        </Link> */}
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            value={query}
            onChange={handleQueryChange}
            placeholder="Search"
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuriesFilterLinksNames.map(name => {
              const isSelected = centuries.includes(name);

              return (
                <Link
                  key={name}
                  data-cy="century"
                  className={classNames(
                    'button mr-1',
                    { 'is-info': isSelected },
                  )}
                  to={{
                    search: getSearchWith(
                      searchParams,
                      {
                        centuries: isSelected
                          ? centuries.filter(century => century !== name)
                          : [...centuries, name],
                      },
                    ),
                  }}
                >
                  {name}
                </Link>
              );
            })}
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className={classNames(
                'button is-success',
                { 'is-outlined': centuries.length },
              )}
              to={{
                search: getSearchWith(searchParams, { centuries: [] }),
              }}
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link
          className="button is-link is-outlined is-fullwidth"
          to={{
            search: getSearchWith(
              searchParams,
              {
                sex: null,
                query: null,
                centuries: null,
              },
            ),
          }}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
