import { Link } from 'react-router-dom';
import { ESidebarFilter } from '../Enum/EFilter';
import classNames from 'classnames';
import React, { useContext } from 'react';
import { SearchParamsContext } from '../store/searchHelper';

export const PeopleFilters = () => {
  const sidebarFilters = Object.keys(ESidebarFilter);
  const { searchParams, setSearchParams, getSearchWith } =
    useContext(SearchParamsContext);

  const centuryList = ['16', '17', '18', '19', '20'];

  const centuries = searchParams.getAll('centuries') || [];

  const filterIdentif = (filter: string) => {
    switch (filter) {
      case 'Male':
        return 'm';
      case 'Female':
        return 'f';
      default:
        return null;
    }
  };

  const handleSetQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    const param = getSearchWith({ query: event.target.value || null });
    const query = new URLSearchParams(param);

    setSearchParams(query);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {sidebarFilters.map(filter => (
          // eslint-disable-next-line prettier/prettier
          <Link
            key={filter}
            className={classNames({
              'is-active':
                searchParams.get('sex') ===
                (filter[0].toLowerCase() !== 'a'
                  ? filter[0].toLowerCase()
                  : null),
            })}
            to={{
              search: getSearchWith(
                { sex: filterIdentif(filter) },
                searchParams,
              ),
            }}
          >
            {filter}
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
            onChange={handleSetQuery}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuryList.map(century => (
              <Link
                key={century}
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': searchParams.getAll('centuries').includes(century),
                })}
                to={{
                  search: getSearchWith(
                    {
                      centuries: centuries.includes(century)
                        ? centuries.filter(c => c !== century)
                        : [...centuries, century],
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
              className="button is-success is-outlined"
              to={{
                search: getSearchWith({ centuries: null }, searchParams),
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
          to={{ search: '' }}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
