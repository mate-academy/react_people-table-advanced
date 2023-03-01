import React from 'react';
import classNames from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';

export const PeopleFilters = () => {
  const bornCenturies = ['16', '17', '18', '19', '20'];
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sexTypes = ['All', 'Male', 'Female'];
  const sex = searchParams.get('sex') || '';

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(
      getSearchWith(
        searchParams,
        { query: event.target.value || null },
      ),
    );
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>
      <p className="panel-tabs" data-cy="SexFilter">
        {sexTypes.map(currentSex => (
          <Link
            to={{
              search: getSearchWith(
                searchParams,
                {
                  sex: currentSex,
                },
              ),
            }}
            key={currentSex}
            data-cy="century"
            className={classNames(
              { 'is-active': currentSex === sex },
            )}
          >
            {currentSex}
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
            onChange={handleChangeQuery}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {bornCenturies.map(century => (
              <Link
                to={{
                  search: getSearchWith(
                    searchParams,
                    {
                      centuries: [...centuries, century],
                    },
                  ),
                }}
                key={century}
                data-cy="century"
                className={classNames(
                  'button mr-1',
                  { 'is-info': centuries.includes(century) },
                )}
              >
                {century}
              </Link>
            ))}
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className={classNames(
                'button',
                'is-success', {
                  'is-outlined': !!centuries.length,
                },
              )}
              to={{
                search: getSearchWith(
                  searchParams,
                  { centuries: [] },
                ),
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
              { query: null, centuries: [], sex: null },
            ),
          }}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
