import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSex = searchParams.get('sex');
  const activeCenturies = searchParams.getAll('centuries');
  const activeQuery = searchParams.get('query');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;

    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev);

      if (newQuery) {
        newParams.set('query', newQuery);
      } else {
        newParams.delete('query');
      }

      return newParams;
    });
  };

  const centuriesList = ['16', '17', '18', '19', '20'] as const;

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: null }}
          className={` ${currentSex === null ? 'is-active' : ''}`}
        >
          All
        </SearchLink>

        <SearchLink
          params={{ sex: 'm' }}
          className={` ${currentSex === 'm' ? 'is-active' : ''}`}
        >
          Male
        </SearchLink>

        <SearchLink
          params={{ sex: 'f' }}
          className={` ${currentSex === 'f' ? 'is-active' : ''}`}
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
            value={activeQuery || ''}
            onChange={handleSearchChange}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuriesList.map(century => (
              <SearchLink
                key={century}
                data-cy="century"
                className={`button mr-1 ${
                  activeCenturies.includes(century) ? 'is-info' : ''
                }`}
                params={{
                  centuries: activeCenturies.includes(century)
                    ? activeCenturies.filter(c => c !== century)
                    : [...activeCenturies, century],
                }}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={`button is-success ${
                activeCenturies.length !== 0 ? 'is-outlined' : ''
              }`}
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
          params={{ sex: null, centuries: null, query: null }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
