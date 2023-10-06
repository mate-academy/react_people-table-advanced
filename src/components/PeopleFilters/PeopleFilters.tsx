import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { SearchLink } from '../SearchLink';
import { Sex } from '../../types';
import { CENTURIES_TO_FILTER, DEFAULT_PARAMS } from '../../utils/constants';
import { getSearchWith } from '../../utils/searchHelper';

export const PeopleFilters = () => {
  const [searchParams, setSearchPrams] = useSearchParams();
  const sexFromSearch = searchParams.get('sex') || '';
  const centuriesFromSearch = searchParams.getAll('centuries') || [];
  const queryFromSearch = searchParams.get('query') || '';

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value || null;

    setSearchPrams(
      getSearchWith(searchParams, { query }),
    );
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={classNames({ 'is-active': !sexFromSearch })}
          params={{ sex: null }}
        >
          All
        </SearchLink>

        {Object.entries(Sex).map(([key, value]) => (
          <SearchLink
            className={classNames({ 'is-active': sexFromSearch === value })}
            params={{ sex: value }}
          >
            {key}
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
            value={queryFromSearch}
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
            {CENTURIES_TO_FILTER.map(century => {
              const stringCentury = century.toString();
              const isActive = centuriesFromSearch.includes(
                century.toString(),
              );

              const centuriesToReceive = isActive
                ? (centuriesFromSearch.filter(centuryFromSearch => (
                  centuryFromSearch !== stringCentury
                ))
                ) : (
                  [...centuriesFromSearch, stringCentury]
                );

              return (
                <SearchLink
                  data-cy="century"
                  className={classNames(
                    'button',
                    'mr-1',
                    {
                      'is-info': isActive,
                    },
                  )}
                  params={{ centuries: centuriesToReceive }}
                >
                  {century}
                </SearchLink>
              );
            })}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={classNames(
                'button',
                'is-success',
                {
                  'is-outlined': centuriesFromSearch.length,
                },
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
          className="button is-link is-outlined is-fullwidth"
          params={DEFAULT_PARAMS}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
