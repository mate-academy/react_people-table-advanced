import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import classNames from 'classnames';
import React from 'react';
import { getSearchWith } from '../utils/searchHelper';

enum Sex {
  male = 'm',
  female = 'f',
}

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sex = searchParams.get('sex') || null;
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];

  const availableCenturies = ['16', '17', '18', '19', '20'];

  const getCenturiesParams = (century: string) => {
    const preparedCenturies = centuries.includes(century)
      ? centuries.filter(cent => cent !== century)
      : [...centuries, century];

    return { centuries: preparedCenturies };
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(
      getSearchWith(searchParams, {
        query: `${event.target.value.toLowerCase()}` || null,
      }),
    );
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={classNames({
            'is-active': !sex,
          })}
          params={{ sex: null }}
        >
          All
        </SearchLink>

        <SearchLink
          className={classNames({
            'is-active': sex === Sex.male,
          })}
          params={{ sex: Sex.male }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={classNames({
            'is-active': sex === Sex.female,
          })}
          params={{ sex: Sex.female }}
        >
          Female
        </SearchLink>
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
            {availableCenturies.map(century => (
              <SearchLink
                key={century}
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': centuries.includes(century),
                })}
                params={getCenturiesParams(century)}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={classNames('button is-success', {
                'is-outlined': !!centuries.length,
              })}
              params={{ centuries: null }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a className="button is-link is-outlined is-fullwidth" href="#/people">
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
