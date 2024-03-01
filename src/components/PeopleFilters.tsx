import classnames from 'classnames';
import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Status } from '../types/sortGender';
import { getSearchWith, SearchParams } from '../utils/searchHelper';

export const PeopleFilters: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const centuries = searchParams.getAll('centuries') || [];
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';

  const setSearchWith = (params: SearchParams) => {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  };

  function handleCenturies(num: string) {
    const newcenturies = centuries.includes(num)
      ? centuries.filter(el => el !== num)
      : [...centuries, num];

    return newcenturies;
  }

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWith({ query: event.target.value || null });
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          className={classnames({ 'is-active': sex === Status.All })}
          to={{
            search: getSearchWith(searchParams, {
              sex: Status.All,
            }),
          }}
        >
          All
        </Link>
        <Link
          className={classnames({ 'is-active': sex === Status.Male })}
          to={{
            search: getSearchWith(searchParams, {
              sex: Status.Male,
            }),
          }}
        >
          Male
        </Link>
        <Link
          className={classnames({ 'is-active': sex === Status.Female })}
          to={{
            search: getSearchWith(searchParams, {
              sex: Status.Female,
            }),
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
          <>
            {['16', '17', '18', '19', '20'].map(num => (
              <div className="level-left" key={num}>
                <Link
                  data-cy="century"
                  className={classnames('button mr-1', {
                    'is-info': centuries.includes(num),
                  })}
                  to={{
                    search: getSearchWith(searchParams, {
                      centuries: handleCenturies(num),
                    }),
                  }}
                >
                  {num}
                </Link>
              </div>
            ))}
            <div className="level-right ml-4">
              <Link
                data-cy="centuryALL"
                className={classnames('button is-success', {
                  'is-outlined': !!centuries.length,
                })}
                to={{
                  search: getSearchWith(searchParams, {
                    centuries: null,
                  }),
                }}
              >
                All
              </Link>
            </div>
          </>
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
