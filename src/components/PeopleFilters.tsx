import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';
import { SearchLink } from './SearchLink';
import cn from 'classnames';

// const filterParams = ['query', 'sex', 'centuries'];

enum FilterParams {
  Query = 'query',
  Sex = 'sex',
  Centuries = 'centuries',
}

enum SexFilter {
  All = 'All',
  Male = 'm',
  Female = 'f',
}

const centuries = ['16', '17', '18', '19', '20'];

export const PeopleFilters = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const centuriesSearch = searchParams.getAll('centuries');

  const resetFilters = () => {
    return getSearchWith(searchParams, {
      query: null,
      sex: null,
      centuries: [],
    });
  };

  const getLinkClass = (
    key: string,
    value: string | string[] | null,
    className: string = 'is-active',
  ) => {
    const paramValue = searchParams.getAll(key);
    const isArray = Array.isArray(value);

    if (
      (isArray && value.some(v => paramValue.includes(v))) ||
      (!isArray && value !== null && paramValue.includes(value)) ||
      (value === null && paramValue.length === 0)
    ) {
      return className;
    }

    return '';
  };

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.length > 0 ? e.target.value : null;

    setSearchParams(getSearchWith(searchParams, { query: value }));
  };

  const toggleCentury = (century: string) => {
    const newCntuty = centuriesSearch.includes(century)
      ? centuriesSearch.filter(c => c !== century)
      : [...centuriesSearch, century];

    return getSearchWith(searchParams, {
      centuries: newCntuty,
    });
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: null }}
          className={getLinkClass(FilterParams.Sex, null)}
        >
          {SexFilter.All}
        </SearchLink>
        <SearchLink
          params={{ [FilterParams.Sex]: SexFilter.Male }}
          className={getLinkClass(FilterParams.Sex, SexFilter.Male)}
        >
          {SexFilter.Male}
        </SearchLink>
        <SearchLink
          params={{ [FilterParams.Sex]: SexFilter.Female }}
          className={getLinkClass(FilterParams.Sex, SexFilter.Female)}
        >
          {SexFilter.Female}
        </SearchLink>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            onChange={e => inputChange(e)}
            value={searchParams.get(FilterParams.Query) || ''}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuries.map((century: string) => (
              <Link
                key={century}
                to={{
                  search: toggleCentury(century),
                  pathname: location.pathname,
                }}
                className={`button mr-1 ${getLinkClass(FilterParams.Centuries, String(century), 'is-info')}`}
              >
                {century}
              </Link>
            ))}
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className={cn('button is-success', {
                'is-outlined': searchParams.has(FilterParams.Centuries),
              })}
              to={{
                search: getSearchWith(searchParams, {
                  centuries: null,
                }),
                pathname: location.pathname,
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
            search: resetFilters(),
            pathname: location.pathname,
          }}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
