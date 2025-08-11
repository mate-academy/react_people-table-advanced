import cn from 'classnames';

import { CENTURIES } from '../constants/constants';
import { Sex } from '../types/sex';

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
    selectParam: SearchParams,
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    event.preventDefault();
    searchNewParam(selectParam);
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

  const sexTypes = [
    { sexType: 'All', sex: null, href: '/people' },
    { sexType: 'Male', sex: Sex.Male, href: '/people?sex=m' },
    { sexType: 'Female', sex: Sex.Female, href: '/people?sex=f' },
  ];

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {sexTypes.map(({ sexType, sex: typeOfSex, href }) => (
          <a
            key={sexType}
            className={cn({ 'is-active': sex === typeOfSex })}
            href={href}
            onClick={event => updateSearchParams({ sex: typeOfSex }, event)}
          >
            {sexType}
          </a>
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
            {CENTURIES.map(century => (
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
