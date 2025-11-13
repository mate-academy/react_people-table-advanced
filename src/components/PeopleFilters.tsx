import { Link } from 'react-router-dom';
import { getSearchWith, SearchParams } from '../utils/searchHelper';
import classNames from 'classnames';

interface PeopleFiltersProps {
  searchParams: URLSearchParams;
  onClearFilters?: () => void;
  setSearchWith: (params: SearchParams) => void;
  query: string;
  centuries: string[];
}

export const PeopleFilters: React.FC<PeopleFiltersProps> = ({
  searchParams,
  onClearFilters,
  setSearchWith,
  query,
  centuries,
}) => {
  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newQuery = event.target.value;

    if (newQuery.trim() === '') {
      setSearchWith({ query: null });
    } else {
      setSearchWith({ query: newQuery });
    }
  }

  const centuriesValue = ['16', '17', '18', '19', '20'];

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          className={searchParams.get('sex') ? '' : 'is-active'}
          to={{
            search: getSearchWith(searchParams, { sex: null }),
          }}
          replace
        >
          All
        </Link>
        <Link
          className={searchParams.get('sex') === 'm' ? 'is-active' : ''}
          to={{
            search: getSearchWith(searchParams, { sex: 'm' }),
          }}
          replace
        >
          Male
        </Link>
        <Link
          className={searchParams.get('sex') === 'f' ? 'is-active' : ''}
          to={{
            search: getSearchWith(searchParams, { sex: 'f' }),
          }}
          replace
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
            {centuriesValue.map(century => (
              <Link
                key={century}
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': centuries.includes(century),
                })}
                to={{
                  search: getSearchWith(searchParams, {
                    centuries: centuries.includes(century)
                      ? centuries.filter(cn => century !== cn)
                      : [...centuries, century],
                  }),
                }}
                replace
              >
                {+century}
              </Link>
            ))}
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className="button is-success is-outlined"
              to={{
                search: getSearchWith(searchParams, { centuries: null }),
              }}
              replace
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <button
          className="button is-Link is-outlined is-fullwidth"
          onClick={onClearFilters}
        >
          Reset all filters
        </button>
      </div>
    </nav>
  );
};
