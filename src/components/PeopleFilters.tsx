import classNames from 'classnames';
import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils';

const AVAILABLE_CENTURIES = ['16', '17', '18', '19', '20'];
const AVAILABLE_GENDERS = ['all', 'male', 'female'];

export const PeopleFilters: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || 'all';
  const centuries = searchParams.getAll('centuries') || [];

  const onQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
        {AVAILABLE_GENDERS.map(gender => (
          <Link
            key={gender}
            className={classNames(
              { 'is-active': sex === gender },
            )}
            to={{
              search: getSearchWith(
                searchParams,
                { sex: gender || null },
              ),
            }}
          >
            {gender[0].toLocaleUpperCase() + gender.slice(1)}
          </Link>
        ))}
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            value={query}
            onChange={onQueryChange}
            className="input"
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
            {AVAILABLE_CENTURIES.map(century => (
              <Link
                key={century}
                data-cy="century"
                className={classNames(
                  'button',
                  'mr-1',
                  {
                    'is-info': centuries.includes(century),
                  },
                )}
                to={{
                  search: getSearchWith(
                    searchParams,
                    {
                      centuries: centuries.includes(century)
                        ? centuries.filter(c => c !== century)
                        : [...centuries, century],
                    },
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
                search: getSearchWith(
                  searchParams,
                  {
                    centuries: centuries.length === AVAILABLE_CENTURIES.length
                      ? []
                      : AVAILABLE_CENTURIES,
                  },
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
          to={{ search: '' }}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
