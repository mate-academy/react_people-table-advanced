import React from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { getSearchWith, SearchParams } from '../utils/searchHelper';
import { availableCenturies } from '../utils/constants';

export const PeopleFilters = () => {
  const pathName = useLocation().pathname;
  const [searchParams, setSearchParams] = useSearchParams();
  const sex = searchParams.get('sex');
  const searchInputValue = searchParams.get('query');
  const centuries = searchParams.getAll('centuries');

  function setParamsWith(params: SearchParams) {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);

    return search;
  }

  function handleSearchInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const query = event.target.value === '' ? null : event.target.value;

    const search = setParamsWith({ query });

    setSearchParams(search);
  }

  function handleAddNewCentury(century: number) {
    const newCenturies = centuries.includes(century.toString())
      ? centuries.filter(c => c !== century.toString())
      : [...centuries, century.toString()];

    return newCenturies;
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          className={`${sex ? '' : 'is-active'}`}
          to={{
            pathname: pathName,
            search: `${getSearchWith(searchParams, { sex: null })}`,
          }}
        >
          All
        </Link>
        <Link
          className={`${sex === 'm' ? 'is-active' : ''}`}
          to={{
            pathname: pathName,
            search: `${getSearchWith(searchParams, { sex: 'm' })}`,
          }}
        >
          Male
        </Link>
        <Link
          className={`${sex === 'f' ? 'is-active' : ''}`}
          to={{
            pathname: pathName,
            search: `${getSearchWith(searchParams, { sex: 'f' })}`,
          }}
        >
          Female
        </Link>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={searchInputValue || ''}
            onChange={handleSearchInputChange}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {availableCenturies.map(century => (
              <Link
                key={`century-${century}`}
                className={`button mr-1 ${centuries.includes(century.toString()) ? 'is-info' : ''}`}
                to={{
                  pathname: pathName,
                  search: `${getSearchWith(searchParams, { centuries: handleAddNewCentury(century) })}`,
                }}
              >
                {century}
              </Link>
            ))}
          </div>
          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className={`button is-success ${centuries.length !== 0 ? 'is-outlined' : ''}`}
              to={{
                pathname: pathName,
                search: `${getSearchWith(searchParams, { centuries: [] })}`,
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
            pathname: pathName,
            search: getSearchWith(searchParams, {
              centuries: [],
              sex: null,
              query: null,
            }),
          }}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
