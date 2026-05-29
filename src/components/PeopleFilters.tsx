import classNames from 'classnames';
import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Sex } from '../types/Sex';
import { SearchLink } from './SearchLink';
import { SearchParams } from '../utils/searchHelper';

function getSearchWith(
  params: SearchParams,
  search?: string | URLSearchParams,
) {
  const newParams = new URLSearchParams(search);

  for (const [key, value] of Object.entries(params)) {
    if (value === null) {
      newParams.delete(key);
    } else if (Array.isArray(value)) {
      newParams.delete(key);
      value.forEach(el => newParams.append(key, el.toString()));
    } else {
      newParams.set(key, value.toString());
    }
  }

  return newParams.toString();
}

const CENTURIES = ['16', '17', '18', '19', '20'];

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || Sex.All;
  const centuries = searchParams.getAll('centuries') || [];

  const setSearchWith = (params: Record<string, string | null>) => {
    const search = getSearchWith(params, searchParams);

    setSearchParams(search);
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWith({ query: event.target.value || null });
  };

  const toggleCenturies = (centurie: string) => {
    const newCenturies = centuries.includes(centurie)
      ? centuries.filter(c => c !== centurie)
      : [...centuries, centurie];

    setSearchWith({ centuries: newCenturies });
  };

  const clearCenturies = () => setSearchWith({ centuries: null });

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {Object.entries(Sex).map(([key, value]) => (
          <SearchLink
            key={value}
            className={sex === value ? 'is-active' : ''}
            params={value === Sex.All ? { sex: null } : { sex: value }}
          >
            {key}
          </SearchLink>
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
            {CENTURIES.map(cen => (
              <button
                key={cen}
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': centuries.includes(cen),
                })}
                onClick={() => toggleCenturies(cen)}
              >
                {cen}
              </button>
            ))}
          </div>

          <div className="level-right ml-4">
            <button
              data-cy="centuryALL"
              className="button is-success is-outlined"
              onClick={clearCenturies}
            >
              All
            </button>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link
          className="button is-link is-outlined is-fullwidth"
          to={{ pathname: '/people' }}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
