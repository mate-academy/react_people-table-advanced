import classNames from 'classnames';
import { ChangeEvent } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';
import { SearchLink } from './SearchLink';

const centuries = ['16', '17', '18', '19', '20'];

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sexParam = searchParams.get('sex');
  const selectedSex = sexParam === 'm' || sexParam === 'f' ? sexParam : null;
  const query = searchParams.get('query') || '';
  const selectedCenturies = [
    ...new Set(
      searchParams
        .getAll('centuries')
        .filter(value => centuries.includes(value)),
    ),
  ];

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setSearchParams(
      getSearchWith(searchParams, {
        query: value || null,
      }),
    );
  };

  const getUpdatedCenturies = (century: string) => {
    if (selectedCenturies.includes(century)) {
      return selectedCenturies.filter(value => value !== century);
    }

    return [...selectedCenturies, century];
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: null }}
          className={classNames({ 'is-active': !selectedSex })}
        >
          All
        </SearchLink>

        <SearchLink
          params={{ sex: 'm' }}
          className={classNames({ 'is-active': selectedSex === 'm' })}
        >
          Male
        </SearchLink>

        <SearchLink
          params={{ sex: 'f' }}
          className={classNames({ 'is-active': selectedSex === 'f' })}
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
            {centuries.map(century => (
              <SearchLink
                key={century}
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': selectedCenturies.includes(century),
                })}
                params={{ centuries: getUpdatedCenturies(century) }}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className="button is-success is-outlined"
              params={{ centuries: null }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link className="button is-link is-outlined is-fullwidth" to="/people">
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
