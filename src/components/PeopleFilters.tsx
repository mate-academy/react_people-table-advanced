import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import { getSearchWith } from '../utils/searchHelper';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries') || [];

  const onSearchFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(getSearchWith(
      searchParams,
      { query: e.target.value || null },
    ));
  };

  const getCenturies = (newCentury: string) => {
    if (centuries.includes(newCentury)) {
      return centuries.filter(century => century !== newCentury);
    }

    return [...centuries, newCentury];
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: 'all' }}
          className={sex === 'all' || sex === null
            ? 'is-active'
            : ''}
        >
          All
        </SearchLink>

        <SearchLink
          params={{ sex: 'm' }}
          className={sex === 'm' ? 'is-active' : ''}
        >
          Male
        </SearchLink>

        <SearchLink
          params={{ sex: 'f' }}
          className={sex === 'f' ? 'is-active' : ''}
        >
          Female
        </SearchLink>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={searchParams.get('query') || ''}
            onChange={onSearchFilterChange}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {Array.from({ length: 5 }, (_, i) => 16 + i).map(linkNum => (
              <SearchLink
                key={linkNum}
                data-cy="century"
                params={{ centuries: getCenturies(`${linkNum}`) }}
                className={classNames('button mr-1', {
                  'is-info': centuries.includes(`${linkNum}`),
                })}
              >
                {linkNum}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={classNames('button is-success', {
                'is-outlined': centuries.length > 0,
              })}
              params={{ centuries: [] }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          className="button is-link is-outlined is-fullwidth"
          params={{
            query: null,
            centuries: null,
            sex: null,
          }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
