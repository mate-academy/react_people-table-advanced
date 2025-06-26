import { useSearchParams } from 'react-router-dom';
import { SearchLink } from '../SearchLink';
import cn from 'classnames';
import { SexFilter } from '../../types/FilterTypes';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const activeSex = searchParams.get('sex') || null;
  const activeCenturies = searchParams.getAll('centuries');
  const query = searchParams.get('query') || '';

  function toggleCenturies(century: string) {
    const isActive = activeCenturies.includes(century);

    const updatedCenturies = isActive
      ? activeCenturies.filter(cen => cen !== century)
      : [...activeCenturies, century];

    return updatedCenturies;
  }

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newQuery = event.target.value;

    const newParams = new URLSearchParams(searchParams.toString());

    if (newQuery.trim()) {
      newParams.set('query', newQuery.trim());
    } else {
      newParams.delete('query');
    }

    setSearchParams(newParams);
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {Object.entries(SexFilter).map(([key, value]) => (
          <SearchLink
            key={key}
            className={cn({ 'is-active': activeSex === value })}
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
            {['16', '17', '18', '19', '20'].map(century => (
              <SearchLink
                key={century}
                data-cy="century"
                className={cn('button', 'mr-1', {
                  'is-info': activeCenturies.includes(century),
                })}
                params={{
                  centuries: toggleCenturies(century),
                }}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={cn('button', 'is-success', {
                'is-outlined': activeCenturies.length > 0,
              })}
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
          params={{ centuries: null, sex: null, query: null }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
