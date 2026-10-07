import { Link, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { getSearchWith } from '../utils/searchHelper';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sex = searchParams.get('sex');
  const query = searchParams.get('query');
  const centuries = searchParams.getAll('centuries');

  const getCenturies = (century: string) => {
    if (centuries.includes(century)) {
      return centuries.filter(c => c !== century);
    }

    return [...centuries, century];
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          className={sex === null ? 'is-active' : ''}
          to={`/people?${getSearchWith(searchParams, { sex: null })}`}
        >
          All
        </Link>

        <Link
          className={sex === 'm' ? 'is-active' : ''}
          to={`/people?${getSearchWith(searchParams, { sex: 'm' })}`}
        >
          Male
        </Link>

        <Link
          className={sex === 'f' ? 'is-active' : ''}
          to={`/people?${getSearchWith(searchParams, { sex: 'f' })}`}
        >
          Female
        </Link>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            value={query || ''}
            className="input"
            placeholder="Search"
            onChange={e => {
              setSearchParams(
                getSearchWith(searchParams, {
                  query: e.target.value || null,
                }),
              );
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
            <Link
              data-cy="century"
              className={cn('button mr-1', {
                'is-info': centuries.includes('16'),
              })}
              to={`/people?${getSearchWith(searchParams, {
                centuries: getCenturies('16'),
              })}`}
            >
              16
            </Link>

            <Link
              data-cy="century"
              className={cn('button mr-1', {
                'is-info': centuries.includes('17'),
              })}
              to={`/people?${getSearchWith(searchParams, {
                centuries: getCenturies('17'),
              })}`}
            >
              17
            </Link>

            <Link
              data-cy="century"
              className={cn('button mr-1', {
                'is-info': centuries.includes('18'),
              })}
              to={`/people?${getSearchWith(searchParams, {
                centuries: getCenturies('18'),
              })}`}
            >
              18
            </Link>

            <Link
              data-cy="century"
              className={cn('button mr-1', {
                'is-info': centuries.includes('19'),
              })}
              to={`/people?${getSearchWith(searchParams, {
                centuries: getCenturies('19'),
              })}`}
            >
              19
            </Link>

            <Link
              data-cy="century"
              className={cn('button mr-1', {
                'is-info': centuries.includes('20'),
              })}
              to={`/people?${getSearchWith(searchParams, {
                centuries: getCenturies('20'),
              })}`}
            >
              20
            </Link>
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className="button is-success is-outlined"
              to={`/people?${getSearchWith(searchParams, { centuries: null })}`}
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link
          className="button is-link is-outlined is-fullwidth"
          to={`/people?${getSearchWith(searchParams, {
            sex: null,
            centuries: null,
          })}`}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
