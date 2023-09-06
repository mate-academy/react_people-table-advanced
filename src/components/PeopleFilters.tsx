import React from 'react';
import classNames from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';
import { Sex } from '../types/Sex';

export const PeopleFilters: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sex = searchParams.get('sex') || '';

  const centuriesArr = ['16', '17', '18', '19', '20'];

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(getSearchWith(
      searchParams, { query: event.target.value || null },
    ));
  };

  const toggleCentury = (num: string) => {
    return centuries.includes(num)
      ? centuries.filter(century => century !== num)
      : [...centuries, num];
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          className={classNames({ 'is-active': !sex })}
          to={{ search: getSearchWith(searchParams, { sex: null }) }}
        >
          All
        </Link>
        <Link
          className={classNames({ 'is-active': sex === 'm' })}
          to={{ search: getSearchWith(searchParams, { sex: Sex.Male }) }}
        >
          Male
        </Link>
        <Link
          className={classNames({ 'is-active': sex === 'f' })}
          to={{ search: getSearchWith(searchParams, { sex: Sex.Female }) }}
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
          <div className="level-left">
            {centuriesArr.map(num => (
              <Link
                key={num}
                data-cy="century"
                className={classNames('button', 'mr-1', {
                  'is-info': centuries.includes(num),
                })}
                to={{
                  search: getSearchWith(searchParams, {
                    centuries: toggleCentury(num),
                  }),
                }}
              >
                {num}
              </Link>
            ))}
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className="button is-success is-outlined"
              to="/people"
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a
          className="button is-link is-outlined is-fullwidth"
          href="#/people"
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
