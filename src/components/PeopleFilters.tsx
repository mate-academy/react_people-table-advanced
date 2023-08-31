import { Link, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { getSearchWith, SearchParams } from '../utils/searchHelper';

const allCenturies = ['16', '17', '18', '19', '20'];

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];

  const setSearchWith = (params: SearchParams) => {
    const newSearch = getSearchWith(searchParams, params);

    setSearchParams(newSearch.toString());
  };

  const getCenturiesForSearch = (century: string) => {
    return centuries.includes(century)
      ? centuries.filter(c => c !== century)
      : [...centuries, century];
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          to={{ search: getSearchWith(searchParams, { sex: null }) }}
          className={cn({ 'is-active': !sex })}
        >
          All
        </Link>

        <Link
          to={{ search: getSearchWith(searchParams, { sex: 'm' }) }}
          className={cn({ 'is-active': sex === 'm' })}
        >
          Male
        </Link>

        <Link
          to={{ search: getSearchWith(searchParams, { sex: 'f' }) }}
          className={cn({ 'is-active': sex === 'f' })}
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
            onChange={(e) => setSearchWith({ query: e.target.value || null })}
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
                data-cy="century"
                to={{
                  search: getSearchWith(searchParams, {
                    centuries: getCenturiesForSearch(century),
                  }),
                }}
                className={cn('button mr-1', {
                  'is-info': centuries.includes(century),
                })}
              >
                {century}
              </Link>
            ))}
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className={cn('button is-success', {
                'is-outlined': centuries.length > 0,
              })}
              to={{
                search: getSearchWith(searchParams,
                  { centuries: null }),
              }}
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link
          className="button is-link is-outlined is-fullwidth"
          to={{
            search: getSearchWith(searchParams,
              { query: null, sex: null, centuries: null }),
          }}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
