import { Link, useSearchParams } from 'react-router-dom';
import classnames from 'classnames';
import { getSearchWith, SearchParams } from '../utils/searchHelper';
import { Filter } from '../types/Filter';
import { SearchLink } from './SearchLink';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sexSearch = searchParams.get('sex');

  function setSearchWith(params: SearchParams) {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  }

  function getCenturies(min: number, max: number) {
    const centuryNumbers = [];

    for (let i = min; i <= max; i++) {
      centuryNumbers.push(i);
    }

    return centuryNumbers;
  }

  function handleQueryChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchWith({ query: e.target.value || null });
  }

  const getLinkStyle = (item: Filter) => {
    if (
      (item === Filter.All && !sexSearch) ||
      (item === Filter.Male && sexSearch === 'm') ||
      (item === Filter.Female && sexSearch === 'f')
    ) {
      return 'is-active';
    }

    return '';
  };

  const getSexFilter = (sexFilter: Filter) => {
    switch (sexFilter) {
      case 'Female':
        return 'f';
      case 'Male':
        return 'm';
      default:
        return null;
    }
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {Object.values(Filter).map(item => (
          <SearchLink
            key={item}
            params={{ sex: getSexFilter(item) }}
            className={getLinkStyle(item)}
          >
            {item}
          </SearchLink>
        ))}
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            onChange={handleQueryChange}
            value={query}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>
      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {getCenturies(16, 20).map(century => (
              <Link
                to={{
                  search: getSearchWith(searchParams, {
                    centuries: centuries.includes(`${century}`)
                      ? centuries.filter(cent => cent !== `${century}`)
                      : [...centuries, `${century}`],
                  }),
                }}
                data-cy="century"
                className={classnames('button', 'mr-1', {
                  'is-info': centuries.includes(`${century}`),
                })}
                key={century}
              >
                {century}
              </Link>
            ))}
          </div>

          <div className="level-right ml-4">
            <Link
              to={{ search: getSearchWith(searchParams, { centuries: null }) }}
              data-cy="centuryALL"
              className="button is-success is-outlined"
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link
          to={{
            search: getSearchWith(searchParams, {
              centuries: null,
              query: null,
              sex: null,
            }),
          }}
          className="button is-link is-outlined is-fullwidth"
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
