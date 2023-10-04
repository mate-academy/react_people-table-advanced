import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { SearchLink } from '../SearchLink';
import { Sex } from '../../types/Sex';
import { CENTURIES, DEFAULT_FILTER_VALUES } from '../../utils/constants';
import { getSearchWith } from '../../utils/searchHelper';

export const PeopleFilters = () => {
  const [searchParams, setSearchPrams] = useSearchParams();
  const sexParam = searchParams.get('sex') || '';
  const centuriesParams = searchParams.getAll('centuries') || [];
  const queryParam = searchParams.get('query') || '';

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value || null;

    setSearchPrams(
      getSearchWith(searchParams, { query }),
    );
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={classNames({ 'is-active': !sexParam })}
          params={{ sex: null }}
        >
          All
        </SearchLink>

        {Object.entries(Sex).map(([key, value]) => (
          <SearchLink
            key={key}
            className={classNames({ 'is-active': sexParam === value })}
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
            value={queryParam}
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
            {CENTURIES.map(century => {
              const normalizedCentury = century.toString();
              const isActive = centuriesParams.includes(normalizedCentury);

              const centuriesToReceive = isActive
                ? (centuriesParams.filter(centuryParam => (
                  centuryParam !== normalizedCentury
                ))
                ) : (
                  [...centuriesParams, normalizedCentury]
                );

              return (
                <SearchLink
                  key={century}
                  data-cy="century"
                  className={classNames(
                    'button',
                    'mr-1',
                    { 'is-info': isActive },
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
                { 'is-outlined': centuriesParams.length },
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
          params={DEFAULT_FILTER_VALUES}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
