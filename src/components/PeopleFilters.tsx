// eslint-disable-next-line import/no-extraneous-dependencies
import { v4 as uuid } from 'uuid';
import cn from 'classnames';

import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { getSearchWith, SearchParams } from '../utils/searchHelper';
import { CENTURIES } from '../constans/personConstants';
import { Sex } from '../types/Sex';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { pathname } = useLocation();

  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];

  const setSearch = (newParam: SearchParams): void | string => {
    const newSearch = getSearchWith(searchParams, newParam);

    setSearchParams(newSearch);
  };

  const changeLink = (
    newParams: SearchParams,
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    event.preventDefault();
    setSearch(newParams);
  };

  function toggleCentury(
    century: string,
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) {
    event.preventDefault();

    if (!CENTURIES.includes(Number(century))) {
      return;
    }

    const newCentury = centuries.includes(century)
      ? centuries.filter(currentCentury => currentCentury !== century)
      : [...centuries, century];

    setSearch({ centuries: newCentury });
  }

  const handleAllCenturies = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    event.preventDefault();

    setSearch({ centuries: [] });
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a
          className={cn({ 'is-active': !sex })}
          href="/people"
          onClick={event => changeLink({ sex: null }, event)}
        >
          All
        </a>
        <a
          className={cn({ 'is-active': sex === Sex.Male })}
          href="/people?sex=m"
          onClick={event => changeLink({ sex: Sex.Male }, event)}
        >
          Male
        </a>
        <a
          className={cn({ 'is-active': sex === Sex.Female })}
          href="/people?sex=f"
          onClick={event => changeLink({ sex: Sex.Female }, event)}
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
            onChange={event => {
              setSearch({ query: event.target.value || null });
            }}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {CENTURIES.map(century => (
              <a
                key={uuid()}
                data-cy="century"
                className={cn('button mr-1', {
                  'is-info': centuries.includes(century.toString()),
                })}
                href={`/people?centuries=${century}`}
                onClick={event => toggleCentury(century.toString(), event)}
              >
                {century}
              </a>
            ))}
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className={cn('button is-success', {
                'is-outlined': centuries.length,
              })}
              href="#/people"
              onClick={handleAllCenturies}
            >
              All
            </a>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link className="button is-link is-outlined is-fullwidth" to={pathname}>
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
