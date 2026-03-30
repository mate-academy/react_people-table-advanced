import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { SearchLink } from './SearchLink';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const selectedCenturies = searchParams.getAll('centuries');

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: null }}
          className={cn({ 'is-active': !sex })}
        >
          All
        </SearchLink>
        <SearchLink
          params={{ sex: 'm' }}
          className={cn({ 'is-active': sex === 'm' })}
        >
          Male
        </SearchLink>
        <SearchLink
          params={{ sex: 'f' }}
          className={cn({ 'is-active': sex === 'f' })}
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
            onChange={e => {
              const newParams = new URLSearchParams(searchParams);
              const trimmedValue = e.target.value.trim();

              if (trimmedValue) {
                newParams.set('query', trimmedValue);
              } else {
                newParams.delete('query');
              }

              setSearchParams(newParams);
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
            {[16, 17, 18, 19, 20].map(century => {
              const centuryStr = century.toString();
              const isActive = selectedCenturies.includes(centuryStr);

              return (
                <button
                  key={century}
                  data-cy="century"
                  className={cn('button mr-1', { 'is-info': isActive })}
                  onClick={() => {
                    const newParams = new URLSearchParams(searchParams);
                    const current = newParams.getAll('centuries');

                    newParams.delete('centuries');

                    if (isActive) {
                      current
                        .filter(c => c !== centuryStr)
                        .forEach(c => newParams.append('centuries', c));
                    } else {
                      [...current, centuryStr].forEach(c =>
                        newParams.append('centuries', c),
                      );
                    }

                    setSearchParams(newParams);
                  }}
                >
                  {century}
                </button>
              );
            })}
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
          params={{ query: null, centuries: null, sort: null, order: null }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
