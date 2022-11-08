import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';
import { SearchLink } from './SearchLink';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sex = searchParams.get('sex');
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={classNames(
            '',
            { 'is-active': sex === null },
          )}
          params={{ sex: null }}
        >
          All
        </SearchLink>

        <SearchLink
          className={classNames(
            '',
            { 'is-active': sex === 'm' },
          )}
          params={{ sex: 'm' }}
        >
          Male
        </SearchLink>

        <SearchLink
          className={classNames(
            '',
            { 'is-active': sex === 'f' },
          )}
          params={{ sex: 'f' }}
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
            value={query}
            onChange={(event) => setSearchParams(
              getSearchWith(
                searchParams, { query: event.target.value || null },
              ),
            )}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {['16', '17', '18', '19', '20'].map(centery => (
              <SearchLink
                data-cy="century"
                className={classNames(
                  'button mr-1',
                  { 'is-info': centuries.includes(centery) },
                )}
                key={centery}
                params={{
                  centuries: centuries.includes(centery)
                    ? centuries.filter(c => c !== centery)
                    : ([...centuries, centery]),
                }}
              >
                {centery}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={classNames(
                'button is-success',
                { 'is-outlined': centuries.length > 0 },
              )}
              params={{ centuries: null }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          className={classNames(
            'button is-link is-outlined ',
            { 'is-fullwidth': !sex || centuries.length === 0 || !query },
          )}
          params={{ centuries: null, query: null, sex: null }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
