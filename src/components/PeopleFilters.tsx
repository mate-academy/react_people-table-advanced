import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { getSearchWith } from '../utils/searchHelper';
import { SearchLink } from './SearchLink';

const CENTURIES = ['16', '17', '18', '19', '20'];

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sexFilter = searchParams.get('sex');
  const centuriesFilter = searchParams.getAll('centuries');
  const query = searchParams.get('query') || '';

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(getSearchWith(searchParams,
      { query: event.target.value || null }));
  };

  const toggleCenturyFilter = (century: string): string[] | null => {
    const updatedCenturiesFilter = centuriesFilter.includes(century)
      ? centuriesFilter.filter((value) => value !== century)
      : [...centuriesFilter, century];

    return updatedCenturiesFilter.length ? updatedCenturiesFilter : null;
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {['All', 'm', 'f'].map((sex) => (
          <SearchLink
            key={sex}
            className={sexFilter === sex
              || (sex === 'All' && sexFilter === null)
              ? 'is-active'
              : ''}
            params={{ sex: sex === 'All' ? null : sex }}
          >
            {(() => {
              if (sex === 'All') {
                return 'All';
              }

              if (sex === 'm') {
                return 'Male';
              }

              return 'Female';
            })()}
          </SearchLink>
        ))}
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            value={query}
            placeholder="Search"
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
            {CENTURIES.map((century) => (
              <SearchLink
                key={century}
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': centuriesFilter.includes(century),
                })}
                params={{ centuries: toggleCenturyFilter(century) }}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className="button is-success is-outlined"
              params={{ centuries: null }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
        className="button is-link is-outlined is-fullwidth"
        params={{ sex: null, query: null, centuries: null }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
