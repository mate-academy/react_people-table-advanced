// eslint-disable-next-line import/no-extraneous-dependencies
import cn from 'classnames';

import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { getSearchWith, SearchParams } from '../utils/searchHelper';

export const PeopleFilters = () => {
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];

  const searchNewParam = (newParams: SearchParams): void | string => {
    const searchParam = getSearchWith(searchParams, newParams);

    setSearchParams(searchParam);
  };

  const updateSearchParams = (
    newParam: SearchParams,
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    event.preventDefault();
    searchNewParam(newParam);
  };

  function switchCentury(
    century: string,
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) {
    event.preventDefault();

    const searchNewCentury = centuries.includes(century)
      ? centuries.filter(prevCentury => prevCentury !== century)
      : [...centuries, century];

    searchNewParam({ centuries: searchNewCentury });
  }

  const searchAllCenturies = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    event.preventDefault();

    searchNewParam({ centuries: [] });
  };

  const updateQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    searchNewParam({ query: value || null });
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a
          className={cn({ 'is-active': !sex })}
          href="/people"
          onClick={event => updateSearchParams({ sex: null }, event)}
        >
          All
        </a>
        <a
          className={cn({ 'is-active': sex === 'm' })}
          href="/people?sex=m"
          onClick={event => updateSearchParams({ sex: 'm' }, event)}
        >
          Male
        </a>
        <a
          className={cn({ 'is-active': sex === 'f' })}
          href="/people?sex=f"
          onClick={event => updateSearchParams({ sex: 'f' }, event)}
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
            onChange={updateQuery}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {[16, 17, 18, 19, 20].map(century => (
              <a
                key={century}
                data-cy="century"
                className={cn('button mr-1', {
                  'is-info': centuries.includes(century.toString()),
                })}
                href={`/people?centuries=${century}`}
                onClick={event => switchCentury(century.toString(), event)}
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
              onClick={searchAllCenturies}
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
