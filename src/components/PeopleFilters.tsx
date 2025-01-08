// eslint-disable-next-line import/no-extraneous-dependencies
import { v4 as uuid } from 'uuid';
import cn from 'classnames';

import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { getSearchWith, SearchParams } from '../utils/searchHelper';

const allCenturies = [16, 17, 18, 19, 20];

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { pathname } = useLocation();

  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('quey') || '';
  const centuries = searchParams.getAll('centuries') || [];

  const setSearchWith = (newParam: SearchParams): void | string => {
    const newSearch = getSearchWith(searchParams, newParam);

    setSearchParams(newSearch);
  };

  const changeLink = (
    newParams: SearchParams,
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    event.preventDefault();
    setSearchWith(newParams);
  };

  function toggleCentury(
    century: string,
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) {
    event.preventDefault();

    const newCentury = centuries.includes(century)
      ? centuries.filter(currentCentury => currentCentury !== century)
      : [...centuries, century];

    setSearchWith({ centuries: newCentury });
  }

  const handleAllCenturies = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    event.preventDefault();

    setSearchWith({ centuries: [] });
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
          className={cn({ 'is-active': sex === 'm' })}
          href="/people?sex=m"
          onClick={event => changeLink({ sex: 'm' }, event)}
        >
          Male
        </a>
        <a
          className={cn({ 'is-active': sex === 'f' })}
          href="/people?sex=f"
          onClick={event => changeLink({ sex: 'f' }, event)}
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
            onChange={e => setSearchWith({ query: e.target.value || null })}
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
              <a
                key={uuid()}
                data-cy="century"
                className={cn('button mr-1', {
                  'is-info': centuries.includes(century.toString()),
                })}
                href={`/people?centuries=${century}`}
                onClick={e => toggleCentury(century.toString(), e)}
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
