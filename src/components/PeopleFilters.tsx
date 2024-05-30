import { Link, useSearchParams } from 'react-router-dom';
import { SearchParams, getSearchWith } from '../utils/searchHelper';

import { ChangeEvent } from 'react';
import cn from 'classnames';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];

  const setSearchWith = (param: SearchParams) => {
    const search = getSearchWith(searchParams, param);

    setSearchParams(search);
  };

  const handleQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchWith({ query: e.target.value });
  };

  const buildSearchObject = (
    currentParams: URLSearchParams,
    century: string,
    currentCenturies: string[],
  ) => {
    return {
      search: getSearchWith(currentParams, {
        centuries: currentCenturies.includes(century)
          ? centuries.filter(currentCentury => currentCentury !== century)
          : [...centuries, century],
      }),
    };
  };

  const allCenturies = ['16', '17', '18', '19', '20'];

  const toggleAllCenturies = () => {
    setSearchParams({ centuries: [] });
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a
          className={cn('', {
            'is-active': !sex,
          })}
          href="#/people"
        >
          All
        </a>
        <a
          className={cn('', {
            'is-active': sex === 'm',
          })}
          href="#/people?sex=m"
        >
          Male
        </a>
        <a
          className={cn('', {
            'is-active': sex === 'f',
          })}
          href="#/people?sex=f"
        >
          Female
        </a>
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
            {allCenturies.map(century => (
              <Link
                key={century}
                to={buildSearchObject(searchParams, century, centuries)}
                data-cy="century"
                className={`button mr-1 ${centuries.includes(century) ? 'is-info' : ''}`}
              >
                {century}
              </Link>
            ))}
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className={`button is-success ${centuries.length !== 0 ? 'is-outlined' : ''}`}
              onClick={toggleAllCenturies}
            >
              All
            </a>
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
